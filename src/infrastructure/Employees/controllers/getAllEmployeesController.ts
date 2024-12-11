import { Request, Response } from 'express';
import { GetAllEmployees } from '../../../application/Employees/use-cases/getAllEmployees';

export class GetAllEmployeesController {
    constructor(private getAllEmployees: GetAllEmployees) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const employees = await this.getAllEmployees.execute();
            res.status(200).json(employees);
        } catch (error: any) {
            res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
        }
    }
}
