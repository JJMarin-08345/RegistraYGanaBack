import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const generateToken = (user) => {
    return jwt.sign(user, process.env.AUTH_TOKEN, {expiresIn: '8h'});
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.AUTH_TOKEN);
}