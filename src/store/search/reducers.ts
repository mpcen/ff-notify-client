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
            const { fresh, searchedPlayerNews } = action.payload;

            return {
                searchedPlayerNews: {
                    docs: fresh
                        ? [...searchedPlayerNews.docs]
                        : ([
                              ...state.searchedPlayerNews.docs,
                              ...searchedPlayerNews.docs
                          ] as IPlayerNewsItem[]),
                    nextPage: searchedPlayerNews.nextPage,
                    page: searchedPlayerNews.page,
                    prevPage: searchedPlayerNews.prevPage,
                    totalPages: searchedPlayerNews.totalPages
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
        default:
            return state;
    }
};

export { reducer as searchReducer, ISearchState };
