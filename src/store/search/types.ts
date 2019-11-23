import { IPlayerNews } from '../timeline/types';

export enum FetchSearchedPlayerNewsActionTypes {
    FETCH_SEARCHED_PLAYER_NEWS = 'FETCH_SEARCHED_PLAYER_NEWS',
    FETCH_SEARCHED_PLAYER_NEWS_SUCCESS = 'FETCH_SEARCHED_PLAYER_NEWS_SUCCESS',
    FETCH_SEARCHED_PLAYER_NEWS_FAIL = 'FETCH_SEARCHED_PLAYER_NEWS_FAIL'
}

export interface ISearchState {
    readonly searchedPlayerNews: IPlayerNews;
    readonly loading: boolean;
    readonly error: boolean;
}
