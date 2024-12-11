import { check } from 'express-validator';

export const updateRoomValidator = [
    check('numero')
        .optional()
        .isString()
        .withMessage('Room number must be a string'),
    check('tipo')
        .optional()
        .isIn(['estándar', 'suite', 'deluxe'])
        .withMessage('Room type must be estándar, suite, or deluxe'),
    check('precio')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    check('disponibilidad')
        .optional()
        .isBoolean()
        .withMessage('Availability must be true or false'),
];
