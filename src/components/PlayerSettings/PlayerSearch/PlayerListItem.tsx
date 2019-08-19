import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IPlayer } from '../../../store/playerSettings/types';

interface IPlayerListItemProps {
    player: IPlayer;
    handlePlayerSelect(player: IPlayer): void;
}

export const PlayerListItem = (props: IPlayerListItemProps) => {
    return (
        <TouchableOpacity onPress={() => props.handlePlayerSelect(props.player)}>
            <View>
                <Text>{props.player.name}</Text>
            </View>
        </TouchableOpacity>
    );
};
