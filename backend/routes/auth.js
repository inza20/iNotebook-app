// auth.js will have all end points for authentication
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Larryisgood$oy"

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". Doesn't require auth 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must consist of atleast 5 characters').isLength({min: 5}),
], 
  async (req, res)=> {
    let success = false;
    // If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors : errors.array()});
    }
    // Check whether the user with this email exists already
    try {
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({ success, errors : "Sorry, a user with this email already exists"});
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
    success = true;
    res.json({ success, authToken})           
    //This authToken can be used to get the data back                   
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }       
})

// ROUTE 2 :  Authenticate a User using: POST "/api/auth/login". Doesn't require auth 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], 
  async (req, res)=> {
    let success = false;
    // If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {email, password} = req.body;
    try {
    let user = await User.findOne({email});
    if (!user){
        success = false;
        return res.status(400).json({error : "Please try to login using valid credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare){
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });

    }
    const data = {
        user:{
          id: user.id
        }
      }

    const authToken = jwt.sign(data, JWT_SECRET);  
    success = true;
    res.json({ success, authToken })                         
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }  
    })

// ROUTE 3 :  Get loggedin User Details using: POST "/api/auth/getuser". Requires login
router.post('/getuser', fetchuser, async(req, res)=> {

    try{
        userId = req.user.id;
        let user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}) 



module.exports = router;

