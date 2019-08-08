import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { timelineSaga } from './timeline/sagas';

import { timelineReducer, ITimelineState } from './timeline/reducer';

export interface AppState {
    readonly timeline: ITimelineState;
}

export const rootReducer = combineReducers<AppState>({
    timeline: timelineReducer
});

export function* rootSaga() {
    yield all([fork(timelineSaga)]);
}
