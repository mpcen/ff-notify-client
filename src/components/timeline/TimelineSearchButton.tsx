import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface ITimelineSearchButtonProps {
    onPress(): void;
}

export const TimelineSearchButton = (props: ITimelineSearchButtonProps) => (
    <TouchableOpacity onPress={props.onPress}>
        <Icon type="material-community" name="magnify" color="#fff" />
    </TouchableOpacity>
);
