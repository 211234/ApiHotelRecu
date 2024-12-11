import { Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth';
import { AuthRequest } from '../interfaces/authRequest';

// Middleware para autenticar el token JWT
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return; // Asegurar que el flujo termine aquí
    }

    try {
        const decoded = verifyToken(token) as { id: string; role: string };
        req.user = { id: decoded.id, tipo: decoded.role };
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Middleware para autorizar por roles
export const authorizeRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.tipo)) {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            return; // Terminar el flujo si no está autorizado
        }
        next();
    };
};
