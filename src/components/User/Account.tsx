import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as userActions from '../../store/user/actions';
import { IUser } from '../../store/user/types';

interface ITrackedPlayersPropsFromState {
    user: IUser[];
}

interface ITrackedPlayersPropsFromDispatch {
    signOut: typeof userActions.signOut;
}

type AccountProps = ITrackedPlayersPropsFromState & ITrackedPlayersPropsFromDispatch;

class AccountUnconnected extends React.Component<AccountProps, {}> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: <Header centerComponent={{ text: 'Account', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.signOut()}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signOut: () => dispatch(userActions.signOut())
    };
};

const styles = StyleSheet.create({});

export const Account = connect(
    null,
    mapDispatchToProps
)(AccountUnconnected);
