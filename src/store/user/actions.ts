import { action } from 'typesafe-actions';

import {
    SignUpActionTypes,
    SignInActionTypes,
    SignOutActionTypes,
    IUser,
    RESET_USER,
    UserPreferencesActionTypes,
    IUserPreferences,
    InitializeActionTypes,
    ResetPasswordActionTypes
} from './types';

export const reset = () => {
    return action(RESET_USER);
};

// SIGN UP
export const signUp = (user: IUser) => {
    return action(SignUpActionTypes.SIGN_UP, user);
};

export const signUpSuccess = (token: string, email: string) => {
    return action(SignUpActionTypes.SIGN_UP_SUCCESS, { token, email });
};

export const signUpFail = (message: string) => {
    return action(SignUpActionTypes.SIGN_UP_FAIL, message);
};

// SIGN IN
export const signIn = (user: IUser) => {
    return action(SignInActionTypes.SIGN_IN, user);
};

export const signInSuccess = (token: string, email: string) => {
    return action(SignInActionTypes.SIGN_IN_SUCCESS, { token, email });
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

// RESET PASSWORD
export const resetPassword = (email: string) => {
    return action(ResetPasswordActionTypes.RESET_PASSWORD, email);
};

export const resetPasswordSuccess = (message: string) => {
    return action(ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS, message);
};

export const resetPasswordFail = (message: string) => {
    return action(ResetPasswordActionTypes.RESET_PASSWORD_FAIL, message);
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

// INITIALIZE
export const initialize = () => {
    return action(InitializeActionTypes.INITIALIZE);
};

export const initializeSuccess = () => {
    return action(InitializeActionTypes.INITIALIZE_SUCCESS);
};

export const initializeFail = (message: string) => {
    return action(InitializeActionTypes.INITIALIZE_FAIL, message);
};

// RESET USER
export const resetUser = () => {
    return action(RESET_USER);
};
