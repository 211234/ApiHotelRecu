import { Request, Response } from 'express';
import { GetEmployeeById } from '../../../application/Employees/use-cases/getByIdEmployee';

export class GetEmployeeByIdController {
    constructor(private getEmployeeById: GetEmployeeById) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Ejecutar el caso de uso
            const employee = await this.getEmployeeById.execute(id);

            res.status(200).json(employee);
        } catch (error: any) {
            if (error.message === 'Employee not found') {
                res.status(404).json({ message: 'Employee not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
