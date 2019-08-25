import axios from 'axios';

const host = 'https://7000-f89540f2-fbd8-454f-8c18-44e059204e9c.ws-us0.gitpod.io'

// export const url = path => `http://localhost:7000/api/user${path}`;
export const url = path => `${host}/api/user${path}`;


export const isEmpty = value => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export const removeDuplicates = arr => {
    //* Removing duplicate objects from list
    const seen = new Set();
    const filteredList = arr.filter(el => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
    });

    return filteredList
}


export const setAuthToken = token => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}