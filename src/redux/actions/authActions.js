import { SET_CURRENT_USER, GET_ERRORS } from '../types';
import axios from 'axios';
import { url, setAuthToken } from '../../utils';
import jwt_decode from 'jwt-decode';

export const login = (userData) => (dispatch) => {
    axios
        .post(url('/login'), userData)
        .then(res => {
            //Save to Local Storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            //Set token to Auth header
            setAuthToken(token);
            //Decode token to get user Data
            const decodedUser = jwt_decode(token);
            //Set Current user
            dispatch(setCurrentUser(decodedUser));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

//Set logged user
export const setCurrentUser = (userData) => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    };
};

export const logoutUser = () => (dispatch) => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove Auth header for future request
    setAuthToken(false);
    // Set current user to {} this will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}

export const clearCurrentProfile = () => (dispatch) => {
    dispatch(setCurrentUser({}));
}

