const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Create a User using: POST "/api/auth/". Desn't require auth
// To  create a user, send a user's data in 'body' of thunderclient GET request

router.get('/', (req, res)=> {
    // obj = {a: 'thios', number: 34 }
    // res.json(obj)                   // res.json is used to send data
    console.log(req.body);

    const user = User(req.body);
    user.save()                         // Use user.save() to store data 
    // res.send("hello");
    res.send(req.body);
})

// read data via req.body and send response via res.send


module.exports = router;

// auth.js will have all end points for authentication