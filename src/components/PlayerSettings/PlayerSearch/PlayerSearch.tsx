import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input, ListItem, Avatar, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayer, IPlayerMap } from '../../../store/playerSettings/types';
import Toast from 'react-native-root-toast';
import { selectPlayer } from '../../../store/trackedPlayerPanel/actions';

interface IPlayerSearchPropsFromState {
    playerMap: IPlayerMap;
    loading: boolean;
    error: boolean;
    trackedPlayers: string[];
}

interface IPlayerSearchPropsFromDispatch {
    fetchPlayers: typeof playerSettingsActions.fetchPlayers;
    trackPlayer: typeof playerSettingsActions.trackPlayer;
}

interface IPlayerSearchUnconnectedState {
    searchText: string;
    filteredPlayers: IPlayer[];
    selectedPlayer: string;
    isToastVisible: boolean;
}

type PlayerSearchProps = IPlayerSearchPropsFromState & IPlayerSearchPropsFromDispatch & IPlayerSearchUnconnectedState;
type PlayerSearchState = IPlayerSearchUnconnectedState;

export class PlayerSearchUnconnected extends React.Component<PlayerSearchProps, PlayerSearchState> {
    private TOAST_TIME = 2000;

    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings - Search', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    state: PlayerSearchState = {
        searchText: '',
        selectedPlayer: '',
        filteredPlayers: [],
        isToastVisible: false
    };

    componentDidUpdate(prevProps: PlayerSearchProps) {
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
                    data={this.state.filteredPlayers}
                    extraData={this.props.trackedPlayers}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => this._renderPlayerListItem(item)}
                />

                {this.state.isToastVisible && (
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

    private _filterPlayersByName(searchText: string) {
        const filteredPlayers: IPlayer[] = [];

        for (let player in this.props.playerMap) {
            if (this.props.playerMap[player].name.toLowerCase().includes(searchText.toLowerCase())) {
                filteredPlayers.push(this.props.playerMap[player]);
            }
        }

        return filteredPlayers;
    }

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
            this.props.trackPlayer(selectedPlayer);
        }
    };
}

const mapStateToProps = ({ playerSettings, user }: AppState): IPlayerSearchPropsFromState => {
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

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});
