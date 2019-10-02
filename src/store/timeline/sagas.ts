import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayerNewsActionTypes } from './types';
import { fetchPlayerNewsSuccess, fetchPlayerNewsFail } from './actions';
import { callApi } from '../../api';
import { TimelineSortType } from './reducer';

function* watchFetchPlayerNews() {
    yield takeEvery(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, handleFetchPlayerNews);
}

function* handleFetchPlayerNews() {
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const { timeline } = yield select();

        if (timeline.timelineSortType === TimelineSortType.Date) {
            const res = yield call(callApi, 'GET', 'recentPlayerNewsByDate', token);

            yield put(fetchPlayerNewsSuccess(res));
        } else if (timeline.timelineSortType === TimelineSortType.Player) {
            const res = yield call(callApi, 'GET', 'recentPlayerNewsByPlayer', token);

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
