import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { validate } from 'email-validator';

import { validatePassword } from '../../util/validatePassword';
import { callApi } from '../../api';
import { NAVROUTES } from '../../navigator/navRoutes';
import { fetchPlayers } from '../playerSettings/actions';
import { navigate } from '../../navigator/navigationRef';
import {
    SignUpActionTypes,
    SignInActionTypes,
    SignOutActionTypes,
    UserPreferencesActionTypes,
    InitializeActionTypes
} from './types';
import {
    signUp,
    signUpSuccess,
    signUpFail,
    signInSuccess,
    signInFail,
    signIn,
    signOutSuccess,
    signOutFail,
    fetchUserPreferencesSuccess,
    fetchUserPreferencesFail,
    fetchUserPreferences,
    initializeFail,
    initializeSuccess,
    resetUser
} from './actions';

// SIGN UP
function* watchSignUp() {
    yield takeLatest(SignUpActionTypes.SIGN_UP, handleSignUp);
}

function* handleSignUp({ payload }: ReturnType<typeof signUp>) {
    const validEmail = validate(payload.email);
    const validPassword = validatePassword(payload.password);

    if (!validEmail) {
        return yield put(signInFail('Invalid email'));
    }

    if (!validPassword) {
        return yield put(signInFail('Password must be at least 8 characters'));
    }

    if (payload.password !== payload.passwordConfirm) {
        return yield put(signInFail('Passwords do not match'));
    }

    try {
        const res = yield call(callApi, 'POST', 'signup', null, payload);
        const { token, email } = res;

        if (res.error) {
            yield put(signUpFail(res.error));
        } else {
            yield call(AsyncStorage.setItem, 'persource-auth-token', token);
            yield put(signUpSuccess(token, email));
            yield put(fetchPlayers());

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
    const validEmail = validate(payload.email);
    const validPassword = validatePassword(payload.password);

    if (!validEmail) {
        return yield put(signInFail('Invalid email'));
    }

    if (!validPassword) {
        return yield put(signInFail('Invalid password'));
    }

    try {
        const res = yield call(callApi, 'POST', 'signin', null, payload);
        const { token, email } = res;

        if (res.error) {
            yield put(signInFail('Invalid email or password'));
        } else {
            yield call(AsyncStorage.setItem, 'persource-auth-token', token);
            yield put(signInSuccess(token, email));

            navigate(NAVROUTES.ResolveAuth);
        }
    } catch (err) {
        yield put(signInFail('Invalid email or password'));
    }
}

// SIGN OUT
function* watchSignOut() {
    yield takeLatest(SignOutActionTypes.SIGN_OUT, handleSignOut);
}

function* handleSignOut() {
    try {
        yield call(AsyncStorage.removeItem, 'persource-auth-token');
        yield put(signOutSuccess());

        navigate(NAVROUTES.LogInStack);

        yield put(resetUser());
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
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
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

// INITIALIZE
function* watchInitialize() {
    yield takeEvery(InitializeActionTypes.INITIALIZE, handleInitialize);
}

function* handleInitialize() {
    try {
        yield put(fetchUserPreferences());
        yield put(fetchPlayers());
        yield put(initializeSuccess());
    } catch (err) {
        if (err instanceof Error) {
            yield put(initializeFail(err.stack!));
        } else {
            yield put(initializeFail('An unknown error occurred.'));
        }
    }
}

export function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchSignIn),
        fork(watchSignOut),
        fork(watchFetchUserPreferences),
        fork(watchInitialize)
    ]);
}
