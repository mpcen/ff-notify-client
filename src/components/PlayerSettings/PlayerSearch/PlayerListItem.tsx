import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { IPlayer } from '../../../store/playerSettings/types';

interface IPlayerListItemProps {
    player: IPlayer;
    handlePlayerSelect(player: IPlayer): void;
}

export const PlayerListItem = (props: IPlayerListItemProps) => {
    const { handlePlayerSelect, player } = props;
    const { avatarStyle } = styles;

    return (
        <ListItem
            key={player.id}
            onPress={() => handlePlayerSelect(player)}
            leftAvatar={<Avatar rounded size="medium" avatarStyle={avatarStyle} source={{ uri: player.avatarUrl }} />}
            rightIcon={{ name: 'add-alarm' }}
            title={player.name}
            subtitle={player.position}
            bottomDivider
        />
    );
};

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: 'white',
        borderColor: 'white'
    }
});
