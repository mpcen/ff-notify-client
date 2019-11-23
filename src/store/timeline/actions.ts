import { action } from 'typesafe-actions';

import { FetchPlayerNewsActionTypes, SortTimelineByActionTypes, IPlayerNews, NewsType } from './types';

// FETCH PLAYER NEWS
export const fetchPlayerNews = (
    page: number = 1,
    playerId: string,
    newsType: NewsType,
    fresh: boolean = false
) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS, { page, playerId, newsType, fresh });
};

export const fetchPlayerNewsSuccess = (playerNews: IPlayerNews, fresh: boolean) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS, { playerNews, fresh });
};

export const fetchPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_FAIL, message);
};

// SORT TIMELINE BY
export const sortTimelineBy = (newsType: NewsType) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY, newsType);
};

export const sortTimelineBySuccess = (newsType: NewsType) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY_SUCCESS, newsType);
};

export const sortTimelineByFail = (message: string) => {
    return action(SortTimelineByActionTypes.SORT_TIMELINE_BY_FAIL, message);
};
