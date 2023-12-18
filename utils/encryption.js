import bcrypt from 'bcrypt';

const HASH = 10;

export function hashPlainTextPassword(plaintextPassword) {
    return bcrypt.hashSync(plaintextPassword, HASH);
}

export function comparePasswords(plaintextPassword, hashedPassword) {
    return bcrypt.compareSync(plaintextPassword, hashedPassword);
}
