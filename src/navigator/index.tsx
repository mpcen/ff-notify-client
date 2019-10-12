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
            screen: TimelineStack
        },
        [NAVROUTES.PlayerSettings]: {
            screen: PlayerSettingsTabs
        },
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
                    iconName = `chart-timeline`;
                } else if (routeName === NAVROUTES.PlayerSettings) {
                    iconName = `account-group`;
                } else if (routeName === NAVROUTES.Account) {
                    iconName = `settings`;
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
        initialRouteName: NAVROUTES.PlayerSettings
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
