import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadAndInitializeGoogleAuthApi } from '../helpers/googleApi';
import { triggerAuthenticationProcess } from '../actions/auth';

function GoogleLoginButton(props) {
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        const onSuccess = () => setAuthLoaded(true);

        const onError = (error) => {
            console.log('Something went wrong when initializing Google auth component!', error);
        }
        
        loadAndInitializeGoogleAuthApi(onSuccess, onError);
    }, []);

    return authLoaded && <button onClick={props.doAuthentication}>Log in with Google</button>;
}

const mapDispatchToProps = dispatch => ({
    doAuthentication: () => dispatch(triggerAuthenticationProcess()),
});

export default connect(null, mapDispatchToProps)(GoogleLoginButton);
