/**
 * @callback callback
 */

/**
 * @callback handleError 
 * @param {object} error
 */

/**
 * Loads all the google api code and prepares the google auth helper object to be used.
 * @param {callback} callback 
 * @param {handleError} handleError 
 */
export const loadAndInitializeGoogleAuthApi = function (callback, handleError) {
    const executeWhenLoaded = () => initializeGoogleAuthApi(callback, handleError);
    loadGoogleApi(executeWhenLoaded);
};

function loadGoogleApi(executeWhenLoaded) {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = executeWhenLoaded;

    const meta = document.createElement("meta");
    meta.name = "google-signin-client_id";
    meta.content = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    document.head.appendChild(meta);
    document.head.appendChild(script);
};

function initializeGoogleAuthApi(callback, handleError) {
    window.gapi.load('auth2', () => {
        const googleAuthComponent = window.gapi.auth2.getAuthInstance();
        if (!googleAuthComponent) {
            const params = {
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                access_type: 'offline'
            };
            window.gapi.auth2.init(params).then(
                response => callback(),
                error => handleError(error)
            );
        }
    });
};

/**
 * Initiates the authentication process, presenting the google login modal with all the scopes
 * that are being requested.
 * @returns {Promise} This promise object represents the authorization code that will later be
 * exchanged for a token.
 */
export const getAuthorizationCode = () => {
    const googleAuthComponent = window.gapi.auth2.getAuthInstance();
    return googleAuthComponent.grantOfflineAccess();
}