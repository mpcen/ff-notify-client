import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { PlayerStory } from './PlayerStory';

export class Stories extends React.Component {
    render() {
        const { storiesContainer } = styles;

        return (
            <View style={storiesContainer}>
                <PlayerStory />
                <PlayerStory />
                <PlayerStory />
                <PlayerStory />
                <PlayerStory />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    storiesContainer: {
        flexDirection: 'row',
        height: Constants.statusBarHeight * 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
