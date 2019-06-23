import * as React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { TimeLine } from './components/timeline/TimeLine';

export class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const AppNavigator = createStackNavigator({
    TimeLine: {
        screen: TimeLine
    }
});

const AppContainer = createAppContainer(AppNavigator);
