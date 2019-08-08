import { IPlayerNewsItem } from '../../components/Timeline/PlayerNewsItem/PlayerNewsItem';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as Actions from './actions';

type Action = ActionType<typeof Actions>;

import { FetchPlayerNewsActionTypes } from './types';

interface ITimelineState {
    playerNews: IPlayerNewsItem[];
    loading: boolean;
    error: boolean;
}

const initialState: ITimelineState = {
    error: false,
    loading: true,
    playerNews: []
};

const reducer: Reducer<ITimelineState, Action> = (state = initialState, action) => {
    switch (action.type) {
        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS:
            return {
                ...state,
                error: false,
                loading: true
            };
        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                playerNews: action.payload
            };
        case FetchPlayerNewsActionTypes.FETCH_PLAYER_NEWS_FAIL:
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

export { reducer as timelineReducer, ITimelineState };
