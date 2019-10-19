import { TimelineSortType } from '../timeline/types';

export interface IUser {
    email: string;
    password: string;
    passwordConfirm?: string;
}

export interface IUserPreferences {
    userId: string;
    trackedPlayers: string[];
    timelineSortType: TimelineSortType;
}

export interface IUserState {
    loading: boolean;
    token: string | null;
    email: string;
    errorMessage: string;
    userPreferences: IUserPreferences;
}

export enum SignUpActionTypes {
    SIGN_UP = 'SIGN_UP',
    SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
    SIGN_UP_FAIL = 'SIGN_UP_FAIL'
}

export enum SignInActionTypes {
    SIGN_IN = 'SIGN_IN',
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAIL = 'SIGN_IN_FAIL'
}

export enum SignOutActionTypes {
    SIGN_OUT = 'SIGN_OUT',
    SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAIL = 'SIGN_OUT_FAIL'
}

export enum UserPreferencesActionTypes {
    FETCH_USER_PREFERENCES = 'FETCH_USER_PREFERENCES',
    FETCH_USER_PREFERENCES_SUCCESS = 'FETCH_USER_PREFERENCES_SUCCESS',
    FETCH_USER_PREFERENCES_FAIL = 'FETCH_USER_PREFERENCES_FAIL'
}

export enum InitializeActionTypes {
    INITIALIZE = 'INITIALIZE',
    INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS',
    INITIALIZE_FAIL = 'INITIALIZE_FAIL'
}

export const RESET_USER = 'RESET_USER';
