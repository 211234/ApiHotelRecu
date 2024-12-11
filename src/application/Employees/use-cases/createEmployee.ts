import { EmployeeRepository } from '../../../domain/Employees/repositories/employeeRepository';
import { Employee } from '../../../domain/Employees/entities/employee';
import { v4 as uuidv4 } from 'uuid';

export class CreateEmployee {
    constructor(private employeeRepository: EmployeeRepository) {}

    async execute(data: { nombre: string; email: string; password: string; cargo: 'recepcionista' | 'limpieza' | 'seguridad' | 'mantenimiento'; horarioEntrada: string; horarioSalida: string }) {
        const existingEmployee = await this.employeeRepository.findByEmail(data.email);
        if (existingEmployee) {
            throw new Error('Employee already exists');
        }

        const employee = new Employee(uuidv4(), data.nombre, data.email, data.password, data.cargo, data.horarioEntrada, data.horarioSalida, new Date());
        await this.employeeRepository.save(employee);
    }
}
