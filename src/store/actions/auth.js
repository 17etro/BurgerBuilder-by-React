import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFrPH6tzWlJdBd2q2J1z_oJAkGrtvrl6o';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFrPH6tzWlJdBd2q2J1z_oJAkGrtvrl6o'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err.message);
                dispatch(authFail(err));
            });
    };
};