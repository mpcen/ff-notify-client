import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Overlay, CheckBox, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sortPlayerBy } from '../../store/timeline/actions';

import { TimelineSortType } from '../../store/timeline/reducer';
import { AppState } from '../../store';

interface ITimelineHeaderPropsFromState {
    timelineSortType: TimelineSortType;
}

interface ITimelineHeaderPropsFromDispatch {
    sortPlayerBy: typeof sortPlayerBy;
}

interface ITimelineHeaderState {
    isOverlayVisible: boolean;
}

type TimelineProps = ITimelineHeaderPropsFromState & ITimelineHeaderPropsFromDispatch;

class TimelineHeaderUnconnected extends React.Component<TimelineProps, ITimelineHeaderState> {
    public state = {
        isOverlayVisible: false
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this._handleOnPress}>
                    <Icon name="filter-list" color="#fff" />
                </TouchableOpacity>

                <Overlay isVisible={this.state.isOverlayVisible} onBackdropPress={this._handleBackdropPress}>
                    <View>
                        <Text h4>Timeline Filter</Text>
                        <CheckBox
                            center
                            title="By Date"
                            checked={this._handleChecked(TimelineSortType.Date, this.props.timelineSortType)}
                            onPress={() => this.props.sortPlayerBy(TimelineSortType.Date)}
                        />

                        <CheckBox
                            center
                            title="By Player"
                            checked={this._handleChecked(TimelineSortType.Player, this.props.timelineSortType)}
                            onPress={() => this.props.sortPlayerBy(TimelineSortType.Player)}
                        />
                    </View>
                </Overlay>
            </View>
        );
    }

    private _handleChecked(checkBox: TimelineSortType, timelineSortType: TimelineSortType) {
        return checkBox === timelineSortType;
    }

    private _handleOnPress = () => {
        this.setState({ isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ isOverlayVisible: false });
    };
}

const mapStateToProps = ({ timeline }: AppState): ITimelineHeaderPropsFromState => {
    return {
        timelineSortType: timeline.timelineSortType
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sortPlayerBy: (sortType: TimelineSortType) => dispatch(sortPlayerBy(sortType))
    };
};

export const TimelineHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineHeaderUnconnected);
