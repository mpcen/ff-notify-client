import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { IPlayer } from '../../../store/playerSettings/types';

interface IPlayerCardProps {
    player: IPlayer;
    handleTrackPlayer(): void;
}

export const PlayerCard = (props: IPlayerCardProps) => {
    return (
        <View>
            <Text>{props.player.name}</Text>

            <TouchableOpacity onPress={props.handleTrackPlayer}>
                <Text>Follow</Text>
            </TouchableOpacity>
        </View>
    );
};
