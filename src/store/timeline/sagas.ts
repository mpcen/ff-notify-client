import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayerNewsActionTypes, SortTimelineByActionTypes, TimelineSortType } from './types';
import {
    fetchPlayerNewsSuccess,
    fetchPlayerNewsFail,
    fetchPlayerNews,
    sortTimelineBy,
    sortTimelineBySuccess,
    sortTimelineByFail,
    refetchPlayerNews,
    refetchPlayerNewsSuccess,
    refetchPlayerNewsFail,
    fetchAllPlayerNewsSuccess,
    fetchAllPlayerNewsFail,
    refetchAllPlayerNewsSuccess,
    refetchAllPlayerNewsFail
} from './actions';
import { callApi } from '../../api';
import { fetchUserPreferencesSuccess } from '../user/actions';

// FETCH ALL PLAYER NEWS
function* watchFetchAllPlayerNews() {
    yield takeLatest(FetchPlayerNewsActionTypes.FETCH_ALL_PLAYER_NEWS, handleFetchAllPlayerNews);
}

function* handleFetchAllPlayerNews({ payload }: ReturnType<typeof fetchPlayerNews>) {
    const { page } = payload;
    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'GET', `allPlayerNews?page=${page}`, token);

        yield put(fetchAllPlayerNewsSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchAllPlayerNewsFail(err.stack!));
        } else {
            yield put(fetchAllPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// REFETCH ALL PLAYER NEWS
function* watchRefetchAllPlayerNews() {
    yield takeLatest(FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS, handleRefetchAllPlayerNews);
}

function* handleRefetchAllPlayerNews() {
    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'GET', `allPlayerNews?page=1`, token);

        yield put(refetchAllPlayerNewsSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(refetchAllPlayerNewsFail(err.stack!));
        } else {
            yield put(refetchAllPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// FETCH TRACKED PLAYER NEWS
function* watchFetchPlayerNews() {
    yield takeLatest(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, handleFetchPlayerNews);
}

function* handleFetchPlayerNews({ payload }: ReturnType<typeof fetchPlayerNews>) {
    const { page, playerId } = payload;
    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
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

// REFETCH TRACKED PLAYER NEWS
function* watchRefetchPlayerNews() {
    yield takeLatest(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS, handleRefetchPlayerNews);
}

function* handleRefetchPlayerNews({ payload }: ReturnType<typeof refetchPlayerNews>) {
    const playerId = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
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
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'PUT', 'userPreferences', token, { timelineSortType: payload });

        yield put(sortTimelineBySuccess(res.timelineSortType));
        yield put(fetchUserPreferencesSuccess(res));

        if (payload !== TimelineSortType.All) {
            yield put(refetchPlayerNews(res.trackedPlayers[0]));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(sortTimelineByFail(err.stack!));
        } else {
            yield put(sortTimelineByFail('An unknown error occurred.'));
        }
    }
}

export function* timelineSaga() {
    yield all([
        fork(watchFetchPlayerNews),
        fork(watchSortTimelineBy),
        fork(watchRefetchPlayerNews),
        fork(watchFetchAllPlayerNews),
        fork(watchRefetchAllPlayerNews)
    ]);
}
