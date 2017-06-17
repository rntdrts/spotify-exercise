import 'babel-polyfill';
import { expect } from 'chai';
import { stub, assert } from 'sinon';

import jwt from 'jsonwebtoken';

import { signup, login, verifyAuth } from './user';
import { TOKEN_SECRET } from '../../config';
import User from '../models/user';

describe('User - routes', () => {
    let userStub = {};
    let jwtSub = {};

    beforeEach(() => {
        userStub = stub(User, 'findOne');
        jwtSub = stub(jwt, 'verify');
    });

    afterEach(() => {
        userStub.restore();
        jwtSub.restore();
    });

    it('should signup a new user', (done) => {
        let req = { body: { email: 'test@admin.com', name: 'name', password: 'test' } },
            res = { send: stub() };

        userStub.yields(null, false);

        signup(req, res);

        assert.calledWith(User.findOne, { email: req.body.email });
        done();
    });

    it('should return status 409 if user already exists', (done) => {
        let req = { body: { email: 'test@admin.com', name: 'name', password: 'test' } },
            res = {
            json: stub(),
            status: function (responseStatus) {
                expect(responseStatus, 409).to.be.equal;
                return this;
            }
        };

        userStub.yields('error', new User(req.body));

        signup(req, res);

        assert.calledWith(res.json, { message: 'Email is already taken'});
        done();
    });

    it('should login user', (done) => {
        let req = { body: { email: 'test@admin.com', name: 'name', password: 'test' } },
            res = { json: stub() },
            user = new User(req.body);

        user.comparePwd = stub();
        user.comparePwd.yields(null, true);

        userStub.yields(null, user);

        login(req, res);

        assert.calledWith(User.findOne, { email: req.body.email }, '+password');
        assert.calledWith(user.comparePwd, req.body.password);
        expect(user.comparePwd.calledOnce).to.equal(true);
        done();
    });

    it('should not find the user', (done) => {
        let req = { body: { email: 'test@admin.com', name: 'name', password: 'test' } },
            res = {
                json: stub(),
                status: function (responseStatus) {
                    expect(responseStatus, 401).to.be.equal;
                    return this;
                }
        };

        userStub.yields('err', null);

        login(req, res);

        assert.calledWith(User.findOne, { email: req.body.email }, '+password');
        assert.calledWith(res.json, { message: 'Invalid email/password'});
        done();
    });

    it('should not login, because of wrong password', (done) => {
        let req = { body: { email: 'test@admin.com', name: 'name', password: 'test' } },
            res = {
                send: stub(),
                status: function (responseStatus) {
                    expect(responseStatus, 401).to.be.equal;
                    return this;
                }
            },
        user = new User(req.body);

        user.comparePwd = stub();
        user.comparePwd.yields(null, false);

        userStub.yields(null, user);

        login(req, res);

        assert.calledWith(User.findOne, { email: req.body.email }, '+password');
        assert.calledWith(res.send, { message: 'Invalid email/password'});
        expect(user.comparePwd.calledOnce).to.equal(true);
        done();
    });

    it('should verify authentication as valid', (done) => {
        let req = { headers: { 'x-access-token': 'test' } },
            res = { },
            next = stub();

        jwtSub.yields(null, {});

        verifyAuth(req, res, next);

        assert.calledWith(jwt.verify, req.headers['x-access-token'], TOKEN_SECRET);
        expect(next.calledOnce).to.equal(true);
        done();
    });

    it('should verify authentication as invalid', (done) => {
        let req = { headers: { 'x-access-token': 'test' } },
            res = {
                send: stub(),
                status: function (responseStatus) {
                    expect(responseStatus, 403).to.be.equal;
                    return this;
                }
            };

        jwtSub.yields(true, {});

        verifyAuth(req, res);

        assert.calledWith(jwt.verify, req.headers['x-access-token'], TOKEN_SECRET);
        assert.calledWith(res.send, { message: 'Failed to authenticate token.'});
        expect(res.send.calledOnce).to.equal(true);
        done();
    });

    it('should verify authentication has no token', (done) => {
        let req = { headers: { 'x-access-token': null } },
            res = {
                send: stub(),
                status: function (responseStatus) {
                    expect(responseStatus, 403).to.be.equal;
                    return this;
                }
            };

        verifyAuth(req, res);

        assert.calledWith(res.send, { message: 'No token provided.'});
        expect(res.send.calledOnce).to.equal(true);
        done();
    })

});