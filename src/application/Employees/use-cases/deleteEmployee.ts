import { EmployeeRepository } from '../../../domain/Employees/repositories/employeeRepository';

export class DeleteEmployee {
    constructor(private employeeRepository: EmployeeRepository) {}

    async execute(id: string): Promise<void> {
        const employee = await this.employeeRepository.findById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }

        await this.employeeRepository.delete(id);
    }
}
