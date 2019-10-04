import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Overlay, CheckBox, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sortTimelineBy } from '../../store/timeline/actions';

import { TimelineSortType } from '../../store/timeline/reducer';
import { AppState } from '../../store';

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

                <Overlay isVisible={this.state.isOverlayVisible} onBackdropPress={this._handleBackdropPress}>
                    <>
                        <Text h4>Timeline Filter</Text>
                        <CheckBox
                            center
                            title="By Date"
                            checked={this._handleChecked(TimelineSortType.Date, this.props.timelineSortType)}
                            onPress={() => this.props.sortTimelineBy(TimelineSortType.Date)}
                        />

                        <CheckBox
                            center
                            title="By Player"
                            checked={this._handleChecked(TimelineSortType.Player, this.props.timelineSortType)}
                            onPress={() => this.props.sortTimelineBy(TimelineSortType.Player)}
                        />
                    </>
                </Overlay>
            </>
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

const mapStateToProps = ({ timeline }: AppState): ITimelineFilterPropsFromState => {
    return {
        timelineSortType: timeline.timelineSortType
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
