import { EmployeeRepository } from '../../../domain/Employees/repositories/employeeRepository';
import { Employee } from '../../../domain/Employees/entities/employee';

export class UpdateEmployee {
    constructor(private employeeRepository: EmployeeRepository) {}

    async execute(id: string, data: { nombre?: string; email?: string; password?: string; cargo?: 'recepcionista' | 'limpieza' | 'seguridad' | 'mantenimiento'; horarioEntrada?: string; horarioSalida?: string }) {
        const existingEmployee = await this.employeeRepository.findById(id);
        if (!existingEmployee) {
            throw new Error('Employee not found');
        }

        const updatedEmployee = new Employee(
            id,
            data.nombre ?? existingEmployee.nombre,
            data.email ?? existingEmployee.email,
            data.password ?? existingEmployee.password,
            data.cargo ?? existingEmployee.cargo,
            data.horarioEntrada ?? existingEmployee.horarioEntrada,
            data.horarioSalida ?? existingEmployee.horarioSalida,
            existingEmployee.fechaContratacion
        );

        await this.employeeRepository.update(updatedEmployee);
    }
}
