import { Request, Response } from 'express';
import { CreateManager } from '../../../application/Managers/use-cases/createManager';
import { validationResult } from 'express-validator';

export class CreateManagerController {
    constructor(private createManager: CreateManager) {}

    async handle(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array(), message: 'Invalid input data' });
            return;
        }

        try {
            const data = req.body;
            await this.createManager.execute(data);
            res.status(201).json({ message: 'Manager created successfully' });
        } catch (error: any) {
            if (error.message === 'Manager already exists') {
                res.status(409).json({ message: 'Manager already exists' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
