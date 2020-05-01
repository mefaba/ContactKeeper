import React from 'react'
import ContactList from '../contacts/ContactList'
import ContactForm from '../../context/contact/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

const HomePage = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactFilter/>
                <ContactList/>
            </div>
        </div>
    )
}

export default HomePage
