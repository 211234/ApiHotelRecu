import { Request, Response } from 'express';
import { CreateEmployee } from '../../../application/Employees/use-cases/createEmployee';
import { validationResult } from 'express-validator';

export class CreateEmployeeController {
    constructor(private createEmployee: CreateEmployee) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array(), message: 'Invalid input data' });
                return;
            }

            const data = req.body;
            await this.createEmployee.execute(data);
            res.status(201).json({ message: 'Employee created successfully' });
        } catch (error: any) {
            if (error.message === 'Employee already exists') {
                res.status(409).json({ message: 'Employee already exists' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
