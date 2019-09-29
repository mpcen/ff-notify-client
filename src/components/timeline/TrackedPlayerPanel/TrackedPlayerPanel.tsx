import * as React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { Overlay, Text } from 'react-native-elements';
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist';
import { Dispatch } from 'redux';

import { AppState } from '../../../store';
import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { TrackedPlayerPanelItem } from './TrackedPlayerPanelItem';
import { IPlayer } from '../../../store/playerSettings/types';

interface ITrackedPlayerPanelItemPropsFromState {
    trackedPlayers: IPlayer[];
}

interface ITrackedPlayerPanelPropsFromDispatch {
    reorderTrackedPlayers: typeof playerSettingsActions.reorderTrackedPlayers;
}

interface ITrackedPlayerPanelState {
    isOverlayVisible: boolean;
}

type TrackedPlayerPanelProps = ITrackedPlayerPanelItemPropsFromState & ITrackedPlayerPanelPropsFromDispatch;

export class TrackedPlayerPanelUnconnected extends React.Component<TrackedPlayerPanelProps, ITrackedPlayerPanelState> {
    public state = {
        isOverlayVisible: false
    };

    render() {
        const { storiesContainer } = styles;
        const { trackedPlayers } = this.props;

        return trackedPlayers.length ? (
            <>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={trackedPlayers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => this._renderTrackedPlayerPanelItemList(item)}
                />

                <Overlay isVisible={this.state.isOverlayVisible} onBackdropPress={this._handleBackdropPress}>
                    <DraggableFlatList
                        data={this.props.trackedPlayers}
                        renderItem={this._renderItem}
                        keyExtractor={(trackedPlayer, index) => `draggable-item-${trackedPlayer.id}`}
                        scrollPercent={5}
                        onMoveEnd={this._handleReorderTrackedPlayers}
                    />
                </Overlay>
            </>
        ) : (
            <View style={storiesContainer}>
                <Text>No Tracked Players</Text>
            </View>
        );
    }

    private _handleReorderTrackedPlayers = ({ data }: OnMoveEndInfo<IPlayer>) => {
        const reorderedTrackedPlayers = data as IPlayer[];
        this.props.reorderTrackedPlayers(reorderedTrackedPlayers);
    };

    private _renderItem = ({ item, index, move, moveEnd, isActive }: RenderItemInfo<IPlayer>) => {
        return (
            <TouchableOpacity
                style={{
                    height: 14,
                    backgroundColor: isActive ? 'blue' : '',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onLongPress={move}
                onPressOut={moveEnd}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 12
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    private _renderTrackedPlayerPanelItemList(trackedPlayer: IPlayer) {
        return (
            <TrackedPlayerPanelItem
                key={trackedPlayer.id}
                trackedPlayer={trackedPlayer}
                onLongPress={this._handleOnLongPress}
            />
        );
    }

    private _handleOnLongPress = () => {
        this.setState({ isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ isOverlayVisible: false });
    };
}

const styles = StyleSheet.create({
    storiesContainer: {
        height: Constants.statusBarHeight * 3
    }
});

const mapStateToProps = ({ playerSettings }: AppState): ITrackedPlayerPanelItemPropsFromState => {
    return {
        trackedPlayers: playerSettings.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        reorderTrackedPlayers: (reorderedTrackedPlayers: IPlayer[]) => {
            return dispatch(playerSettingsActions.reorderTrackedPlayers(reorderedTrackedPlayers));
        }
    };
};

export const TrackedPlayerPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackedPlayerPanelUnconnected);
