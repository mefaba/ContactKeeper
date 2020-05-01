import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS,
} from "./../types";


const AuthState = (props) => {
    const initialState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       error: null
    }
    /* const contactReducer = () =>{
        return ""
    } */
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //LOAD USER

    //REGISTER USER

    //Login User

    //Clear Errors

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthState;
