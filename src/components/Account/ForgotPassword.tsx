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
import { Spacer } from '../common/Spacer';
import { Input, Text, Button } from 'react-native-elements';

interface IForgotPasswordProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}
interface IForgotPasswordState {
    email: string;
}

interface IForgotPasswordPropsFromState {}

interface IForgotPasswordPropsFromDispatch {
    resetPassword: typeof userActions.resetPassword;
}

type ForgotPasswordState = IForgotPasswordState;
type ForgotPasswordProps = IForgotPasswordProps & IForgotPasswordPropsFromState & IForgotPasswordPropsFromDispatch;

class ForgotPasswordUnconnected extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: null
        } as NavigationScreenOptions;
    };

    state: ForgotPasswordState = {
        email: ''
    };

    render() {
        return (
            <View style={styles.container}>
                <Spacer>
                    <Text h4>Forgot your password?</Text>
                    <Text>Enter your email to reset your password.</Text>
                </Spacer>

                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    label="Email Address"
                    value={this.state.email}
                    onChangeText={(text: string) => this.setState({ email: text })}
                />

                <Spacer />

                <Spacer>
                    <Button title="Next" onPress={() => this.props.resetPassword(this.state.email)} />
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

const mapStateToProps = ({ user }: AppState): IForgotPasswordPropsFromState => {
    return {
        errorMessage: user.errorMessage,
        email: user.email
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        resetPassword: (email: string) => dispatch(userActions.resetPassword(email))
    };
};

export const ForgotPassword = connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordUnconnected);
