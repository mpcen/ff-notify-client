import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Overlay, Text, Button } from 'react-native-elements';
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
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Sort News Feed By</Text>

                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                marginTop: 20
                            }}
                        >
                            <Button
                                containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}
                                titleStyle={{ marginLeft: 25 }}
                                title="Single Tracked Player"
                                type={this.props.timelineSortType === TimelineSortType.Player ? 'solid' : 'clear'}
                                onPress={() => this.props.sortTimelineBy(TimelineSortType.Player)}
                                icon={
                                    <MaterialCommunityIcons
                                        name="account"
                                        size={25}
                                        color={
                                            this.props.timelineSortType === TimelineSortType.Player
                                                ? 'white'
                                                : '#2089dc'
                                        }
                                    />
                                }
                            />

                            <Button
                                containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}
                                titleStyle={{ marginLeft: 25 }}
                                title="All Tracked Players"
                                type={this.props.timelineSortType === TimelineSortType.Date ? 'solid' : 'clear'}
                                onPress={() => this.props.sortTimelineBy(TimelineSortType.Date)}
                                icon={
                                    <MaterialCommunityIcons
                                        name="account-multiple"
                                        size={25}
                                        color={
                                            this.props.timelineSortType === TimelineSortType.Date ? 'white' : '#2089dc'
                                        }
                                    />
                                }
                            />

                            <Button
                                containerStyle={{ alignSelf: 'stretch' }}
                                titleStyle={{ marginLeft: 25 }}
                                title="All Players"
                                type={this.props.timelineSortType === TimelineSortType.All ? 'solid' : 'clear'}
                                onPress={() => this.props.sortTimelineBy(TimelineSortType.All)}
                                icon={
                                    <MaterialCommunityIcons
                                        name="account-group"
                                        size={25}
                                        color={
                                            this.props.timelineSortType === TimelineSortType.All ? 'white' : '#2089dc'
                                        }
                                    />
                                }
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
