import { action } from 'typesafe-actions';

import {
    SignUpActionTypes,
    SignInActionTypes,
    SignOutActionTypes,
    IUser,
    RESET_USER,
    UserPreferencesActionTypes,
    IUserPreferences
} from './types';

export const reset = () => {
    return action(RESET_USER);
};

// SIGN UP
export const signUp = (user: IUser) => {
    return action(SignUpActionTypes.SIGN_UP, user);
};

export const signUpSuccess = (token: string) => {
    return action(SignUpActionTypes.SIGN_UP_SUCCESS, token);
};

export const signUpFail = (message: string) => {
    return action(SignUpActionTypes.SIGN_UP_FAIL, message);
};

// SIGN IN
export const signIn = (user: IUser) => {
    return action(SignInActionTypes.SIGN_IN, user);
};

export const signInSuccess = (token: string) => {
    return action(SignInActionTypes.SIGN_IN_SUCCESS, token);
};

export const signInFail = (message: string) => {
    return action(SignInActionTypes.SIGN_IN_FAIL, message);
};

// SIGN OUT
export const signOut = () => {
    return action(SignOutActionTypes.SIGN_OUT);
};

export const signOutSuccess = () => {
    return action(SignOutActionTypes.SIGN_OUT_SUCCESS);
};

export const signOutFail = (message: string) => {
    return action(SignOutActionTypes.SIGN_OUT_FAIL, message);
};

// FETCH USER PREFERENCES
export const fetchUserPreferences = () => {
    return action(UserPreferencesActionTypes.FETCH_USER_PREFERENCES);
};

export const fetchUserPreferencesSuccess = (userPreferences: IUserPreferences) => {
    return action(UserPreferencesActionTypes.FETCH_USER_PREFERENCES_SUCCESS, userPreferences);
};

export const fetchUserPreferencesFail = (message: string) => {
    return action(UserPreferencesActionTypes.FETCH_USER_PREFERENCES_FAIL, message);
};
