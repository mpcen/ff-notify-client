import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as TrackedPlayerPanelActions from './actions';
import * as UserActions from '../user/actions';
import { RESET_USER } from '../user/types';
import { ITrackedPlayerPanelState, TrackedPlayerPanelActionTypes } from './types';

type Action = ActionType<typeof TrackedPlayerPanelActions & typeof UserActions>;

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

        case RESET_USER:
            return initialState;

        default:
            return state;
    }
};

export { reducer as trackedPlayerPanelReducer };
