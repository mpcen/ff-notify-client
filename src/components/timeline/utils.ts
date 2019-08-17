import { IPlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';
import { TimelineSortType } from '../../store/timeline/reducer';

export const sortTimelineBy = (sortType: TimelineSortType, filteredPlayerNews: IPlayerNewsItem[]) => {
    if (sortType === TimelineSortType.Date) {
        return filteredPlayerNews.sort((a: IPlayerNewsItem, b: IPlayerNewsItem) => {
            const aTime = a.time;
            const bTime = b.time;

            if (Date.parse(aTime) < Date.parse(bTime)) return 1;
            if (Date.parse(aTime) > Date.parse(bTime)) return -1;
            return 0;
        });
    } else if (sortType === TimelineSortType.Player) {
        return filteredPlayerNews.sort((a: IPlayerNewsItem, b: IPlayerNewsItem) => {
            if (a.player.name < b.player.name) return -1;
            if (a.player.name > b.player.name) return 1;
            return 0;
        });
    }
};
