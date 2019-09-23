import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { IUserState } from './types';

const initialState: IUserState = {
    isSignedIn: false,
    user: null
};

const reducer: Reducer<IUserState, Action> = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export { reducer as userReducer };
