import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';
import { IUser } from '../../store/user/types';
import { AuthForm } from './AuthForm';
import { NAVROUTES } from '../../navigator/navRoutes';
import { AuthNavLink } from './AuthNavLink';

interface ISignUpProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}

interface ISignUpPropsFromState {
    errorMessage: string;
}

interface ISignUpPropsFromDispatch {
    reset: typeof userActions.reset;
    signUp: typeof userActions.signUp;
}

type SignUpProps = ISignUpProps & ISignUpPropsFromDispatch & ISignUpPropsFromState;

class SignUpUnconnected extends React.Component<SignUpProps> {
    render() {
        return (
            <View style={styles.container}>
                <AuthForm
                    headerText="Sign up for PerSource"
                    submitButtonText="Sign up"
                    errorMessage={this.props.errorMessage}
                    onPress={this.props.signUp}
                    isSignUp
                />

                <AuthNavLink
                    text="Already have an account? Sign in instead"
                    onPress={() => {
                        this.props.navigation.navigate(NAVROUTES.SignIn);
                        this.props.reset();
                    }}
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

const mapStateToProps = ({ user }: AppState): ISignUpPropsFromState => {
    return {
        errorMessage: user.errorMessage
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signUp: (user: IUser) => dispatch(userActions.signUp(user)),
        reset: () => dispatch(userActions.reset())
    };
};

export const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpUnconnected);
