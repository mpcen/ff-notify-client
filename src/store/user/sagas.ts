import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { navigate } from '../../navigationRef';
import { SignUpActionTypes } from './types';
import { signUp, signUpSuccess, signUpFail } from './actions';
import { callApi } from '../../api';
import { NAVROUTES } from '../../navigator';

function* watchSignUp() {
    yield takeLatest(SignUpActionTypes.SIGN_UP, handleSignUp);
}

function* handleSignUp({ payload }: ReturnType<typeof signUp>) {
    try {
        const res = yield call(callApi, 'POST', 'signup', payload);

        if (res.error) {
            yield put(signUpFail(res.error));
        } else {
            yield call(AsyncStorage.setItem, 'token', res.token);
            yield put(signUpSuccess(res));
            navigate(NAVROUTES.Timeline);
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(signUpFail(err.stack));
        } else {
            yield put(signUpFail('An unknown error occurred.'));
        }
    }
}

export function* userSaga() {
    yield all([fork(watchSignUp)]);
}
