import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';

import { Stories } from './Stories/Stories';
import { PlayerNewsItem, IPlayerNewsItem } from './PlayerNewsItem/PlayerNewsItem';
import { IPlayer } from '../PlayerSettings/PlayerSettingsScreen';
//import console = require('console');

interface ITimeLineProps {
    playerNews: IPlayerNewsItem[];
}

interface ITimeLineState {
    playerNews: IPlayerNewsItem[];
    loading: boolean;
    error: boolean;
    filteredPlayers: string[];
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
        playerNews: [],
        filteredPlayers: ['Smith', 'James'],
        loading: true,
        error: false
    };

    componentDidMount() {
        this._fetchPlayerNews();
    }

    public render() {
        const { playerNews } = this.state;
        const { timeLineScreenContainer } = styles;

        return (
            <View style={timeLineScreenContainer}>
                <Stories />

                <FlatList
                    data={playerNews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: IPlayerNewsItem }) => <PlayerNewsItem item={item} />}
                />
            </View>
        );
    }

    private _fetchPlayerNews = async () => {
        let playerNews: AxiosResponse<IPlayerNewsItem[]>;
        const uri = 'http://192.168.0.210:3000/recentPlayerNews';

        try {
            playerNews = await axios.get(uri);

            const filteredNews: IPlayerNewsItem[] = [];

            console.log('before:', this.state.playerNews);

            playerNews.data.forEach(playerNewsItem => {
                this.state.filteredPlayers.forEach(filteredPlayerName => {
                    if (playerNewsItem.player.includes(filteredPlayerName)) {
                        filteredNews.push(playerNewsItem);
                    }
                });
            });

            console.log('filtered:', filteredNews);

            this.setState({ playerNews: filteredNews, loading: false, error: false });
        } catch (e) {
            console.log('error:', e);
            this.setState({ loading: false, error: true });
        }
    };
}

const styles = StyleSheet.create({
    timeLineScreenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
