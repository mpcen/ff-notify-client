import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Overlay, Text, Button, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sortTimelineBy } from '../../store/timeline/actions';

import { AppState } from '../../store';
import { TimelineSortType } from '../../store/timeline/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ITimelineFilterPropsFromState {
    timelineSortType: TimelineSortType;
}

interface ITimelineFilterPropsFromDispatch {
    sortTimelineBy: typeof sortTimelineBy;
}

interface ITimelineFilterState {
    isOverlayVisible: boolean;
}

type TimelineFilterProps = ITimelineFilterPropsFromState & ITimelineFilterPropsFromDispatch;

class TimelineFilterUnconnected extends React.Component<TimelineFilterProps, ITimelineFilterState> {
    public state = {
        isOverlayVisible: false
    };

    render() {
        return (
            <>
                <TouchableOpacity onPress={this._handleOnPress}>
                    <Icon name="filter-list" color="#fff" />
                </TouchableOpacity>

                <Overlay
                    isVisible={this.state.isOverlayVisible}
                    onBackdropPress={this._handleBackdropPress}
                    height={275}
                >
                    <View style={{ alignSelf: 'stretch', flex: 1 }}>
                        <Text style={{ fontSize: 20, color: '#212121', alignSelf: 'center' }}>Sort News Feed By</Text>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ListItem
                                containerStyle={{
                                    backgroundColor:
                                        this.props.timelineSortType === TimelineSortType.Player ? '#f4f4f4' : 'white',
                                    borderLeftWidth: 3,
                                    borderColor:
                                        this.props.timelineSortType === TimelineSortType.Player ? '#2089dc' : 'white'
                                }}
                                title="Single Tracked Player"
                                onPress={() => this.props.sortTimelineBy(TimelineSortType.Player)}
                                leftIcon={<MaterialCommunityIcons name="account" size={25} color="#2089dc" />}
                            />

                            <ListItem
                                containerStyle={{
                                    backgroundColor:
                                        this.props.timelineSortType === TimelineSortType.Date ? '#f4f4f4' : 'white',
                                    borderLeftWidth: 3,
                                    borderColor:
                                        this.props.timelineSortType === TimelineSortType.Date ? '#2089dc' : 'white'
                                }}
                                title="All Tracked Players"
                                onPress={() => this.props.sortTimelineBy(TimelineSortType.Date)}
                                leftIcon={<MaterialCommunityIcons name="account-multiple" size={25} color="#2089dc" />}
                            />

                            <ListItem
                                containerStyle={{
                                    backgroundColor:
                                        this.props.timelineSortType === TimelineSortType.All ? '#f4f4f4' : 'white',
                                    borderLeftWidth: 3,
                                    borderColor:
                                        this.props.timelineSortType === TimelineSortType.All ? '#2089dc' : 'white'
                                }}
                                title="All Players"
                                onPress={() => this.props.sortTimelineBy(TimelineSortType.All)}
                                leftIcon={<MaterialCommunityIcons name="account-group" size={25} color="#2089dc" />}
                            />
                        </View>
                    </View>
                </Overlay>
            </>
        );
    }

    private _handleOnPress = () => {
        this.setState({ isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ isOverlayVisible: false });
    };
}

const mapStateToProps = ({ user }: AppState): ITimelineFilterPropsFromState => {
    return {
        timelineSortType: user.userPreferences.timelineSortType
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sortTimelineBy: (sortType: TimelineSortType) => dispatch(sortTimelineBy(sortType))
    };
};

export const TimelineFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineFilterUnconnected);
