import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayersActionTypes, TrackPlayerActionTypes } from './types';
import {
    fetchPlayersSuccess,
    fetchPlayersFail,
    trackPlayer,
    trackPlayerFail,
    trackPlayerSuccess,
    fetchTrackedPlayersFail,
    fetchTrackedPlayersSuccess,
    untrackPlayer,
    untrackPlayerFail,
    untrackPlayerSuccess
} from './actions';
import { callApi } from '../../api';

function* watchFetchPlayers() {
    yield takeEvery(FetchPlayersActionTypes.FETCH_PLAYERS, handleFetchPlayers);
}

function* handleFetchPlayers() {
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'GET', 'players', token);

        if (res.error) {
            yield put(fetchPlayersFail(res.error));
        } else {
            yield put(fetchPlayersSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchPlayersFail(err.stack!));
        } else {
            yield put(fetchPlayersFail('An unknown error occured.'));
        }
    }
}

function* watchTrackPlayer() {
    yield takeEvery(TrackPlayerActionTypes.TRACK_PLAYER, handleTrackPlayer);
}

function* handleTrackPlayer({ payload }: ReturnType<typeof trackPlayer>) {
    try {
        const playerId = payload;
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'POST', 'trackedplayers', token, { playerId });

        if (res.error) {
            yield put(trackPlayerFail(res.error));
        } else {
            yield put(trackPlayerSuccess(res));
        }
    } catch (err) {
        yield put(trackPlayerFail('Error when trying to track a player'));
    }
}

function* watchFetchTrackedPlayers() {
    yield takeEvery(TrackPlayerActionTypes.FETCH_TRACKED_PLAYERS, handleFetchTrackedPlayers);
}

function* handleFetchTrackedPlayers() {
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'GET', 'trackedplayers', token);

        if (res.error) {
            yield put(fetchTrackedPlayersFail(res.error));
        } else {
            yield put(fetchTrackedPlayersSuccess(res));
        }
    } catch (err) {
        yield put(fetchTrackedPlayersFail('Error when trying to fetch tracked players'));
    }
}

function* watchUntrackPlayer() {
    yield takeEvery(TrackPlayerActionTypes.UNTRACK_PLAYER, handleUntrackPlayer);
}

function* handleUntrackPlayer({ payload }: ReturnType<typeof untrackPlayer>) {
    try {
        const playerId = payload;
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'DELETE', 'trackedplayers', token, { playerId });

        if (res.error) {
            yield put(untrackPlayerFail(res.error));
        } else {
            yield put(untrackPlayerSuccess(res));
        }
    } catch (err) {
        yield put(untrackPlayerFail('Error when trying to untrack player'));
    }
}

export function* playerSettingsSaga() {
    yield all([
        fork(watchFetchPlayers),
        fork(watchTrackPlayer),
        fork(watchFetchTrackedPlayers),
        fork(watchUntrackPlayer)
    ]);
}
