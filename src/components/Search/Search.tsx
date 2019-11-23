import * as React from 'react';
import { View, Platform, StatusBar, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, FlatList } from 'react-navigation';
import { ListItem, Avatar, Input, Icon } from 'react-native-elements';
import Constants from 'expo-constants';

import * as searchActions from '../../store/search/actions';
import { IPlayer, IPlayerMap } from '../../store/players/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';
import { TEAMS } from '../../util/teams';
import { InputClearer } from '../common/InputClearer';
import { IPlayerNews } from '../../store/timeline/types';
import { PlayerNewsItem } from '../Timeline/PlayerNewsItem/PlayerNewsItem';

interface ISearchUnconnectedProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface ISearchUnconnectedState {
    searchText: string;
    filteredPlayers: IPlayer[];
    selectedPlayerId: string;
}

interface ISearchPropsFromDispatch {
    fetchSearchedPlayerNews: typeof searchActions.fetchSearchedPlayerNews;
    refetchSearchedPlayerNews: typeof searchActions.refetchSearchedPlayerNews;
}

interface ISearchPropsFromState {
    searchedPlayerNews: IPlayerNews;
    playerMap: IPlayerMap;
    loading: boolean;
    error: boolean;
}

type SearchProps = ISearchUnconnectedProps & ISearchPropsFromState & ISearchPropsFromDispatch;
type SearchState = ISearchUnconnectedState;

class SearchUnconnected extends React.Component<SearchProps, SearchState> {
    state: SearchState = {
        searchText: '',
        filteredPlayers: [],
        selectedPlayerId: ''
    };

    componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
        if (prevState.selectedPlayerId !== this.state.selectedPlayerId) {
            this.props.refetchSearchedPlayerNews(this.state.selectedPlayerId);
        }
    }

    render() {
        return (
            <View
                style={{
                    marginTop: Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight
                }}
            >
                {!this.state.selectedPlayerId ? (
                    <Input
                        containerStyle={{
                            height: Platform.OS === 'ios' ? 44 : 56,
                            justifyContent: 'flex-end'
                        }}
                        placeholder={`Try "Tom Brady"`}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.searchText}
                        onChangeText={searchText => {
                            this.setState({
                                searchText,
                                filteredPlayers: this._filterPlayersByName(searchText)
                            });
                        }}
                        rightIcon={
                            this.state.searchText ? (
                                <InputClearer
                                    iconName="clear"
                                    color="gray"
                                    onPress={() => this.setState({ searchText: '' })}
                                />
                            ) : null
                        }
                    />
                ) : (
                    this._renderSelectedPlayerItem()
                )}

                {!this.state.selectedPlayerId ? (
                    <FlatList
                        data={this.state.filteredPlayers}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => this._renderPlayerListItem(item.id)}
                    />
                ) : (
                    <FlatList
                        extraData={this.state.selectedPlayerId}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        // ref={this.flatListRef}
                        data={this.props.searchedPlayerNews.docs}
                        keyExtractor={item => item._id}
                        onRefresh={this._handleRefresh}
                        refreshing={this.props.loading}
                        onEndReached={this._handleOnEndReached}
                        onEndReachedThreshold={20}
                        renderItem={({ item }) => (
                            <PlayerNewsItem
                                player={this.props.playerMap[item.player.id]}
                                playerNewsItem={item}
                            />
                        )}
                    />
                )}
            </View>
        );
    }

    private _handleRefresh = () => {
        this.props.refetchSearchedPlayerNews(this.state.selectedPlayerId);
    };

    private _handleOnEndReached = () => {
        if (!this.props.loading) {
            if (this.props.searchedPlayerNews.nextPage) {
                this.props.fetchSearchedPlayerNews(
                    this.props.searchedPlayerNews.nextPage,
                    this.state.selectedPlayerId
                );
            }
        }
    };

    private _renderSelectedPlayerItem = () => {
        const { selectedPlayerId } = this.state;
        const { name, position, avatarUrl, teamId } = this.props.playerMap[selectedPlayerId];

        return (
            <ListItem
                title={name}
                subtitle={`${position} | ${TEAMS[teamId - 1].abbrev}`}
                bottomDivider
                leftAvatar={
                    <Avatar
                        rounded
                        size="medium"
                        avatarStyle={styles.avatarStyle}
                        source={{ uri: avatarUrl }}
                    />
                }
                rightIcon={
                    <Icon
                        name="clear"
                        onPress={() => this.setState({ searchText: '', selectedPlayerId: '' })}
                        color="gray"
                    />
                }
            />
        );
    };

    private _filterPlayersByName = (searchText: string) => {
        const filteredPlayers: IPlayer[] = [];

        for (let player in this.props.playerMap) {
            if (this.props.playerMap[player].name.toLowerCase().includes(searchText.toLowerCase())) {
                filteredPlayers.push(this.props.playerMap[player]);
            }
        }

        return filteredPlayers;
    };

    private _renderPlayerListItem = (playerId: string) => {
        const { name, position, avatarUrl, teamId } = this.props.playerMap[playerId];

        return (
            <ListItem
                title={name}
                subtitle={`${position} | ${TEAMS[teamId - 1].abbrev}`}
                bottomDivider
                leftAvatar={
                    <Avatar
                        rounded
                        size="medium"
                        avatarStyle={styles.avatarStyle}
                        source={{ uri: avatarUrl }}
                    />
                }
                rightIcon={null}
                onPress={() => this._handlePlayerSelect(playerId)}
            />
        );
    };

    private _handlePlayerSelect = (playerId: string) => {
        this.setState({ selectedPlayerId: playerId });
        // this.props.refetchSearchedPlayerNews(playerId);
    };
}

const styles = StyleSheet.create({
    avatarStyle: {
        backgroundColor: '#eee',
        borderColor: 'white'
    }
});

const mapStateToProps = ({ players, search }: AppState) => {
    return {
        error: players.error,
        loading: players.loading,
        searchedPlayerNews: search.searchedPlayerNews,
        playerMap: players.playerMap
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchSearchedPlayerNews: (page: number, playerId: string) =>
            dispatch(searchActions.fetchSearchedPlayerNews(page, playerId)),
        refetchSearchedPlayerNews: (playerId: string) =>
            dispatch(searchActions.refetchSearchedPlayerNews(playerId))
    };
};

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchUnconnected);
