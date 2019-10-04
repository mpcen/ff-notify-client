import { action } from 'typesafe-actions';

import { FetchPlayerNewsActionTypes, SortTimelineByActionTypes, IPlayerNews, SortTimelineBy } from './types';

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

// REFETCH PLAYER NEWS
export const refetchPlayerNews = (page: number = 1, playerId?: string) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS, { page, playerId });
};

export const refetchPlayerNewsSuccess = (playerNews: IPlayerNews) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS_SUCCESS, playerNews);
};

export const refetchPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS_FAIL, message);
};

// SORT TIMELINE BY
export const sortTimelineBy = (sortType: SortTimelineBy) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY, sortType);
};

export const sortTimelineBySuccess = (sortType: SortTimelineBy) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY_SUCCESS, sortType);
};

export const sortTimelineByFail = (message: string) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY_FAIL, message);
};
