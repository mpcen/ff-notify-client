import { action } from 'typesafe-actions';

import { FetchPlayersActionTypes, IPlayer } from './types';

export const fetchPlayers = () => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS);
};

export const fetchPlayersSuccess = (data: IPlayer[]) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_SUCCESS, data);
};

export const fetchPlayersFail = (message: string) => {
    return action(FetchPlayersActionTypes.FETCH_PLAYERS_FAIL, message);
};
