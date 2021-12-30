const express = require('express');
const router = express.Router();

const {User} = require('../db/Models');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


const isadmin = require('../middleware/isadmin');

const authenticate = require('../middleware/authentificate');

const verifySession = require('../middleware/verifySession');

/* USER ROOTS */

/**
 * POST /users
 * role : create users
 */
 router.post('/users',(req, res) => {
    //create user
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(()=>{
        return newUser.createSession();
    }).then((refreshToken)=>{
        //session created successfully - refresh token returned 
        // we generate an access auth token for the user
        return newUser.generateAccessAuthToken().then((accessToken)=>{
            //access auth token generated successfully, now we return an object containing the auth tokens
            return {accessToken, refreshToken} 
        })
    }).then((authTokens)=>{
       // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
       res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * GET /allusers
 * Purpose: admin listing users
 */
 router.get('/allusers',authenticate, (req, res) => {

    User.findOne({
        _id:req.user_id
    }).then((user)=>{
        if (user.isadmin) {
            //user object is valid so the current authentificated user is admin
            return true;
        }else{
            return false;
        }
    }).then((admin)=>{
        if (admin) {
            var condition = {"isadmin": "false"}
            User.find(condition).then((users)=>{
                res.send(users);
            }).catch((e)=>{
                res.send(e);
            });
        }else {
            res.sendStatus(404);//not found 404
        }
    });
});

/**
 * Patch /users
 * role : update users
 */
 router.patch('/users/:id',authenticate, isadmin, async (req, res) => {

    let{username, password} = req.body;

    console.log("req.body before hash");
    console.log(username);
    console.log(password);
    if (password == "") {
        let userdata;
         userdata = {username}
         console.log("user data",userdata);
        User.findOneAndUpdate({_id: req.params.id},{
            $set: userdata
        }).then(()=>{
            res.send({'message':'updated successfully'});
        });
    } else {
        let costFactor = 10;
        bcrypt.genSalt(costFactor, (err, salt) =>  {
            bcrypt.hash(password, salt, (err, hash) => {
                console.log("hash is "+hash);
                let userdata;
                if(password == undefined){
                    userdata = {username}
                } else {
                    userdata = {username,password:hash}
                }
                console.log("user data",userdata);
                User.findOneAndUpdate({_id: req.params.id},{
                    $set: userdata
                }).then(()=>{
                    res.send({'message':'updated successfully'});
                });
            })
        })
    }
});


/**
 * DELETE /users
 * Purpose: delete user
 */
 router.delete('/users/:id',authenticate, isadmin, async (req, res) => {

    User.findOneAndRemove({
        _id: req.params.id 
    }).then((removedUser)=>{
       res.send(removedUser);
   })
});


/**
 * POST /users/login
 * Purpose: Login
 */
 router.post('/users/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findByCredentials(username, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})


/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
 router.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

module.exports = router;
