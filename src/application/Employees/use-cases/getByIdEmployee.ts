import { EmployeeRepository } from '../../../domain/Employees/repositories/employeeRepository';
import { Employee } from '../../../domain/Employees/entities/employee';

export class GetEmployeeById {
    constructor(private employeeRepository: EmployeeRepository) {}

    async execute(id: string): Promise<Employee | null> {
        // Buscar al empleado por su ID
        const employee = await this.employeeRepository.findById(id);

        // Lanzar error si el empleado no existe
        if (!employee) {
            throw new Error('Employee not found');
        }

        return employee;
    }
}
