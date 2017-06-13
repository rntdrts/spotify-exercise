import Spotify from 'machinepack-spotify';
import rp from 'request-promise';
import moment from 'moment';

import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../config/index';

const BASE_URL = 'https://api.spotify.com/v1/',
    PLAYLIST_LIMIT = 1,
    EXPIRED_TIME = 45;

let ACCESS_TOKEN = null,
    TOKEN_EXP = moment().add(EXPIRED_TIME, 'm').unix();

const getAccessToken = (callback) => {
    Spotify.getAccessToken({
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_CLIENT_SECRET,
    }).exec({
        error: function (err) {

        },
        success: function (result) {
            ACCESS_TOKEN = result;
            if (callback) {
                callback();
            }
        },
    });
};

const getPlaylistsByCategory = (category, offset) => {
    const playListOptions = {
        uri: BASE_URL + 'browse/categories/'+category+'/playlists',
        qs: {
            access_token: ACCESS_TOKEN,
            offset: offset,
            limit: PLAYLIST_LIMIT
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    return rp(playListOptions);
};


const getTracksOnPlaylist = (playlist_id, user_id) => {
    const tracksOptions = {
        uri: BASE_URL + 'users/'+user_id+'/playlists/'+playlist_id+'/tracks',
        qs: {
            access_token: ACCESS_TOKEN,
            fields: 'items(track(name,href,uri,external_urls).album)'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    return rp(tracksOptions);
};

const romances = (req, res) => {
    const { offset } = req.params;
    getPlaylistsByCategory('romance', offset).then((result) => {
        result.playlists.items.forEach(playlist => {
            getTracksOnPlaylist(playlist.id, playlist.owner.id)
                .then(result => res.json(result.items));
        });
    }).catch((e) => res.status(401).send({ message: 'Invalid Access' }));
};

const getRomanceMusics = (req, res) => {
    if (moment().unix() > TOKEN_EXP ) {
        getAccessToken(() => {
            romances(req, res);
            TOKEN_EXP = moment().add(EXPIRED_TIME, 'm').unix();
        });
    } else {
        romances(req, res);
    }
};

getAccessToken();

export {
    getAccessToken,
    getPlaylistsByCategory,
    getRomanceMusics
}
