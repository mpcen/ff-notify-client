import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSearchActions from '../../../store/playerSearch/actions';

import { AppState } from '../../../store';
import { IPlayer } from '../../../store/playerSearch/types';
import { IPlayerSearchState } from '../../../store/playerSearch/reducer';

import { PlayerCard } from './PlayerCard';

interface IPlayerSearchPropsFromState {
    players: IPlayer[];
    loading: boolean;
    error: boolean;
}

interface IPlayerSearchPropsFromDispatch {
    fetchPlayers: typeof playerSearchActions.fetchPlayers;
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

export class PlayerSearchUnconnected extends React.Component<PlayerSearchProps> {
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
                    <PlayerCard player={this.state.selectedPlayer} handlePlayerFollow={this._handlePlayerFollow} />
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
        this.setState({ searchText: player.name, selectedPlayer: player, isOverlayVisible: true });
    };

    private _handleBackdropPress = () => {
        this.setState({ selectedPlayer: null, isOverlayVisible: false });
    };

    private _handlePlayerFollow = () => {};
}

const mapStateToProps = ({ playerSearch }: AppState): IPlayerSearchState => {
    return {
        error: playerSearch.error,
        loading: playerSearch.loading,
        players: playerSearch.players
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayers: () => dispatch(playerSearchActions.fetchPlayers())
    };
};

export const PlayerSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearchUnconnected);
