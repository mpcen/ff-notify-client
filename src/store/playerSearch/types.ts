export interface IPlayer {
    name: string;
    college: string;
    suffix?: string;
    teamId: number;
    number: string;
    position: string;
}

export interface IPlayerSettingsState {
    players: IPlayer[];
    filteredPlayers: IPlayer[];
    searchText: string;
    loading: boolean;
    error: boolean;
}

export enum FetchPlayersActionTypes {
    FETCH_PLAYERS = 'FETCH_PLAYERS',
    FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS',
    FETCH_PLAYERS_FAIL = 'FETCH_PLAYERS_FAIL'
}
