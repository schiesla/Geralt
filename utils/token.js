import jwt from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';


export function signToken(user) {
    return jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, process.env.JWT_SECRET);
}

export async function verifyToken(jwt) {
    return jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
}
