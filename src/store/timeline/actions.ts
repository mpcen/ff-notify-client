import { action } from 'typesafe-actions';

import { FetchPlayerNewsActionTypes } from './types';
import { IPlayerNewsItem } from '../../components/TimeLine/PlayerNewsItem/PlayerNewsItem';

export const fetchPlayerNews = () => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS);
};

export const fetchPlayerNewsSuccess = (data: IPlayerNewsItem[]) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS, data);
};

export const fetchPlayerNewsFail = (message: string) => {
    return action(FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_FAIL, message);
};
