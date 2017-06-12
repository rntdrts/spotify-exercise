import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/user';
import { TOKEN_SECRET } from '../../config';

const createToken = name => {
    let payload = {
        sub: name,
        exp: moment().add(1, 'day').unix()
    };
    return jwt.sign(payload, TOKEN_SECRET);
};

const signup = (req, res) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already taken' });
        }

        // A new user is created with the information sent by the client
        const user = Object.assign(new User(), req.body);
        user.save((err, result) => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Welcome to Romantic spotify, you are now logged in',
                token: createToken(result.name)
            });
        });
    });
};

const login = (req, res) => {
    User.findOne({ email: req.body.email }, '+password', (err, user) => {
        if (!user) {
            return res.status(401).json({ message: 'Invalid email/password' });
        }
        /* If the user exists, the password sent by the client is compared with the one in the db
         with the utilily function comparePwd
         */
        user.comparePwd(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({ message: 'Invalid email/password' });
            }
            res.json({ message: 'You are now logged in', token: createToken(user.name) });
        });
    });
};

const verifyAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, TOKEN_SECRET, function(err, payload) {
            if (err) {
                return res.status(403).send({
                    message: 'Failed to authenticate token.'
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(403).send({
            message: 'No token provided.'
        });
    }
};

export {
    signup,
    login,
    verifyAuth
};
