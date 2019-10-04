import { action } from 'typesafe-actions';

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayer, IPlayerMap } from './types';

// FETCH PLAYERS
export const fetchPlayers = () => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS);
};

export const fetchPlayersSuccess = (playerMap: IPlayerMap) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_SUCCESS, playerMap);
};

export const fetchPlayersFail = (message: string) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_FAIL, message);
};

// TRACK PLAYER
export const trackPlayer = (playerId: string) => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER, playerId);
};

export const trackPlayerSuccess = () => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER_SUCCESS);
};

export const trackPlayerFail = (message: string) => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER_FAIL, message);
};

// UNTRACK PLAYER
export const untrackPlayer = (playerId: string) => {
    return action(TrackPlayerActionTypes.UNTRACK_PLAYER, playerId);
};

export const untrackPlayerSuccess = () => {
    return action(TrackPlayerActionTypes.UNTRACK_PLAYER_SUCCESS);
};

export const untrackPlayerFail = (message: string) => {
    return action(TrackPlayerActionTypes.UNTRACK_PLAYER_FAIL, message);
};

// REORDER TRACKED PLAYERS
export const reorderTrackedPlayers = (reorderedTrackedPlayers: string[]) => {
    return action(TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS, reorderedTrackedPlayers);
};

export const reorderTrackedPlayersSuccess = () => {
    return action(TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS_SUCCESS);
};

export const reorderTrackedPlayersFail = (message: string) => {
    return action(TrackPlayerActionTypes.REORDER_TRACKED_PLAYERS_FAIL, message);
};
