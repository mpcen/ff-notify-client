import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { IPlayer } from '../../../store/playerSettings/types';

interface IPlayerListItemProps {
    player: IPlayer;
    handlePlayerSelect: (player: IPlayer) => void;
    trackedPlayers: string[];
}

export const PlayerListItem = (props: IPlayerListItemProps) => {
    const { handlePlayerSelect, player, trackedPlayers } = props;
    const { id, name, avatarUrl, position } = player;

    return (
        <ListItem
            key={player.id}
            onPress={() => handlePlayerSelect(player)}
            leftAvatar={<Avatar rounded size="medium" avatarStyle={styles.avatarStyle} source={{ uri: avatarUrl }} />}
            title={name}
            subtitle={position}
            rightIcon={trackedPlayers.some(playerId => playerId === id) ? null : { name: 'add' }}
            bottomDivider
        />
    );
};

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});
