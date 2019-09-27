import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
import { NavigationContainerComponent } from 'react-navigation';

import { setNavigator } from './navigator/navigationRef';
import { rootReducer, rootSaga } from './store';

import { AppContainer } from './navigator';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer
                    ref={(navigation: NavigationContainerComponent) => {
                        setNavigator(navigation);
                    }}
                />
            </Provider>
        );
    }
}
