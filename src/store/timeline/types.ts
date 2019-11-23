export enum FetchPlayerNewsActionTypes {
    FETCH_PLAYER_NEWS = 'FETCH_PLAYER_NEWS',
    FETCH_PLAYER_NEWS_SUCCESS = 'FETCH_PLAYER_NEWS_SUCCESS',
    FETCH_PLAYER_NEWS_FAIL = 'FETCH_PLAYER_NEWS_FAIL'
}

export enum SortTimelineByActionTypes {
    SORT_TIMELINE_BY = 'SORT_TIMELINE_BY',
    SORT_TIMELINE_BY_SUCCESS = 'SORT_TIMELINE_BY_SUCCESS',
    SORT_TIMELINE_BY_FAIL = 'SORT_TIMELINE_BY_FAIL'
}

export interface ITimelineState {
    readonly playerNews: IPlayerNews;
    readonly loading: boolean;
    readonly error: boolean;
}

export interface IPlayerNewsItem {
    _id: string;
    platform: string;
    username: string;
    contentId: string;
    player: { id: string; teamId: number };
    content: string;
    time: string;
    childNodes: IChildNode[];
}

export interface IChildNode {
    contentType: string;
    data: string | null;
    text: boolean;
    link: boolean;
    username: boolean;
}

export interface IPlayerNews {
    docs: IPlayerNewsItem[];
    page: number | null;
    totalPages: number;
    prevPage: number | null;
    nextPage: number;
}

export enum NewsType {
    Individual, // 0 - Individual Player
    AllTracked, // 1 - All Tracked Players
    All // 2 - All Players
}
