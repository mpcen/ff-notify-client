import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { IPlayerMap } from '../../../store/playerSettings/types';
import { untrackPlayer } from '../../../store/playerSettings/actions';

interface ITrackedPlayerListProps {
    trackedPlayers: string[];
    playerMap: IPlayerMap;
    untrackPlayer: typeof untrackPlayer;
}

const TrackedPlayerList = (props: ITrackedPlayerListProps) => {
    const { trackedPlayers, playerMap } = props;

    return (
        <View>
            {trackedPlayers.map(playerId => {
                const { avatarUrl, name, position } = playerMap[playerId];

                return (
                    <ListItem
                        key={playerId}
                        onPress={() => props.untrackPlayer(playerId)}
                        leftAvatar={
                            <Avatar
                                rounded
                                size="medium"
                                avatarStyle={styles.avatarStyle}
                                source={{ uri: avatarUrl }}
                            />
                        }
                        rightIcon={{ name: 'remove' }}
                        title={name}
                        subtitle={position}
                        bottomDivider
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});

export { TrackedPlayerList };
