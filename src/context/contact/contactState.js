import React, { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./contactContext";

import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from "./../types";

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Erdem Aydın',
                email: 'erdem@gmail.com',
                phone: '333-333-333',
                type: "professional"
            },
            {
                id:1,
                name: 'Murat Aydın',
                email: 'murat@gmail.com',
                phone: '222-222-222',
                type: "personal"
            },
            {
                id:1,
                name: 'Aytugan Aydın',
                email: 'aytugan@gmail.com',
                phone: '111-111-111',
                type: "professional"
            },
            {
                id:1,
                name: 'Erdem Aydın',
                email: 'erdem@gmail.com',
                phone: '333-333-333',
                type: "professional"
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)



    //Add Contact

    //Delete Contact

    //Set Current Contacct

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    return(
        <contactContext.Provider
            value={{
                contacts: state.contacts
            }}
        >
            {props.children}
        </contactContext.Provider>
    )

};

export default ContactState;
