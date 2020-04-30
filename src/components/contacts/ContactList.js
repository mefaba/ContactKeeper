import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const ContactList = () => {
    const contextData = useContext(ContactContext)
    const {contacts} = contextData

    return (
        <>
            {contacts.map(x=>{
                return <ContactItem key={x.id} contact ={x}/>
            })}
        </>
    )
}

export default ContactList
