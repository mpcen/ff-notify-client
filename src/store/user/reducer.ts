import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { IUserState, SignUpActionTypes } from './types';

const initialState: IUserState = {
    token: null,
    user: null,
    errorMessage: '',
    message: ''
};

const reducer: Reducer<IUserState, Action> = (state = initialState, action) => {
    switch (action.type) {
        case SignUpActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                errorMessage: '',
                message: 'Signed in',
                token: action.payload
            };

        case SignUpActionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                errorMessage: 'Error signing up',
                message: '',
                token: null
            };
        default:
            return state;
    }
};

export { reducer as userReducer };
