import * as type from './actionTypes';
import { BLANK_USER } from '../reducers/initialState';

export const startAuthentication = () => {
    return {
        type: type.AUTH_REQUESTED,
        inProcess: true,
    }
}

export const finalizeAuthentication = (userName, userEmail) => {
    return {
        type: type.AUTH_SUCCEEDED,
        inProcess: false,
        error: null,
        user: {
            name: userName,
            email: userEmail,
            authenticated: true,
        },
    }
}

export const comunicateAuthenticationError = (errorMessage) => {
    return {
        type: type.AUTH_FAILED,
        inProcess: false,
        error: errorMessage,
        user: BLANK_USER,
    }
}

export const doAuthentication = () => {
    // backend should be called here
    /*
     * return function (dispatch, getState) {
     * 
     * }
     */
}