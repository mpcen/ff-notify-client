import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-navigation';
import { connect } from 'react-redux';
import { Overlay, ListItem, Avatar } from 'react-native-elements';
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist';
import { Dispatch } from 'redux';

import { AppState } from '../../../store';
import * as playerSettingsActions from '../../../store/players/actions';
import * as trackedPlayerPanelActions from '../../../store/trackedPlayerPanel/actions';

import { TrackedPlayerPanelItem } from './TrackedPlayerPanelItem';
import { IPlayerMap } from '../../../store/players/types';

interface ITrackedPlayerPanelUnconnectedProps {
    scrollToTop: () => void;
}

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
    selectedIndex: number;
}

type TrackedPlayerPanelProps = ITrackedPlayerPanelItemPropsFromState &
    ITrackedPlayerPanelPropsFromDispatch &
    ITrackedPlayerPanelUnconnectedProps;
type TrackedPanelState = ITrackedPlayerPanelState;

export class TrackedPlayerPanelUnconnected extends React.Component<
    TrackedPlayerPanelProps,
    TrackedPanelState
> {
    public state: TrackedPanelState = {
        isOverlayVisible: false,
        trackedPlayers: this.props.trackedPlayers,
        selectedIndex: 0
    };

    componentDidUpdate(prevProps: TrackedPlayerPanelProps, prevState: TrackedPanelState) {
        if (prevProps.trackedPlayers.length !== this.props.trackedPlayers.length) {
            this.setState({ trackedPlayers: this.props.trackedPlayers });
        }

        if (this.props.selectetedPlayerIndex !== this.state.selectedIndex) {
            this.setState({ selectedIndex: this.props.selectetedPlayerIndex });
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.trackedPlayers}
                    keyExtractor={item => item}
                    extraData={this.state.selectedIndex}
                    renderItem={this._renderTrackedPlayerPanelItem}
                />

                <Overlay
                    isVisible={this.state.isOverlayVisible}
                    onBackdropPress={() => this.setState({ isOverlayVisible: false })}
                >
                    <DraggableFlatList
                        data={this.state.trackedPlayers}
                        renderItem={this._renderDraggableItem}
                        keyExtractor={playerId => `draggable-item-${playerId}`}
                        scrollPercent={5}
                        onMoveEnd={this._handleReorderTrackedPlayers}
                    />
                </Overlay>
            </View>
        );
    }

    private _renderTrackedPlayerPanelItem = ({ item, index }: { item: string; index: number }) => {
        return (
            <TrackedPlayerPanelItem
                selected={this.state.selectedIndex === index}
                avatarUrl={this.props.playerMap[item].avatarUrl}
                onLongPress={() => this.setState({ isOverlayVisible: true })}
                onPress={() => {
                    this.setState({ selectedIndex: index });
                    this.props.selectPlayer(index);
                }}
            />
        );
    };

    private _handleReorderTrackedPlayers = ({ data }: OnMoveEndInfo<string>) => {
        const reorderedTrackedPlayers = data as string[];
        this.props.reorderTrackedPlayers(reorderedTrackedPlayers);
        this.setState({ trackedPlayers: reorderedTrackedPlayers });
    };

    private _renderDraggableItem = ({ item, index, move, moveEnd, isActive }: RenderItemInfo<string>) => {
        const { id, name, position, avatarUrl } = this.props.playerMap[item];

        return (
            <ListItem
                key={id}
                onLongPress={move}
                title={name}
                subtitle={position}
                bottomDivider
                rightIcon={{ name: 'menu' }}
                leftAvatar={
                    <Avatar
                        rounded
                        size="medium"
                        avatarStyle={styles.avatarStyle}
                        source={{ uri: avatarUrl }}
                    />
                }
            />
        );
    };
}

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: 'white',
        borderColor: 'white'
    }
});

const mapStateToProps = ({ playerSettings, user, trackedPlayerPanel }: AppState) => {
    return {
        playerMap: playerSettings.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers,
        selectetedPlayerIndex: trackedPlayerPanel.selectedPlayerIndex
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectPlayer: (playerIndex: number) => dispatch(trackedPlayerPanelActions.selectPlayer(playerIndex)),
        reorderTrackedPlayers: (reorderedTrackedPlayers: string[]) => {
            return dispatch(playerSettingsActions.reorderTrackedPlayers(reorderedTrackedPlayers));
        }
    };
};

export const TrackedPlayerPanel = connect(mapStateToProps, mapDispatchToProps)(TrackedPlayerPanelUnconnected);
