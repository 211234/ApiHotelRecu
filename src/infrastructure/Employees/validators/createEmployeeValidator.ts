import { check } from 'express-validator';

export const createEmployeeValidator = [
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
        check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    check('cargo')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['recepcionista', 'limpieza', 'seguridad', 'mantenimiento'])
        .withMessage('Invalid role'),
    check('horarioEntrada')
        .notEmpty()
        .withMessage('Start time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('Invalid time format'),
    check('horarioSalida')
        .notEmpty()
        .withMessage('End time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).
        withMessage('Invalid time format'),
];
