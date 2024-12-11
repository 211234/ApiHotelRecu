import { check } from 'express-validator';

export const createReservationValidator = [
    check('fechaInicio')
        .notEmpty()
        .withMessage('Start date is required')
        .isISO8601()
        .withMessage('Invalid date format'),
    check('fechaFin')
        .notEmpty()
        .withMessage('End date is required')
        .isISO8601()
        .withMessage('Invalid date format'),
    check('clienteId')
        .notEmpty()
        .withMessage('Customer ID is required')
        .isUUID()
        .withMessage('Invalid Customer ID'),
    check('habitacionId')
        .notEmpty()
        .withMessage('Room ID is required')
        .isUUID()
        .withMessage('Invalid Room ID'),
];
