import { Request, Response } from 'express';
import { CreateCustomer } from '../../../application/Customers/use-cases/createCustomer';
import { validationResult } from 'express-validator';

export class CreateCustomerController {
    constructor(private createCustomer: CreateCustomer) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array(), message: 'Invalid input data' });
                return;
            }

            const data = req.body;
            await this.createCustomer.execute(data);
            res.status(201).json({ message: 'Customer created successfully' });
        } catch (error: any) {
            if (error.message === 'Customer already exists') {
                res.status(409).json({ message: 'Customer already exists' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
