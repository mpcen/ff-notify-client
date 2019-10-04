import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';
import { ITrackedPlayerPanelState, TrackedPlayerPanelActionTypes } from './types';

type Action = ActionType<typeof Actions>;

const initialState: ITrackedPlayerPanelState = {
    selectedPlayerIndex: 0
};

const reducer: Reducer<ITrackedPlayerPanelState, Action> = (state = initialState, action) => {
    switch (action.type) {
        // FETCH PLAYERS
        case TrackedPlayerPanelActionTypes.SELECT_PLAYER:
            return {
                selectedPlayerIndex: action.payload
            };

        default:
            return state;
    }
};

export { reducer as trackedPlayerPanelReducer };
