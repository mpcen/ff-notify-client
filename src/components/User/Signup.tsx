import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    NavigationScreenOptions,
    NavigationScreenProps,
    NavigationScreenProp,
    NavigationRoute
} from 'react-navigation';
import { Text, Input, Button } from 'react-native-elements';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';
import { Spacer } from '../common/Spacer';
import { IUser } from '../../store/user/types';
import { AuthForm } from './AuthForm';
import { NAVROUTES } from '../../navigator/navRoutes';

interface ISignUpProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}

interface ISignUpPropsFromState {
    errorMessage: string;
    message: string;
}

interface ISignUpPropsFromDispatch {
    signUp: typeof userActions.signUp;
}

type SignUpProps = ISignUpProps & ISignUpPropsFromDispatch & ISignUpPropsFromState;

class SignUpUnconnected extends React.Component<SignUpProps, {}> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: null
        } as NavigationScreenOptions;
    };

    render() {
        return (
            <View style={styles.container}>
                <AuthForm
                    headerText="Sign up for FFNotify"
                    submitButtonText="Sign up"
                    errorMessage={this.props.errorMessage}
                    onSubmit={this.props.signUp}
                />

                <Spacer>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(NAVROUTES.SignIn)}>
                        <Text style={styles.alternateMessage}>Already have an account? Sign in instead</Text>
                    </TouchableOpacity>
                </Spacer>
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
    },
    alternateMessage: {
        color: 'blue'
    }
});

const mapStateToProps = ({ user }: AppState): ISignUpPropsFromState => {
    return {
        errorMessage: user.errorMessage,
        message: user.message
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signUp: (user: IUser) => dispatch(userActions.signUp(user))
    };
};

export const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpUnconnected);
