import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as playerSettingsActions from './store/playerSettings/actions';
import * as userPreferencesActions from './store/user/actions';
import * as timelineActions from './store/timeline/actions';

import { navigate } from './navigator/navigationRef';
import { NAVROUTES } from './navigator/navRoutes';

interface IResolveAuthPropsFromDispatch {
    fetchPlayers: typeof playerSettingsActions.fetchPlayers;
    fetchUserPreferences: typeof userPreferencesActions.fetchUserPreferences;
    fetchPlayerNews: typeof timelineActions.fetchPlayerNews;
}

type ResolveAuthProps = IResolveAuthPropsFromDispatch;

class ResolveAuthUnconnected extends React.Component<ResolveAuthProps> {
    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            await this.props.fetchPlayers();
            await this.props.fetchUserPreferences();
            await this.props.fetchPlayerNews();

            navigate(NAVROUTES.MainFlow);
        } else {
            navigate(NAVROUTES.LogInStack);
        }
    }

    render() {
        return <View />;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPlayers: () => dispatch(playerSettingsActions.fetchPlayers()),
        fetchUserPreferences: () => dispatch(userPreferencesActions.fetchUserPreferences()),
        fetchPlayerNews: () => dispatch(timelineActions.fetchPlayerNews())
    };
};

export const ResolveAuth = connect(
    null,
    mapDispatchToProps
)(ResolveAuthUnconnected);
