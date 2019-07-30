import { combineReducers } from 'redux';

export default combineReducers({
    myStore: () => {
        return { hello: 'world' };
    }
});
