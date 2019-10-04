import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { IPlayerMap } from '../../../store/playerSettings/types';
import { untrackPlayer } from '../../../store/playerSettings/actions';

interface ITrackedPlayerListProps {
    trackedPlayers: string[];
    playerMap: IPlayerMap;
    untrackPlayer: typeof untrackPlayer;
}

const TrackedPlayerList = (props: ITrackedPlayerListProps) => {
    return (
        <View>
            {props.trackedPlayers && props.trackedPlayers.length
                ? props.trackedPlayers.map((playerId: string) => {
                      return (
                          <View key={playerId}>
                              <Text>{props.playerMap[playerId].name}</Text>
                              <TouchableOpacity onPress={() => props.untrackPlayer(props.playerMap[playerId].id)}>
                                  <Text>Untrack</Text>
                              </TouchableOpacity>
                          </View>
                      );
                  })
                : null}
        </View>
    );
};

export { TrackedPlayerList };
