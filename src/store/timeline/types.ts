import { IPlayer } from '../playerSettings/types';

export enum FetchPlayerNewsActionTypes {
    FETCH_PLAYER_NEWS = 'FETCH_PLAYER_NEWS',
    FETCH_PLAYER_NEWS_SUCCESS = 'FETCH_PLAYER_NEWS_SUCCESS',
    FETCH_PLAYER_NEWS_FAIL = 'FETCH_PLAYER_NEWS_FAIL',
    REFETCH_PLAYER_NEWS = 'REFETCH_PLAYER_NEWS',
    REFETCH_PLAYER_NEWS_SUCCESS = 'REFETCH_PLAYER_NEWS_SUCCESS',
    REFETCH_PLAYER_NEWS_FAIL = 'REFETCH_PLAYER_NEWS_FAIL'
}

export enum SortTimelineByActionTypes {
    SORT_TIMELINE_BY = 'SORT_TIMELINE_BY',
    SORT_TIMELINE_BY_SUCCESS = 'SORT_TIMELINE_BY_SUCCESS',
    SORT_TIMELINE_BY_FAIL = 'SORT_TIMELINE_BY_FAIL'
}

export interface ITimelineState {
    readonly playerNews: IPlayerNews;
    readonly loading: boolean;
    readonly error: boolean;
}

export interface IPlayerNewsItem {
    platform: string;
    username: string;
    contentId: string;
    player: IPlayer;
    content: string;
    time: string;
}

export interface IPlayerNews {
    docs: IPlayerNewsItem[];
    page: number | null;
    totalPages: number;
    prevPage: number | null;
    nextPage: number;
}

export enum TimelineSortType {
    Date,
    Player
}
