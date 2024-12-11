import { Request, Response } from 'express';
import { UpdateReservation } from '../../../application/Reservations/use-cases/updateReservation';
import { validationResult } from 'express-validator';

export class UpdateReservationController {
    constructor(private updateReservation: UpdateReservation) {}

    async handle(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array(), message: 'Invalid input data' });
            return;
        }

        try {
            const { id } = req.params;
            const data = req.body;

            await this.updateReservation.execute(id, data);
            res.status(200).json({ message: 'Reservation updated successfully' });
        } catch (error: any) {
            if (error.message === 'Reservation not found') {
                res.status(404).json({ message: 'Reservation not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
