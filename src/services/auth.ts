import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env';

const SECRET_KEY = env.jwt.jwtSecret as string;
const TOKEN_EXPIRATION = '1h';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const generateToken = (id: string, role: string): string => {
    return jwt.sign({ id, role }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
