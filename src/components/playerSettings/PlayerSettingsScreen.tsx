import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements';

export class PlayerSettingsScreen extends React.Component {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Player Settings', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <View>
                <Text>Player Settings Screen</Text>
            </View>
        );
    }
}
