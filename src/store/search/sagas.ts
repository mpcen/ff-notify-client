import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { FetchSearchedPlayerNewsActionTypes } from './types';
import {
    fetchSearchedPlayerNews,
    fetchSearchedPlayerNewsSuccess,
    fetchSearchedPlayerNewsFail,
    refetchSearchedPlayerNews,
    refetchSearchedPlayerNewsSuccess,
    refetchSearchedPlayerNewsFail
} from './actions';
import { callApi } from '../../api';

// FETCH SEARCHED PLAYER NEWS
function* watchFetchSearchedPlayerNews() {
    yield takeLatest(
        FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS,
        handleFetchSearchedPlayerNews
    );
}

function* handleFetchSearchedPlayerNews({ payload }: ReturnType<typeof fetchSearchedPlayerNews>) {
    const { page, playerId } = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        // This will eventually need to be smarter to handle more complicated queryStrings
        const playerIdQueryString = playerId ? `&playerId=${playerId}` : '';
        const res = yield call(callApi, 'GET', `recentPlayerNews?page=${page}${playerIdQueryString}`, token);

        yield put(fetchSearchedPlayerNewsSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchSearchedPlayerNewsFail(err.stack!));
        } else {
            yield put(fetchSearchedPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// REFETCH SEARCHED PLAYER NEWS
function* watchRefetchSearchedPlayerNews() {
    yield takeLatest(
        FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS,
        handleRefetchSearchedPlayerNews
    );
}

function* handleRefetchSearchedPlayerNews({ payload }: ReturnType<typeof refetchSearchedPlayerNews>) {
    const playerId = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'GET', `recentPlayerNews?page=1&playerId=${playerId}`, token);

        yield put(refetchSearchedPlayerNewsSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(refetchSearchedPlayerNewsFail(err.stack!));
        } else {
            yield put(refetchSearchedPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

export function* searchSaga() {
    yield all([fork(watchFetchSearchedPlayerNews), fork(watchRefetchSearchedPlayerNews)]);
}
