import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayer } from '../../../store/playerSettings/types';

interface ITrackedPlayersPropsFromState {
    trackedPlayers: IPlayer[];
}

interface ITrackedPlayersPropsFromDispatch {
    untrackPlayer: typeof playerSettingsActions.untrackPlayer;
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
                    ? this.props.trackedPlayers.map((player: IPlayer, index: number) => {
                          return (
                              <View key={index}>
                                  <Text>{player.name}</Text>
                                  <TouchableOpacity
                                      onPress={() => this.props.untrackPlayer(player, this.props.trackedPlayers)}
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
        trackedPlayers: state.playerSettings.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        untrackPlayer: (player: IPlayer, trackedPlayers: IPlayer[]) =>
            dispatch(playerSettingsActions.untrackPlayer(player, trackedPlayers))
    };
};

export const TrackedPlayers = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackedPlayersUnconnected);
