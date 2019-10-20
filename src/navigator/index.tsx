import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createMaterialTopTabNavigator,
    NavigationScreenOptions
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Header } from 'react-navigation';

import { Timeline } from '../components/Timeline/Timeline';
import { TrackedPlayers } from '../components/TrackedPlayers/TrackedPlayers/TrackedPlayers';
import { Account } from '../components/Account/Account';
import { SignIn } from '../components/Account/SignIn';
import { SignUp } from '../components/Account/SignUp';
import { ForgotPassword } from '../components/Account/ForgotPassword';
import { ResolveAuth } from '../ResolveAuth';
import { NAVROUTES } from './navRoutes';
import { PlayerSearch } from '../components/TrackedPlayers/PlayerSearch/PlayerSearch';
import { StatusBar, Platform } from 'react-native';

const TimelineStack = createStackNavigator({ Timeline });
const AccountStack = createStackNavigator({ Account });

const PlayerSettingsTabs = createMaterialTopTabNavigator(
    {
        [NAVROUTES.PlayerSearch]: {
            screen: PlayerSearch,
            navigationOptions: {
                tabBarLabel: 'SEARCH PLAYER'
            }
        },
        [NAVROUTES.TrackedPlayers]: {
            screen: TrackedPlayers,
            navigationOptions: {
                tabBarLabel: 'TRACKED PLAYERS'
            }
        }
    },
    {
        initialRouteName: NAVROUTES.TrackedPlayers,
        tabBarOptions: {
            style: {
                paddingTop: Constants.statusBarHeight,
                backgroundColor: '#2089dc',
                height: Platform.OS === 'ios' ? Header.HEIGHT : Header.HEIGHT + StatusBar.currentHeight,
                elevation: 0,
                shadowRadius: 0
            },
            indicatorStyle: {
                backgroundColor: '#ff5a5f'
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
    },
    [NAVROUTES.ForgotPassword]: {
        screen: ForgotPassword
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
            } as NavigationScreenOptions
        },
        [NAVROUTES.PlayerSettings]: {
            screen: PlayerSettingsTabs,
            navigationOptions: {
                tabBarLabel: 'PLAYERS',
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
            inactiveTintColor: 'grey'
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
