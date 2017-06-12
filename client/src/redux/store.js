import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from './sagas';
import reducer from './reducers';
import Immutable from 'immutable';
import { hashHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import isAuthenticated from '../utils/authentication';


const initialState = Immutable.fromJS({
    auth: isAuthenticated()
});

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const routeMiddleware = routerMiddleware(hashHistory);
    const store = createStore(
        reducer,
        initialState, // We pass the initialState for user authentication
        compose(
            applyMiddleware(sagaMiddleware, routeMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        )
    );
    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;