import * as React from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playersActions from '../../../store/players/actions';
import { IPlayerMap, IPlayer } from '../../../store/players/types';
import { AppState } from '../../../store';

import { InputClearer } from '../../common/InputClearer';
import { TrackedPlayerCard } from '../common/TrackedPlayerCard';

interface IPlayerSearchUnconnectedState {
    searchText: string;
    filteredPlayers: IPlayer[];
    isOverlayVisible: boolean;
    trackedPlayers: Set<string>;
}

interface IPlayerSearchPropsFromState {
    playerMap: IPlayerMap;
    loading: boolean;
    error: boolean;
    trackedPlayers: string[];
}

interface IPlayerSearchPropsFromDispatch {
    trackPlayer: typeof playersActions.trackPlayer;
    trackPlayerReset: typeof playersActions.trackPlayerReset;
}

type PlayerSearchProps = IPlayerSearchPropsFromState & IPlayerSearchPropsFromDispatch;
type PlayerSearchState = IPlayerSearchUnconnectedState;

export class PlayerSearchUnconnected extends React.Component<PlayerSearchProps, PlayerSearchState> {
    state: PlayerSearchState = {
        searchText: '',
        filteredPlayers: [],
        isOverlayVisible: false,
        trackedPlayers: new Set()
    };

    componentDidMount() {
        this.setState({ trackedPlayers: new Set(this.props.trackedPlayers) });
    }

    componentDidUpdate(prevProps: PlayerSearchProps) {
        if (
            prevProps.trackedPlayers.length > this.props.trackedPlayers.length &&
            this.props.trackedPlayers.length < this.state.trackedPlayers.size
        ) {
            this.setState({ trackedPlayers: new Set(this.props.trackedPlayers) });
        }

        if (this.props.error) {
            this.setState({ trackedPlayers: new Set(this.props.trackedPlayers) });
            this.props.trackPlayerReset();
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
                    extraData={this.state.trackedPlayers}
                    keyExtractor={item => item.id}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => this._renderPlayerListItem(item.id)}
                />
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

    private _renderPlayerListItem = (playerId: string) => {
        return (
            <TrackedPlayerCard
                key={playerId}
                playerId={playerId}
                tracked={false}
                disabled={this.state.trackedPlayers.has(playerId) ? true : false}
                onPress={() => this._handleTrackPlayer(playerId)}
                playerMap={this.props.playerMap}
            />
        );
    };

    private _handleTrackPlayer = (selectedPlayer: string) => {
        Keyboard.dismiss();

        if (!this.state.trackedPlayers.has(selectedPlayer)) {
            this.props.trackPlayer(selectedPlayer);
            this.setState({ trackedPlayers: new Set(this.state.trackedPlayers).add(selectedPlayer) });
        }
    };
}

const mapStateToProps = ({ players, user }: AppState) => {
    return {
        error: players.error,
        loading: players.loading,
        playerMap: players.playerMap,
        trackedPlayers: user.userPreferences.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        trackPlayer: (playerId: string) => dispatch(playersActions.trackPlayer(playerId)),
        trackPlayerReset: () => dispatch(playersActions.trackPlayerReset())
    };
};

export const PlayerSearch = connect(mapStateToProps, mapDispatchToProps)(PlayerSearchUnconnected);
