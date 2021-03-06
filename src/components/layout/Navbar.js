import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title = "Contact Keeper", icon = "fas fa-id-card-alt" }) => {
    const contextData = useContext(AuthContext)
    const { isAuthenticated, logout, user, loadUser} = contextData

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
      }, []);

    const contactContextData = useContext(ContactContext)
    const {clearContacts} = contactContextData

    const handleLogout = () => {
        logout()
        clearContacts()
    }

    const authLinks = (
            <>
                <li>Hello { user && user.name}</li>
                <li>
                    <a onClick={handleLogout} href="#!">
                        <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                    </a>
                </li>
            </>
    )
    const guestLinks = (
        <>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </>
    )
    

    return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
            <ul>
                {isAuthenticated? authLinks: guestLinks}
            </ul>
		</div>
	);
};

export default Navbar;



/* return (
    <div className="navbar bg-primary">
        <h1>
            <i className={icon} /> {title}
        </h1>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </div>
); */