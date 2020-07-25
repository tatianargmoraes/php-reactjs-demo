import axios from 'axios';
import { endpoints } from '../constants';

/**
 * @param {string} code
 * @returns {Promise} The result of the authentication process in the backend.
 */
export const authenticateWithAutorizationCode = function (code) {
    const headers = { 'X-Requested-With': 'XMLHttpRequest' };
    return axios.post(endpoints.AUTHENTICATE, { code }, { headers });
}