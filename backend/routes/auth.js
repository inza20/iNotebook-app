// auth.js will have all end points for authentication
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// router.get('/', (req, res)=> {
//     // obj = {a: 'thios', number: 34 }
//     // res.json(obj)                   // res.json is used to send data
//     console.log(req.body);

//     const user = User(req.body);
//     user.save()                         // Use user.save() to store data 
//     // res.send("hello");
//     res.send(req.body);
// })
// read data via req.body and send response via res.send

// ( To  create a user in db, send a user's data in 'body' of GET request )
// Create a User using: POST "/api/auth/". Desn't require auth 

router.post('/', [
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must consist of atleast 5 characters').isLength({min: 5}),
], 
  async (req, res)=> {
    // If there are errors , rreturn bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    // Check whether the user with this email exists already
    try {
    let user = User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({errors : "Sorry, a user with this email already exists"});
    }
     user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
    res.json(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }       
})

module.exports = router;

