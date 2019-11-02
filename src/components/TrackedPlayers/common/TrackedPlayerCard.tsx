import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';

import { TrackPlayerButton } from './TrackPlayerButton';
import { TEAMS } from '../../../util/teams';
import { AppState } from '../../../store';
import { IPlayerMap } from '../../../store/playerSettings/types';

interface ITrackedPlayerCardProps {
    playerId?: string;
    disabled?: boolean;
    tracked: boolean;
    onPress(): void;
}

interface ITrackedPlayerCardPropsFromState {
    playerMap: IPlayerMap;
}

type TrackedPlayerCardProps = ITrackedPlayerCardProps & ITrackedPlayerCardPropsFromState;

const TrackedPlayerCardUnconnected = (props: TrackedPlayerCardProps) => {
    const { name, position, avatarUrl, teamId } = props.playerMap[props.playerId];
    const { disabled, tracked, onPress } = props;

    return (
        <ListItem
            title={name}
            subtitle={`${position} | ${TEAMS[teamId - 1].abbrev}`}
            bottomDivider
            leftAvatar={<Avatar rounded size="medium" avatarStyle={styles.avatarStyle} source={{ uri: avatarUrl }} />}
            rightIcon={<TrackPlayerButton disabled={disabled} tracked={tracked} onPress={onPress} />}
        />
    );
};

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});

const mapStateToProps = (state: AppState) => {
    return {
        playerMap: state.playerSettings.playerMap
    };
};

export const TrackedPlayerCard = connect(mapStateToProps)(TrackedPlayerCardUnconnected);
