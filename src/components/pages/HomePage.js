import React, { useContext, useEffect } from 'react'
import ContactList from '../contacts/ContactList'
import ContactForm from '../../context/contact/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/AuthContext'

const HomePage = () => {
    const contextData = useContext(AuthContext)
    const {loadUser} = contextData
    useEffect(()=>{
        loadUser()
        //eslint-disable-next-line
    },[])

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
