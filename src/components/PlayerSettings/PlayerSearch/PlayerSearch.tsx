import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayer } from '../../../store/playerSettings/types';
import { IPlayerSettingsState } from '../../../store/playerSettings/reducer';

import { PlayerCard } from './PlayerCard';

interface IPlayerSearchPropsFromState {
    players: IPlayer[];
    loading: boolean;
    error: boolean;
}

interface IPlayerSearchPropsFromDispatch {
    fetchPlayers: typeof playerSettingsActions.fetchPlayers;
    trackPlayer: typeof playerSettingsActions.trackPlayer;
}

interface IPlayerSearchUnconnectedState {
    searchText: string;
    filteredPlayers: IPlayer[];
    selectedPlayer: IPlayer;
    isOverlayVisible: boolean;
}

interface IPlayerSearchProps {}

type PlayerSearchProps = IPlayerSearchProps &
    IPlayerSearchPropsFromState &
    IPlayerSearchPropsFromDispatch &
    IPlayerSearchUnconnectedState;

export class PlayerSearchUnconnected extends React.Component<PlayerSearchProps, IPlayerSearchUnconnectedState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings - Search', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    state: IPlayerSearchUnconnectedState = {
        searchText: '',
        filteredPlayers: [],
        selectedPlayer: null,
        isOverlayVisible: false
    };

    public componentDidMount() {
        this.props.fetchPlayers();
    }

    render() {
        return (
            <View>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Search for a player"
                    value={this.state.searchText}
                    onChangeText={searchText => {
                        this.setState({
                            searchText,
                            filteredPlayers: this.props.players.filter(player =>
                                player.name.toLowerCase().includes(searchText)
                            )
                        });
                    }}
                />

                <Overlay isVisible={this.state.isOverlayVisible} onBackdropPress={this._handleBackdropPress}>
                    <PlayerCard player={this.state.selectedPlayer} handleTrackPlayer={this._handleTrackPlayer} />
                </Overlay>

                <FlatList
                    data={this.state.filteredPlayers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: IPlayer }) => this._renderPlayerListItem(item)}
                />
            </View>
        );
    }

    private _renderPlayerListItem = (player: IPlayer) => {
        return (
            <TouchableOpacity onPress={() => this._handlePlayerSelect(player)}>
                <Text>{player.name}</Text>
            </TouchableOpacity>
        );
    };

    private _handlePlayerSelect = (player: IPlayer) => {
        this.setState({ selectedPlayer: player, isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ selectedPlayer: null, isOverlayVisible: false });
    };

    private _handleTrackPlayer = () => {
        this.props.trackPlayer(this.state.selectedPlayer);
    };
}

const mapStateToProps = ({ playerSettings }: AppState): IPlayerSettingsState => {
    return {
        error: playerSettings.error,
        loading: playerSettings.loading,
        players: playerSettings.players,
        trackedPlayers: playerSettings.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayers: () => dispatch(playerSettingsActions.fetchPlayers()),
        trackPlayer: (player: IPlayer) => dispatch(playerSettingsActions.trackPlayer(player))
    };
};

export const PlayerSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearchUnconnected);
