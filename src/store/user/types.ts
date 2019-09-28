export interface IUser {
    email: string;
    password: string;
}

export interface IUserState {
    token: string | null;
    user: IUser | null;
    errorMessage: string;
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
