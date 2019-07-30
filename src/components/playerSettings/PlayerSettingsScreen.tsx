import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header, Input } from 'react-native-elements';
import axios, { AxiosResponse } from 'axios';

enum SearchOptions {
    Popular,
    Position,
    Team
}

interface IPlayerSettingsScreenState {
    selectedSearchOption: SearchOptions;
    players: IPlayer[];
    filteredPlayers: IPlayer[];
    searchText: string;
    loading: boolean;
    error: boolean;
}

export interface IPlayer {
    name: string;
    college: string;
    suffix?: string;
    teamId: number;
    number: string;
    position: string;
}

export class PlayerSettingsScreen extends React.Component<{}, IPlayerSettingsScreenState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    public state: IPlayerSettingsScreenState = {
        selectedSearchOption: SearchOptions.Popular,
        players: [],
        filteredPlayers: [],
        searchText: '',
        loading: true,
        error: false
    };

    componentDidMount() {
        this._fetchPlayers();
    }

    render() {
        const { loading } = this.state;
        return (
            <View>
                {loading ? <Text>Loading</Text> : null}

                <Input
                    placeholder="Search for a player"
                    value={this.state.searchText}
                    onChangeText={searchText => {
                        this.setState({
                            searchText,
                            filteredPlayers: this.state.players.filter(player => player.name.includes(searchText))
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

    private _fetchPlayers = async () => {
        const uri = 'http://192.168.0.210:3000/players';
        let players: AxiosResponse<any>;

        axios.get(uri);

        try {
            players = await axios.get(uri);

            this.setState({ players: players.data[0].players, loading: false, error: false });
        } catch (e) {
            this.setState({ loading: false, error: true });
        }
    };
}
