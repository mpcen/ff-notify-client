import * as React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { Spacer } from '../common/Spacer';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { NAVROUTES } from '../../navigator/navRoutes';

interface ISignUpProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}

type WelcomeProps = ISignUpProps;

export class Welcome extends React.Component<WelcomeProps> {
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
                            onPress={() => this.props.navigation.navigate(NAVROUTES.SignUp)}
                        />

                        <Spacer />

                        <Button
                            title="Sign in"
                            type="outline"
                            buttonStyle={{ ...styles.buttonStyle, ...styles.signInButtonContainer }}
                            titleStyle={styles.buttonText}
                            onPress={() => this.props.navigation.navigate(NAVROUTES.SignIn)}
                        />

                        <Spacer />

                        <Text style={{ ...styles.buttonText, ...styles.forgotPassword }}>Forgot password?</Text>
                    </View>
                </View>
            </View>
        );
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
