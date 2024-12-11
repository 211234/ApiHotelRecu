import { Request, Response } from 'express';
import { DeleteReservation } from '../../../application/Reservations/use-cases/deleteReservation';

export class DeleteReservationController {
    constructor(private deleteReservation: DeleteReservation) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.deleteReservation.execute(id);
            res.status(200).json({ message: 'Reservation deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Reservation not found') {
                res.status(404).json({ message: 'Reservation not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
