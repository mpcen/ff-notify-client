import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createMaterialTopTabNavigator
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { Timeline } from '../components/Timeline/Timeline';
import { TrackedPlayers } from '../components/TrackedPlayers/TrackedPlayers/TrackedPlayers';
import { Account } from '../components/Account/Account';
import { SignIn } from '../components/Account/SignIn';
import { SignUp } from '../components/Account/SignUp';
import { ResolveAuth } from '../ResolveAuth';
import { NAVROUTES } from './navRoutes';
import { PlayerSearch } from '../components/Timeline/PlayerSearch/PlayerSearch';

const TimelineStack = createStackNavigator({ Timeline });
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
        initialRouteName: NAVROUTES.TrackedPlayers,
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
            screen: TimelineStack,
            navigationOptions: {
                tabBarLabel: 'NEWS',
                tabBarIcon: ({ tintColor }: any) => (
                    <MaterialCommunityIcons name="chart-timeline" size={25} color={tintColor} />
                )
            }
        },
        [NAVROUTES.PlayerSettings]: {
            screen: PlayerSettingsTabs,
            navigationOptions: {
                tabBarLabel: 'MY PLAYERS',
                tabBarIcon: ({ tintColor }: any) => (
                    <MaterialCommunityIcons name="account-group" size={25} color={tintColor} />
                )
            }
        },
        [NAVROUTES.Account]: {
            screen: AccountStack,
            navigationOptions: {
                tabBarLabel: 'ACCOUNT',

                tabBarIcon: ({ tintColor }: any) => (
                    <MaterialCommunityIcons name="settings" size={25} color={tintColor} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5
            }
        }
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
