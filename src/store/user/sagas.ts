import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { navigate } from '../../navigator/navigationRef';
import { SignUpActionTypes, SignInActionTypes, SignOutActionTypes, UserPreferencesActionTypes } from './types';
import {
    signUp,
    signUpSuccess,
    signUpFail,
    signInSuccess,
    signInFail,
    signIn,
    signOutSuccess,
    signOutFail,
    fetchUserPreferences,
    fetchUserPreferencesSuccess,
    fetchUserPreferencesFail
} from './actions';
import { callApi } from '../../api';
import { NAVROUTES } from '../../navigator/navRoutes';

// SIGN UP
function* watchSignUp() {
    yield takeLatest(SignUpActionTypes.SIGN_UP, handleSignUp);
}

function* handleSignUp({ payload }: ReturnType<typeof signUp>) {
    try {
        const res = yield call(callApi, 'POST', 'signup', null, payload);

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

// SIGN IN
function* watchSignIn() {
    yield takeLatest(SignInActionTypes.SIGN_IN, handleSignIn);
}

function* handleSignIn({ payload }: ReturnType<typeof signIn>) {
    try {
        const res = yield call(callApi, 'POST', 'signin', null, payload);

        if (res.error) {
            yield put(signInFail(res.error));
        } else {
            yield call(AsyncStorage.setItem, 'token', res.token);
            yield put(signInSuccess(res));

            navigate(NAVROUTES.ResolveAuth);
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(signInFail(err.stack));
        } else {
            yield put(signInFail('Invalid username or password'));
        }
    }
}

// SIGN OUT
function* watchSignOut() {
    yield takeLatest(SignOutActionTypes.SIGN_OUT, handleSignOut);
}

function* handleSignOut() {
    try {
        yield call(AsyncStorage.removeItem, 'token');
        yield put(signOutSuccess());

        navigate(NAVROUTES.LogInStack);
    } catch (err) {
        yield put(signOutFail('Error signing out'));
    }
}

// FETCH USER PREFERENCES
function* watchFetchUserPreferences() {
    yield takeEvery(UserPreferencesActionTypes.FETCH_USER_PREFERENCES, handleFetchUserPreferences);
}

function* handleFetchUserPreferences() {
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'GET', `userPreferences`, token);

        yield put(fetchUserPreferencesSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchUserPreferencesFail(err.stack!));
        } else {
            yield put(fetchUserPreferencesFail('An unknown error occurred.'));
        }
    }
}

export function* userSaga() {
    yield all([fork(watchSignUp), fork(watchSignIn), fork(watchSignOut), fork(watchFetchUserPreferences)]);
}
