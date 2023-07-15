import jwt from 'jsonwebtoken';
const secret = "@#$%^&*&*"

export const createToken = (payload)=> {
    return jwt.sign(payload, secret, { expiresIn: '1d' }); //2day
}

export const decodeToken = (payload)=> {
    return jwt.verify(payload, secret);
}