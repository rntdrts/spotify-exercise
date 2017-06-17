import 'babel-polyfill';
import { expect } from 'chai';
import { stub, mock, assert } from 'sinon';

import rp from 'request-promise';

import { getAccessToken, getPlaylistsByCategory, getMusics } from './spotify';

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
        const category = 'romance', offset = 0;

        rpStub.callsFake((option) => {
            expect(option).to.be.an('object');

            expect(option.uri).to.exist;
            expect(option.uri.split('/')).to.have.any.keys(category, offset);

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

    //TODO: Test getMusics (It will need refactoring)
});