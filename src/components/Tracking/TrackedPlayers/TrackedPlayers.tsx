import React from 'react';
import { Header, Text } from 'react-native-elements';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/players/actions';

import { AppState } from '../../../store';
import { IPlayerMap } from '../../../store/players/types';
import { PlayerSearch } from '../PlayerSearch/PlayerSearch';
import { TrackedPlayerCard } from '../common/TrackedPlayerCard';

interface ITrackedPlayersPropsFromState {
    trackedPlayers: string[];
    playerMap: IPlayerMap;
}

interface ITrackedPlayersPropsFromDispatch {
    untrackPlayer: typeof playerSettingsActions.untrackPlayer;
}

type TrackedPlayersProps = ITrackedPlayersPropsFromState & ITrackedPlayersPropsFromDispatch;

class TrackedPlayersUnconnected extends React.Component<TrackedPlayersProps> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    centerComponent={{ text: 'Tracked Players', style: { color: '#fff' } }}
                    rightComponent={<PlayerSearch />}
                />
            )
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <>
                {this.props.trackedPlayers.length ? (
                    <FlatList
                        data={this.props.trackedPlayers}
                        keyExtractor={playerId => playerId}
                        renderItem={({ item }) => this._renderPlayerListItem(item)}
                    />
                ) : (
                    <View style={styles.centeredMessageContainer}>
                        <Text>There are no tracked players to untrack</Text>
                    </View>
                )}
            </>
        );
    }

    private _renderPlayerListItem = (playerId: string) => {
        return (
            <TrackedPlayerCard
                key={playerId}
                playerId={playerId}
                tracked={true}
                playerMap={this.props.playerMap}
                onPress={() => this._handleUntrackPlayer(playerId)}
            />
        );
    };

    private _handleUntrackPlayer = (playerId: string) => {
        Alert.alert(
            `Confirm`,
            `Untrack ${this.props.playerMap[playerId].name}?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.untrackPlayer(playerId);
                    }
                }
            ],
            { cancelable: false }
        );
    };
}

const styles = StyleSheet.create({
    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state: AppState) => {
    return {
        playerMap: state.playerSettings.playerMap,
        trackedPlayers: state.user.userPreferences.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        untrackPlayer: (playerId: string) => dispatch(playerSettingsActions.untrackPlayer(playerId))
    };
};

export const TrackedPlayers = connect(mapStateToProps, mapDispatchToProps)(TrackedPlayersUnconnected);
