import Immutable from 'immutable';
import {
    GET_MUSICS_SUCCESS,
    GET_MUSICS_FAILURE,
    SHOW_SELECTED_MUSIC
} from '../constants/spotify';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MUSICS_SUCCESS: {
            return state.merge({ list: action.musics });
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