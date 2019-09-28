import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from './store/playerSettings/actions';

import { AppState } from './store';
import { navigate } from './navigator/navigationRef';
import { NAVROUTES } from './navigator/navRoutes';

interface IResolveAuthPropsFromDispatch {
    fetchPlayers: typeof playerSettingsActions.fetchPlayers;
    fetchTrackedPlayers: typeof playerSettingsActions.fetchTrackedPlayers;
}

type ResolveAuthProps = IResolveAuthPropsFromDispatch;

class ResolveAuthUnconnected extends React.Component<ResolveAuthProps> {
    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            await this.props.fetchPlayers();
            await this.props.fetchTrackedPlayers();

            navigate(NAVROUTES.MainFlow);
        } else {
            navigate(NAVROUTES.LogInStack);
        }
    }

    render() {
        return <View />;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        trackedPlayers: state.playerSettings.trackedPlayers
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayers: () => dispatch(playerSettingsActions.fetchPlayers()),
        fetchTrackedPlayers: () => dispatch(playerSettingsActions.fetchTrackedPlayers())
    };
};

export const ResolveAuth = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResolveAuthUnconnected);
