import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { SignInActionTypes, SignOutActionTypes, SignUpActionTypes, IUser } from './types';
import { signUp, signUpSuccess, signUpFail } from './actions';
import { callApi } from '../../api';

function* watchSignUp() {
    yield takeLatest(SignUpActionTypes.SIGN_UP, handleSignUp);
}

function* handleSignUp({ payload }: ReturnType<typeof signUp>) {
    try {
        const res = yield call(callApi, 'POST', 'signup', payload);

        if (res.error) {
            yield put(signUpFail(res.error));
        } else {
            yield put(signUpSuccess(res));
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
