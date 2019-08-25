import { GET_ERRORS } from '../types';

const initialState = {
    errors: ''
}

export default (state = initialState, action) => {

    switch (action.type) {

        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload.error
            }

        default:
            return state
    }

}