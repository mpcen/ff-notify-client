import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayerMap, IPlayer } from './types';
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
    untrackPlayerSuccess,
    reorderTrackedPlayers,
    reorderTrackedPlayersFail,
    reorderTrackedPlayersSuccess
} from './actions';
import { callApi } from '../../api';
import { fetchPlayerNews } from '../timeline/actions';

// FETCH PLAYERS
function* watchFetchPlayers() {
    yield takeEvery(FetchPlayersActionTypes.FETCH_PLAYERS, handleFetchPlayers);
}

function* handleFetchPlayers() {
    try {
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'GET', 'players', token);
        const playerMap: IPlayerMap = {};

        res.forEach((player: IPlayer) => {
            playerMap[player.id] = player;
        });

        if (res.error) {
            yield put(fetchPlayersFail(res.error));
        } else {
            yield put(fetchPlayersSuccess(playerMap));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchPlayersFail(err.stack!));
        } else {
            yield put(fetchPlayersFail('An unknown error occured.'));
        }
    }
}

// TRACK PLAYER
function* watchTrackPlayer() {
    yield takeEvery(TrackPlayerActionTypes.TRACK_PLAYER, handleTrackPlayer);
}

function* handleTrackPlayer({ payload }: ReturnType<typeof trackPlayer>) {
    try {
        const playerId = payload;
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'POST', 'trackedPlayer', token, { playerId });

        if (res.error) {
            yield put(trackPlayerFail(res.error));
        } else {
            yield put(trackPlayerSuccess(res.playerId));
            yield put(fetchPlayerNews());
        }
    } catch (err) {
        yield put(trackPlayerFail('Error when trying to track a player'));
    }
}

// FETCH TRACKED PLAYERS
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
            yield put(fetchTrackedPlayersSuccess(res.trackedPlayersOrder));
        }
    } catch (err) {
        yield put(fetchTrackedPlayersFail('Error when trying to fetch tracked players'));
    }
}

// UNTRACK PLAYER
function* watchUntrackPlayer() {
    yield takeEvery(TrackPlayerActionTypes.UNTRACK_PLAYER, handleUntrackPlayer);
}

function* handleUntrackPlayer({ payload }: ReturnType<typeof untrackPlayer>) {
    try {
        const playerId = payload;
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'DELETE', 'trackedplayer', token, { playerId });

        if (res.error) {
            yield put(untrackPlayerFail(res.error));
        } else {
            yield put(untrackPlayerSuccess(res.playerId));
            yield put(fetchPlayerNews());
        }
    } catch (err) {
        yield put(untrackPlayerFail('Error when trying to untrack player'));
    }
}

// REORDER TRACKED PLAYERS
function* watchReorderTrackedPlayers() {
    yield takeEvery(TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS, handleReorderTrackedPlayers);
}

function* handleReorderTrackedPlayers({ payload }: ReturnType<typeof reorderTrackedPlayers>) {
    try {
        const reorderedTrackedPlayers = payload;
        const token = yield call(AsyncStorage.getItem, 'token');
        const res = yield call(callApi, 'PUT', 'trackedPlayersOrder', token, {
            trackedPlayersOrder: reorderedTrackedPlayers
        });

        if (res.error) {
            yield put(reorderTrackedPlayersFail(res.error));
        } else {
            yield put(reorderTrackedPlayersSuccess(res.trackedPlayersOrder));
            yield put(fetchPlayerNews());
        }
    } catch (err) {
        yield put(reorderTrackedPlayersFail('Error when trying to reorder tracked players'));
    }
}

export function* playerSettingsSaga() {
    yield all([
        fork(watchFetchPlayers),
        fork(watchTrackPlayer),
        fork(watchFetchTrackedPlayers),
        fork(watchUntrackPlayer),
        fork(watchReorderTrackedPlayers)
    ]);
}
