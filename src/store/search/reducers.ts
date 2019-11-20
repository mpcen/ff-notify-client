import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as SearchActions from './actions';
import { RESET_USER } from '../user/types';
import { FetchSearchedPlayerNewsActionTypes, ISearchState } from './types';
import { IPlayerNewsItem } from '../timeline/types';

type Action = ActionType<typeof SearchActions>;

const initialState: ISearchState = {
    searchedPlayerNews: {
        docs: [],
        nextPage: 2,
        page: 1,
        prevPage: null,
        totalPages: 2
    },
    loading: true,
    error: false
};

const reducer: Reducer<ISearchState, Action> = (state = initialState, action) => {
    switch (action.type) {
        // FETCH TRACKED PLAYER NEWS
        case FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS:
            return {
                ...state,
                loading: true
            };

        case FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS_SUCCESS:
            return {
                searchedPlayerNews: {
                    docs: [...state.searchedPlayerNews.docs, ...action.payload.docs] as IPlayerNewsItem[],
                    nextPage: action.payload.nextPage,
                    page: action.payload.page,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                },
                error: false,
                loading: false
            };

        case FetchSearchedPlayerNewsActionTypes.FETCH_SEARCHED_PLAYER_NEWS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        // REFETCH SEARCHED PLAYER NEWS
        case FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS:
            return {
                ...state,
                loading: true
            };

        case FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS_SUCCESS:
            return {
                searchedPlayerNews: { ...action.payload },
                error: false,
                loading: false
            };

        case FetchSearchedPlayerNewsActionTypes.REFETCH_SEARCHED_PLAYER_NEWS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        default:
            return state;
    }
};

export { reducer as searchReducer, ISearchState };
