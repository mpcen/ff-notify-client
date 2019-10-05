import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Avatar } from 'react-native-elements';

import { IPlayer } from '../../../store/playerSettings/types';

interface ITrackedPlayerPanelItemProps {
    trackedPlayer: IPlayer;
    onLongPress: () => void;
    onPress: () => void;
}

export const TrackedPlayerPanelItem = (props: ITrackedPlayerPanelItemProps) => {
    const trackedPlayer = props.trackedPlayer;
    const {
        playerStoryContainer,
        avatarStyle,
        avatarContainerStyle,
        badgeContainerStyle,
        badgeStyle,
        badgeText
    } = styles;

    return (
        <TouchableOpacity style={playerStoryContainer} onLongPress={props.onLongPress} onPress={props.onPress}>
            <Avatar
                rounded
                size="medium"
                avatarStyle={avatarStyle}
                containerStyle={avatarContainerStyle}
                source={{ uri: trackedPlayer.avatarUrl }}
            />

            {/* <Badge
                containerStyle={badgeContainerStyle}
                badgeStyle={badgeStyle}
                value={<Text style={badgeText}>6</Text>}
            /> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    playerStoryContainer: {
        padding: 8
    },
    avatarStyle: {
        backgroundColor: 'white',
        borderColor: 'white'
    },
    avatarContainerStyle: {
        borderColor: '#2089dc',
        borderStyle: 'solid',
        borderWidth: 1.5
    },
    badgeContainerStyle: {
        position: 'absolute',
        bottom: 6,
        right: 6
    },
    badgeStyle: {
        backgroundColor: '#ff5a5f',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 8
    }
});
