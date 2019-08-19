import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayer, IPlayerSettingsState } from './types';

const initialState: IPlayerSettingsState = {
    players: [],
    trackedPlayers: [
        {
            id: 'Jamal AdamsLSUS',
            name: 'Jamal Adams',
            suffix: '',
            college: 'LSU',
            teamId: 24,
            position: 'S',
            number: '33',
            avatarUrl: 'https://a.espncdn.com/i/headshots/nfl/players/full/3115373.png'
        }
    ],
    loading: true,
    error: false
};

const reducer: Reducer<IPlayerSettingsState, Action> = (state = initialState, action) => {
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
        case TrackPlayerActionTypes.TRACK_PLAYER:
            return {
                ...state,
                trackedPlayers: [...state.trackedPlayers, action.payload]
            };
        case TrackPlayerActionTypes.UNTRACK_PLAYER:
            return {
                ...state,
                trackedPlayers: action.payload
            };
        default:
            return state;
    }
};

export { reducer as playerSettingsReducer, IPlayerSettingsState };
