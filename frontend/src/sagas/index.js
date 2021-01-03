import * as actions from '../actions/index';
import { all, put, takeLatest } from 'redux-saga/effects';
import { DO_AUTHENTICATION } from '../actions/actionTypes';
import { getAuthorizationCode } from '../helpers/googleApi'
import { authenticateWithAutorizationCode } from '../helpers/localApi';

function* executeAuthProcess() {
    yield put(actions.startAuthentication());
    let code = null;

    try {
        const response = yield getAuthorizationCode();
        code = response.code;
    } catch (error) {
        console.log('error getting authorization code', error);
        yield put(actions.comunicateAuthenticationError('unknown error'));
        return;
    }

    try {
        const response = yield authenticateWithAutorizationCode(code);
        const { email, name } = response;
        yield put(actions.finalizeAuthentication(name, email));
    } catch (error) {
        console.log('failure!!!' + JSON.stringify(error));
        const { message } = error;
        yield put(actions.comunicateAuthenticationError(message));
    }
}

function* watchDoAuthentication() {
    yield takeLatest(DO_AUTHENTICATION, executeAuthProcess);
}

export default function* rootSaga() {
    yield all([
        watchDoAuthentication()
    ]);
}