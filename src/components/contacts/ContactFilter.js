import React, { useContext,useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'


const ContactFilter = () => {
    const contextData = useContext(ContactContext)
    const {filterContact, clearFilter, filtered} = contextData
    const text = useRef()

    useEffect(()=>{
        if(filtered === null){
            text.current.value=''
        }
    })

    const handleChange = (e) => {
        if(text.current.value !== '') {
            filterContact(e.target.value)
        }else{
            clearFilter()
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts.." onChange={handleChange}/>
        </form>
    )
}

export default ContactFilter
