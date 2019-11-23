import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { FetchSearchedPlayerNewsActionTypes } from './types';
import {
    fetchSearchedPlayerNews,
    fetchSearchedPlayerNewsSuccess,
    fetchSearchedPlayerNewsFail
} from './actions';
import { callApi } from '../../api';
import { NewsType } from '../timeline/types';

// FETCH SEARCHED PLAYER NEWS
function* watchFetchSearchedPlayerNews() {
    yield takeLatest(
        FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS,
        handleFetchSearchedPlayerNews
    );
}

function* handleFetchSearchedPlayerNews({ payload }: ReturnType<typeof fetchSearchedPlayerNews>) {
    const { page, playerId, fresh } = payload;

    try {
        const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
        const res = yield call(
            callApi,
            'GET',
            `playerNews?page=${page}&playerId=${playerId}&newsType=${NewsType.Individual}`,
            token
        );

        yield put(fetchSearchedPlayerNewsSuccess(res, fresh));
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchSearchedPlayerNewsFail(err.stack!));
        } else {
            yield put(fetchSearchedPlayerNewsFail('An unknown error occurred.'));
        }
    }
}

// // REFETCH SEARCHED PLAYER NEWS
// function* watchRefetchSearchedPlayerNews() {
//     yield takeLatest(
//         FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS,
//         handleRefetchSearchedPlayerNews
//     );
// }

// function* handleRefetchSearchedPlayerNews({ payload }: ReturnType<typeof refetchSearchedPlayerNews>) {
//     const playerId = payload;

//     try {
//         const token = yield call(AsyncStorage.getItem, 'persource-auth-token');
//         const res = yield call(callApi, 'GET', `recentPlayerNews?page=1&playerId=${playerId}`, token);

//         yield put(refetchSearchedPlayerNewsSuccess(res));
//     } catch (err) {
//         if (err instanceof Error) {
//             yield put(refetchSearchedPlayerNewsFail(err.stack!));
//         } else {
//             yield put(refetchSearchedPlayerNewsFail('An unknown error occurred.'));
//         }
//     }
// }

export function* searchSaga() {
    yield all([fork(watchFetchSearchedPlayerNews)]);
}
