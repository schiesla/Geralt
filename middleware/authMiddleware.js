import jsonwebtoken from 'jsonwebtoken';

/**
 * Grab the JWT from the auth header and verify it.
 * Either pass on the user as req.user, or set that value as undefined.
 */
export async function authorizeJWT(req, res, next) {
    try {
        const hasJwt = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT';
        if (!hasJwt) {
            req.user = undefined;
            return next();
        }
        const jwt = req.headers.authorization.split(' ')[1];
        const decode = await jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        req.user = undefined;
        next();
    }
  }