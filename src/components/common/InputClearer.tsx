import * as React from 'react';
import { Icon } from 'react-native-elements';

interface IInputClearerProps {
    iconName: string;
    color: string;
    onPress: () => void;
}

export const InputClearer = (props: IInputClearerProps) => {
    return <Icon name={props.iconName} onPress={props.onPress} color={props.color} />;
};
