import { IPlayerNewsItem } from '../../components/Timeline/PlayerNewsItem/PlayerNewsItem';

export enum FetchPlayerNewsActionTypes {
    FETCH_PLAYER_NEWS = 'FETCH_PLAYER_NEWS',
    FETCH_PLAYER_NEWS_SUCCESS = 'FETCH_PLAYER_NEWS_SUCCESS',
    FETCH_PLAYER_NEWS_FAIL = 'FETCH_PLAYER_NEWS_FAIL'
}

export enum TimelineActionTypes {
    SORT_TIMELINE_BY = 'SORT_TIMELINE_BY'
}

export interface ITimelineState {
    readonly playerNews: IPlayerNewsItem[];
    readonly loading: boolean;
    readonly error: boolean;
}
