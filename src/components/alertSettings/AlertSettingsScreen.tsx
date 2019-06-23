import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Header } from 'react-native-elements';
import Constants from 'expo-constants';

export class AlertSettingsScreen extends React.Component {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Alert Settings', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    componentDidMount() {
        console.log('height:', Constants.statusBarHeight);
    }

    render() {
        return (
            <View>
                <Text>Alert Settings Screen</Text>
            </View>
        );
    }
}
