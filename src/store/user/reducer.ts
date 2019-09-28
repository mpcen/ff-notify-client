import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { IUserState, SignUpActionTypes, SignInActionTypes } from './types';

const initialState: IUserState = {
    token: null,
    user: null,
    errorMessage: ''
};

const reducer: Reducer<IUserState, Action> = (state = initialState, action) => {
    switch (action.type) {
        case SignUpActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                errorMessage: '',
                token: action.payload
            };

        case SignUpActionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                errorMessage: 'Error signing up',
                token: null
            };

        case SignInActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                errorMessage: '',
                token: action.payload
            };

        case SignInActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                errorMessage: 'Invalid username or password',
                token: null
            };
        default:
            return state;
    }
};

export { reducer as userReducer };
