import { Employee } from '../entities/employee';

export interface EmployeeRepository {
    findAll(): Promise<Employee[]>;
    findById(id: string): Promise<Employee | null>;
    findByEmail(email: string): Promise<Employee | null>;
    save(employee: Employee): Promise<void>;
    update(employee: Employee): Promise<void>;
    delete(id: string): Promise<void>;
}
