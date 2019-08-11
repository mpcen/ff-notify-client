import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { FetchPlayersActionTypes, IPlayer } from './types';

interface IPlayerSearchState {
    players: IPlayer[];
    loading: boolean;
    error: boolean;
}

const initialState: IPlayerSearchState = {
    players: [],
    loading: true,
    error: false
};

const reducer: Reducer<IPlayerSearchState, Action> = (state = initialState, action) => {
    switch (action.type) {
        case FetchPlayersActionTypes.FETCH_PLAYERS:
            return {
                ...state,
                error: false,
                loading: true
            };
        case FetchPlayersActionTypes.FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                players: action.payload
            };
        case FetchPlayersActionTypes.FETCH_PLAYERS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export { reducer as playerSearchReducer, IPlayerSearchState };
