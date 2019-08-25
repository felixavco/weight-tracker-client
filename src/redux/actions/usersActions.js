import { GET_USERS, GET_USER, GET_ERRORS } from '../types';
import axios from 'axios';
import { url } from '../../utils';


export const getUsers = () => (dispatch) => {
    axios
        .get(url('/'))
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getUser = (id) => (dispatch) => {
    axios
        .get(url(`/${id}`))
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}