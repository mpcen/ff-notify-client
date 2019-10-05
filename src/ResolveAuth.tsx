import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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
    initialLoadComplete: boolean;
}

type ResolveAuthProps = IResolveAuthPropsFromDispatch & IResolveAuthPropsFromState;
type ResolveAuthState = IResolveAuthUnconnectedState;

class ResolveAuthUnconnected extends React.Component<ResolveAuthProps, ResolveAuthState> {
    state: ResolveAuthState = {
        initialLoadComplete: false
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            await this.props.initialize();
        } else {
            navigate(NAVROUTES.LogInStack);
        }
    }

    componentDidUpdate(prevProps: ResolveAuthProps, prevState: ResolveAuthState) {
        if (!this.props.loading && !prevState.initialLoadComplete) {
            this.setState({ initialLoadComplete: true });

            // APP ENTRY AFTER SIGN IN
            // navigate(NAVROUTES.MainFlow);
            navigate(NAVROUTES.Account);
        }
    }

    render() {
        return <View />;
    }
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
