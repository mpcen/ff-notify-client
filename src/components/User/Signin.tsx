import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    NavigationScreenOptions,
    NavigationScreenProps,
    NavigationScreenProp,
    NavigationRoute
} from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';
import { IUser } from '../../store/user/types';
import { AuthForm } from './AuthForm';
import { NAVROUTES } from '../../navigator/navRoutes';
import { AuthNavLink } from './AuthNavLink';

interface ISignInProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}

interface ISignInPropsFromState {
    errorMessage: string;
}

interface ISignInPropsFromDispatch {
    signIn: typeof userActions.signIn;
}

type SignInProps = ISignInProps & ISignInPropsFromDispatch & ISignInPropsFromState;

class SignInUnconnected extends React.Component<SignInProps, {}> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: null
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <View style={styles.container}>
                <AuthForm
                    headerText="Sign into FFNotify"
                    submitButtonText="Sign in"
                    errorMessage={this.props.errorMessage}
                    onSubmit={this.props.signIn}
                />

                <AuthNavLink
                    text="Don't have an account account? Sign up for FFNotify"
                    onPress={() => this.props.navigation.navigate(NAVROUTES.SignUp)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    errorMessage: {
        marginLeft: 15,
        marginTop: 15,
        fontSize: 16,
        color: 'red'
    },
    message: {
        marginLeft: 15,
        marginTop: 15,
        fontSize: 16,
        color: 'green'
    }
});

const mapStateToProps = ({ user }: AppState): ISignInPropsFromState => {
    return {
        errorMessage: user.errorMessage
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signUp: (user: IUser) => dispatch(userActions.signUp(user))
    };
};

export const SignIn = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInUnconnected);
