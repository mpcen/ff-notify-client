import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Overlay, Text, ListItem } from 'react-native-elements';
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
            <View>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        width: 54,
                        height: 44,
                        right: 10
                    }}
                    onPress={this._handleOnPress}
                >
                    <Icon
                        containerStyle={{
                            position: 'absolute'
                        }}
                        size={38}
                        name="filter-list"
                        color="#fff"
                    />
                    <Icon
                        type="material-community"
                        containerStyle={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 22,
                            height: 22,
                            alignSelf: 'center'
                        }}
                        size={14}
                        name={this._renderFilterTypeIcon()}
                        color="#fff"
                    />
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
                                onPress={() => this._handleSelectSortType(TimelineSortType.Player)}
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
                                onPress={() => this._handleSelectSortType(TimelineSortType.Date)}
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
                                onPress={() => this._handleSelectSortType(TimelineSortType.All)}
                                leftIcon={<MaterialCommunityIcons name="account-group" size={25} color="#2089dc" />}
                            />
                        </View>
                    </View>
                </Overlay>
            </View>
        );
    }

    private _handleSelectSortType = (sortType: TimelineSortType) => {
        this.setState({ isOverlayVisible: false });
        this.props.sortTimelineBy(sortType);
    };

    private _renderFilterTypeIcon = () => {
        if (this.props.timelineSortType === TimelineSortType.All) {
            return 'account-group';
        }

        if (this.props.timelineSortType === TimelineSortType.Date) {
            return 'account-multiple';
        }

        if (this.props.timelineSortType === TimelineSortType.Player) {
            return 'account';
        }
    };

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
