import * as React from 'react';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as timelineActions from '../../store/timeline/actions';
import { TimelineSortType } from '../../store/timeline/types';
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
    refetchAllPlayerNews: typeof timelineActions.refetchAllPlayerNews;
    fetchAllPlayerNews: typeof timelineActions.fetchAllPlayerNews;
    refetchPlayerNews: typeof timelineActions.refetchPlayerNews;
}

interface ITimelineUnconnectedState {
    page: number;
}

type TimelineProps = ITimelinePropsFromState & ITimelinePropsFromDispatch;
type TimelineState = ITimelineUnconnectedState;

class TimeLineUnconnected extends React.Component<TimelineProps, TimelineState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    leftComponent={null}
                    centerComponent={{ text: 'PerSource', style: { color: '#fff', fontSize: 16 } }}
                    rightComponent={<TimelineFilter />}
                />
            )
        } as NavigationScreenOptions;
    };

    state: TimelineState = {
        page: 1
    };

    componentDidMount() {
        if (this.props.timelineSortType === TimelineSortType.All) {
            this.props.fetchAllPlayerNews();
        } else {
            this.props.fetchPlayerNews(1, this.props.trackedPlayers[0]);
        }
    }

    componentDidUpdate(prevProps: TimelineProps) {
        if (
            this.props.timelineSortType === TimelineSortType.All &&
            prevProps.timelineSortType !== TimelineSortType.All
        ) {
            this.props.refetchAllPlayerNews();
        } else if (prevProps.selectedPlayerIndex !== this.props.selectedPlayerIndex) {
            this.props.refetchPlayerNews(this.props.trackedPlayers[this.props.selectedPlayerIndex]);
        } else if (
            prevProps.trackedPlayers[this.props.selectedPlayerIndex] !==
            this.props.trackedPlayers[this.props.selectedPlayerIndex]
        ) {
            this.props.refetchPlayerNews(this.props.trackedPlayers[this.props.selectedPlayerIndex]);
        }
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.timelineSortType !== TimelineSortType.All && !this.props.trackedPlayers.length ? (
                    <View style={styles.centeredMessageContainer}>
                        <Text>Track some players to receive the latest news</Text>
                    </View>
                ) : (
                    this._renderTimeline()
                )}
            </View>
        );
    }

    private _renderTimeline() {
        return (
            <View>
                {this.props.timelineSortType === TimelineSortType.Player ? <TrackedPlayerPanel /> : null}

                {this.props.timelineSortType === TimelineSortType.All ? (
                    <FlatList
                        data={this.props.playerNews.docs}
                        keyExtractor={item => `${item.platform}-${item.contentId}`}
                        onRefresh={this._handleRefresh}
                        refreshing={this.props.loading}
                        onEndReached={this._handleOnEndReached}
                        renderItem={({ item }) => {
                            return (
                                <PlayerNewsItem player={this.props.playerMap[item.player.id]} playerNewsItem={item} />
                            );
                        }}
                    />
                ) : null}

                {this.props.timelineSortType !== TimelineSortType.All &&
                this.props.trackedPlayers.length &&
                this.props.playerNews.docs.length ? (
                    <FlatList
                        data={this.props.playerNews.docs}
                        keyExtractor={item => `${item.platform}-${item.contentId}`}
                        onRefresh={this._handleRefresh}
                        refreshing={this.props.loading}
                        onEndReached={this._handleOnEndReached}
                        renderItem={({ item }) => {
                            return (
                                <PlayerNewsItem player={this.props.playerMap[item.player.id]} playerNewsItem={item} />
                            );
                        }}
                    />
                ) : null}
            </View>
        );
    }

    private _handleOnEndReached = () => {
        if (this.props.timelineSortType === TimelineSortType.All) {
            if (this.props.playerNews.nextPage) {
                this.props.fetchAllPlayerNews(this.props.playerNews.nextPage);
            }
        } else {
            if (this.props.playerNews.nextPage) {
                this.props.fetchPlayerNews(
                    this.props.playerNews.nextPage,
                    this.props.trackedPlayers[this.props.selectedPlayerIndex]
                );
            }
        }
    };

    private _handleRefresh = () => {
        this.setState({});

        if (this.props.timelineSortType === TimelineSortType.All && !this.props.loading) {
            this.props.refetchAllPlayerNews();
        } else {
            this.props.refetchPlayerNews(this.props.trackedPlayers[this.props.selectedPlayerIndex]);
        }
    };
}

const styles = StyleSheet.create({
    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fetchAllPlayerNews: (page: number) => dispatch(timelineActions.fetchAllPlayerNews(page)),
        refetchAllPlayerNews: () => dispatch(timelineActions.refetchAllPlayerNews()),
        fetchPlayerNews: (page: number, playerId: string) => dispatch(timelineActions.fetchPlayerNews(page, playerId)),
        refetchPlayerNews: (playerId: string) => dispatch(timelineActions.refetchPlayerNews(playerId))
    };
};

export const Timeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLineUnconnected);
