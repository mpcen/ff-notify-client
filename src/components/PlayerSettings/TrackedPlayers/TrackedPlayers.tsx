import React from 'react';
import { Header } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from '../../../store/playerSettings/actions';

import { AppState } from '../../../store';
import { IPlayerMap } from '../../../store/playerSettings/types';
import { TrackedPlayerList } from './TrackedPlayerList';

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
            header: <Header centerComponent={{ text: 'Player Settings - Tracked Players', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <TrackedPlayerList
                trackedPlayers={this.props.trackedPlayers}
                playerMap={this.props.playerMap}
                untrackPlayer={this.props.untrackPlayer}
            />
        );
    }
}

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

export const TrackedPlayers = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackedPlayersUnconnected);
