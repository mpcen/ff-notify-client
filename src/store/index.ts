import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { timelineSaga } from './timeline/sagas';
import { playerSearchSaga } from './playerSearch/sagas';

import { timelineReducer, ITimelineState } from './timeline/reducer';
import { playerSearchReducer, IPlayerSearchState } from './playerSearch/reducer';

export interface AppState {
    readonly timeline: ITimelineState;
    readonly playerSearch: IPlayerSearchState;
}

export const rootReducer = combineReducers<AppState>({
    timeline: timelineReducer,
    playerSearch: playerSearchReducer
});

export function* rootSaga() {
    yield all([fork(timelineSaga), fork(playerSearchSaga)]);
}
