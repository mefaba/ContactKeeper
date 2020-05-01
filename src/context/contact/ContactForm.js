import React, { useState, useContext, useEffect } from "react";
import ContactContext from "./contactContext";

const ContactForm = () => {
    const contextData = useContext(ContactContext)

    const {addContact, updateContact, clearCurrent ,current} = contextData

    useEffect(()=>{
        //Edit butonuna basıldığında current null olmamış oluyor
        if(current !== null){
            setContact(current)
        }else{
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal",
            })
        }
    },[contextData,current] )

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal",
	});
    const { name, email, phone, type } = contact;
    
    const handleChange = (e) =>{
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(current===null){addContact(contact)}
        else{updateContact(contact)}
        //THEN Clear contactstate
        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal",
        })
    }

    const handleCleaning = () => {
        clearCurrent()
    }

	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-primary">{current? 'Edit Contact': 'Add Contact'}</h2>
			<input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={handleChange} />
            <h5>Contact Type</h5>
            <input type="radio"  name="type" value="personal" 
                checked={type==='personal'} 
                onChange={handleChange}
                /> Personal{' '}

            <input type="radio"  name="type" value="professional" 
                checked={type==='professional'} 
                onChange={handleChange}
                /> Professional{' '}

            <div>
                <input type="submit" value={current? 'Update Contact': 'Add Contact'} className="btn btn-primary btn-block"/>
            </div>
            {current&& <div>
                <button className="btn btn-light btn-block" onClick={handleCleaning}>Clear</button>
                </div>}
        </form>
	);
};

export default ContactForm;
