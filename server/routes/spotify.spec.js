import 'babel-polyfill';
import { expect } from 'chai';
import { stub, mock, assert } from 'sinon';

import rp from 'request-promise';

import { getAccessToken, getPlaylistsByCategory, getTracksOnPlaylist, getMusics } from './spotify';

import Spotify from 'machinepack-spotify';

describe('Spotify - routes', () => {
    let spotifyStub = {},
        rpStub = {};

    beforeEach(() => {
        spotifyStub = stub(Spotify, 'getAccessToken');
        rpStub = stub(rp, 'Request');
    });

    afterEach(() => {
        spotifyStub.restore();
        rpStub.restore();
    });

    it('should get Access token from spotify', (done) => {
        let callback = stub(),
            exec = { exec: callback };
        spotifyStub.callsFake((config) => {
            expect(config).to.be.an('object');
            expect(config.clientId).to.exist;
            expect(config.clientSecret).to.exist;

            return exec;
        });

        getAccessToken(null, exec);

        expect(spotifyStub.calledOnce).to.equal(true);
        done();
    });

    it('should validate options on get playlist by category', (done) => {
        const category = 'romance', offset = 1;

        rpStub.callsFake((option) => {
            expect(option).to.be.an('object');

            expect(option.uri).to.exist;
            expect(option.uri).to.include(category);
            expect(option.uri).to.include(offset);

            expect(option.qs).to.exist;
            expect(option.qs).to.be.an('object');

            expect(option.qs.access_token).to.be.null;
            expect(option.qs.offset).to.exist;
            assert.match(option.qs.offset, offset);
            expect(option.qs.limit).to.exist;

            expect(option.headers).to.exist;
            expect(option.json).to.exist;
        });

        getPlaylistsByCategory(category, offset);

        expect(rpStub.calledOnce).to.equal(true);
        done();
    });

    it('should validate options on get tracks on playlist', (done) => {
        const playlist_id = 'romance1', user_id = 'spotify';

        rpStub.callsFake((option) => {
            expect(option).to.be.an('object');

            expect(option.uri).to.exist;
            expect(option.uri).to.include(playlist_id);
            expect(option.uri).to.include(user_id);

            expect(option.qs).to.exist;
            expect(option.qs).to.be.an('object');

            expect(option.qs.access_token).to.be.null;
            expect(option.qs.fields).to.exist;

            expect(option.headers).to.exist;
            expect(option.json).to.exist;
        });

        getTracksOnPlaylist(playlist_id, user_id);

        expect(rpStub.calledOnce).to.equal(true);
        done();
    });

    it('should get Musics', (done) => {
        let res = {
            json: stub()
        },
        then_category = {
            then: function(result) {
                result({
                    playlists: {
                        items: [{id: 'pl1', owner: { id: 'spotify'}}]
                    }
                });

                return this;
            },
            catch: stub()
        },
        then_track = {
            then: function (result) {
                result({items: [0, 1, 2]});
            }
        };

        rpStub.callsFake((option) => {
            if(option.qs.fields)
                return then_track;

            return then_category;
        });

        getMusics({params: {offset: 0}}, res);

        expect(res.json.calledOnce).to.equal(true);
        done();
    });
});