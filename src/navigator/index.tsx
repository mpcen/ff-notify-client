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

import { Timeline } from '../components/Timeline/Timeline';
import { TrackedPlayers } from '../components/Tracking/TrackedPlayers/TrackedPlayers';
import { Account } from '../components/Account/Account';
import { SignIn } from '../components/Account/SignIn';
import { SignUp } from '../components/Account/SignUp';
import { ForgotPassword } from '../components/Account/ForgotPassword';
import { ResolveAuth } from '../ResolveAuth';
import { NAVROUTES } from './navRoutes';
import { PlayerSearch } from '../components/Tracking/PlayerSearch/PlayerSearch';
import { StatusBar, Platform } from 'react-native';
import { Welcome } from '../components/Account/Welcome';
import { Search } from '../components/Search/Search';

const TimelineStack = createStackNavigator({ Timeline });
const AccountStack = createStackNavigator({ Account });
const SearchStack = createStackNavigator({ Search }, { headerMode: 'none' });

const Tracking = createMaterialTopTabNavigator(
    {
        [NAVROUTES.PlayerSearch]: {
            screen: PlayerSearch,
            navigationOptions: {
                tabBarLabel: 'SEARCH FOR PLAYERS TO TRACK'
            }
        },
        [NAVROUTES.TrackedPlayers]: {
            screen: TrackedPlayers,
            navigationOptions: {
                tabBarLabel: 'CURRENT TRACKED PLAYERS'
            }
        }
    },
    {
        initialRouteName: NAVROUTES.TrackedPlayers,
        tabBarOptions: {
            style: {
                paddingTop: Constants.statusBarHeight,
                backgroundColor: '#2089dc',
                height: Platform.OS === 'ios' ? 44 + Constants.statusBarHeight : 56 + StatusBar.currentHeight,
                elevation: 0,
                shadowRadius: 0
            },
            indicatorStyle: {
                backgroundColor: '#ff5a5f'
            }
        }
    }
);

const LogInStack = createStackNavigator(
    {
        [NAVROUTES.Welcome]: {
            screen: Welcome
        },
        [NAVROUTES.SignUp]: {
            screen: SignUp
        },
        [NAVROUTES.SignIn]: {
            screen: SignIn
        },
        [NAVROUTES.ForgotPassword]: {
            screen: ForgotPassword
        }
    },
    {
        headerMode: 'none'
    }
);

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
        [NAVROUTES.Search]: {
            screen: SearchStack,
            navigationOptions: {
                tabBarLabel: 'SEARCH',
                tabBarIcon: ({ tintColor }: any) => (
                    <MaterialCommunityIcons name="magnify" size={25} color={tintColor} />
                )
            } as NavigationScreenOptions
        },
        [NAVROUTES.Tracking]: {
            screen: Tracking,
            navigationOptions: {
                tabBarLabel: 'TRACK',
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

export const AppNavigator = createSwitchNavigator(
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
