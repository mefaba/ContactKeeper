import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";


const ContactList = () => {
	const contextData = useContext(ContactContext);
	const { contacts, filtered } = contextData;

	if (contacts.length === 0) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<>
		<TransitionGroup>
            {
            filtered !== null
				? filtered.map((x) => {
						return (
							<CSSTransition key={x.id} timeout={500} classNames="item">
								<ContactItem  contact={x} />
							</CSSTransition>
						)
				  })
				: contacts.map((x) => {
						return(
							<CSSTransition key={x.id} timeout={500} classNames="item">
								<ContactItem contact={x} />
							</CSSTransition>
						)
				  })
            }
		</TransitionGroup>
		</>
	);
};

export default ContactList;
