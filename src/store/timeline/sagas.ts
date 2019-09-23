import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FetchPlayerNewsActionTypes } from './types';
import { fetchPlayerNewsSuccess, fetchPlayerNewsFail } from './actions';
import { callApi } from '../../api';

function* watchFetchPlayerNews() {
    yield takeEvery(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, handleFetchPlayerNews);
}

function* handleFetchPlayerNews() {
    try {
        const res = yield call(callApi, 'GET', 'recentPlayerNews');

        if (res.error) {
            yield put(fetchPlayerNewsFail(res.error));
        } else {
            yield put(fetchPlayerNewsSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchPlayerNewsFail(err.stack!));
        } else {
            yield put(fetchPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

export function* timelineSaga() {
    yield all([fork(watchFetchPlayerNews)]);
}
