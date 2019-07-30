import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './store/reducers';
import { AppContainer } from './navigator';

const store = createStore(reducers, composeWithDevTools());

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
