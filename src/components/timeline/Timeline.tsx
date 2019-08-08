import * as React from 'react';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import * as timelineActions from '../../store/timeline/actions';

import { Stories } from './Stories/Stories';
import { PlayerNewsItem, IPlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';
import { ITimelineState } from '../../store/timeline/reducer';
import { AppState } from '../../store';
import { Dispatch } from 'redux';

interface ITimelinePropsFromState {
    playerNews: IPlayerNewsItem[];
    loading: boolean;
    error: boolean;
}

interface ITimelinePropsFromDispatch {
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
}

interface ITimelineProps {}

type TimelineProps = ITimelineProps & ITimelinePropsFromState & ITimelinePropsFromDispatch;

class TimeLineUnconnected extends React.Component<TimelineProps> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'ACoolAppName', style: { color: '#fff', fontSize: 16 } }}
                    rightComponent={{ type: 'material-community', icon: 'pin-outline', color: '#fff' }}
                />
            )
        } as NavigationScreenOptions;
    };

    public componentDidMount() {
        this.props.fetchPlayerNews();
    }

    public render() {
        const playerNews = this.props.playerNews;
        const { timeLineContainer } = styles;

        return (
            <View style={timeLineContainer}>
                <Stories />

                <FlatList
                    data={playerNews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: IPlayerNewsItem }) => {
                        return <PlayerNewsItem item={item} />;
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

const mapStateToProps = ({ timeline }: AppState): ITimelineState => {
    return {
        error: timeline.error,
        loading: timeline.loading,
        playerNews: timeline.playerNews
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
