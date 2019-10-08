import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayer, IPlayerMap } from '../../../store/playerSettings/types';
import Toast from 'react-native-root-toast';

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
    selectedPlayerId: string;
    toastVisible: boolean;
}

type PlayerSearchProps = IPlayerSearchPropsFromState & IPlayerSearchPropsFromDispatch & IPlayerSearchUnconnectedState;
type PlayerSearchState = IPlayerSearchUnconnectedState;

export class PlayerSearchUnconnected extends React.Component<PlayerSearchProps, PlayerSearchState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings - Search', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    state: PlayerSearchState = {
        searchText: '',
        selectedPlayerId: '',
        filteredPlayers: [],
        toastVisible: false
    };

    componentDidUpdate(prevProps: PlayerSearchProps) {
        if (this.props.trackedPlayers.length > prevProps.trackedPlayers.length) {
            this.setState({ toastVisible: true });
            setTimeout(() => {
                this.setState({ toastVisible: false });
            }, 1500);
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
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => this._renderPlayerListItem(item)}
                />

                {this.state.toastVisible && (
                    <Toast
                        visible={this.state.toastVisible}
                        position={-100}
                        shadow={false}
                        animation={false}
                        hideOnPress={true}
                    >
                        {this.props.playerMap[this.state.selectedPlayerId].name} is now being tracked
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
                onPress={() => this._handleTrackPlayer(id)}
                leftAvatar={
                    <Avatar rounded size="medium" avatarStyle={styles.avatarStyle} source={{ uri: avatarUrl }} />
                }
                title={name}
                subtitle={position}
                rightIcon={this.props.trackedPlayers.some(playerId => playerId === id) ? null : { name: 'add' }}
                bottomDivider
            />
        );
    };

    private _handleTrackPlayer = (selectedPlayerId: string) => {
        if (!this.props.trackedPlayers.some(playerId => playerId === selectedPlayerId)) {
            this.setState({ selectedPlayerId });
            this.props.trackPlayer(selectedPlayerId);
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
