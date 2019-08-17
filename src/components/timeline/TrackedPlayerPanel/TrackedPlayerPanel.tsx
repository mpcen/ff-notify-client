import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

import { AppState } from '../../../store';

import { TrackedPlayerPanelItem } from './TrackedPlayerPanelItem';
import { IPlayer } from '../../../store/playerSettings/types';

interface ITrackedPlayerPanelItemPropsFromState {
    trackedPlayers: IPlayer[];
}

type TrackedPlayerPanelProps = ITrackedPlayerPanelItemPropsFromState;

export class TrackedPlayerPanelUnconnected extends React.Component<TrackedPlayerPanelProps> {
    render() {
        const { storiesContainer } = styles;
        const { trackedPlayers } = this.props;
        return trackedPlayers.length ? (
            <View style={storiesContainer}>{this._renderTrackedPlayerPanelItemList(this.props.trackedPlayers)}</View>
        ) : (
            <View style={storiesContainer}>
                <Text>No Tracked Players</Text>
            </View>
        );
    }

    private _renderTrackedPlayerPanelItemList(trackedPlayers: IPlayer[]) {
        return trackedPlayers.map(trackedPlayer => {
            return <TrackedPlayerPanelItem key={trackedPlayer.id} trackedPlayer={trackedPlayer} />;
        });
    }
}

const styles = StyleSheet.create({
    storiesContainer: {
        flexDirection: 'row',
        height: Constants.statusBarHeight * 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = ({ playerSettings }: AppState): ITrackedPlayerPanelItemPropsFromState => {
    return {
        trackedPlayers: playerSettings.trackedPlayers
    };
};
export const TrackedPlayerPanel = connect(mapStateToProps)(TrackedPlayerPanelUnconnected);
