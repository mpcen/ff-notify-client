import * as React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { Overlay, Text } from 'react-native-elements';
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist';
import { Dispatch } from 'redux';
import { isEqual } from 'lodash';

import { AppState } from '../../../store';
import * as playerSettingsActions from '../../../store/playerSettings/actions';
import * as trackedPlayerPanelActions from '../../../store/trackedPlayerPanel/actions';

import { TrackedPlayerPanelItem } from './TrackedPlayerPanelItem';
import { IPlayer, IPlayerMap } from '../../../store/playerSettings/types';

interface ITrackedPlayerPanelItemPropsFromState {
    playerMap: IPlayerMap;
    trackedPlayers: string[];
    selectetedPlayerIndex: number;
}

interface ITrackedPlayerPanelPropsFromDispatch {
    reorderTrackedPlayers: typeof playerSettingsActions.reorderTrackedPlayers;
    selectPlayer: typeof trackedPlayerPanelActions.selectPlayer;
}

interface ITrackedPlayerPanelState {
    isOverlayVisible: boolean;
    trackedPlayers: string[];
}

type TrackedPlayerPanelProps = ITrackedPlayerPanelItemPropsFromState & ITrackedPlayerPanelPropsFromDispatch;

type TrackedPanelState = ITrackedPlayerPanelState;

export class TrackedPlayerPanelUnconnected extends React.Component<TrackedPlayerPanelProps, TrackedPanelState> {
    public state: TrackedPanelState = {
        isOverlayVisible: false,
        trackedPlayers: this.props.trackedPlayers
    };

    componentDidUpdate(prevProps: TrackedPlayerPanelProps, prevState: TrackedPanelState) {
        if (prevProps.trackedPlayers.length !== this.props.trackedPlayers.length) {
            this.setState({ trackedPlayers: this.props.trackedPlayers });
        }
    }

    render() {
        const { storiesContainer } = styles;
        const { trackedPlayers, playerMap } = this.props;

        return (
            <>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={trackedPlayers}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => this._renderTrackedPlayerPanelItemList(item, index)}
                />

                <Overlay isVisible={this.state.isOverlayVisible} onBackdropPress={this._handleBackdropPress}>
                    <DraggableFlatList
                        data={this.state.trackedPlayers}
                        renderItem={this._renderItem}
                        keyExtractor={playerId => `draggable-item-${playerId}`}
                        scrollPercent={5}
                        onMoveEnd={this._handleReorderTrackedPlayers}
                    />
                </Overlay>
            </>
        );
    }

    private _handleReorderTrackedPlayers = ({ data }: OnMoveEndInfo<string>) => {
        const reorderedTrackedPlayers = data as string[];
        this.props.reorderTrackedPlayers(reorderedTrackedPlayers);
        this.setState({ trackedPlayers: reorderedTrackedPlayers });
    };

    private _renderItem = ({ item, index, move, moveEnd, isActive }: RenderItemInfo<string>) => {
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
                    {this.props.playerMap[item].name}
                </Text>
            </TouchableOpacity>
        );
    };

    private _renderTrackedPlayerPanelItemList(playerId: string, playerIndex: number) {
        return (
            <TrackedPlayerPanelItem
                key={playerId}
                trackedPlayer={this.props.playerMap[playerId]}
                onLongPress={this._handleOnLongPress}
                onPress={() => this._handleOnPress(playerIndex)}
            />
        );
    }

    private _handleOnPress(playerIndex: number) {
        this.props.selectPlayer(playerIndex);
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

const mapStateToProps = ({
    playerSettings,
    user,
    trackedPlayerPanel
}: AppState): ITrackedPlayerPanelItemPropsFromState => {
    return {
        playerMap: playerSettings.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers,
        selectetedPlayerIndex: trackedPlayerPanel.selectedPlayerIndex
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        reorderTrackedPlayers: (reorderedTrackedPlayers: string[]) => {
            return dispatch(playerSettingsActions.reorderTrackedPlayers(reorderedTrackedPlayers));
        },
        selectPlayer: (playerIndex: number) => dispatch(trackedPlayerPanelActions.selectPlayer(playerIndex))
    };
};

export const TrackedPlayerPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackedPlayerPanelUnconnected);
