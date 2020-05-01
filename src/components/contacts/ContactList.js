import React, { useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoadingUnit from "./../layout/LoadingUnit";

const ContactList = () => {
	const contextData = useContext(ContactContext);
	const { contacts, filtered, getContacts, loading } = contextData;

	useEffect(() => {
		getContacts();
		//eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length===0 && !loading) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((x) => {
								return (
									<CSSTransition key={x._id} timeout={500} classNames="item">
										<ContactItem contact={x} />
									</CSSTransition>
								);
						  })
						: contacts.map((x) => {
								return (
									<CSSTransition key={x._id} timeout={500} classNames="item">
										<ContactItem contact={x} />
									</CSSTransition>
								);
						  })}
				</TransitionGroup>
			) : (
				<LoadingUnit />
			)}
		</>
	);
};

export default ContactList;
