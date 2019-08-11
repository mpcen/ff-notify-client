import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';

export class TrackedPlayers extends React.Component {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings - Tracked Players', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <View>
                <Text>TrackedPlayer</Text>
            </View>
        );
    }
}
