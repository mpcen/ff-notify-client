import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { IUserState, SignUpActionTypes, SignInActionTypes, RESET_USER, UserPreferencesActionTypes } from './types';
import { TimelineSortType } from '../timeline/types';

const initialState: IUserState = {
    token: null,
    loading: true,
    errorMessage: '',
    userPreferences: {
        timelineSortType: TimelineSortType.Date,
        trackedPlayers: [],
        userId: ''
    }
};

const reducer: Reducer<IUserState, Action> = (state = initialState, action) => {
    switch (action.type) {
        // SIGN UP
        case SignUpActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                token: action.payload
            };

        case SignUpActionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: 'Error signing up',
                token: null
            };

        // SIGN IN
        case SignInActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                token: action.payload
            };

        case SignInActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: 'Invalid username or password',
                token: null
            };

        // FETCH USER PREFERENCES
        case UserPreferencesActionTypes.FETCH_USER_PREFERENCES:
            return {
                ...state,
                loading: true,
                errorMessage: ''
            };

        case UserPreferencesActionTypes.FETCH_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                userPreferences: action.payload
            };

        case UserPreferencesActionTypes.FETCH_USER_PREFERENCES_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };

        case RESET_USER:
            return initialState;

        default:
            return state;
    }
};

export { reducer as userReducer };
