import { Request, Response } from 'express';
import { UpdateRoom } from '../../../application/Rooms/use-cases/updateRoom';
import { validationResult } from 'express-validator';

export class UpdateRoomController {
    constructor(private updateRoom: UpdateRoom) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            // Validaciones de campos
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid input data',
                });
                return;
            }

            const { id } = req.params;
            const data = req.body;

            // Ejecutar el caso de uso
            await this.updateRoom.execute(id, data);

            // Respuesta exitosa
            res.status(200).json({ message: 'Room updated successfully' });
        } catch (error: any) {
            if (error.message === 'Room not found') {
                res.status(404).json({ message: 'Room not found' }); // 404 Not Found
            } else if (error.message === 'Invalid room type') {
                res.status(400).json({ message: 'Invalid room type' }); // 400 Bad Request
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
