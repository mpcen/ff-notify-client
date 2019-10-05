import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as userActions from '../../store/user/actions';
import { IUserState } from '../../store/user/types';
import { AppState } from '../../store';

interface IAccountPropsFromState {
    user: IUserState;
}

interface ITrackedPlayersPropsFromDispatch {
    signOut: typeof userActions.signOut;
}

type AccountProps = IAccountPropsFromState & ITrackedPlayersPropsFromDispatch;

class AccountUnconnected extends React.Component<AccountProps, {}> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Account', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return <Button title="Sign Out" type="outline" onPress={() => this.props.signOut()} />;
    }
}
const mapStateToProps = ({ user }: AppState): IAccountPropsFromState => {
    return {
        user
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signOut: () => dispatch(userActions.signOut())
    };
};

const styles = StyleSheet.create({});

export const Account = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountUnconnected);
