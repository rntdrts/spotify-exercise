import 'babel-polyfill';
import { expect } from 'chai';
import { stub, assert, sandbox } from 'sinon';

import bcrypt from 'bcryptjs';

import User from './user';

describe('User', () => {
    let compareStub = {};

    beforeEach(() => {
        compareStub = stub(bcrypt, 'compare').callsFake((pass, cpass, cb) => cb(pass === cpass));
    });

    afterEach(() => {
        bcrypt.compare.restore();
    });

    it('should be invalid if is empty', (done) => {
        let user = new User();
        user.validate((err) => {
            expect(err.errors.email).to.exist;
            expect(err.errors.password).to.exist;
            done();
        })
    });

    it('should check compare passwords', (done) => {
        let user = new User({ email: 'admin@mail.com', password: 'testing'});

        user.comparePwd('pass', () => {});

        expect(compareStub.calledOnce).to.equal(true);
        done();
    });

    it('should return true if passwords are equal', (done) => {
        const expectedPassword = 'admin@mail.com',
            expectedEmail = 'admin@mail.com';

        let user = new User({ email: expectedEmail, password: expectedPassword });

        user.comparePwd(expectedPassword, (isMatch) => {
            expect(isMatch).to.be.true;
            done();
        });
    });

    it('should return false if passwords are different', (done) => {
        const expectedPassword = 'admin@mail.com',
            expectedEmail = 'admin@mail.com',
            unexpectedPassword = 'aaaa@mail.com';

        let user = new User({ email: expectedEmail, password: expectedPassword });

        user.comparePwd(unexpectedPassword, (isMatch) => {
            expect(isMatch).to.be.false;
            done();
        });
    });
});