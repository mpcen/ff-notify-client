import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayerNewsActionTypes, SortTimelineByActionTypes } from './types';
import {
    fetchPlayerNewsSuccess,
    fetchPlayerNewsFail,
    fetchPlayerNews,
    sortTimelineBy,
    sortTimelineBySuccess,
    sortTimelineByFail,
    refetchPlayerNews,
    refetchPlayerNewsSuccess,
    refetchPlayerNewsFail
} from './actions';
import { callApi } from '../../api';
import { fetchUserPreferences, fetchUserPreferencesSuccess } from '../user/actions';

// FETCH PLAYER NEWS
function* watchFetchPlayerNews() {
    yield takeEvery(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, handleFetchPlayerNews);
}

function* handleFetchPlayerNews({ payload }: ReturnType<typeof fetchPlayerNews>) {
    const { page, playerId } = payload;
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        // This will eventually need to be smarter to handle more complicated queryStrings
        const playerIdQueryString = playerId ? `&playerId=${playerId}` : '';
        const res = yield call(callApi, 'GET', `recentPlayerNews?page=${page}${playerIdQueryString}`, token);

        yield put(fetchPlayerNewsSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchPlayerNewsFail(err.stack!));
        } else {
            yield put(fetchPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// REFETCH PLAYER NEWS
function* watchRefetchPlayerNews() {
    yield takeEvery(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS, handleRefetchPlayerNews);
}

function* handleRefetchPlayerNews({ payload }: ReturnType<typeof refetchPlayerNews>) {
    const playerId = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'GET', `recentPlayerNews?page=1&playerId=${playerId}`, token);

        yield put(refetchPlayerNewsSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(refetchPlayerNewsFail(err.stack!));
        } else {
            yield put(refetchPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// SORT TIMELINE BY
function* watchSortTimelineBy() {
    yield takeEvery(SortTimelineByActionTypes.SORT_TIMELINE_BY, handleSortTimelineBy);
}

function* handleSortTimelineBy({ payload }: ReturnType<typeof sortTimelineBy>) {
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'PUT', 'userPreferences', token, { timelineSortType: payload });

        yield put(sortTimelineBySuccess(res.timelineSortType));
        yield put(fetchUserPreferencesSuccess(res));
        yield put(refetchPlayerNews(res.trackedPlayers[0]));
    } catch (err) {
        if (err instanceof Error) {
            yield put(sortTimelineByFail(err.stack!));
        } else {
            yield put(sortTimelineByFail('An unknown error occurred.'));
        }
    }
}

export function* timelineSaga() {
    yield all([fork(watchFetchPlayerNews), fork(watchSortTimelineBy), fork(watchRefetchPlayerNews)]);
}
