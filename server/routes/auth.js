const express = require("express");
//importing library for username&password validation
const { check, validationResult } = require("express-validator");
//import bcyrpt
const bcyrpt = require("bcryptjs");
//importing mongodb schema from ../models/User
const User = require("../models/User");
//import json webtoken
const jwt = require("jsonwebtoken");
//import auth from ../middleware to insert middleware to protected routes
const auth = require('../middleware/auth')

//TOOLS
const router = express.Router();

//@route  GET api/auth
//@desc   get logged in user
//@access private
router.get("/", auth, async (req, res) => {
	try {
        //In auth middleware, we injected user object to request if client have token.
        //get user MongoDB object from database without password field. 
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(err.message)
        res.status(500).send("server error")
    }
});

//@route  POST api/auth
//@desc   Auth user and get token, Log In
//@access public
router.post(
	"/",
	[check("email").isEmail(), check("password").exists()],

	async (req, res) => {
		//VALİDATE INPUTS
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body
        
        try {
            //FIND USER IN DATABASE
            let user = await User.findOne({email})
            if(!user){return res.status(400).json({msg: 'Invalid Credentials'})} //User does not exist
            
            const isMatch= await bcyrpt.compare(password, user.password)
            if(!isMatch){return res.status(400).json({msg:'Invalid Credentials'})} //Password is not valid
            
            const payload = {
				user: {
					id: user.id,
				},
            };

            //Send jwt token that is loaded with data we want to send and encrypted with jwtSecret
			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 360000, //3600 second is 1 hour
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);

        }
        catch (err) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
	}
);

module.exports = router;
