import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Overlay, Text, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sortTimelineBy } from '../../store/timeline/actions';

import { AppState } from '../../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NewsType } from '../../store/timeline/types';

interface ITimelineFilterPropsFromState {
    newsType: NewsType;
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
                <TouchableOpacity onPress={this._handleOnPress}>
                    <Icon type="material-community" name={this._renderFilterTypeIcon()} color="#fff" />
                </TouchableOpacity>

                <Overlay
                    isVisible={this.state.isOverlayVisible}
                    onBackdropPress={this._handleBackdropPress}
                    height={275}
                >
                    <View style={{ alignSelf: 'stretch', flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#212121',
                                alignSelf: 'center'
                            }}
                        >
                            Sort News Feed By
                        </Text>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ListItem
                                disabled={this.props.newsType === NewsType.Individual}
                                containerStyle={{
                                    backgroundColor:
                                        this.props.newsType === NewsType.Individual ? '#f4f4f4' : 'white',
                                    borderLeftWidth: 3,
                                    borderColor:
                                        this.props.newsType === NewsType.Individual ? '#2089dc' : 'white'
                                }}
                                title="Single Tracked Player"
                                onPress={() => this._handleSelectSortType(NewsType.Individual)}
                                leftIcon={<MaterialCommunityIcons name="account" size={25} color="#2089dc" />}
                            />

                            <ListItem
                                disabled={this.props.newsType === NewsType.AllTracked}
                                containerStyle={{
                                    backgroundColor:
                                        this.props.newsType === NewsType.AllTracked ? '#f4f4f4' : 'white',
                                    borderLeftWidth: 3,
                                    borderColor:
                                        this.props.newsType === NewsType.AllTracked ? '#2089dc' : 'white'
                                }}
                                title="All Tracked Players"
                                onPress={() => this._handleSelectSortType(NewsType.AllTracked)}
                                leftIcon={
                                    <MaterialCommunityIcons
                                        name="account-multiple"
                                        size={25}
                                        color="#2089dc"
                                    />
                                }
                            />

                            <ListItem
                                disabled={this.props.newsType === NewsType.All}
                                containerStyle={{
                                    backgroundColor:
                                        this.props.newsType === NewsType.All ? '#f4f4f4' : 'white',
                                    borderLeftWidth: 3,
                                    borderColor: this.props.newsType === NewsType.All ? '#2089dc' : 'white'
                                }}
                                title="All Players"
                                onPress={() => this._handleSelectSortType(NewsType.All)}
                                leftIcon={
                                    <MaterialCommunityIcons name="account-group" size={25} color="#2089dc" />
                                }
                            />
                        </View>
                    </View>
                </Overlay>
            </View>
        );
    }

    private _handleSelectSortType = (newsType: NewsType) => {
        this.setState({ isOverlayVisible: false });
        this.props.sortTimelineBy(newsType);
    };

    private _renderFilterTypeIcon = () => {
        if (this.props.newsType === NewsType.All) {
            return 'account-group';
        }

        if (this.props.newsType === NewsType.AllTracked) {
            return 'account-multiple';
        }

        if (this.props.newsType === NewsType.Individual) {
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
        newsType: user.userPreferences.timelineSortType
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sortTimelineBy: (sortType: NewsType) => dispatch(sortTimelineBy(sortType))
    };
};

export const TimelineFilter = connect(mapStateToProps, mapDispatchToProps)(TimelineFilterUnconnected);
