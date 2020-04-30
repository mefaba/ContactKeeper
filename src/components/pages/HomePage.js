import React from 'react'
import ContactList from '../contacts/ContactList'
import ContactForm from '../../context/contact/ContactForm'

const HomePage = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactList/>
            </div>
        </div>
    )
}

export default HomePage
