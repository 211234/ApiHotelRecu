import { Request, Response } from 'express';
import { DeleteRoom } from '../../../application/Rooms/use-cases/deleteRoom';

export class DeleteRoomController {
    constructor(private deleteRoom: DeleteRoom) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Ejecutar el caso de uso
            await this.deleteRoom.execute(id);

            // Respuesta exitosa
            res.status(200).json({ message: 'Room deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Room not found') {
                res.status(404).json({ message: 'Room not found' }); // 404 Not Found
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
