import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from "./../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const host = process.env.REACT_APP_herokuserverlink

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
    const loadUser = async () => {
        setAuthToken(localStorage.token);
    
        try {
          const res = await axios.get(`${host}/api/auth`);
    
          dispatch({
            type: USER_LOADED,
            payload: res.data
          });
        } catch (err) {
          dispatch({ type: AUTH_ERROR });
        }
    };

    //REGISTER USER
    const register = async(formData) => {
        try {
            const res = await axios.post(`${host}/api/users`, formData)    
            
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data //res.data will be the token from backend
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            }) 
        }
    }
    //Login User
    const login = async(formData) => {

        try {
            const res = await axios.post(`${host}/api/auth`, formData)    
            console.log("success")
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data //res.data will be the token from backend
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            }) 
        }
    }
    //Logout User
    const logout = () => dispatch({
        type: LOGOUT,
    })
    //Clear Errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS,
    })
    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthState;
