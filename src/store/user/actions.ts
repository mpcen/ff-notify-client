import { action } from 'typesafe-actions';

import { SignUpActionTypes, SignInActionTypes, SignOutActionTypes, IUser } from './types';

export const signUp = (data: IUser) => {
    return action(SignUpActionTypes.SIGN_UP, data);
};

export const signUpSuccess = (data: IUser) => {
    return action(SignUpActionTypes.SIGN_UP_SUCCESS, data);
};

export const signUpFail = (message: string) => {
    return action(SignUpActionTypes.SIGN_UP_FAIL, message);
};

export const signIn = () => {
    return action(SignInActionTypes.SIGN_IN);
};

export const signInSuccess = (data: IUser) => {
    return action(SignInActionTypes.SIGN_IN_SUCCESS, data);
};

export const signInFail = (message: string) => {
    return action(SignInActionTypes.SIGN_IN_FAIL, message);
};

export const signOut = () => {
    return action(SignOutActionTypes.SIGN_OUT);
};

export const signOutSuccess = (data: IUser) => {
    return action(SignOutActionTypes.SIGN_OUT_SUCCESS, data);
};

export const signOutFail = (message: string) => {
    return action(SignOutActionTypes.SIGN_OUT_FAIL, message);
};
