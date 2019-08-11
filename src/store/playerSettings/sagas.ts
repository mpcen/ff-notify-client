import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayer } from './types';
import { fetchPlayersSuccess, fetchPlayersFail, trackPlayer, untrackPlayer } from './actions';
import { callApi } from '../../api';

function* watchFetchPlayers() {
    yield takeEvery(FetchPlayersActionTypes.FETCH_PLAYERS, handleFetchPlayers);
}

function* handleFetchPlayers() {
    try {
        const res = yield call(callApi, 'GET', 'http://192.168.0.210:3000/players');

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

export function* playerSettingsSaga() {
    yield all([fork(watchFetchPlayers)]);
}
