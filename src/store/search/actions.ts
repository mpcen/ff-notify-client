import { action } from 'typesafe-actions';

import { FetchSearchedPlayerNewsActionTypes } from './types';
import { IPlayerNews } from '../timeline/types';

// FETCH SEARCHED PLAYER NEWS
export const fetchSearchedPlayerNews = (page: number = 1, playerId?: string) => {
    return action(FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS, { page, playerId });
};

export const fetchSearchedPlayerNewsSuccess = (searchedPlayerNews: IPlayerNews) => {
    return action(FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS_SUCCESS, searchedPlayerNews);
};

export const fetchSearchedPlayerNewsFail = (message: string) => {
    return action(FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS_FAIL, message);
};

// REFETCH TRACKED PLAYER NEWS
export const refetchSearchedPlayerNews = (playerId?: string) => {
    return action(FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS, playerId);
};

export const refetchSearchedPlayerNewsSuccess = (searchedPlayerNews: IPlayerNews) => {
    return action(
        FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS_SUCCESS,
        searchedPlayerNews
    );
};

export const refetchSearchedPlayerNewsFail = (message: string) => {
    return action(FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS_FAIL, message);
};
