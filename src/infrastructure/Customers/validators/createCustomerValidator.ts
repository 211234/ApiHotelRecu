import { check } from 'express-validator';

export const createCustomerValidator = [
    check('nombre')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    check('telefono')
        .notEmpty()
        .withMessage('Phone number is required')
        .isString()
        .withMessage('Phone must be a string'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];
