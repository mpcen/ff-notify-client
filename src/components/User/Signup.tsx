import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Text, Input, Button } from 'react-native-elements';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';

import { Spacer } from '../common/Spacer';
import { IUser } from '../../store/user/types';

interface ISignUpUnconnectedState {
    email: string;
    password: string;
}

interface ISignUpPropsFromState {
    errorMessage: string;
    message: string;
}

interface ISignUpPropsFromDispatch {
    signUp: typeof userActions.signUp;
}

type SignUpProps = ISignUpPropsFromDispatch & ISignUpPropsFromState;
type SignUpState = ISignUpUnconnectedState;

class SignUpUnconnected extends React.Component<SignUpProps, SignUpState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: null
        } as NavigationScreenOptions;
    };

    public state: ISignUpUnconnectedState = {
        email: '',
        password: ''
    };

    private handleEmailChange = (text: string) => {
        this.setState({ email: text });
    };

    private handlePasswordChange = (text: string) => {
        this.setState({ password: text });
    };

    private handleSignUp = () => {
        this.props.signUp({
            email: this.state.email,
            password: this.state.password
        } as IUser);
    };

    render() {
        const { email, password } = this.state;

        return (
            <View style={styles.container}>
                <Spacer>
                    <Text h3>Signup for FFNotify</Text>
                </Spacer>

                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    label="Email"
                    value={email}
                    onChangeText={this.handleEmailChange}
                />

                <Spacer />

                <Input
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    label="Password"
                    value={password}
                    onChangeText={this.handlePasswordChange}
                />

                <Text style={this.props.errorMessage ? styles.errorMessage : styles.message}>
                    {this.props.errorMessage || this.props.message}
                </Text>

                <Spacer>
                    <Button title="Sign Up" onPress={this.handleSignUp}></Button>
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
