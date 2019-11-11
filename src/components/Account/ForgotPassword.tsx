import * as React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { Input, Button } from 'react-native-elements';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';
import { Spacer } from '../common/Spacer';
import { NAVROUTES } from '../../navigator/navRoutes';

interface IForgotPasswordProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}
interface IForgotPasswordState {
    email: string;
}

interface IForgotPasswordPropsFromState {
    errorMessage: string;
}

interface IForgotPasswordPropsFromDispatch {
    resetPassword: typeof userActions.resetPassword;
}

type ForgotPasswordState = IForgotPasswordState;
type ForgotPasswordProps = IForgotPasswordProps & IForgotPasswordPropsFromState & IForgotPasswordPropsFromDispatch;

class ForgotPasswordUnconnected extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
    state: ForgotPasswordState = {
        email: ''
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.absoluteContent}>
                    <Image
                        source={require('../../../assets/img/forgot-password-screen-bg.jpg')}
                        style={styles.backgroundImageContainer}
                    />
                    <View style={styles.imageWrapper} />
                </View>

                <View style={styles.absoluteContent}>
                    <View style={styles.contentContainer}>
                        <Button
                            type="clear"
                            icon={{
                                type: 'material-community',
                                name: 'chevron-left',
                                color: 'white',
                                size: 32
                            }}
                            buttonStyle={styles.chevronLeftStyle}
                            onPress={() => this.props.navigation.navigate(NAVROUTES.Welcome)}
                        />

                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch' }}
                        >
                            <Text style={styles.greetingText}>Reset your password.</Text>

                            <Spacer />
                            <Spacer />
                            <Spacer />

                            <Input
                                labelStyle={styles.inputLabel}
                                inputStyle={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                label="EMAIL ADDRESS"
                                value={this.state.email}
                                onChangeText={this._handleEmailChange}
                            />

                            <Spacer />

                            <Text
                                style={{
                                    ...styles.errorMessage,
                                    backfaceVisibility: 'visible'
                                }}
                            >
                                {this.props.errorMessage}
                            </Text>

                            <Spacer />

                            <View style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                                <Button
                                    icon={{
                                        type: 'material-community',
                                        name: 'chevron-right',
                                        color: 'white',
                                        size: 32
                                    }}
                                    onPress={() => this.props.resetPassword(this.state.email)}
                                    buttonStyle={{ ...styles.buttonStyle, ...styles.signUpButtonContainer }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </View>
        );
    }

    private _handleEmailChange = (text: string) => {
        this.setState({ email: text });
    };
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
        fontSize: 26,
        fontFamily: 'Montserrat-Regular',
        left: 10
    },
    input: {
        color: 'white',
        fontFamily: 'Montserrat-Regular'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        top: Constants.statusBarHeight,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonStyle: {
        borderRadius: 29,
        width: 58,
        height: 58
    },
    chevronLeftStyle: {
        alignSelf: 'flex-start',
        padding: 0
    },
    signUpButtonContainer: {
        backgroundColor: '#266DD3'
    },
    inputLabel: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'normal',
        fontSize: 12
    },
    errorMessage: {
        marginTop: 15,
        height: 30,
        fontSize: 16,
        color: 'red',
        fontFamily: 'Montserrat-Regular',
        marginLeft: 10
    }
});

const mapStateToProps = ({ user }: AppState): IForgotPasswordPropsFromState => {
    return {
        errorMessage: user.errorMessage
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
