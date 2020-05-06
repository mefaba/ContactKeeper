const express = require("express");
const router = express.Router();
//import bcyrpt
const bcyrpt = require("bcryptjs");
//import json webtoken
const jwt = require("jsonwebtoken");
//importing mongodb schema from ../models/User
const User = require("../models/User");
//importing library for username&password validation
const { check, validationResult } = require("express-validator");
//importing jwtsecret from .env for jwt session solution.
const dotenv = require("dotenv");
dotenv.config();

//@route  POST api/users
//@desc   Register a user
//@access public
router.post(
	"/",
	[
		check("name").not().isEmpty(), //Please add name
		check("email").isEmail(), //Please include a valid email
		check("password").isLength({ min: 6 }), //Please enter a valid password
	],

	async (req, res) => {
		//VALİDATE INPUTS
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ msg: "User already exists" });
			}
            //CREATE USER OBJECT FOR MONGO DB
			user = new User({
				name,
				email,
				password,
            });
            //HASH PASSWORD with bcyrpt inside MongoDB Object
			const salt = await bcyrpt.genSalt(10);
			user.password = await bcyrpt.hash(password, salt);

            //Save object to mongoDB
			await user.save();

            //JSON WEB TOKEN PART
            //a)Add user_id to payload of jwtToten, user_id is automatically created by User Model inside MongoDB Object
			const payload = {
				user: {
					id: user.id,
				},
            };
            //b)send jwt token that is loaded with data we want to send and encrypted with jwtSecret
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
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
