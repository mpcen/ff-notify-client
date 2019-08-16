import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon, Avatar, Divider } from 'react-native-elements';
import { format } from 'date-fns';

import { Reactions } from './Reactions';
import { IPlayer } from '../../../store/playerSettings/types';

export interface IPlayerNewsItem {
    platform: string;
    username: string;
    contentId: string;
    player: IPlayer;
    content: string;
    time: string;
}

interface IPlayerNewsItemProps {
    playerNewsItem: IPlayerNewsItem;
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
        const { content, contentId, player, time, username } = playerNewsItem;

        return (
            <Card key={contentId}>
                <View style={cardHeaderContainer}>
                    <Reactions />

                    <Avatar avatarStyle={avatarStyle} rounded source={{ uri: playerNewsItem.player.avatarUrl }} />
                    <Text style={playerText}>{player.name}</Text>
                </View>

                <Divider style={dividerContainer} />

                <View style={cardSourceContainer}>
                    <Icon iconStyle={socialIcon} size={12} type="material-community" name="twitter" />
                    <Text style={sourceText}>{username}</Text>
                    <Text style={timeText}>{format(new Date(time), 'MMMM Do h:mma')}</Text>
                </View>

                <View style={cardContentContainer}>
                    <Text>{content}</Text>
                </View>
            </Card>
        );
    }
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
    cardContentContainer: {},
    socialIcon: {
        color: '#1da1f2'
    },
    playerText: {
        marginLeft: 4,
        color: '#444'
    },
    dividerContainer: {
        marginTop: 12,
        marginBottom: 12
    }
});
