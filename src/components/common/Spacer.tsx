import * as React from 'react';
import { View, StyleSheet } from 'react-native';

interface ISpacerProps {
    children?: React.ReactNode;
}

const Spacer = ({ children }: ISpacerProps) => {
    return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
});

export { Spacer };
