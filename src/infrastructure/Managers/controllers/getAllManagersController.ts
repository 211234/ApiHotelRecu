import { Request, Response } from 'express';
import { GetAllManagers } from '../../../application/Managers/use-cases/getAllManagers';

export class GetAllManagersController {
    constructor(private getAllManagers: GetAllManagers) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const managers = await this.getAllManagers.execute();
            res.status(200).json(managers);
        } catch (error: any) {
            res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
        }
    }
}
