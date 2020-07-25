import React, { useEffect, useState } from 'react';
import { loadAndInitializeGoogleAuthApi, getAuthorizationCode } from '../helpers/googleApi';
import { doAuthentication } from '../actions/auth';

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
        doAuthentication();
    };

    const button = authLoaded ? <button onClick={redirectToLogin}>Log in with Google</button> : null;

    return button;
}

export default GoogleLoginButton;
