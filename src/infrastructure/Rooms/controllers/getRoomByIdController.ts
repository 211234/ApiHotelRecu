import { Request, Response } from 'express';
import { GetRoomById } from '../../../application/Rooms/use-cases/getRoomById';

export class GetRoomByIdController {
    constructor(private getRoomById: GetRoomById) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Obtener habitación
            const room = await this.getRoomById.execute(id);

            if (!room) {
                res.status(404).json({ message: 'Room not found' }); // 404 Not Found
                return;
            }

            // Respuesta exitosa
            res.status(200).json(room);
        } catch (error: any) {
            res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
        }
    }
}
