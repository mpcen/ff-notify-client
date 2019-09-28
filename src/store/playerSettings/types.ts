export interface IPlayer {
    id: string;
    name: string;
    college: string;
    suffix?: string;
    teamId: number;
    number: string;
    position: string;
    avatarUrl: string;
}

export interface IPlayerSettingsState {
    players: IPlayer[];
    trackedPlayers: IPlayer[];
    loading: boolean;
    error: boolean;
}

export enum FetchPlayersActionTypes {
    FETCH_PLAYERS = 'FETCH_PLAYERS',
    FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS',
    FETCH_PLAYERS_FAIL = 'FETCH_PLAYERS_FAIL'
}

export enum TrackPlayerActionTypes {
    TRACK_PLAYER = 'TRACK_PLAYER',
    TRACK_PLAYER_SUCCESS = 'TRACK_PLAYER_SUCCESS',
    TRACK_PLAYER_FAIL = 'TRACK_PLAYER_FAIL',
    UNTRACK_PLAYER = 'UNTRACK_PLAYER',
    UNTRACK_PLAYER_SUCCESS = 'UNTRACK_PLAYER_SUCCESS',
    UNTRACK_PLAYER_FAIL = 'UNTRACK_PLAYER_FAIL',
    FETCH_TRACKED_PLAYERS = 'FETCH_TRACKED_PLAYERS',
    FETCH_TRACKED_PLAYERS_SUCCESS = 'FETCH_TRACKED_PLAYERS_SUCCESS',
    FETCH_TRACKED_PLAYERS_FAIL = 'FETCH_TRACKED_PLAYERS_FAIL'
}
