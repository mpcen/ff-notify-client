import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import Constants from 'expo-constants';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { Card, Text, Icon, Avatar, Divider, Header, Badge } from 'react-native-elements';
import { format } from 'date-fns';

interface ITimeLineProps {
    recentPlayerNews: IPlayerNewsItem[];
}

interface ITimeLineState {
    recentPlayerNews: IPlayerNewsItem[];
    loading: boolean;
    error: boolean;
}

export interface IPlayerNewsItem {
    platform: string;
    username: string;
    contentId: string;
    player: string;
    content: string;
    time: string;
}

export class TimeLineScreen extends React.Component<ITimeLineProps, ITimeLineState> {
    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            header: (
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'ACoolAppName', style: { color: '#fff', fontSize: 16 } }}
                    rightComponent={{ type: 'material-community', icon: 'pin-outline', color: '#fff' }}
                />
            )
        } as NavigationScreenOptions;
    };

    public state: ITimeLineState = {
        recentPlayerNews: [],
        loading: true,
        error: false
    };

    async componentDidMount() {
        let recentPlayerNews: AxiosResponse<IPlayerNewsItem[]>;

        try {
            recentPlayerNews = await axios.get('http://192.168.0.210:3000/recentPlayerNews');
            this.setState({
                recentPlayerNews: recentPlayerNews.data,
                loading: false,
                error: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    public render() {
        const { recentPlayerNews } = this.state;
        const { timeLineContainer } = styles;

        return (
            <View style={timeLineContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        height: Constants.statusBarHeight * 3,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View style={{ padding: 8 }}>
                        <Avatar
                            size="medium"
                            avatarStyle={{
                                backgroundColor: 'white',
                                borderColor: 'white'
                            }}
                            containerStyle={{
                                borderColor: '#2089dc',
                                borderStyle: 'solid',
                                borderWidth: 1.5
                            }}
                            rounded
                            source={{
                                uri:
                                    'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop'
                            }}
                        />

                        <Badge
                            containerStyle={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8
                            }}
                            badgeStyle={{
                                backgroundColor: '#ff5a5f',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            value={
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 8
                                    }}
                                >
                                    6
                                </Text>
                            }
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Avatar
                            size="medium"
                            avatarStyle={{
                                backgroundColor: 'white',
                                borderColor: 'white'
                            }}
                            containerStyle={{
                                borderColor: '#2089dc',
                                borderStyle: 'solid',
                                borderWidth: 1.5
                            }}
                            rounded
                            source={{
                                uri:
                                    'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop'
                            }}
                        />

                        <Badge
                            containerStyle={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8
                            }}
                            badgeStyle={{
                                backgroundColor: '#ff5a5f',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            value={
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 8
                                    }}
                                >
                                    6
                                </Text>
                            }
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Avatar
                            size="medium"
                            avatarStyle={{
                                backgroundColor: 'white',
                                borderColor: 'white'
                            }}
                            containerStyle={{
                                borderColor: '#2089dc',
                                borderStyle: 'solid',
                                borderWidth: 1.5
                            }}
                            rounded
                            source={{
                                uri:
                                    'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop'
                            }}
                        />

                        <Badge
                            containerStyle={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8
                            }}
                            badgeStyle={{
                                backgroundColor: '#ff5a5f',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            value={
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 8
                                    }}
                                >
                                    6
                                </Text>
                            }
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Avatar
                            size="medium"
                            avatarStyle={{
                                backgroundColor: 'white',
                                borderColor: 'white'
                            }}
                            containerStyle={{
                                borderColor: '#2089dc',
                                borderStyle: 'solid',
                                borderWidth: 1.5
                            }}
                            rounded
                            source={{
                                uri:
                                    'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop'
                            }}
                        />

                        <Badge
                            containerStyle={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8
                            }}
                            badgeStyle={{
                                backgroundColor: '#ff5a5f',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            value={
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 8
                                    }}
                                >
                                    6
                                </Text>
                            }
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Avatar
                            size="medium"
                            avatarStyle={{
                                backgroundColor: 'white',
                                borderColor: 'white'
                            }}
                            containerStyle={{
                                borderColor: '#2089dc',
                                borderStyle: 'solid',
                                borderWidth: 1.5
                            }}
                            rounded
                            source={{
                                uri:
                                    'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop'
                            }}
                        />

                        <Badge
                            containerStyle={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8
                            }}
                            badgeStyle={{
                                backgroundColor: '#ff5a5f',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            value={
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 8
                                    }}
                                >
                                    6
                                </Text>
                            }
                        />
                    </View>
                </View>

                <FlatList
                    data={recentPlayerNews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: IPlayerNewsItem }) => this._renderRecentPlayerNewsArticle(item)}
                />
            </View>
        );
    }

    private _renderRecentPlayerNewsArticle(item: IPlayerNewsItem) {
        const {
            cardHeaderContainer,
            cardSourceContainer,
            cardContentContainer,
            socialIcon,
            sourceText,
            timeText,
            playerText,
            dividerContainer,
            reactionContainer,
            reactionIcon,
            reactionIconContainer,
            reactionCount
        } = styles;

        return (
            <Card key={item.contentId}>
                <View style={cardHeaderContainer}>
                    <View style={reactionContainer}>
                        <View style={reactionIconContainer}>
                            <Icon
                                iconStyle={[reactionIcon, { color: '#F4D35E' }]}
                                type="material-community"
                                name="train"
                            />
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
                            <Icon
                                iconStyle={[reactionIcon, { color: '#db5461' }]}
                                type="material-community"
                                name="fire"
                            />
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

                        {/* <View>
                            <Icon
                                iconStyle={{ position: 'absolute', top: 0, right: 0 }}
                                size={18}
                                name="sentiment-satisfied"
                            />
                            <Icon iconStyle={{ position: 'absolute', top: -6, right: -6 }} size={12} name="add" />
                        </View> */}
                    </View>

                    <Avatar
                        avatarStyle={{
                            backgroundColor: '#eee'
                        }}
                        rounded
                        source={{
                            uri:
                                'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&h=96&w=96&scale=crop'
                        }}
                    />
                    <Text style={playerText}>{item.player}</Text>
                </View>

                <Divider style={dividerContainer} />

                <View style={cardSourceContainer}>
                    <Icon iconStyle={socialIcon} size={12} type="material-community" name="twitter" />
                    <Text style={sourceText}>{item.username}</Text>
                    <Text style={timeText}>{format(new Date(item.time), 'MMMM Do h:mma')}</Text>
                </View>

                <View style={cardContentContainer}>
                    <Text>{item.content}</Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    timeLineContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    cardHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
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
    },
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
