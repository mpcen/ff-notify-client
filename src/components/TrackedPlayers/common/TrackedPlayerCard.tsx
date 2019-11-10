import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import { TrackPlayerButton } from './TrackPlayerButton';
import { TEAMS } from '../../../util/teams';
import { IPlayerMap } from '../../../store/playerSettings/types';

interface ITrackedPlayerCardProps {
    playerId?: string;
    disabled?: boolean;
    tracked: boolean;
    playerMap: IPlayerMap;
    onPress(): void;
}

type TrackedPlayerCardProps = ITrackedPlayerCardProps;

export class TrackedPlayerCard extends React.Component<TrackedPlayerCardProps> {
    shouldComponentUpdate(nextProps: TrackedPlayerCardProps) {
        if (this.props.disabled !== nextProps.disabled || this.props.tracked !== nextProps.tracked) {
            return true;
        }

        return false;
    }

    render() {
        const { name, position, avatarUrl, teamId } = this.props.playerMap[this.props.playerId];
        const { disabled, tracked, onPress } = this.props;

        return (
            <ListItem
                title={name}
                subtitle={`${position} | ${TEAMS[teamId - 1].abbrev}`}
                bottomDivider
                leftAvatar={
                    <Avatar rounded size="medium" avatarStyle={styles.avatarStyle} source={{ uri: avatarUrl }} />
                }
                rightIcon={<TrackPlayerButton disabled={disabled} tracked={tracked} onPress={onPress} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});
