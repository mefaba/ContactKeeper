import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import axios from "axios";

import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from "./../types";

const host = process.env.REACT_APP_herokuserverlink

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }
    /* const contactReducer = () =>{
        return ""
    } */
    const [state, dispatch] = useReducer(ContactReducer, initialState)

    //Get Contacts from API and Backend
    const getContacts = async () => {
        try {
            const res = await axios.get(`${host}/api/contacts`)
            dispatch({ type: GET_CONTACTS, payload: res.data})
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
        }
    }
    //Add Contact
    const addContact = async (contact) => {
        try {
            const res = await axios.post(`${host}/api/contacts`, contact)
            dispatch({ type: ADD_CONTACT, payload: res.data})
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
        }
    }
    //Delete Contact
    const deleteContact = async(id) =>{
        try {
            await axios.delete(`${host}/api/contacts/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: id})
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
        }
    }
    //Update Contact
    const updateContact = async (contact) =>{
        try {
            const res = await axios.put(`${host}/api/contacts/${contact._id}`, contact)
            dispatch({ type: UPDATE_CONTACT, payload: res.data})
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
        }
        
    }
    //Clear Contacts
    const clearContacts = () =>{
        dispatch({ type: CLEAR_CONTACTS})
    }
    //Set Current Contact
    const setCurrent = (contact) =>{
        dispatch({ type: SET_CURRENT, payload: contact})
    }
    //Clear Current Contact
    const clearCurrent = () =>{
        dispatch({ type: CLEAR_CURRENT})
    }
    //Filter Contacts
    const filterContact = (text) =>{
        dispatch({ type: FILTER_CONTACTS, payload: text})
    }
    //Clear Filter
    const clearFilter = () =>{
        dispatch({ type: CLEAR_FILTER})
    }

    return(
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContact,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )

};

export default ContactState;
