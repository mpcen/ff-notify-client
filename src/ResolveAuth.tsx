import * as React from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

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
            //return navigate(NAVROUTES.Search);
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
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#1DA1F2'
                    }}
                >
                    <Image
                        resizeMode="center"
                        source={require('../assets/img/appIcon.png')}
                        onLoad={this._cacheResourcesAsync}
                    />
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }

        return <View />;
    }

    private _cacheSplashResourcesAsync = async () => {
        await Promise.all([new Promise(resolve => setTimeout(resolve, 0))]);
    };

    private _cacheResourcesAsync = async () => {
        SplashScreen.hide();

        const token = await AsyncStorage.getItem('persource-auth-token');
        const imageAssets = this._cacheImages([
            require('../assets/img/welcome-screen-bg.jpg'),
            require('../assets/img/signup-screen-bg.jpg'),
            require('../assets/img/signin-screen-bg.jpg'),
            require('../assets/img/forgot-password-screen-bg.jpg')
        ]);

        if (token) {
            await Promise.all([this.props.initialize(), ...imageAssets, this._cacheFonts()]);

            this.setState({ isAppReady: true });
        } else {
            await Promise.all([...imageAssets, this._cacheFonts()]);

            navigate(NAVROUTES.LogInStack);
        }
    };

    private async _cacheFonts() {
        await Font.loadAsync({
            'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf')
        });
    }

    private _cacheImages(images: any) {
        return images.map((image: any) => {
            return Asset.fromModule(image).downloadAsync();
        });
    }
}

const mapStateToProps = ({ user, players }: AppState): IResolveAuthPropsFromState => {
    return {
        userPreferences: user.userPreferences,
        loading: user.loading || players.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        initialize: () => dispatch(userPreferencesActions.initialize())
    };
};

export const ResolveAuth = connect(mapStateToProps, mapDispatchToProps)(ResolveAuthUnconnected);
