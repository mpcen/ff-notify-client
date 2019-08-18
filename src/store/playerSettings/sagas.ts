import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FetchPlayersActionTypes } from './types';
import { fetchPlayersSuccess, fetchPlayersFail } from './actions';
import { callApi } from '../../api';

const API_URL = 'https://ff-notify-api.herokuapp.com';

function* watchFetchPlayers() {
    yield takeEvery(FetchPlayersActionTypes.FETCH_PLAYERS, handleFetchPlayers);
}

function* handleFetchPlayers() {
    try {
        const res = yield call(callApi, 'GET', `${API_URL}/players`);

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
