import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { Card, Text, Icon, Avatar, Divider } from 'react-native-elements';
import { format } from 'date-fns';
import { WebBrowser } from 'expo';

import { Reactions } from './Reactions';
import { TEAMS } from '../../../util/teams';
import { IPlayerNewsItem, IChildNode } from '../../../store/timeline/types';
import { IPlayer } from '../../../store/playerSettings/types';

interface IPlayerNewsItemProps {
    playerNewsItem: IPlayerNewsItem;
    player: IPlayer;
}

export class PlayerNewsItem extends React.Component<IPlayerNewsItemProps> {
    render() {
        const { playerNewsItem } = this.props;
        const { content, contentId, time, username } = playerNewsItem;
        const { avatarUrl, name, position, teamId } = this.props.player;

        return (
            <Card key={contentId} containerStyle={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}>
                    {/* <Reactions /> */}

                    <View>
                        <Avatar avatarStyle={styles.avatarStyle} rounded source={{ uri: avatarUrl }} />
                    </View>

                    <View>
                        <Text style={styles.playerText}>{name}</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 4 }}>
                            <Text style={styles.playerInfoText}>{position}</Text>
                            <Text style={styles.playerInfoText}> | </Text>
                            <Text style={styles.playerInfoText}>{TEAMS[teamId - 1].abbrev}</Text>
                        </View>
                    </View>
                </View>

                <Divider style={styles.dividerContainer} />

                <View style={styles.cardSourceContainer}>
                    <Icon iconStyle={styles.socialIcon} size={12} type="material-community" name="twitter" />
                    <Text style={styles.sourceText}>{username}</Text>
                    <Text style={styles.timeText}>{format(new Date(time), 'MMMM do h:mm a')}</Text>
                </View>

                <Text style={styles.cardContentContainer}>{this._renderChildNodes()}</Text>
            </Card>
        );
    }

    private _renderChildNodes = () => {
        const { contentId, content, username, childNodes } = this.props.playerNewsItem;
        const key = username + contentId;

        if (!childNodes.length) {
            return <Text key={username + contentId}>{content}</Text>;
        }

        return childNodes.map((childNode: IChildNode) => {
            if (childNode.contentType === 'text') {
                return <Text key={key + childNode.data}>{childNode.data.trim()} </Text>;
            }

            if (childNode.username) {
                const username = childNode.data.replace('/', '@').trim();
                return (
                    <Text
                        key={key + childNode.data}
                        style={styles.contentLink}
                        onPress={() => WebBrowser.openBrowserAsync(`https://twitter.com/${username}`)}
                    >
                        {username}{' '}
                    </Text>
                );
            }

            if (childNode.data.includes('hashtag')) {
                return (
                    <Text key={key + childNode.data} style={styles.contentLink}>
                        {childNode.data.replace('/hashtag/', '#').replace('?src=hash', ' ')}
                    </Text>
                );
            }

            return (
                <Text key={key} style={styles.contentLink} onPress={() => WebBrowser.openBrowserAsync(childNode.data)}>
                    {childNode.data + ' '}
                </Text>
            );
        });
    };
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        borderWidth: 0
    },
    cardHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    avatarStyle: {
        backgroundColor: '#eee'
    },
    cardSourceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sourceText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic'
    },
    timeText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic'
    },
    cardContentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 10
    },
    socialIcon: {
        color: '#1DA1F2'
    },
    playerText: {
        marginLeft: 4,
        color: '#444'
    },
    playerInfoText: {
        fontSize: 10,
        color: 'grey'
    },
    dividerContainer: {
        marginTop: 12,
        marginBottom: 4
    },
    contentLink: {
        flexDirection: 'row',
        color: '#1DA1F2'
    }
});
