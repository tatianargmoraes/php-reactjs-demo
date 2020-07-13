export const BLANK_USER = {
    name: null,
    email: null,
    authenticated: false,
};

export default {
    auth: {
        inProcess: false,
        user: BLANK_USER,
        error: null,
    }
};