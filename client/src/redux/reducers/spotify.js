import Immutable, { List } from 'immutable';
import {
    GET_MUSICS,
    GET_MUSICS_SUCCESS,
    GET_MUSICS_FAILURE,
    SHOW_SELECTED_MUSIC
} from '../constants/spotify';

const initialState = Immutable.Map({list: List([]), offset: 0, loading: false});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MUSICS:
            return state.merge({
                loading: true
            });
        case GET_MUSICS_SUCCESS: {
            return state.merge({
                list: List(state.toJS().list.concat(action.musics)),
                offset: action.offset + 1,
                loading: false
            });
        }
        case SHOW_SELECTED_MUSIC: {
            return state.merge({ selectedMusic: action.music });
        }
        case GET_MUSICS_FAILURE: {
            return state.clear();
        }
        default:
            return state;
    }
}