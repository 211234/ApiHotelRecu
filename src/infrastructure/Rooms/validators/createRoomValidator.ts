import { check } from 'express-validator';

export const createRoomValidator = [
    check('numero')
        .notEmpty()
        .withMessage('Room number is required')
        .isString()
        .withMessage('Room number must be a string'),
    check('tipo')
        .notEmpty()
        .withMessage('Room type is required')
        .isIn(['estándar', 'suite', 'deluxe'])
        .withMessage('Room type must be estándar, suite, or deluxe'),
    check('precio')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    check('disponibilidad')
        .notEmpty()
        .withMessage('Availability is required')
        .isBoolean()
        .withMessage('Availability must be true or false'),
];
