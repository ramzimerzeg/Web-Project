const express = require('express');
const router = express.Router();

const {Ressource, Task} = require('../db/Models');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


const isadmin = require('../middleware/isadmin');

const authenticate = require('../middleware/authentificate');

const verifySession = require('../middleware/verifySession');

/**
 * GET /ressources
 * role : get all ressources
 */
 router.get('/ressources', authenticate, (req, res) => {
    Ressource.find({
        _userId:req.user_id
    }).then((ressources)=>{
        res.send(ressources);
    }).catch((e)=>{
        res.send(e);
    });
});

// get all localisations 
router.get('/ressources/:ressourceId/localisation', (req, res) => {
    Ressource.findOne({_id: req.params.ressourceId, },
        {  localisation: 1,title: 1 , _id:0}).then((localisation)=>{
        res.send(localisation);
    });
});

// get all problems for a ressource 
router.get('/ressources/:ressourceId/descriptions', (req, res) => {
    Task.find({_ressourceId: req.params.ressourceId },
        {  title: 1 , _id:0}).then((descriptions)=>{
        res.send(descriptions);
    });
});

/**
 * POST /ressources
 * role : creation d'une ressource 
 */
 router.post('/ressources', authenticate, (req, res) => {
   let title = req.body.title; 
   let localisation = req.body.localisation;

   let newRessource = new Ressource({
       title,
       localisation,
       _userId:req.user_id
   });
   newRessource.save().then((ressourceDoc)=>{
       res.send(ressourceDoc);
   });
});

/**
 * PATCH /ressources/:id
 * role : update a specified ressource 
 */
 router.patch('/ressources/:id', authenticate, (req, res) => {
    Ressource.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id},{
        $set: req.body
    }).then(()=>{
        res.send({'message':'updated successfully'});
    });
});

/**
 * DELETE /ressources/:id
 * role : delete a sepecific ressource
 */
 router.delete('/ressources/:id', authenticate, (req, res) => {
    Ressource.findOneAndRemove({
         _id: req.params.id,
         _user_id : req.user_id
    }).then((removedressourceDoc)=>{
        res.send(removedressourceDoc);

        //delete all the tasks that are in the ressource 
        deleteTasksFromRessource(removedressourceDoc._id);
    })
});

/* HELPER METHODS */
let deleteTasksFromRessource = (_ressourceId) => {
    Task.deleteMany({
        _ressourceId
    }).then(() => {
        console.log("Tasks from " + _ressourceId + " were deleted!");
    }).catch((e) => {
        console.log(e);
    });
}


module.exports = router;