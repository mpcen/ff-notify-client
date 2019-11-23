import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import {
    IUserState,
    SignUpActionTypes,
    SignInActionTypes,
    RESET_USER,
    UserPreferencesActionTypes,
    ResetPasswordActionTypes
} from './types';
import { NewsType } from '../timeline/types';

const initialState: IUserState = {
    token: null,
    email: '',
    loading: true,
    errorMessage: '',
    userPreferences: {
        timelineSortType: NewsType.All,
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
                token: action.payload.token,
                email: action.payload.email
            };

        case SignUpActionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                token: null
            };

        // SIGN IN
        case SignInActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                token: action.payload.token,
                email: action.payload.email
            };

        case SignInActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                token: null
            };

        // RESET PASSWORD
        case ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                email: action.payload
            };

        case ResetPasswordActionTypes.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
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

        // RESET USER
        case RESET_USER:
            return initialState;

        default:
            return state;
    }
};

export { reducer as userReducer };
