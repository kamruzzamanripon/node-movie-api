import { decodeToken } from '../helpers/jwt.js';

const auth = (req, res, next)=> {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = decodeToken(token);
        //console.log(req.user)
        next();
    } catch (err) {
        res.status(400).send('Authentication Failed')
    }
}
export default auth;