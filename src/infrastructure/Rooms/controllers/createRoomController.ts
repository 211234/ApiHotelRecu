import { Request, Response } from 'express';
import { CreateRoom } from '../../../application/Rooms/use-cases/createRoom';
import { validationResult } from 'express-validator';

export class CreateRoomController {
    constructor(private createRoom: CreateRoom) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid input data',
                });
                return;
            }

            const data = req.body;

            await this.createRoom.execute(data);

            res.status(201).json({ message: 'Room created successfully' });
        } catch (error: any) {
            if (error.message === 'Room already exists') {
                res.status(409).json({ message: 'Room already exists' }); // 409 Conflict
            } else if (error.message === 'Invalid room type') {
                res.status(400).json({ message: 'Invalid room type' }); // 400 Bad Request
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
