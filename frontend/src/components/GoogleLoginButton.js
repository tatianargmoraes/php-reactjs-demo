import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GoogleLoginButton() {
    const [authLoaded, setAuthLoaded] = useState(false);

    const initializeGoogleAuthApi = function () {
        window.gapi.load('auth2', () => {
            const googleAuthComponent = window.gapi.auth2.getAuthInstance();
            if (!googleAuthComponent) {
                const params = {
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    access_type: 'offline'
                };
                window.gapi.auth2.init(params).then(
                    response => {
                        console.log('Google auth component initialized:', response);
                        setAuthLoaded(true);
                    },
                    error => console.log('Something went wrong when initializing Google auth component!', error));
            }
        });
    };

    const loadGoogleApiScript = function () {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleAuthApi;

        const meta = document.createElement("meta");
        meta.name = "google-signin-client_id";
        meta.content = "%REACT_APP_GOOGLE_ID_OF_WEB_CLIENT%";

        document.head.appendChild(meta);
        document.head.appendChild(script);
    };

    useEffect(() => {
        loadGoogleApiScript();
    }, []);

    const redirectToLogin = function () {
        const googleAuthComponent = window.gapi.auth2.getAuthInstance();
        googleAuthComponent.grantOfflineAccess()
        .then(
            response => {
                const { code } = response;
                const headers = {'X-Requested-With': 'XMLHttpRequest'};
                axios.post('http://localhost:3080/api/complete-auth', { code }, { headers })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            error => console.log('Something went wrong when Google auth was invoked!', error)
        )
    };

    const button = authLoaded ? <button onClick={redirectToLogin}>Log in with Google</button> : null;

    return button;
}

export default GoogleLoginButton;
