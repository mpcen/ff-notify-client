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
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ ...styles.welcomeContainer }}>
                    <Image
                        source={require('../../../assets/img/welcome-screen-bg.jpg')}
                        style={styles.imageContainer}
                    />
                    <View style={styles.imageWrapper} />
                </View>

                <View style={styles.welcomeContent}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>Welcome to persource.</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
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
    welcomeContainer: {
        ...(StyleSheet.absoluteFill as object)
    },
    imageContainer: {
        flex: 1,
        height: height,
        width: width + width / 2,
        right: width / 2.5
    },
    imageWrapper: {
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: '#000',
        opacity: 0.86
    },
    welcomeContent: {
        ...(StyleSheet.absoluteFill as object)
    },
    greetingContainer: {
        alignSelf: 'center',
        top: height * 0.333
    },
    greetingText: {
        color: 'white',
        fontSize: 27,
        fontFamily: 'Montserrat-Bold'
    },
    buttonsContainer: {
        justifyContent: 'center',
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
        height: 44
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

{
    /* <View style={styles.welcomeContent}>
        <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Welcome to persource.</Text>
        </View>

        <View style={styles.buttonsContainer}>
            <Button buttonStyle={styles.buttonStyle} titleStyle={styles.buttonText} title="Sign up" />

            <Spacer />

            <Button
                buttonStyle={{ ...styles.buttonStyle, ...styles.signUpButtonContainer }}
                titleStyle={styles.buttonText}
                title="Sign in"
                type="outline"
            />

            <Spacer />

            <Text style={{ ...styles.buttonText, ...styles.forgotPassword }}>Forgot password?</Text>
        </View>
    </View> */
}

{
    /* <Input
                                labelStyle={{ color: 'white', fontFamily: 'Montserrat-Light', fontWeight: 'normal' }}
                                editable={this.state.editable}
                                autoCapitalize="none"
                                autoCorrect={false}
                                label="EMAIL ADDRESS"
                            />

                            <Spacer />

                            <Input
                                labelStyle={{ color: 'white', fontFamily: 'Montserrat-Light', fontWeight: 'normal' }}
                                editable={this.state.editable}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                label="PASSWORD"
                            />

                            <Spacer />

                            <Input
                                labelStyle={{ color: 'white', fontFamily: 'Montserrat-Light', fontWeight: 'normal' }}
                                editable={this.state.editable}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                label="CONFIRM PASSWORD"
                            /> */
}
