import * as React from 'react';
import { createStore } from 'redux';
import { render, fireEvent } from 'react-native-testing-library';
import { Provider } from 'react-redux';

import { rootReducer } from '../store';
import { ResolveAuth } from '../ResolveAuth';

jest.useFakeTimers();

function renderWithRedux(component: JSX.Element) {
    const store = createStore(rootReducer, {});

    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
}

test('renders a loading spinner', () => {
    const Image = jest.fn();

    const { getByTestId } = renderWithRedux(<ResolveAuth />);
    
    expect(getByTestId('app-icon')).toBeTruthy();
    expect(getByTestId('loading-indicator')).toBeTruthy();

    split up private methods to external class functions that we can mock
});