import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Icon, Overlay, Input, ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';
import { AppState } from '../../../store';

import { IPlayerMap, IPlayer } from '../../../store/playerSettings/types';

interface IPlayerSearchPropsFromState {
    playerMap: IPlayerMap;
    loading: boolean;
    error: boolean;
    trackedPlayers: string[];
}

interface IPlayerSearchPropsFromDispatch {
    trackPlayer: typeof playerSettingsActions.trackPlayer;
}

interface IPlayerSearchUnconnectedState {
    searchText: string;
    filteredPlayers: IPlayer[];
    selectedPlayer: string;
    isOverlayVisible: boolean;
    isToastVisible: boolean;
}

type PlayerSearchProps = IPlayerSearchPropsFromState & IPlayerSearchPropsFromDispatch;
type PlayerSearchState = IPlayerSearchUnconnectedState;

export class PlayerSearchUnconnected extends React.Component<PlayerSearchProps, PlayerSearchState> {
    private TOAST_TIME = 2000;

    public state: PlayerSearchState = {
        searchText: '',
        selectedPlayer: '',
        filteredPlayers: [],
        isOverlayVisible: false,
        isToastVisible: false
    };

    componentDidUpdate(prevProps: PlayerSearchProps, prevState: PlayerSearchState) {
        if (this.state.selectedPlayer !== prevState.selectedPlayer) {
            this.props.trackPlayer(this.state.selectedPlayer);
        }

        if (this.props.trackedPlayers.length > prevProps.trackedPlayers.length) {
            this.setState({
                isToastVisible: true
            });
            setTimeout(() => {
                this.setState({ isToastVisible: false });
            }, this.TOAST_TIME);
        }
    }

    render() {
        return (
            <>
                <TouchableOpacity onPress={this._handleOnPress}>
                    <Icon name="search" color="#fff" />
                </TouchableOpacity>

                <Overlay
                    fullScreen={false}
                    height={Math.round(Dimensions.get('window').height) - 350}
                    isVisible={this.state.isOverlayVisible}
                    onBackdropPress={this._handleBackdropPress}
                >
                    <View>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Search for a player to track"
                            value={this.state.searchText}
                            onChangeText={searchText => {
                                this.setState({
                                    searchText,
                                    filteredPlayers: this._filterPlayersByName(searchText)
                                });
                            }}
                        />

                        <FlatList
                            style={{ height: Math.round(Dimensions.get('window').height) - 410 }}
                            data={this.state.filteredPlayers}
                            extraData={this.props.trackedPlayers}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this._renderPlayerListItem(item)}
                        />

                        {this.state.isToastVisible && this.state.selectedPlayer && (
                            <Toast
                                visible={this.state.isToastVisible}
                                position={-100}
                                shadow={false}
                                animation={false}
                                hideOnPress={true}
                            >
                                {this.props.playerMap[this.state.selectedPlayer].name} is now being tracked
                            </Toast>
                        )}
                    </View>
                </Overlay>
            </>
        );
    }

    private _filterPlayersByName = (searchText: string) => {
        const filteredPlayers: IPlayer[] = [];

        for (let player in this.props.playerMap) {
            if (this.props.playerMap[player].name.toLowerCase().includes(searchText.toLowerCase())) {
                filteredPlayers.push(this.props.playerMap[player]);
            }
        }

        return filteredPlayers;
    };

    private _renderPlayerListItem = (player: IPlayer) => {
        const { id, name, avatarUrl, position } = player;
        return (
            <ListItem
                key={id}
                title={name}
                subtitle={position}
                bottomDivider
                onPress={() => this._handleTrackPlayer(id)}
                leftAvatar={
                    <Avatar rounded size="medium" avatarStyle={styles.avatarStyle} source={{ uri: avatarUrl }} />
                }
                rightIcon={
                    this.props.trackedPlayers.some(playerId => playerId === id) ? { name: 'remove' } : { name: 'add' }
                }
            />
        );
    };

    private _handleTrackPlayer = (selectedPlayer: string) => {
        if (!this.props.trackedPlayers.some(playerId => playerId === selectedPlayer)) {
            this.setState({ selectedPlayer });
        }
    };

    private _handleOnPress = () => {
        this.setState({ isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ isOverlayVisible: false });
    };
}

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});

const mapStateToProps = ({ playerSettings, user }: AppState) => {
    return {
        error: playerSettings.error,
        loading: playerSettings.loading,
        playerMap: playerSettings.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        trackPlayer: (playerId: string) => dispatch(playerSettingsActions.trackPlayer(playerId))
    };
};

export const PlayerSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearchUnconnected);
