import { EmployeeRepository } from '../../../domain/Employees/repositories/employeeRepository';

export class GetAllEmployees {
    constructor(private employeeRepository: EmployeeRepository) {}

    async execute() {
        return await this.employeeRepository.findAll();
    }
}
