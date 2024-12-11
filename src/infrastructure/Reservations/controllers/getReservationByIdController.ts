import { Request, Response } from 'express';
import { GetReservationById } from '../../../application/Reservations/use-cases/getReservationById';

export class GetReservationByIdController {
    constructor(private getReservationById: GetReservationById) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Ejecutar el caso de uso
            const reservation = await this.getReservationById.execute(id);

            res.status(200).json(reservation);
        } catch (error: any) {
            if (error.message === 'Reservation not found') {
                res.status(404).json({ message: 'Reservation not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
