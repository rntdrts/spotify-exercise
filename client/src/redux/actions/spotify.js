import {
    GET_MUSICS,
    GET_MUSICS_SUCCESS,
    GET_MUSICS_FAILURE,
    SHOW_SELECTED_MUSIC
} from '../constants/spotify';

function getMusics() {
    return {
        type: GET_MUSICS
    };
}

function getMusicsSuccess(musics) {
    return {
        type: GET_MUSICS_SUCCESS,
        musics
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