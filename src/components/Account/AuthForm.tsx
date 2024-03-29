import * as React from 'react';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import * as userActions from '../../store/user/actions';
import { Spacer } from '../common/Spacer';

interface IAuthFormProps {
    headerText: string;
    submitButtonText: string;
    onPress: typeof userActions.signUp | typeof userActions.signIn;
    isSignUp?: boolean;
}

interface IAuthFormState {
    email: string;
    password: string;
    passwordConfirm?: string;
}

interface IAuthFormPropsFromState {
    errorMessage: string;
}

type AuthFormProps = IAuthFormProps & IAuthFormPropsFromState;
type AuthFormState = IAuthFormState;

export class AuthForm extends React.Component<AuthFormProps, AuthFormState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: null
        } as NavigationScreenOptions;
    };

    public state: IAuthFormState = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    render() {
        const { email, password, passwordConfirm } = this.state;

        return (
            <>
                <Spacer>
                    <Text h3>{this.props.headerText}</Text>
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

                {this.props.isSignUp && (
                    <>
                        <Spacer />
                        <Input
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            label="Confirm Password"
                            value={passwordConfirm}
                            onChangeText={this.handlePasswordConfirmChange}
                        />
                    </>
                )}

                <Text style={this.props.errorMessage ? styles.errorMessage : styles.message}>
                    {this.props.errorMessage}
                </Text>

                <Spacer>
                    <Button
                        title={this.props.submitButtonText}
                        onPress={() => this._handleSubmit(email, password, passwordConfirm)}
                    />
                </Spacer>
            </>
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
        this.props.onPress({ email, password, passwordConfirm });
    };
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
    link: {
        color: 'blue'
    }
});
