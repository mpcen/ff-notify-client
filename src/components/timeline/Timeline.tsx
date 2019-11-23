import * as React from 'react';
import {
    NavigationScreenOptions,
    NavigationScreenProps,
    NavigationScreenProp,
    NavigationParams,
    NavigationState,
    FlatList
} from 'react-navigation';
import { StyleSheet, View, Text, Platform, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Constants from 'expo-constants';

import * as timelineActions from '../../store/timeline/actions';
import { NewsType } from '../../store/timeline/types';
import { AppState } from '../../store';
import { IPlayerMap } from '../../store/players/types';

import { TrackedPlayerPanel } from './TrackedPlayerPanel/TrackedPlayerPanel';
import { TimelineFilter } from './TimelineFilter';
import { IPlayerNews } from '../../store/timeline/types';
import { PlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';

interface ITimelineUnconnectedProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface ITimelinePropsFromState {
    playerNews: IPlayerNews;
    loading: boolean;
    error: boolean;
    trackedPlayers: string[];
    playerMap: IPlayerMap;
    newsType: NewsType;
    selectedPlayerIndex: number;
}

interface ITimelinePropsFromDispatch {
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
}

type TimelineProps = ITimelinePropsFromState & ITimelinePropsFromDispatch & ITimelineUnconnectedProps;

class TimeLineUnconnected extends React.Component<TimelineProps> {
    private flatListRef = React.createRef<FlatList<any>>();

    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    containerStyle={{
                        height:
                            Platform.OS === 'ios'
                                ? 44 + Constants.statusBarHeight
                                : 56 + StatusBar.currentHeight
                    }}
                    leftComponent={null}
                    centerComponent={{
                        text: 'PerSource',
                        style: { color: '#fff', fontSize: 20 }
                    }}
                    rightComponent={<TimelineFilter />}
                />
            )
        } as NavigationScreenOptions;
    };

    componentDidMount() {
        if (this.props.newsType === NewsType.All) {
            this.props.fetchPlayerNews(1, '', NewsType.All);
        } else if (this.props.newsType === NewsType.AllTracked) {
            this.props.fetchPlayerNews(1, '', NewsType.AllTracked);
        } else {
            this.props.fetchPlayerNews(1, this.props.trackedPlayers[0], NewsType.Individual);
        }
    }

    componentDidUpdate(prevProps: TimelineProps) {
        debugger;
        if (
            prevProps.selectedPlayerIndex !== this.props.selectedPlayerIndex ||
            prevProps.newsType !== this.props.newsType
        ) {
            this._scrollToTop();
        }

        if (this.props.newsType === NewsType.All && prevProps.newsType !== NewsType.All) {
            this.props.fetchPlayerNews(1, '', NewsType.All, true);
        } else if (
            prevProps.selectedPlayerIndex !== this.props.selectedPlayerIndex ||
            prevProps.trackedPlayers[this.props.selectedPlayerIndex] !==
                this.props.trackedPlayers[this.props.selectedPlayerIndex] ||
            (prevProps.newsType !== NewsType.Individual && this.props.newsType === NewsType.Individual)
        ) {
            this.props.fetchPlayerNews(
                1,
                this.props.trackedPlayers[this.props.selectedPlayerIndex],
                NewsType.Individual,
                true
            );
        } else if (
            prevProps.newsType !== NewsType.AllTracked &&
            this.props.newsType === NewsType.AllTracked
        ) {
            this.props.fetchPlayerNews(1, '', NewsType.AllTracked, true);
        }
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.newsType !== NewsType.All && !this.props.trackedPlayers.length ? (
                    <View style={styles.centeredMessageContainer}>
                        <Text>Get started by tracking some players</Text>
                    </View>
                ) : (
                    this._renderTimeline()
                )}
            </View>
        );
    }

    private _renderTimeline() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.newsType === NewsType.Individual ? (
                    <TrackedPlayerPanel scrollToTop={this._scrollToTop} />
                ) : null}

                {this.props.newsType === NewsType.All ? (
                    <FlatList
                        extraData={this.props.playerNews.page}
                        data={this.props.playerNews.docs}
                        ref={this.flatListRef}
                        keyExtractor={item => item._id}
                        onRefresh={this._handleRefresh}
                        refreshing={this.props.loading}
                        onEndReached={this._handleOnEndReached}
                        onEndReachedThreshold={20}
                        renderItem={({ item }) => (
                            <PlayerNewsItem
                                player={this.props.playerMap[item.player.id]}
                                playerNewsItem={item}
                            />
                        )}
                    />
                ) : null}

                {this.props.newsType !== NewsType.All &&
                this.props.trackedPlayers &&
                this.props.trackedPlayers.length &&
                this.props.playerNews.docs.length ? (
                    <FlatList
                        extraData={this.props.selectedPlayerIndex}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        ref={this.flatListRef}
                        data={this.props.playerNews.docs}
                        keyExtractor={item => item._id}
                        onRefresh={this._handleRefresh}
                        refreshing={this.props.loading}
                        onEndReached={this._handleOnEndReached}
                        onEndReachedThreshold={20}
                        renderItem={({ item }) => (
                            <PlayerNewsItem
                                player={this.props.playerMap[item.player.id]}
                                playerNewsItem={item}
                            />
                        )}
                    />
                ) : null}

                {!this.props.loading && this.props.playerNews.docs && !this.props.playerNews.docs.length
                    ? this._renderNoNews()
                    : null}
            </View>
        );
    }

    private _scrollToTop = () => {
        if (this.props.playerNews.docs.length > 0) {
            this.flatListRef.current.scrollToIndex({
                animated: true,
                index: 0
            });
        }
    };

    private _handleOnEndReached = () => {
        if (!this.props.loading && this.props.playerNews.nextPage) {
            if (this.props.newsType === NewsType.All) {
                this.props.fetchPlayerNews(this.props.playerNews.nextPage, '', NewsType.All);
            } else if (this.props.newsType === NewsType.AllTracked) {
                this.props.fetchPlayerNews(
                    this.props.playerNews.nextPage,
                    this.props.trackedPlayers[this.props.selectedPlayerIndex],
                    NewsType.AllTracked
                );
            } else {
                this.props.fetchPlayerNews(
                    this.props.playerNews.nextPage,
                    this.props.trackedPlayers[this.props.selectedPlayerIndex],
                    NewsType.Individual
                );
            }
        }
    };

    private _handleRefresh = () => {
        if (!this.props.loading) {
            if (this.props.newsType === NewsType.All) {
                this.props.fetchPlayerNews(1, '', NewsType.All, true);
            } else if (this.props.newsType === NewsType.AllTracked) {
                this.props.fetchPlayerNews(
                    1,
                    this.props.trackedPlayers[this.props.selectedPlayerIndex],
                    NewsType.AllTracked,
                    true
                );
            } else {
                this.props.fetchPlayerNews(
                    1,
                    this.props.trackedPlayers[this.props.selectedPlayerIndex],
                    NewsType.Individual,
                    true
                );
            }
        }
    };

    private _renderNoNews = () => (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>There is no news for the selected player</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({
    timeline,
    players,
    user,
    trackedPlayerPanel
}: AppState): ITimelinePropsFromState => {
    return {
        error: timeline.error,
        loading: timeline.loading,
        playerNews: timeline.playerNews,
        playerMap: players.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers,
        newsType: user.userPreferences.timelineSortType,
        selectedPlayerIndex: trackedPlayerPanel.selectedPlayerIndex
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayerNews: (page: number, playerId: string, newsType: NewsType, fresh: boolean) =>
            dispatch(timelineActions.fetchPlayerNews(page, playerId, newsType, fresh))
    };
};

export const Timeline = connect(mapStateToProps, mapDispatchToProps)(TimeLineUnconnected);
