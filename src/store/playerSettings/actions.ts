import { action } from 'typesafe-actions';

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayer } from './types';

// FETCH PLAYERS
export const fetchPlayers = () => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS);
};

export const fetchPlayersSuccess = (data: IPlayer[]) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_SUCCESS, data);
};

export const fetchPlayersFail = (message: string) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_FAIL, message);
};

// TRACK PLAYER
export const trackPlayer = (playerId: string) => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER, playerId);
};

export const trackPlayerSuccess = (player: IPlayer) => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER_SUCCESS, player);
};

export const trackPlayerFail = (message: string) => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER_FAIL, message);
};

// UNTRACK PLAYER
export const untrackPlayer = (playerId: string) => {
    return action(TrackPlayerActionTypes.UNTRACK_PLAYER, playerId);
};

export const untrackPlayerFail = (message: string) => {
    return action(TrackPlayerActionTypes.UNTRACK_PLAYER_FAIL, message);
};

export const untrackPlayerSuccess = (player: IPlayer) => {
    return action(TrackPlayerActionTypes.UNTRACK_PLAYER_SUCCESS, player);
};

// FETCH TRACKED PLAYERS
export const fetchTrackedPlayers = () => {
    return action(TrackPlayerActionTypes.FETCH_TRACKED_PLAYERS);
};

export const fetchTrackedPlayersSuccess = (trackedPlayers: IPlayer[]) => {
    return action(TrackPlayerActionTypes.FETCH_TRACKED_PLAYERS_SUCCESS, trackedPlayers);
};

export const fetchTrackedPlayersFail = (message: string) => {
    return action(TrackPlayerActionTypes.FETCH_TRACKED_PLAYERS_FAIL, message);
};
