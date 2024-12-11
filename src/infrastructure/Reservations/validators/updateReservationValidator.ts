import { check } from 'express-validator';

export const updateReservationValidator = [
    check('fechaInicio')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format for start date'),
    check('fechaFin')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format for end date'),
    check('clienteId')
        .optional()
        .isUUID()
        .withMessage('Invalid Customer ID'),
    check('habitacionId')
        .optional()
        .isUUID()
        .withMessage('Invalid Room ID'),
];
