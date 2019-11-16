import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

interface ITrackPlayerButtonProps {
    disabled?: boolean;
    tracked?: boolean;
    onPress(): void;
}

export const TrackPlayerButton = (props: ITrackPlayerButtonProps) => {
    return (
        <Button
            disabled={props.disabled}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            onPress={props.onPress}
            title={props.tracked ? 'Untrack' : 'Track'}
        />
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        height: 36,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 8,
        paddingRight: 8
    },
    titleStyle: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
