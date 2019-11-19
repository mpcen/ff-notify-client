import { action } from 'typesafe-actions';

import {
    FetchPlayerNewsActionTypes,
    SortTimelineByActionTypes,
    IPlayerNews,
    TimelineSortType
} from './types';

// FETCH ALL PLAYER NEWS
export const fetchAllPlayerNews = (page: number = 1) => {
    return action(FetchPlayerNewsActionTypes.FETCH_ALL_PLAYER_NEWS, { page });
};

export const fetchAllPlayerNewsSuccess = (playerNews: IPlayerNews) => {
    return action(FetchPlayerNewsActionTypes.FETCH_ALL_PLAYER_NEWS_SUCCESS, playerNews);
};

export const fetchAllPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.FETCH_ALL_PLAYER_NEWS_FAIL, message);
};

// REFETCH ALL PLAYER NEWS
export const refetchAllPlayerNews = () => {
    return action(FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS);
};

export const refetchAllPlayerNewsSuccess = (playerNews: IPlayerNews) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS_SUCCESS, playerNews);
};

export const refetchAllPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS_FAIL, message);
};

// FETCH PLAYER NEWS
export const fetchPlayerNews = (page: number = 1, playerId?: string) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, { page, playerId });
};

export const fetchPlayerNewsSuccess = (playerNews: IPlayerNews) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS, playerNews);
};

export const fetchPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_FAIL, message);
};

// REFETCH TRACKED PLAYER NEWS
export const refetchPlayerNews = (playerId?: string) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS, playerId);
};

export const refetchPlayerNewsSuccess = (playerNews: IPlayerNews) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS_SUCCESS, playerNews);
};

export const refetchPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS_FAIL, message);
};

// SORT TIMELINE BY
export const sortTimelineBy = (sortType: TimelineSortType) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY, sortType);
};

export const sortTimelineBySuccess = (sortType: TimelineSortType) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY_SUCCESS, sortType);
};

export const sortTimelineByFail = (message: string) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY_FAIL, message);
};
