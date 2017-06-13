import {
    GET_MUSICS,
    GET_MUSICS_SUCCESS,
    GET_MUSICS_FAILURE,
    SHOW_SELECTED_MUSIC
} from '../constants/spotify';

function getMusics(offset) {
    return {
        type: GET_MUSICS,
        offset
    };
}

function getMusicsSuccess(musics, offset) {
    return {
        type: GET_MUSICS_SUCCESS,
        musics,
        offset
    }
}

function showSelectedMusic(music) {
    return {
        type: SHOW_SELECTED_MUSIC,
        music
    }
}

function getMusicsFailure() {
    return {
        type: GET_MUSICS_FAILURE
    }
}

export {
    getMusics,
    getMusicsSuccess,
    getMusicsFailure,
    showSelectedMusic
};