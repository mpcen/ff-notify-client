import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Spacer } from '../common/Spacer';

interface IAuthNavLinkProps {
    text: string;
    onPress: () => void;
}

export const AuthNavLink = (props: IAuthNavLinkProps) => {
    return (
        <Spacer>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </Spacer>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }
});
