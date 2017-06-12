import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { App, Spotify, Login, Signup } from './components';
import RomanticContainer from './containers/RomanticContainer';
import { push } from 'react-router-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
import userAuthenticated from './utils/authWrapper';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toObject();
    }
});

const options = {
    authSelector: state => state.get('auth'),
    predicate: auth => auth.get('isAuthenticated'),
    redirectAction: ({ pathname, query }) => {
        if(query.redirect) {
            return push(`auth${pathname}?next=${query.redirect}`);
        }
    },
    wrapperDisplayName: 'UserIsJWTAuthenticated'
};
const requireAuthentication = userAuthenticated(options);

export default (
    <Provider store={store}>
        <div className="wrapper">
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={requireAuthentication(RomanticContainer)} />
                </Route>
                <Route path="/auth" component={App}>
                    <Route path="signup" component={Signup} />
                    <Route path="login" component={Login} />
                </Route>
            </Router>
            <ReduxToastr
                timeOut={2000}
                newestOnTop={false}
                preventDuplicates={true}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
            />
        </div>
    </Provider>
);