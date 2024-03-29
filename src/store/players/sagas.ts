import { all, call, fork, put, takeEvery, select, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayerMap, IPlayer } from './types';
import {
    fetchPlayersSuccess,
    fetchPlayersFail,
    trackPlayer,
    trackPlayerSuccess,
    trackPlayerFail,
    untrackPlayer,
    untrackPlayerFail,
    untrackPlayerSuccess,
    reorderTrackedPlayers,
    reorderTrackedPlayersFail,
    reorderTrackedPlayersSuccess
} from './actions';
import { callApi } from '../../api';
import { fetchUserPreferencesSuccess } from '../user/actions';
import { AppState } from '..';
import { selectPlayer } from '../tracking/actions';
import { NewsType } from '../timeline/types';
import { fetchPlayerNews } from '../timeline/actions';

// FETCH PLAYERS
function* watchFetchPlayers() {
    yield takeLatest(FetchPlayersActionTypes.FETCH_PLAYERS, handleFetchPlayers);
}

function* handleFetchPlayers() {
    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
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
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'POST', 'trackPlayer', token, { playerId });

        yield put(trackPlayerSuccess());

        if (res.error) {
            yield put(trackPlayerFail(res.error));
        } else {
            yield put(fetchUserPreferencesSuccess(res));

            const store: AppState = yield select();

            if (store.user.userPreferences.timelineSortType === NewsType.Individual) {
                yield put(fetchPlayerNews(1, playerId, NewsType.Individual));
            }
        }
    } catch (err) {
        yield put(trackPlayerFail('Error when trying to track a player'));
    }
}

// UNTRACK PLAYER
function* watchUntrackPlayer() {
    yield takeEvery(TrackPlayerActionTypes.UNTRACK_PLAYER, handleUntrackPlayer);
}

function* handleUntrackPlayer({ payload }: ReturnType<typeof untrackPlayer>) {
    try {
        const playerId = payload;
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'DELETE', 'trackedplayer', token, { playerId });

        if (res.error) {
            yield put(untrackPlayerFail(res.error));
        } else {
            const store: AppState = yield select();
            const currentSelectedPlayer =
                store.user.userPreferences.trackedPlayers[store.trackedPlayerPanel.selectedPlayerIndex];

            if (store.user.userPreferences.timelineSortType === NewsType.AllTracked) {
                yield put(fetchPlayerNews(1, '', NewsType.AllTracked, true));
            } else if (
                store.user.userPreferences.timelineSortType === NewsType.Individual &&
                currentSelectedPlayer === playerId
            ) {
                yield put(selectPlayer(0));
                yield put(
                    fetchPlayerNews(
                        1,
                        store.user.userPreferences.trackedPlayers[0],
                        NewsType.Individual,
                        true
                    )
                );
            }

            yield put(untrackPlayerSuccess());
            yield put(fetchUserPreferencesSuccess(res));
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
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(callApi, 'PUT', 'trackedplayers', token, reorderedTrackedPlayers);

        if (res.error) {
            yield put(reorderTrackedPlayersFail(res.error));
        } else {
            yield put(reorderTrackedPlayersSuccess());
            yield put(fetchUserPreferencesSuccess(res));
        }
    } catch (err) {
        yield put(reorderTrackedPlayersFail('Error when trying to reorder tracked players'));
    }
}

export function* playersSaga() {
    yield all([
        fork(watchFetchPlayers),
        fork(watchTrackPlayer),
        fork(watchUntrackPlayer),
        fork(watchReorderTrackedPlayers)
    ]);
}
