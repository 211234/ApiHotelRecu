import { Request, Response } from 'express';
import { DeleteEmployee } from '../../../application/Employees/use-cases/deleteEmployee';

export class DeleteEmployeeController {
    constructor(private deleteEmployee: DeleteEmployee) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.deleteEmployee.execute(id);
            res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Employee not found') {
                res.status(404).json({ message: 'Employee not found' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
            }
        }
    }
}
