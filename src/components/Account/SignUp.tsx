import * as React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import {
    NavigationScreenProp,
    NavigationRoute,
    NavigationScreenProps,
    NavigationScreenOptions
} from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';
import { IUser } from '../../store/user/types';
import { Input, Button, Icon } from 'react-native-elements';
import { Spacer } from '../common/Spacer';

interface ISignUpProps {
    navigation: NavigationScreenProp<NavigationRoute>;
}

interface ISignUpState {
    email: string;
    password: string;
    passwordConfirm?: string;
}

interface ISignUpPropsFromState {
    errorMessage: string;
}

interface ISignUpPropsFromDispatch {
    reset: typeof userActions.reset;
    signUp: typeof userActions.signUp;
}

type SignUpProps = ISignUpProps & ISignUpPropsFromDispatch & ISignUpPropsFromState;

class SignUpUnconnected extends React.Component<SignUpProps, ISignUpState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: null
        } as NavigationScreenOptions;
    };

    state: ISignUpState = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    render() {
        const { email, password, passwordConfirm } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.absoluteContent}>
                    <Image
                        source={require('../../../assets/img/signup-screen-bg.jpg')}
                        style={styles.backgroundImageContainer}
                    />
                    <View style={styles.imageWrapper} />
                </View>

                <View style={styles.absoluteContent}>
                    <View style={styles.contentContainer}>
                        <Icon size={40} iconStyle={styles.leftChevron} type="material-community" name="chevron-left" />

                        <Text style={styles.greetingText}>Let's start with the basics.</Text>

                        <Input
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            label="EMAIL"
                            value={email}
                            onChangeText={this.handleEmailChange}
                        />

                        <Spacer />

                        <Input
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            label="PASSWORD"
                            value={password}
                            onChangeText={this.handlePasswordChange}
                        />

                        <Spacer />

                        <Input
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            label="CONFIRM PASSWORD"
                            value={passwordConfirm}
                            onChangeText={this.handlePasswordConfirmChange}
                        />

                        <Text
                            style={{
                                ...styles.errorMessage,
                                backfaceVisibility: 'visible'
                            }}
                        >
                            {this.props.errorMessage}
                        </Text>

                        <Spacer />

                        <View style={{ alignSelf: 'flex-end' }}>
                            <Button
                                icon={{
                                    type: 'material-community',
                                    name: 'chevron-right',
                                    color: 'white',
                                    size: 32
                                }}
                                onPress={() => this._handleSubmit(email, password, passwordConfirm)}
                                buttonStyle={{ ...styles.buttonStyle, ...styles.signUpButtonContainer }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    private handleEmailChange = (text: string) => {
        this.setState({ email: text });
    };

    private handlePasswordChange = (text: string) => {
        this.setState({ password: text });
    };

    private handlePasswordConfirmChange = (text: string) => {
        this.setState({ passwordConfirm: text });
    };

    private _handleSubmit = (email: string, password: string, passwordConfirm?: string) => {
        this.props.signUp({ email, password, passwordConfirm });
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
    leftChevron: {
        color: 'white'
    },
    greetingText: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'Montserrat-Regular',
        left: 10,
        marginTop: 20,
        marginBottom: 30
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
        color: 'red'
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
