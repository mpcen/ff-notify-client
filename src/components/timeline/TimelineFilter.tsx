import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Overlay, CheckBox, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sortTimelineBy } from '../../store/timeline/actions';

import { AppState } from '../../store';
import { TimelineSortType } from '../../store/timeline/types';

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
                        <Text h4>Sort News By</Text>
                        <CheckBox
                            center
                            title="Recent"
                            checked={this.props.timelineSortType === TimelineSortType.Date}
                            onPress={() => this.props.sortTimelineBy(TimelineSortType.Date)}
                        />

                        <CheckBox
                            center
                            title="Player"
                            checked={this.props.timelineSortType === TimelineSortType.Player}
                            onPress={() => this.props.sortTimelineBy(TimelineSortType.Player)}
                        />
                    </>
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
