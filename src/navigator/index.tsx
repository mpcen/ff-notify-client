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
import { SignIn } from '../components/User/SignIn';
import { SignUp } from '../components/User/SignUp';
import { ResolveAuth } from '../ResolveAuth';
import { NAVROUTES } from './navRoutes';

const TimelineStack = createStackNavigator({ Timeline });
const AlertSettingsStack = createStackNavigator({ AlertSettings });
const AccountStack = createStackNavigator({ Account });
const PlayerSettingsTabs = createMaterialTopTabNavigator(
    {
        [NAVROUTES.PlayerSearch]: {
            screen: PlayerSearch
        },
        [NAVROUTES.TrackedPlayers]: {
            screen: TrackedPlayers
        }
    },
    {
        initialRouteName: NAVROUTES.PlayerSearch,
        tabBarOptions: {
            style: {
                paddingTop: Constants.statusBarHeight
            }
        }
    }
);
const LogInStack = createStackNavigator({
    [NAVROUTES.SignUp]: {
        screen: SignUp
    },
    [NAVROUTES.SignIn]: {
        screen: SignIn
    }
});
const MainFlow = createBottomTabNavigator(
    {
        [NAVROUTES.Timeline]: {
            screen: TimelineStack
        },
        [NAVROUTES.PlayerSettings]: {
            screen: PlayerSettingsTabs
        },
        // [NAVROUTES.AlertSettings]: {
        //     screen: AlertSettingsStack
        // },
        [NAVROUTES.Account]: {
            screen: AccountStack
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = MaterialCommunityIcons;
                let iconName;

                if (routeName === NAVROUTES.Timeline) {
                    iconName = `home-alert`;
                } else if (routeName === NAVROUTES.PlayerSettings) {
                    iconName = `account-group`;
                }
                // else if (routeName === NAVROUTES.AlertSettings) {
                //     iconName = `tune`;
                // }
                else if (routeName === NAVROUTES.Account) {
                    iconName = `account`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: {
                height: 50
            }
        },
        initialRouteName: NAVROUTES.Timeline
    }
);

const AppNavigator = createSwitchNavigator(
    {
        [NAVROUTES.ResolveAuth]: {
            screen: ResolveAuth
        },
        [NAVROUTES.LogInStack]: {
            screen: LogInStack
        },
        [NAVROUTES.MainFlow]: {
            screen: MainFlow
        }
    },
    {
        initialRouteName: NAVROUTES.ResolveAuth
    }
);

export const AppContainer = createAppContainer(AppNavigator);
