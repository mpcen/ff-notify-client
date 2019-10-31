import * as React from 'react';
import { View, StyleSheet, FlatList, Keyboard } from 'react-native';
import { Input, ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';
import { IPlayerMap, IPlayer } from '../../../store/playerSettings/types';
import { AppState } from '../../../store';

import { InputClearer } from '../../common/InputClearer';
import { TEAMS } from '../../../util/teams';

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
            <View>
                <Input
                    placeholder={`Try "Tom Brady"`}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.searchText}
                    onChangeText={searchText => {
                        this.setState({
                            searchText,
                            filteredPlayers: this._filterPlayersByName(searchText)
                        });
                    }}
                    rightIcon={
                        this.state.searchText ? (
                            <InputClearer
                                iconName="clear"
                                color="gray"
                                onPress={() => this.setState({ searchText: '' })}
                            />
                        ) : null
                    }
                />

                <FlatList
                    data={this.state.filteredPlayers}
                    extraData={this.props.trackedPlayers}
                    keyExtractor={item => item.id}
                    keyboardShouldPersistTaps="handled"
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
        const { id, name, avatarUrl, position, teamId } = player;
        return (
            <ListItem
                key={id}
                title={name}
                subtitle={`${position} | ${TEAMS[teamId - 1].abbrev}`}
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
        Keyboard.dismiss();

        if (!this.props.trackedPlayers.some(playerId => playerId === selectedPlayer)) {
            this.props.trackPlayer(selectedPlayer);
            this.setState({ selectedPlayer });
        }
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
