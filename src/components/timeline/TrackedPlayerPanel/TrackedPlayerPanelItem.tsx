import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

interface ITrackedPlayerPanelItemProps {
    selected: boolean;
    avatarUrl: string;
    onLongPress: () => void;
    onPress: () => void;
}

export const TrackedPlayerPanelItem = (props: ITrackedPlayerPanelItemProps) => {
    const { selected, avatarUrl, onLongPress, onPress } = props;

    return (
        <TouchableOpacity style={styles.panelItemContainer} onLongPress={onLongPress} onPress={onPress}>
            <Avatar
                rounded
                size="medium"
                avatarStyle={styles.avatarStyle}
                containerStyle={selected ? styles.avatarContainerStyleSelected : styles.avatarContainerStyle}
                source={{ uri: avatarUrl }}
            />

            {/* <Badge
                containerStyle={badgeContainerStyle}
                badgeStyle={badgeStyle}
                value={<Text style={badgeText}>6</Text>}
            /> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    panelItemContainer: {
        padding: 8
    },
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    },
    avatarContainerStyle: {
        backgroundColor: 'grey',
        borderColor: '#ddd'
    },
    avatarContainerStyleSelected: {
        borderColor: '#2089dc',
        borderStyle: 'solid',
        borderWidth: 3
    },
    badgeContainerStyle: {
        position: 'absolute',
        bottom: 6,
        right: 6
    },
    badgeStyle: {
        backgroundColor: '#ff5a5f',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 8
    }
});
