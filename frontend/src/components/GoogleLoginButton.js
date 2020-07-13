import React, { useEffect, useState } from 'react';
import { loadAndInitializeGoogleAuthApi, getAuthorizationCode } from '../helpers/googleApi';
import { authenticateWithAutorizationCode } from '../helpers/localApi';

function GoogleLoginButton() {
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        const onSuccess = () => setAuthLoaded(true);

        const onError = (error) => {
            console.log('Something went wrong when initializing Google auth component!', error);
        }
        
        loadAndInitializeGoogleAuthApi(onSuccess, onError);
    }, []);

    const redirectToLogin = function () {
        getAuthorizationCode().then(
            response => {
                const { code } = response;
                authenticateWithAutorizationCode(code);
            },
            error => console.log('Something went wrong when Google auth was invoked!', error)
        )
    };

    const button = authLoaded ? <button onClick={redirectToLogin}>Log in with Google</button> : null;

    return button;
}

export default GoogleLoginButton;
