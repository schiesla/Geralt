import mongoose, { Schema } from 'mongoose';
import { comparePasswords } from '../utils/encryption.js';

const user = new Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
      }
});

user.methods = {
    /**
     * @param {*} password a plain text password
     * @returns does the hash of the plain text match the hashed pass?
     */
    comparePassword(password) {
        return comparePasswords(password, this.hash_password);
    }
}

const User = mongoose.model('User', user);

export const userSchema = User.schema;
export default User;
