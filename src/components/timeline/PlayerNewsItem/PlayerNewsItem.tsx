import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon, Avatar, Divider } from 'react-native-elements';
import formatDistance from 'date-fns/formatDistance';
import { WebBrowser } from 'expo';

import { Reactions } from './Reactions';
import { TEAMS } from '../../../util/teams';
import { IPlayerNewsItem, IChildNode } from '../../../store/timeline/types';
import { IPlayer } from '../../../store/playerSettings/types';

interface IPlayerNewsItemProps {
    playerNewsItem: IPlayerNewsItem;
    player: IPlayer;
}

export class PlayerNewsItem extends React.PureComponent<IPlayerNewsItemProps> {
    render() {
        const { playerNewsItem } = this.props;
        const { time, username } = playerNewsItem;
        const { avatarUrl, name, position, teamId } = this.props.player;

        return (
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}>
                    {/* <Reactions /> */}

                    <View>
                        <Avatar avatarStyle={styles.avatarStyle} rounded source={{ uri: avatarUrl }} />
                    </View>

                    <View>
                        <Text style={styles.playerText}>{name}</Text>
                        <View style={styles.playerInfoTextContainer}>
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
                    <Text style={styles.timeText}>{`${formatDistance(Date.now(), new Date(time))} ago`}}</Text>
                </View>

                <Text style={styles.cardContentContainer}>{this._renderChildNodes()}</Text>
            </Card>
        );
    }

    private _renderChildNodes = () => {
        const { contentId, content, username, childNodes, platform } = this.props.playerNewsItem;
        const key = `${platform}-${username}-${contentId}`;

        if (!childNodes.length) {
            return <Text key={`${key}-${content}`}>{content}</Text>;
        }

        return childNodes.map((childNode: IChildNode, index: number) => {
            const subKey = `${key}-${index}`;
            const data = childNode.data.trim();
            if (childNode.contentType === 'text') {
                return <Text key={`${subKey}-${data}`}>{data} </Text>;
            }

            if (childNode.username) {
                const username = childNode.data.replace('/', '@').trim();
                return (
                    <Text
                        key={`${subKey}-${username}`}
                        style={styles.contentLink}
                        onPress={() => WebBrowser.openBrowserAsync(`https://twitter.com/${username}`)}
                    >
                        {username}{' '}
                    </Text>
                );
            }

            if (childNode.data.includes('hashtag')) {
                const data = childNode.data.replace('/hashtag/', '#').replace('?src=hash', ' ');
                return (
                    <Text key={`${subKey}-${data}}`} style={styles.contentLink}>
                        {data}
                    </Text>
                );
            }

            return (
                <Text
                    key={`${subKey}-${childNode.data}`}
                    style={styles.contentLink}
                    onPress={() => WebBrowser.openBrowserAsync(childNode.data)}
                >
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
    playerInfoTextContainer: {
        flexDirection: 'row',
        marginLeft: 4
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
