import { Request, Response } from 'express';
import { DeleteManager } from '../../../application/Managers/use-cases/deleteManager';

export class DeleteManagerController {
    constructor(private deleteManager: DeleteManager) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.deleteManager.execute(id);
            res.status(200).json({ message: 'Manager deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Manager not found') {
                res.status(404).json({ message: 'Manager not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
