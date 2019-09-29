import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayerSettingsState } from './types';

const initialState: IPlayerSettingsState = {
    players: [],
    trackedPlayers: [],
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
                players: action.payload
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
                loading: true,
                error: false,
                errorMessage: ''
            };

        case TrackPlayerActionTypes.TRACK_PLAYER_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                errorMessage: '',
                trackedPlayers: [...state.trackedPlayers, action.payload]
            };

        case TrackPlayerActionTypes.TRACK_PLAYER_FAIL:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            };

        // FETCH TRACKED PLAYERS
        case TrackPlayerActionTypes.FETCH_TRACKED_PLAYERS:
            return {
                ...state,
                error: false,
                errorMessage: '',
                loading: true
            };

        case TrackPlayerActionTypes.FETCH_TRACKED_PLAYERS_SUCCESS:
            return {
                ...state,
                error: false,
                errorMessage: '',
                loading: false,
                trackedPlayers: action.payload
            };

        // UNTRACK PLAYER
        case TrackPlayerActionTypes.UNTRACK_PLAYER:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: ''
            };

        case TrackPlayerActionTypes.UNTRACK_PLAYER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: '',
                trackedPlayers: [
                    ...state.trackedPlayers.filter(trackedPlayer => trackedPlayer.id !== action.payload.id)
                ]
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
                errorMessage: '',
                trackedPlayers: action.payload
            };

        case TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: '',
                trackedPlayers: action.payload
            };

        case TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload
            };

        default:
            return state;
    }
};

export { reducer as playerSettingsReducer, IPlayerSettingsState };
