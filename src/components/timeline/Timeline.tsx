import * as React from 'react';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { Dispatch } from 'redux';

import * as timelineActions from '../../store/timeline/actions';
import { SortTimelineBy, IPlayerNewsItem } from '../../store/timeline/types';
import { AppState } from '../../store';
import { IPlayer, IPlayerMap } from '../../store/playerSettings/types';
import { sortTimelineBy } from './utils';

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
    sortTimelineBy: SortTimelineBy;
}

interface ITimelineUnconnectedState {}

interface ITimelinePropsFromDispatch {
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
    refetchPlayerNews: typeof timelineActions.refetchPlayerNews;
}

type TimelineProps = ITimelinePropsFromState & ITimelinePropsFromDispatch;

class TimeLineUnconnected extends React.Component<TimelineProps, ITimelineUnconnectedState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    leftComponent={null}
                    centerComponent={{ text: 'PerSource', style: { color: '#fff', fontSize: 16 } }}
                    // rightComponent={<TimelineFilter />}
                    rightComponent={null}
                />
            )
        } as NavigationScreenOptions;
    };

    public state: ITimelineUnconnectedState = {};

    public render() {
        const { timeLineContainer } = styles;

        return (
            <View style={timeLineContainer}>
                {this.props.trackedPlayers.length ? (
                    <>
                        {/* <TrackedPlayerPanel /> */}

                        <FlatList
                            data={this.props.playerNews.docs}
                            keyExtractor={item => `${item.platform}-${item.contentId}`}
                            onRefresh={this._handleRefresh}
                            refreshing={this.props.loading}
                            renderItem={({ item }: { item: IPlayerNewsItem }) => {
                                return <PlayerNewsItem playerNewsItem={item} />;
                            }}
                        />
                    </>
                ) : (
                    <Text>No tracked players</Text>
                )}
            </View>
        );
    }

    private _handleRefresh = () => {
        this.props.refetchPlayerNews();
    };
}

const styles = StyleSheet.create({
    timeLineContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const mapStateToProps = ({ timeline, playerSettings, user }: AppState): ITimelinePropsFromState => {
    return {
        error: timeline.error,
        loading: timeline.loading,
        playerNews: timeline.playerNews,
        playerMap: playerSettings.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers,
        sortTimelineBy: user.userPreferences.sortTimelineBy
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayerNews: () => dispatch(timelineActions.fetchPlayerNews()),
        refetchPlayerNews: () => dispatch(timelineActions.refetchPlayerNews())
    };
};

export const Timeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLineUnconnected);
