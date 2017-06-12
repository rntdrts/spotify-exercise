import { put, call, takeLatest } from 'redux-saga/effects';
import { GET_MUSICS } from '../constants/spotify';
import {
    getMusicsSuccess,
    getMusicsFailure,
} from '../actions/spotify';

const fetchMusics = () => {
    return fetch('http://localhost:8080/musics', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        })
    })
        .then(response => response.json());
};

function* getMusics () {
    try {
        const musics = yield call(fetchMusics);
        yield put(getMusicsSuccess(musics));
    } catch (e) {
        yield put(getMusicsFailure());
    }
}

function* watchGetMusics() {
    yield takeLatest(GET_MUSICS, getMusics);
}
export {
    watchGetMusics
};
