const express = require("express");

//importing mongodb schema from ../models
const User = require("../models/User");
const Contact = require("../models/Contact");
//importing library for username&password validation
const { check, validationResult } = require("express-validator");
//import auth middleware
const auth = require("../middleware/auth");

//TOOLS
const router = express.Router();

//@route  GET api/contacts
//@desc   Get all contacts for loggedin user
//@access Private
router.get("/", auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

//@route  POST api/contacts
//@desc   Add new contact
//@access Private
router.post(
	"/",
	//Execute middlewares
	[
		auth, //check if user authorized & have token
		[check("name", "Name is required").not().isEmpty()], //check req.body for required name field of adding contact
	],
	async (req, res) => {
		//VALİDATE INPUTS
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
        
        const { name, email, phone, type} = req.body

        try {
            const newContact = new Contact({
                user: req.user.id,
                name,
                email,
                phone,
                type                
            })
            const contact = await newContact.save()
            res.json(contact)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
	}
);

//@route  PUT api/contacts/:id
//@desc   Update contact
//@access Private
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type} = req.body

    //Build contact object
    const contactFields = {}
    if(name) contactFields.name = name
    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg: 'Contact not found'})
        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }

        /* contact = await Contact.findByIdAndUpdate(req.params.id,
               {$set:contactFields},
               {new: true}
            ) */
        contact = await Contact.updateOne({ _id: req.params.id }, { $set:contactFields });
        res.json({msg: "Contact Updated"})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

//@route  DELETE api/contacts/:id
//@desc   delete contact
//@access Private
router.delete("/:id", auth ,async(req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg: 'Contact not found'})
        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }
        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: 'Contact Removed'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;
