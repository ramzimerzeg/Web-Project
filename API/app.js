require('dotenv').config();
const express = require('express') ;
const app = express();
const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');
// LOAD in mongoose models 

const users = require('./routes/users');
const ressources = require('./routes/ressources');
const tasks = require('./routes/tasks');

const CreateAdmin = require('./db/createAdmin');


// LOAD Middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

app.use('/', users);
app.use('/', ressources);
app.use('/', tasks);

CreateAdmin();

app.listen(process.env.PORT, ()=>{
    console.log("server is listening on port "+process.env.PORT);
})