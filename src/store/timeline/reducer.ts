import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as TimelineActions from './actions';
import * as UserActions from '../user/actions';
import { RESET_USER } from '../user/types';
import {
    FetchPlayerNewsActionTypes,
    SortTimelineByActionTypes,
    ITimelineState,
    IPlayerNewsItem
} from './types';

type Action = ActionType<typeof TimelineActions & typeof UserActions>;

const initialState: ITimelineState = {
    playerNews: {
        docs: [],
        nextPage: 2,
        page: 1,
        prevPage: null,
        totalPages: 2
    },
    loading: true,
    error: false
};

const reducer: Reducer<ITimelineState, Action> = (state = initialState, action) => {
    switch (action.type) {
        // FETCH ALL PLAYER NEWS
        case FetchPlayerNewsActionTypes.FETCH_ALL_PLAYER_NEWS:
            return {
                ...state,
                loading: true
            };

        case FetchPlayerNewsActionTypes.FETCH_ALL_PLAYER_NEWS_SUCCESS:
            return {
                playerNews: {
                    docs: [...state.playerNews.docs, ...action.payload.docs] as IPlayerNewsItem[],
                    nextPage: action.payload.nextPage,
                    page: action.payload.page,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                },
                error: false,
                loading: false
            };

        // REFETCH ALL PLAYER NEWS
        case FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS:
            return {
                ...state,
                loading: true
            };

        case FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS_SUCCESS:
            return {
                playerNews: { ...action.payload },
                error: false,
                loading: false
            };

        case FetchPlayerNewsActionTypes.REFETCH_ALL_PLAYER_NEWS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        // FETCH TRACKED PLAYER NEWS
        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS:
            return {
                ...state,
                loading: true
            };

        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS:
            return {
                playerNews: {
                    docs: [...state.playerNews.docs, ...action.payload.docs] as IPlayerNewsItem[],
                    nextPage: action.payload.nextPage,
                    page: action.payload.page,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                },
                error: false,
                loading: false
            };

        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        // REFETCH TRACKED PLAYER NEWS
        case FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS:
            return {
                ...state,
                loading: true
            };

        case FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS_SUCCESS:
            return {
                playerNews: { ...action.payload },
                error: false,
                loading: false
            };

        case FetchPlayerNewsActionTypes.REFETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload
            };

        // SORT TIMELINE BY
        case SortTimelineByActionTypes.SORT_TIMELINE_BY:
            return {
                ...state,
                error: false,
                loading: true
            };

        case SortTimelineByActionTypes.SORT_TIMELINE_BY_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                timelineSortType: action.payload
            };

        case SortTimelineByActionTypes.SORT_TIMELINE_BY_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            };

        case RESET_USER:
            return initialState;

        default:
            return state;
    }
};

export { reducer as timelineReducer, ITimelineState };
