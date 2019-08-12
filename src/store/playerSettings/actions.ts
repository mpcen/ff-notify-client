import { action } from 'typesafe-actions';

import { FetchPlayersActionTypes, TrackPlayerActionTypes, IPlayer } from './types';

export const fetchPlayers = () => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS);
};

export const fetchPlayersSuccess = (data: IPlayer[]) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_SUCCESS, data);
};

export const fetchPlayersFail = (message: string) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_FAIL, message);
};

export const trackPlayer = (player: IPlayer) => {
    return action(TrackPlayerActionTypes.TRACK_PLAYER, player);
};

export const untrackPlayer = (playerToUntrack: IPlayer, trackedPlayers: IPlayer[]) => {
    const filteredPlayers = trackedPlayers.filter((player: IPlayer) => player.name !== playerToUntrack.name);

    return action(TrackPlayerActionTypes.UNTRACK_PLAYER, filteredPlayers);
};
