import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSearchActions from '../../store/playerSearch/actions';

import { AppState } from '../../store';
import { IPlayer } from '../../store/playerSearch/types';
import { IPlayerSearchState } from '../../store/playerSearch/reducer';

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
        filteredPlayers: []
    };

    public componentDidMount() {
        this.props.fetchPlayers();
    }

    render() {
        return (
            <View>
                <Input
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

                <FlatList
                    data={this.state.filteredPlayers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: IPlayer }) => this._renderListItem(item)}
                />
            </View>
        );
    }

    private _renderListItem = (player: IPlayer) => {
        return <Text>{player.name}</Text>;
    };
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
