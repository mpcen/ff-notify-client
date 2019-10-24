import * as React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppLoading, SplashScreen } from 'expo';

import * as userPreferencesActions from './store/user/actions';
import { AppState } from './store';

import { navigate } from './navigator/navigationRef';
import { NAVROUTES } from './navigator/navRoutes';
import { IUserPreferences } from './store/user/types';

interface IResolveAuthPropsFromState {
    userPreferences: IUserPreferences;
    loading: boolean;
}

interface IResolveAuthPropsFromDispatch {
    initialize: typeof userPreferencesActions.initialize;
}

interface IResolveAuthUnconnectedState {
    isAppReady: boolean;
    isSplashReady: boolean;
}

type ResolveAuthProps = IResolveAuthPropsFromDispatch & IResolveAuthPropsFromState;
type ResolveAuthState = IResolveAuthUnconnectedState;

class ResolveAuthUnconnected extends React.Component<ResolveAuthProps, ResolveAuthState> {
    state: ResolveAuthState = {
        isAppReady: false,
        isSplashReady: false
    };

    componentDidUpdate() {
        if (!this.props.loading && this.state.isAppReady) {
            return navigate(NAVROUTES.MainFlow);
        }
    }

    render() {
        if (!this.state.isSplashReady) {
            return (
                <AppLoading
                    startAsync={this._cacheSplashResourcesAsync}
                    onFinish={() => this.setState({ isSplashReady: true })}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            );
        }

        if (!this.state.isAppReady) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1DA1F2' }}>
                    <Image
                        resizeMode="center"
                        source={require('./assets/img/image.png')}
                        onLoad={this._cacheResourcesAsync}
                    />
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }
        return <View />;
    }

    private _cacheSplashResourcesAsync = async () => {
        await Promise.all([new Promise(resolve => setTimeout(resolve, 1500))]);
    };

    private _cacheResourcesAsync = async () => {
        SplashScreen.hide();

        const token = await AsyncStorage.getItem('persource-auth-token');

        if (token) {
            await this.props.initialize();
            await Promise.all([this.props.initialize(), new Promise(resolve => setTimeout(resolve, 1500))]);

            this.setState({ isAppReady: true });
        } else {
            await Promise.all([new Promise(resolve => setTimeout(resolve, 1500))]);
            navigate(NAVROUTES.LogInStack);
        }
    };
}

const mapStateToProps = ({ user, playerSettings }: AppState): IResolveAuthPropsFromState => {
    return {
        userPreferences: user.userPreferences,
        loading: user.loading || playerSettings.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        initialize: () => dispatch(userPreferencesActions.initialize())
    };
};

export const ResolveAuth = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResolveAuthUnconnected);
