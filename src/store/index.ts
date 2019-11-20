import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { timelineSaga } from './timeline/sagas';
import { playersSaga } from './players/sagas';
import { userSaga } from './user/sagas';
import { searchSaga } from './search/sagas';

import { timelineReducer, ITimelineState } from './timeline/reducer';
import { playersReducer } from './players/reducer';
import { userReducer } from './user/reducer';
import { IUserState } from './user/types';
import { ITrackedPlayerPanelState } from './tracking/types';
import { trackedPlayerPanelReducer } from './tracking/reducers';
import { IPlayersState } from './players/types';
import { searchReducer, ISearchState } from './search/reducers';

export interface AppState {
    readonly timeline: ITimelineState;
    readonly search: ISearchState;
    readonly players: IPlayersState;
    readonly user: IUserState;
    readonly trackedPlayerPanel: ITrackedPlayerPanelState;
}

export const rootReducer = combineReducers<AppState>({
    timeline: timelineReducer,
    search: searchReducer,
    players: playersReducer,
    user: userReducer,
    trackedPlayerPanel: trackedPlayerPanelReducer
});

export function* rootSaga() {
    yield all([fork(timelineSaga), fork(searchSaga), fork(playersSaga), fork(userSaga)]);
}
