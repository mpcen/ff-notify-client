import * as React from 'react';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as timelineActions from '../../store/timeline/actions';
import { IPlayerNewsItem, TimelineSortType } from '../../store/timeline/types';
import { AppState } from '../../store';
import { IPlayerMap } from '../../store/playerSettings/types';

import { TrackedPlayerPanel } from './TrackedPlayerPanel/TrackedPlayerPanel';
import { TimelineFilter } from './TimelineFilter';
import { IPlayerNews } from '../../store/timeline/types';
import { PlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';

interface ITimelinePropsFromState {
    playerNews: IPlayerNews;
    loading: boolean;
    error: boolean;
    trackedPlayers: string[];
    playerMap: IPlayerMap;
    timelineSortType: TimelineSortType;
    selectedPlayerIndex: number;
}

interface ITimelinePropsFromDispatch {
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
    refetchPlayerNews: typeof timelineActions.refetchPlayerNews;
}

type TimelineProps = ITimelinePropsFromState & ITimelinePropsFromDispatch;

class TimeLineUnconnected extends React.Component<TimelineProps> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    leftComponent={null}
                    centerComponent={{ text: 'PerSource', style: { color: '#fff', fontSize: 16 } }}
                    rightComponent={<TimelineFilter />}
                />
            )
        } as NavigationScreenOptions;
    };

    componentDidMount() {
        this.props.fetchPlayerNews(1, this.props.trackedPlayers[0]);
    }

    componentDidUpdate(prevProps: TimelineProps) {
        if (prevProps.selectedPlayerIndex !== this.props.selectedPlayerIndex) {
            this.props.refetchPlayerNews(this.props.trackedPlayers[this.props.selectedPlayerIndex]);
        }

        if (
            prevProps.trackedPlayers[this.props.selectedPlayerIndex] !==
            this.props.trackedPlayers[this.props.selectedPlayerIndex]
        ) {
            this.props.refetchPlayerNews(this.props.trackedPlayers[this.props.selectedPlayerIndex]);
        }
    }

    public render() {
        const { timeLineContainer } = styles;

        return (
            <View style={timeLineContainer}>
                {this.props.timelineSortType === TimelineSortType.Player && <TrackedPlayerPanel />}

                {this.props.playerNews.docs.length ? (
                    <FlatList
                        data={this.props.playerNews.docs}
                        keyExtractor={item => `${item.platform}-${item.contentId}`}
                        onRefresh={this._handleRefresh}
                        refreshing={this.props.loading}
                        renderItem={({ item }: { item: IPlayerNewsItem }) => {
                            return <PlayerNewsItem playerNewsItem={item} />;
                        }}
                    />
                ) : (
                    <Text>No player news</Text>
                )}
            </View>
        );
    }

    private _handleRefresh = () => {
        this.props.refetchPlayerNews(this.props.trackedPlayers[0]);
        this.setState({ selectedPlayerIndex: 0 });
    };
}

const styles = StyleSheet.create({
    timeLineContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const mapStateToProps = ({ timeline, playerSettings, user, trackedPlayerPanel }: AppState): ITimelinePropsFromState => {
    return {
        error: timeline.error,
        loading: timeline.loading,
        playerNews: timeline.playerNews,
        playerMap: playerSettings.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers,
        timelineSortType: user.userPreferences.timelineSortType,
        selectedPlayerIndex: trackedPlayerPanel.selectedPlayerIndex
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayerNews: (page: number, playerId: string) => dispatch(timelineActions.fetchPlayerNews(page, playerId)),
        refetchPlayerNews: (playerId: string) => dispatch(timelineActions.refetchPlayerNews(playerId))
    };
};

export const Timeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLineUnconnected);
