import { Request, Response } from 'express';
import { UpdateManager } from '../../../application/Managers/use-cases/updateManager';
import { validationResult } from 'express-validator';

export class UpdateManagerController {
    constructor(private updateManager: UpdateManager) {}

    async handle(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array(), message: 'Invalid input data' });
            return;
        }

        try {
            const { id } = req.params;
            const data = req.body;

            await this.updateManager.execute(id, data);
            res.status(200).json({ message: 'Manager updated successfully' });
        } catch (error: any) {
            if (error.message === 'Manager not found') {
                res.status(404).json({ message: 'Manager not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
