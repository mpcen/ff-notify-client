import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Constants from 'expo-constants'

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
            header: <Header containerStyle={{ height: Platform.OS === 'ios' ? 44 + Constants.statusBarHeight : 56 + StatusBar.currentHeight }} centerComponent={{ text: 'ACCOUNT', style: { color: '#fff' } }} />
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <View style={styles.accountSettingsContainer}>
                <Button
                    containerStyle={{ width: 200 }}
                    title="Sign Out"
                    type="outline"
                    onPress={() => this.props.signOut()}
                />
            </View>
        );
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

const styles = StyleSheet.create({
    accountSettingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const Account = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountUnconnected);
