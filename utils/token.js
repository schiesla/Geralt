import jwt from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';


export function signToken(user) {
    return jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, "temporary_but_VERY_secret");
}

export async function verifyToken(jwt) {
    return jsonwebtoken.verify(jwt, "temporary_but_VERY_secret");
}
