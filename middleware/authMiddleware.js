import { verifyToken } from "../utils/token.js";

/**
 * Grab the JWT from the auth header and verify it.
 * Either pass on the user as req.user, or throw an error.
 */
export async function authorizeJWT(req, res, next) {
    try {
        const hasJwt = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT';
        if (!hasJwt) {
            const err = Error("No Session Found!");
            err.status = 401
            throw err;
        }
        const jwt = req.headers.authorization.split(' ')[1];
        const decode = await verifyToken(jwt);
        req.user = decode;
        next();
    } catch (err) {
        req.user = undefined;
        next(err);
    }
}
