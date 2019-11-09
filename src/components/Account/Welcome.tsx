import * as React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as userActions from '../../store/user/actions';
import { AuthNavLink } from './AuthNavLink';
import { Spacer } from '../common/Spacer';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { NAVROUTES } from '../../navigator/navRoutes';
import { Dispatch } from 'redux';

interface ISignUpProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}

interface IWelcomePropsFromDispatch {
    reset: typeof userActions.reset;
}

type WelcomeProps = ISignUpProps & IWelcomePropsFromDispatch;

class WelcomeUnconnected extends React.Component<WelcomeProps> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.absoluteContent}>
                    <Image
                        source={require('../../../assets/img/welcome-screen-bg.jpg')}
                        style={styles.backgroundImageContainer}
                    />
                    <View style={styles.imageWrapper} />
                </View>

                <View style={styles.absoluteContent}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.greetingText}>Welcome to persource.</Text>

                        <Button
                            title="Sign up"
                            buttonStyle={{ ...styles.buttonStyle, ...styles.signUpButtonContainer }}
                            titleStyle={styles.buttonText}
                            onPress={this._handleNavigateToSignup}
                        />

                        <Spacer />

                        <Button
                            title="Sign in"
                            type="outline"
                            buttonStyle={{ ...styles.buttonStyle, ...styles.signInButtonContainer }}
                            titleStyle={styles.buttonText}
                            onPress={this._handleNavigateToSignin}
                        />

                        <Spacer />

                        <TouchableOpacity onPress={this._handleNavigateToForgotPassword}>
                            <Text style={{ ...styles.buttonText, ...styles.forgotPassword }}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    private _handleNavigateToSignup = () => {
        this.props.navigation.navigate(NAVROUTES.SignUp);
        this.props.reset();
    }

    private _handleNavigateToSignin = () => {
        this.props.navigation.navigate(NAVROUTES.SignIn);
        this.props.reset();
    }

    private _handleNavigateToForgotPassword = () => {
        this.props.navigation.navigate(NAVROUTES.ForgotPassword);
        this.props.reset();
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImageContainer: {
        flex: 1,
        height: height,
        width: width
    },
    imageWrapper: {
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: '#000',
        opacity: 0.86
    },
    absoluteContent: {
        ...(StyleSheet.absoluteFill as object)
    },
    greetingText: {
        color: 'white',
        fontSize: 27,
        fontFamily: 'Montserrat-Bold',
        marginBottom: height / 4
    },
    contentContainer: {
        top: height * 0.333,
        alignItems: 'center',
        flex: 1,
        width: width,
        backgroundColor: 'transparent'
    },
    buttonStyle: {
        width: 185,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        height: 46
    },
    signUpButtonContainer: {
        backgroundColor: '#266DD3'
    },
    signInButtonContainer: {
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20
    },
    forgotPassword: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 16
    }
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        reset: () => dispatch(userActions.reset())
    };
};

export const Welcome = connect(
    null,
    mapDispatchToProps
)(WelcomeUnconnected);