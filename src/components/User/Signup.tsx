import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, NavigationScreenOptions } from 'react-navigation';
import { Text, Input, Button } from 'react-native-elements';

import { Spacer } from '../common/Spacer';

interface ISignupProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Signup = ({ navigation }: ISignupProps) => {
    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Signup for FFNotify</Text>
            </Spacer>

            <Input label="Email" />

            <Spacer />

            <Input label="Password" />

            <Spacer>
                <Button title="Sign Up"></Button>
            </Spacer>
        </View>
    );
};

Signup.navigationOptions = () => {
    return {
        header: null
    } as NavigationScreenOptions;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

export { Signup };
