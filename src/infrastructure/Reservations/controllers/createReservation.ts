import { Request, Response } from 'express';
import { CreateReservation } from '../../../application/Reservations/use-cases/createReservation';
import { validationResult } from 'express-validator';

export class CreateReservationController {
    constructor(private createReservation: CreateReservation) {}

    async handle(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array(), message: 'Invalid input data' });
            return;
        }

        try {
            const data = req.body;
            await this.createReservation.execute(data);
            res.status(201).json({ message: 'Reservation created successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
