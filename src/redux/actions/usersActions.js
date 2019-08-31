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

export const insertWeight = ({ weight, id }) => (dispatch) => {
    axios
        .put(url(`/${id}/insert`), { weight })
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

export const removeWeight = ({ id, reg_id }) => (dispatch) => {
    axios
        .put(url(`/${id}/remove`), { reg_id })
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

export const deleteUser = (id, history) => (dispatch) => {
    axios
        .delete(url(`/${id}`))
        .then(() => {
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}


export const editUser = (id, data ) => (dispatch) => {
    axios
        .put(url(`/${id}`), data)
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

export const createUser = (user, history) => (dispatch) => {
    axios
        .post(url('/register'), user)
        .then(() => {
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
