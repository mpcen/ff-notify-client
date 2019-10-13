import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon, Avatar, Divider } from 'react-native-elements';
import { format } from 'date-fns';
import {} from 'react-navigation';

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
        const {
            cardHeaderContainer,
            cardSourceContainer,
            cardContentContainer,
            socialIcon,
            sourceText,
            timeText,
            playerText,
            dividerContainer,
            avatarStyle
        } = styles;
        const { content, contentId, time, username } = playerNewsItem;
        const { avatarUrl, name, position, teamId } = this.props.player;

        return (
            <Card key={contentId}>
                <View style={cardHeaderContainer}>
                    {/* <Reactions /> */}

                    <Avatar avatarStyle={avatarStyle} rounded source={{ uri: avatarUrl }} />
                    <Text style={playerText}>{name}</Text>
                    <Text style={playerText}>{position}</Text>
                    <Text style={playerText}>{TEAMS[teamId - 1].abbrev}</Text>
                </View>

                <Divider style={dividerContainer} />

                <View style={cardSourceContainer}>
                    <Icon iconStyle={socialIcon} size={12} type="material-community" name="twitter" />
                    <Text style={sourceText}>{username}</Text>
                    <Text style={timeText}>{format(new Date(time), 'MMMM do h:mm a')}</Text>
                </View>

                <View style={cardContentContainer}>
                    <Text>{this._renderChildNodes()}</Text>
                </View>
            </Card>
        );
    }

    private _renderChildNodes = () => {
        return this.props.playerNewsItem.childNodes.map((childNode: IChildNode, index) => {
            const key = childNode.data + '-' + index;
            if (childNode.contentType === 'text') {
                return <Text key={key}>{childNode.data.trim()} </Text>;
            }

            if (childNode.username) {
                return (
                    <Text key={key} style={styles.contentLink}>
                        {childNode.data.replace('/', '@').trim()}{' '}
                    </Text>
                );
            }

            if (childNode.data.includes('hashtag')) {
                return (
                    <Text key={key} style={styles.contentLink}>
                        {childNode.data.replace('/hashtag/', '#').replace('?src=hash', ' ')}
                    </Text>
                );
            }

            return (
                <Text key={key} style={styles.contentLink}>
                    {childNode.data}
                </Text>
            );
        });
    };
}

const styles = StyleSheet.create({
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
        flex: 1
    },
    socialIcon: {
        color: '#1DA1F2'
    },
    playerText: {
        marginLeft: 4,
        color: '#444'
    },
    dividerContainer: {
        marginTop: 12,
        marginBottom: 12
    },
    contentLink: {
        color: '#1DA1F2'
    }
});
