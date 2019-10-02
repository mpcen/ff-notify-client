import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayer, IPlayerMap } from '../../../store/playerSettings/types';

interface ITrackedPlayersPropsFromState {
    trackedPlayers: string[];
    playerMap: IPlayerMap;
}

interface ITrackedPlayersPropsFromDispatch {
    untrackPlayer: typeof playerSettingsActions.untrackPlayer;
    fetchTrackedPlayers: typeof playerSettingsActions.fetchTrackedPlayers;
}

type TrackedPlayersProps = ITrackedPlayersPropsFromState & ITrackedPlayersPropsFromDispatch;

class TrackedPlayersUnconnected extends React.Component<TrackedPlayersProps> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings - Tracked Players', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <View>
                {this.props.trackedPlayers.length
                    ? this.props.trackedPlayers.map((playerId: string) => {
                          return (
                              <View key={playerId}>
                                  <Text>{this.props.playerMap[playerId].name}</Text>
                                  <TouchableOpacity
                                      onPress={() => this.props.untrackPlayer(this.props.playerMap[playerId].id)}
                                  >
                                      <Text>Untrack</Text>
                                  </TouchableOpacity>
                              </View>
                          );
                      })
                    : null}
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        playerMap: state.playerSettings.playerMap,
        trackedPlayers: state.playerSettings.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        untrackPlayer: (playerId: string) => dispatch(playerSettingsActions.untrackPlayer(playerId))
    };
};

export const TrackedPlayers = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackedPlayersUnconnected);
