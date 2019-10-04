import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayer, IPlayerMap } from '../../../store/playerSettings/types';
import { IPlayerSettingsState } from '../../../store/playerSettings/reducer';

import { PlayerCard } from './PlayerCard';
import { PlayerListItem } from './PlayerListItem';

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
                            filteredPlayers: this._filterPlayersByName(searchText)
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

    private _filterPlayersByName(searchText: string) {
        const filteredPlayers: IPlayer[] = [];

        for (let player in this.props.playerMap) {
            if (this.props.playerMap[player].name.toLowerCase().includes(searchText)) {
                filteredPlayers.push(this.props.playerMap[player]);
            }
        }

        return filteredPlayers;
    }

    private _renderPlayerListItem = (player: IPlayer) => {
        return <PlayerListItem player={player} handlePlayerSelect={this._handlePlayerSelect} />;
    };

    private _handlePlayerSelect = (player: IPlayer) => {
        this.setState({ selectedPlayer: player, isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ selectedPlayer: null, isOverlayVisible: false });
    };

    private _handleTrackPlayer = () => {
        this.props.trackPlayer(this.state.selectedPlayer.id);
    };
}

const mapStateToProps = ({ playerSettings, user }: AppState): IPlayerSettingsState => {
    return {
        error: playerSettings.error,
        loading: playerSettings.loading,
        playerMap: playerSettings.playerMap
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
