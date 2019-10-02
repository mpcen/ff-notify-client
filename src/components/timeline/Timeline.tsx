import * as React from 'react';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { Dispatch } from 'redux';

import * as timelineActions from '../../store/timeline/actions';
import { TimelineSortType } from '../../store/timeline/reducer';
import { AppState } from '../../store';
import { IPlayer, IPlayerMap } from '../../store/playerSettings/types';
import { sortTimelineBy } from './utils';

import { TrackedPlayerPanel } from './TrackedPlayerPanel/TrackedPlayerPanel';
import { PlayerNewsItem, IPlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';
import { TimelineFilter } from './TimelineFilter';

interface ITimelinePropsFromState {
    playerNews: IPlayerNewsItem[];
    loading: boolean;
    error: boolean;
    trackedPlayers: string[];
    timelineSortType: TimelineSortType;
    playerMap: IPlayerMap;
}

interface ITimelineUnconnectedState {
    firstLoadComplete: boolean;
}

interface ITimelinePropsFromDispatch {
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
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
                    rightComponent={<TimelineFilter />}
                />
            )
        } as NavigationScreenOptions;
    };

    public state: ITimelineUnconnectedState = {
        firstLoadComplete: false
    };

    public render() {
        const { timeLineContainer } = styles;

        return (
            <View style={timeLineContainer}>
                {this.props.trackedPlayers.length && Object.keys(this.props.playerMap).length ? (
                    <TrackedPlayerPanel />
                ) : (
                    <Text>No tracked players</Text>
                )}

                <FlatList
                    data={this.props.playerNews}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={this.props.fetchPlayerNews}
                    refreshing={this.props.loading}
                    renderItem={({ item }: { item: IPlayerNewsItem }) => {
                        return <PlayerNewsItem playerNewsItem={item} />;
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timeLineContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const mapStateToProps = ({ timeline, playerSettings }: AppState): ITimelinePropsFromState => {
    return {
        error: timeline.error,
        loading: timeline.loading,
        playerNews: timeline.playerNews,
        trackedPlayers: playerSettings.trackedPlayers,
        timelineSortType: timeline.timelineSortType,
        playerMap: playerSettings.playerMap
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayerNews: () => dispatch(timelineActions.fetchPlayerNews())
    };
};

export const Timeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLineUnconnected);
