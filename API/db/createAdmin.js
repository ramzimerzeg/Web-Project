const {User} = require('../db/Models');
const axios = require('axios').default;

module.exports  =  () => {
    User.findOne({
        isadmin : true
    }).then(async(user) => {
        if (user) {
            console.log("admin already exist");
        } else {
                const rawResponse = await axios('http://localhost:'+process.env.PORT+'/users', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD, isadmin: true})
                });
        }
    }).catch((e) => {
        console.log(e);
    });
}

