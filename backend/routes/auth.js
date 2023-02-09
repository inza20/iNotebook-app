// auth.js will have all end points for authentication
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Larryisgood$oy"

// Create a User using: POST "/api/auth/". Doesn't require auth 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must consist of atleast 5 characters').isLength({min: 5}),
], 
  async (req, res)=> {
    // If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    // Check whether the user with this email exists already
    try {
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({errors : "Sorry, a user with this email already exists"});
    }
    // Adding salt , using bcrypt
    const salt = await bcrypt.genSalt(10);
    const secretPass = await bcrypt.hash(req.body.password, salt);
    
    //Create a new user
     user = await User.create({
        name: req.body.name,
        password: secretPass, 
        // this will send hash of password, not the actual password
        email: req.body.email,
    });
    const data = {
        user:{ id: user.id }
    }
    // Passing secret key to sign web token
    const authToken = jwt.sign(data, JWT_SECRET); 
    // JWT_SECRET will help us know if our data has been tampered with or not 
    res.json({authToken})           
    //This authToken can be used to get the data back                   
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }       
})

module.exports = router;

