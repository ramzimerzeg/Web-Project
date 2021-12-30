const jwt = require('jsonwebtoken');
const {User} = require('../db/Models');

module.exports = async(req,res,next)=>{
    
// check whether the request has a valid JWT access token

    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(),async (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            const user = await User.findOne({
                _id: decoded._id
            })
            if(user){
                req.user = {
                    username : user.username,
                    isadmin : user.isadmin
                }
                req.user_id = decoded._id;
                next();
            }
        }
    });
}