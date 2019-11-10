import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as PlayerSettingsActions from './actions';
import * as UserActions from '../user/actions';
import { RESET_USER } from '../user/types';

type Action = ActionType<typeof PlayerSettingsActions & typeof UserActions>;

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayerSettingsState } from './types';

const initialState: IPlayerSettingsState = {
    playerMap: {},
    loading: true,
    error: false
};

const reducer: Reducer<IPlayerSettingsState, Action> = (state = initialState, action) => {
    switch (action.type) {
        // FETCH PLAYERS
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
                playerMap: action.payload
            };

        case FetchPlayersActionTypes.FETCH_PLAYERS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        // TRACK PLAYER
        case TrackPlayerActionTypes.TRACK_PLAYER:
            return {
                ...state,
                loading: true
            };

        case TrackPlayerActionTypes.TRACK_PLAYER_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                errorMessage: ''
            };

        case TrackPlayerActionTypes.TRACK_PLAYER_FAIL:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            };

        case TrackPlayerActionTypes.TRACK_PLAYER_RESET:
            return {
                ...state,
                error: false
            };

        // UNTRACK PLAYER
        case TrackPlayerActionTypes.UNTRACK_PLAYER:
            return {
                ...state,
                loading: true
            };

        case TrackPlayerActionTypes.UNTRACK_PLAYER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: ''
            };

        case TrackPlayerActionTypes.UNTRACK_PLAYER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload
            };

        // REORDER TRACKED PLAYERS
        case TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: ''
            };

        case TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: ''
            };

        case TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload
            };

        // RESET USER
        case RESET_USER:
            return initialState;

        default:
            return state;
    }
};

export { reducer as playerSettingsReducer };
