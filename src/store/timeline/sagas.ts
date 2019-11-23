import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayerNewsActionTypes, SortTimelineByActionTypes, NewsType } from './types';
import {
    fetchPlayerNewsSuccess,
    fetchPlayerNewsFail,
    fetchPlayerNews,
    sortTimelineBy,
    sortTimelineBySuccess,
    sortTimelineByFail
} from './actions';
import { callApi } from '../../api';
import { fetchUserPreferencesSuccess } from '../user/actions';

// FETCH PLAYER NEWS
function* watchFetchPlayerNews() {
    yield takeLatest(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, handleFetchPlayerNews);
}

function* handleFetchPlayerNews({ payload }: ReturnType<typeof fetchPlayerNews>) {
    const { page, playerId, newsType, fresh } = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(
            callApi,
            'GET',
            `playerNews?playerId=${playerId}&page=${page}&newsType=${newsType}`,
            token
        );

        yield put(fetchPlayerNewsSuccess(res, fresh));
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchPlayerNewsFail(err.stack!));
        } else {
            yield put(fetchPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// SORT TIMELINE BY
function* watchSortTimelineBy() {
    yield takeLatest(SortTimelineByActionTypes.SORT_TIMELINE_BY, handleSortTimelineBy);
}

function* handleSortTimelineBy({ payload }: ReturnType<typeof sortTimelineBy>) {
    const newsType = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'PUT', 'userPreferences', token, { timelineSortType: newsType });

        yield put(sortTimelineBySuccess(res.timelineSortType));
        yield put(fetchUserPreferencesSuccess(res));

        // if (payload !== NewsType.All) {
        //     yield put(fetchPlayerNews(res.trackedPlayers[0]));
        // }
    } catch (err) {
        if (err instanceof Error) {
            yield put(sortTimelineByFail(err.stack!));
        } else {
            yield put(sortTimelineByFail('An unknown error occurred.'));
        }
    }
}

export function* timelineSaga() {
    yield all([fork(watchFetchPlayerNews), fork(watchSortTimelineBy)]);
}
