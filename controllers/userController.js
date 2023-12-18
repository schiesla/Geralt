import { findUser } from '../queries/userQueries.js';
import User from '../models/userModel.js';
import { hashPlainTextPassword } from '../utils/encryption.js';
import { signToken } from '../utils/token.js';

export async function register(req, res) {
    try {
        const newUser = new User(req.body);
        newUser.hash_password = hashPlainTextPassword(req.body.password);
        const user = await newUser.save();
        user.hash_password = undefined;
        return res.json(user);
    } catch (err) {
        return res.status(400).send({
            message: err
          });
    }
  };

export async function signIn(req, res) {
    try {
        const user = await findUser({ email: req.body.email});
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: signToken(user)});
    } catch (err) {
        throw err;
    }
};

export function loginRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};

export function profile(req, res, next) {
    if (req.user) {
      res.send(req.user);
    } else {
     return res.status(401).json({ message: 'Invalid token' });
    }
};