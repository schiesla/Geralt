import User from '../models/userModel.js';

// interface UserQueryOptions {
//     id?: string;
//     email?: string;
// }

// type QueryCallback = (err: any, user: typeof User) => void;

/**
 * given an id or an email, find a User
 * @param {*} options 
 * @param {*} cb 
 * @returns A Promise containing a User or an error
 */
export function findUser(options, cb) {
    if (options.id) {
        return User.findById(options.id);
    }
    return User.findOne({ email: options.email });
};