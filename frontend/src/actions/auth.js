import * as type from './actionTypes';
import { BLANK_USER } from '../reducers/initialState';
import { authenticateWithAutorizationCode } from '../helpers/localApi';

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
    return function (dispatch) {
        dispatch(startAuthentication());

        getAuthorizationCode().then(
            response => {
                const { code } = response;
                authenticateWithAutorizationCode(code, onAuthSuccess, onAuthFail)
                .then(response => {
                    const { email, name } = response;
                    dispatch(finalizeAuthentication(name, email));
                })
                .catch(error => {
                    const { message } = error;
                    dispatch(comunicateAuthenticationError(message));
                });
            }
        ).catch(error => {
            console.log('error getting code', error);
            dispatch(comunicateAuthenticationError('unknown error'));
        });
    }
}