import { Request, Response } from 'express';
import { GetAllReservations } from '../../../application/Reservations/use-cases/getAllReservations';

export class GetAllReservationsController {
    constructor(private getAllReservations: GetAllReservations) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const reservations = await this.getAllReservations.execute();
            res.status(200).json(reservations);
        } catch (error: any) {
            res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
        }
    }
}
