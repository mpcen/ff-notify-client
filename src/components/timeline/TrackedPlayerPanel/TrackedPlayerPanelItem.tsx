import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge, Avatar } from 'react-native-elements';
import { IPlayer } from '../../../store/playerSettings/types';

interface ITrackedPlayerPanelItemProps {
    trackedPlayer: IPlayer;
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
        <View style={playerStoryContainer}>
            <Avatar
                rounded
                size="medium"
                avatarStyle={avatarStyle}
                containerStyle={avatarContainerStyle}
                source={{ uri: trackedPlayer.avatarUrl }}
            />

            <Badge
                containerStyle={badgeContainerStyle}
                badgeStyle={badgeStyle}
                value={<Text style={badgeText}>6</Text>}
            />
        </View>
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
        bottom: 8,
        right: 8
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
