import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { timelineSaga } from './timeline/sagas';
import { playerSearchSaga } from './playerSettings/sagas';

import { timelineReducer, ITimelineState } from './timeline/reducer';
import { playerSettingsReducer, IPlayerSettingsState } from './playerSettings/reducer';

export interface AppState {
    readonly timeline: ITimelineState;
    readonly playerSettings: IPlayerSettingsState;
}

export const rootReducer = combineReducers<AppState>({
    timeline: timelineReducer,
    playerSettings: playerSettingsReducer
});

export function* rootSaga() {
    yield all([fork(timelineSaga), fork(playerSearchSaga)]);
}
