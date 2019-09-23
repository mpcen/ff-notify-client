import React from 'react';
import Constants from 'expo-constants';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Timeline } from '../components/Timeline/Timeline';
import { AlertSettings } from '../components/AlertSettings/AlertSettings';
import { PlayerSearch } from '../components/PlayerSettings/PlayerSearch/PlayerSearch';
import { TrackedPlayers } from '../components/PlayerSettings/TrackedPlayers/TrackedPlayers';
import { Account } from '../components/User/Account';
import { Signin } from '../components/User/Signin';
import { Signup } from '../components/User/Signup';

const TimelineStack = createStackNavigator({ Timeline });
const AlertSettingsStack = createStackNavigator({ AlertSettings });
const AccountStack = createStackNavigator({ Account });
const PlayerSettingsTabs = createMaterialTopTabNavigator(
    {
        PlayerSearch,
        TrackedPlayers
    },
    {
        initialRouteName: 'PlayerSearch',
        tabBarOptions: {
            style: {
                paddingTop: Constants.statusBarHeight
            }
        }
    }
);
const LoginStack = createStackNavigator({
    Signup,
    Signin
});
const MainFlow = createBottomTabNavigator(
    {
        Timeline: TimelineStack,
        PlayerSettings: PlayerSettingsTabs,
        AlertSettings: AlertSettingsStack
        // Account: AccountStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = MaterialCommunityIcons;
                let iconName;

                if (routeName === 'Timeline') {
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
        initialRouteName: 'PlayerSettings'
    }
);

const AppNavigator = createSwitchNavigator(
    {
        LoginStack,
        MainFlow
    },
    {
        initialRouteName: 'LoginStack'
    }
);

export const AppContainer = createAppContainer(AppNavigator);
