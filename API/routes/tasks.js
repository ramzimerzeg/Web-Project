const express = require('express');
const router = express.Router();

const {Ressource, Task} = require('../db/Models');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


const isadmin = require('../middleware/isadmin');

const authenticate = require('../middleware/authentificate');

const verifySession = require('../middleware/verifySession');

const rateLimit = require('express-rate-limit');

//MIDLLWARE LIMIT 

const AddTasklimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 3, // limite chaque IP a 3 requete par 15 minutes
    message: "Trop de demandes, veuillez réessayer plus tard... :)"
})


/**
 * GET /resso   urces/:ressourceId/tasks
 * role : get all tasks that belong to a spesific ressource
 */
 router.get('/ressources/:ressourceId/tasks',authenticate, (req,res)=>{
    //return all tasks that belong to a spesific ressource
    Task.find({
        _ressourceId: req.params.ressourceId
    }).then((tasks)=>{
        res.send(tasks);
    })
});

router.get('/ressources/:ressourceId/tasks/:taskId',authenticate,(req,res)=>{
    Task.findOne({
        _ressourceId: req.params.ressourceId,
        id: req.params.taskId
    }).then((task)=>{
        res.send(task);
    })
});


/**
 * POST /ressources/:ressourceId/tasks
 * role : creation d'une nouvelle anomalie d'une ressource
 */
 router.post('/ressources/:ressourceId/tasks',AddTasklimiter, (req, res) => {
    Ressource.findOne({
        _id:req.params.ressourceId
    }).then((ressource)=>{
        if (ressource) {
            //ressource object is valid so the current authentificated user can create new task 
            return true;
        }else{
            return false;
        }
    }).then((canCreateTask)=>{
        if (canCreateTask) {

            let title = req.body.title; 
 
            let NewTask = new Task({
                title,
                _ressourceId: req.params.ressourceId
            });
            NewTask.save().then((TaskDoc)=>{
                res.send(TaskDoc);
            });
        }else{
            res.sendStatus(404);//not found 404
        }
    })
 });

/**
 * PATCH /ressources/:ressourceId/tasks/:taskId
 * role : update a specified task 
 */
 router.patch('/ressources/:ressourceId/tasks/:taskId', authenticate, (req, res) => {
    
    Ressource.findOne({
        _id:req.params.ressourceId,
        _userId:req.user_id
    }).then((ressource)=>{
        if (ressource) {
            //ressource object is valid so the current authentificated user can update the task 
            return true;
        }else{
            return false;
        }
    }).then((canUpdateTasks)=>{
        if (canUpdateTasks) {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _ressourceId: req.params.ressourceId
            },  {
                    $set: req.body
                }
            ).then(()=>{
                res.send({message:"updated successfully"});
            });
        }else{
            res.sendStatus(404);//not found 404
        }   
    }) 
});

/**
 * DELETE /ressources/:ressourceId/tasks/:taskId
 * role : delete a sepecific task
 */
 router.delete('/ressources/:ressourceId/tasks/:taskId', authenticate, (req, res) => {
   
    Ressource.findOne({
        _id:req.params.ressourceId,
        _userId:req.user_id
    }).then((ressource)=>{
        if (ressource) {
            //ressource object is valid so the current authentificated user can update the task 
            return true;
        }else{
            return false;
        }
    }).then((canDeleteTasks)=>{
        if (canDeleteTasks) {

            Task.findOneAndRemove({
                _id: req.params.taskId,
                _ressourceId: req.params.ressourceId
            }).then((removedTaskDoc)=>{
                res.send(removedTaskDoc);
            })

        }else {
            res.sendStatus(404);//not found 404
        }
    });
});

module.exports = router;