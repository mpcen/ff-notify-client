import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon, Avatar, Divider } from 'react-native-elements';
import { format } from 'date-fns';

import { Reactions } from './Reactions';

export interface IPlayerNewsItem {
    platform: string;
    username: string;
    contentId: string;
    player: string;
    content: string;
    time: string;
}

interface IPlayerNewsItemProps {
    item: IPlayerNewsItem;
}

export class PlayerNewsItem extends React.Component<IPlayerNewsItemProps> {
    render() {
        const { item } = this.props;
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
        const { content, contentId, player, time, username } = item;
        const avatarUri =
            'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop';

        return (
            <Card key={contentId}>
                <View style={cardHeaderContainer}>
                    <Reactions />

                    <Avatar avatarStyle={avatarStyle} rounded source={{ uri: avatarUri }} />
                    <Text style={playerText}>{player}</Text>
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
