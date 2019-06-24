import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'react-native-elements';

export class Reactions extends React.Component {
    render() {
        const { reactionContainer, reactionIcon, reactionIconContainer, reactionCount } = styles;

        return (
            <View style={reactionContainer}>
                <View style={reactionIconContainer}>
                    <Icon iconStyle={[reactionIcon, { color: '#F4D35E' }]} type="material-community" name="train" />
                    <Text style={reactionCount}>37k</Text>
                </View>

                <View style={reactionIconContainer}>
                    <Icon
                        iconStyle={[reactionIcon, { color: '#686963' }]}
                        type="material-community"
                        name="trash-can-outline"
                    />
                    <Text style={reactionCount}>9k</Text>
                </View>

                <View style={[reactionIconContainer, { backgroundColor: '#bbb' }]}>
                    <Icon iconStyle={[reactionIcon, { color: '#db5461' }]} type="material-community" name="fire" />
                    <Text style={[reactionCount, { color: '#F74A5B' }]}>1.2k</Text>
                </View>

                <View style={[reactionIconContainer]}>
                    <Icon
                        iconStyle={[reactionIcon, { color: '#80FF72' }]}
                        type="material-community"
                        name="trending-up"
                    />
                    <Text style={[reactionCount]}>34</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    reactionContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row'
    },
    reactionIcon: {
        fontSize: 16
    },
    reactionIconContainer: {
        width: 38,
        height: 20,
        backgroundColor: '#eee',
        marginLeft: 4,
        marginRight: 4,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    reactionCount: {
        fontSize: 8,
        color: '#4C5454'
    }
});
