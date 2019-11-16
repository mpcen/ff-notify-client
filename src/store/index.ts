import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { timelineSaga } from './timeline/sagas';
import { playerSettingsSaga } from './players/sagas';
import { userSaga } from './user/sagas';

import { SignOutActionTypes } from './user/types';
import { timelineReducer, ITimelineState } from './timeline/reducer';
import { playerSettingsReducer } from './players/reducer';
import { userReducer } from './user/reducer';
import { IUserState } from './user/types';
import { ITrackedPlayerPanelState } from './trackedPlayerPanel/types';
import { trackedPlayerPanelReducer } from './trackedPlayerPanel/reducers';
import { IPlayerSettingsState } from './players/types';

export interface AppState {
    readonly timeline: ITimelineState;
    readonly playerSettings: IPlayerSettingsState;
    readonly user: IUserState;
    readonly trackedPlayerPanel: ITrackedPlayerPanelState;
}

export const rootReducer = combineReducers<AppState>({
    timeline: timelineReducer,
    playerSettings: playerSettingsReducer,
    user: userReducer,
    trackedPlayerPanel: trackedPlayerPanelReducer
});

export function* rootSaga() {
    yield all([fork(timelineSaga), fork(playerSettingsSaga), fork(userSaga)]);
}
