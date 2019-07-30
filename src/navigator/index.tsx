import React from 'react';

import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TimeLineScreen } from '../components/TimeLine/TimeLineScreen';
import { AlertSettingsScreen } from '../components/AlertSettings/AlertSettingsScreen';
import { PlayerSettingsScreen } from '../components/PlayerSettings/PlayerSettingsScreen';

const TimeLineStack = createStackNavigator({
    TimeLine: TimeLineScreen
});

const AlertSettingsStack = createStackNavigator({
    AlertSettings: AlertSettingsScreen
});

const PlayerSettingsStack = createStackNavigator({
    PlayerSettings: PlayerSettingsScreen
});

const AppNavigator = createBottomTabNavigator(
    {
        TimeLine: TimeLineStack,
        PlayerSettings: PlayerSettingsStack,
        AlertSettings: AlertSettingsStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = MaterialCommunityIcons;
                let iconName;

                if (routeName === 'TimeLine') {
                    iconName = `home-alert`;
                } else if (routeName === 'PlayerSettings') {
                    iconName = `account-group`;
                } else if (routeName === 'AlertSettings') {
                    iconName = `tune`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false
        },
        initialRouteName: 'TimeLine'
    }
);

export const AppContainer = createAppContainer(AppNavigator);
