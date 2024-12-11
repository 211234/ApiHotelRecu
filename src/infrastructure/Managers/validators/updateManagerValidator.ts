import { check } from 'express-validator';

export const updateManagerValidator = [
    check('nombre')
        .optional()
        .isString()
        .withMessage('Name must be a string'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    check('telefono')
        .optional()
        .isString()
        .withMessage('Phone must be a string'),
];
