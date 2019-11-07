import * as React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { NavigationScreenProp, NavigationRoute, NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../store/user/actions';
import { AppState } from '../../store';
import { IUser } from '../../store/user/types';
import { AuthForm } from './AuthForm';
import { NAVROUTES } from '../../navigator/navRoutes';
import { AuthNavLink } from './AuthNavLink';
import { Input, Button } from 'react-native-elements';
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
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ ...styles.welcomeContainer }}>
                    <Image
                        source={require('../../../assets/img/signup-screen-bg.jpg')}
                        style={styles.imageContainer}
                        width={width}
                    />
                    <View style={styles.imageWrapper} />
                </View>

                <View style={styles.container}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>Let's start with the basics.</Text>
                    </View>

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

                    <Spacer />
                    
                    <Input
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        label="Confirm Password"
                        value={passwordConfirm}
                        onChangeText={this.handlePasswordConfirmChange}
                    />

                    <Spacer>
                        <Button
                            title="Finish"
                            onPress={() => this._handleSubmit(email, password, passwordConfirm)}
                        />
                    </Spacer>
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
    welcomeContainer: {
        ...(StyleSheet.absoluteFill as object)
    },
    imageContainer: {
        flex: 1,
        height: height,
        width: width,
    },
    imageWrapper: {
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: '#000',
        opacity: 0.86
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
    container: {
        ...(StyleSheet.absoluteFill as object),
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
