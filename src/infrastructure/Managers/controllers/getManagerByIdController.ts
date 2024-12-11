import { Request, Response } from 'express';
import { GetManagerById } from '../../../application/Managers/use-cases/getManagerById';

export class GetManagerByIdController {
    constructor(private getManagerById: GetManagerById) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const manager = await this.getManagerById.execute(id);

            if (!manager) {
                res.status(404).json({ message: 'Manager not found' });
                return;
            }

            res.status(200).json(manager);
        } catch (error: any) {
            res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
        }
    }
}
