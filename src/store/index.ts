import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { timelineSaga } from './timeline/sagas';
import { playerSettingsSaga } from './playerSettings/sagas';
import { userSaga } from './user/sagas';

import { SignOutActionTypes } from './user/types';
import { timelineReducer, ITimelineState } from './timeline/reducer';
import { playerSettingsReducer } from './playerSettings/reducer';
import { userReducer } from './user/reducer';
import { IUserState } from './user/types';
import { ITrackedPlayerPanelState } from './trackedPlayerPanel/types';
import { trackedPlayerPanelReducer } from './trackedPlayerPanel/reducers';
import { IPlayerSettingsState } from './playerSettings/types';

export interface AppState {
    readonly timeline: ITimelineState;
    readonly playerSettings: IPlayerSettingsState;
    readonly user: IUserState;
    readonly trackedPlayerPanel: ITrackedPlayerPanelState;
}

const appReducer = combineReducers<AppState>({
    timeline: timelineReducer,
    playerSettings: playerSettingsReducer,
    user: userReducer,
    trackedPlayerPanel: trackedPlayerPanelReducer
});

export const rootReducer = (state: AppState, action: any) => {
    if (action.type === SignOutActionTypes.SIGN_OUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};

export function* rootSaga() {
    yield all([fork(timelineSaga), fork(playerSettingsSaga), fork(userSaga)]);
}
