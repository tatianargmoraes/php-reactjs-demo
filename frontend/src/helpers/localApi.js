import axios from 'axios';
import { endpoints } from '../constants';

export const authenticateWithAutorizationCode = function (code) {
    const headers = { 'X-Requested-With': 'XMLHttpRequest' };
    axios.post(endpoints.AUTHENTICATE, { code }, { headers })
    // TODO Return a promise here, so it can be used with redux actions
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}