import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { navigate } from './navigator/navigationRef';
import { NAVROUTES } from './navigator/navRoutes';

interface IResolveAuthState {
    token: string;
}

class ResolveAuth extends React.Component<{}, IResolveAuthState> {
    state = {
        token: ''
    };
    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            navigate(NAVROUTES.MainFlow);
        } else {
            navigate(NAVROUTES.LogInStack);
        }
    }

    render() {
        return <View />;
    }
}

export { ResolveAuth };
