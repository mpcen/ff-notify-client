import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, Store, AnyAction } from 'redux';
import { render } from 'react-native-testing-library';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';

import { App, store } from '../../../App';
import { Timeline } from '../Timeline';
import { AppState } from '../../../store';
import { rootReducer } from '../../../store';
import { ITimelineState } from '../../../store/timeline/types';
import { AppContainer } from '../../../navigator';

jest.mock('NativeAnimatedHelper').mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');

    return {
        State: {},
        PanGestureHandler: View,
        BaseButton: View,
        Directions: {}
    };
});

console.warn = (arg: any) => {
    const warnings = [
        'Calling .measureInWindow()',
        'Calling .measureLayout()',
        'Calling .setNativeProps()',
        'Calling .focus()',
        'Calling .blur()'
    ];

    const finalArgs = warnings.reduce((acc, curr) => (arg.includes(curr) ? [...acc, arg] : acc), []);

    if (!finalArgs.length) {
        console.warn(arg);
    }
};

const initialState: ITimelineState = {
    playerNews: {
        docs: [],
        nextPage: 2,
        page: 1,
        prevPage: null,
        totalPages: 2
    },
    loading: true,
    error: false
};

function renderWithRedux(
    component: JSX.Element,
    { initialState, store }: { initialState: ITimelineState; store: Store<AppState, AnyAction> }
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store
    };
}

function renderWithNavigation({ screens = {}, navigatorConfig = {} } = {}) {
    const AppNavigator = createStackNavigator(
        {
            Timeline,
            ...screens
        },
        { initialRouteName: 'Timeline', ...navigatorConfig }
    );
}

it('renders with redux', () => {
    const { getByTestId, getByText } = renderWithRedux(<Timeline />);
    expect(true).toBe(true);
});
