// auth.js will have all end points for authentication
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/". Doesn't require auth 
router.post('/createuser', [
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
    if (!user){
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

