import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import auth from './auth';
import spotify from './spotify';
import routing from './routing';
import { reducer as toastr } from 'react-redux-toastr'

export default combineReducers({
    form,
    auth,
    spotify,
    routing,
    toastr
});