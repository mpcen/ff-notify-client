import * as React from 'react';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as timelineActions from '../../store/timeline/actions';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { IPlayer } from '../../store/playerSettings/types';

import { Stories } from './Stories/Stories';
import { PlayerNewsItem, IPlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';
import { TimelineHeader } from './Header';
import { TimelineSortType } from '../../store/timeline/reducer';

interface ITimelinePropsFromState {
    playerNews: IPlayerNewsItem[];
    loading: boolean;
    error: boolean;
    trackedPlayers: IPlayer[];
    timelineSortType: TimelineSortType;
}

interface ITimelinePropsFromDispatch {
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
}

interface ITimelineUnconnectedState {
    firstLoadComplete: boolean;
    filteredPlayerNews: IPlayerNewsItem[];
}

type TimelineProps = ITimelinePropsFromState & ITimelinePropsFromDispatch;

class TimeLineUnconnected extends React.Component<TimelineProps, ITimelineUnconnectedState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'ACoolAppName', style: { color: '#fff', fontSize: 16 } }}
                    rightComponent={<TimelineHeader />}
                />
            )
        } as NavigationScreenOptions;
    };

    public state: ITimelineUnconnectedState = {
        firstLoadComplete: false,
        filteredPlayerNews: []
    };

    public componentDidMount() {
        this.props.fetchPlayerNews();
    }

    public componentDidUpdate(prevProps: TimelineProps) {
        if (!this.state.firstLoadComplete || !isEqual(prevProps.trackedPlayers, this.props.trackedPlayers)) {
            this._updateFilteredPlayerNews();
        }
    }

    public render() {
        const { timeLineContainer } = styles;

        return (
            <View style={timeLineContainer}>
                <Stories />

                <FlatList
                    data={this.state.filteredPlayerNews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: IPlayerNewsItem }) => {
                        return <PlayerNewsItem playerNewsItem={item} />;
                    }}
                />
            </View>
        );
    }

    private _updateFilteredPlayerNews = () => {
        let sortedPlayers: IPlayerNewsItem[];
        const filteredPlayerNews = this.props.playerNews.filter((playerNewsItem: IPlayerNewsItem) => {
            return this.props.trackedPlayers.some((trackedPlayer: IPlayer) => {
                return playerNewsItem.player.name === trackedPlayer.name;
            });
        });

        if (this.props.timelineSortType === TimelineSortType.Date) {
            sortedPlayers = filteredPlayerNews.sort((a: IPlayerNewsItem, b: IPlayerNewsItem) => {
                const aTime = a.time;
                const bTime = b.time;

                if (Date.parse(aTime) < Date.parse(bTime)) return 1;
                if (Date.parse(aTime) > Date.parse(bTime)) return -1;
                return 0;
            });
        } else {
            sortedPlayers = filteredPlayerNews.sort((a: IPlayerNewsItem, b: IPlayerNewsItem) => {
                if (a.player.name < b.player.name) return -1;
                if (a.player.name > b.player.name) return 1;
                return 0;
            });
        }

        this.setState({ filteredPlayerNews: sortedPlayers, firstLoadComplete: true });
    };
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
        timelineSortType: timeline.timelineSortType
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
