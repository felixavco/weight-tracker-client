import { GET_USERS, GET_USER } from '../types';

const initialState = {
    list: [],
    single: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_USERS:
            return {
                ...state,
                list: action.payload
            }


        case GET_USER:
            return {
                ...state,
                single: action.payload
            }

        default:
            return state
    }
}
