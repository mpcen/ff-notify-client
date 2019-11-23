import { action } from 'typesafe-actions';

import { FetchSearchedPlayerNewsActionTypes } from './types';
import { IPlayerNews } from '../timeline/types';

// FETCH SEARCHED PLAYER NEWS
export const fetchSearchedPlayerNews = (page: number, playerId: string, fresh: boolean = false) => {
    return action(FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS, { page, playerId, fresh });
};

export const fetchSearchedPlayerNewsSuccess = (searchedPlayerNews: IPlayerNews, fresh: boolean) => {
    return action(FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS_SUCCESS, {
        searchedPlayerNews,
        fresh
    });
};

export const fetchSearchedPlayerNewsFail = (message: string) => {
    return action(FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS_FAIL, message);
};
