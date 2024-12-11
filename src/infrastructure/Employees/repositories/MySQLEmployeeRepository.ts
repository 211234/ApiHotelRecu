import { Employee } from '../../../domain/Employees/entities/employee';
import { EmployeeRepository } from '../../../domain/Employees/repositories/employeeRepository';
import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../../services/auth';

export class MySQLEmployeeRepository implements EmployeeRepository {
    async findAll(): Promise<Employee[]> {
        const [rows]: any[] = await db.query('SELECT * FROM Employees');
        return rows.map((row: any) => this.toDomain(row)) as Employee[];
    }

    async findById(id: string): Promise<Employee | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Employees WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async findByEmail(email: string): Promise<Employee | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Employees WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async save(employee: Employee): Promise<void> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO Employees (id, nombre, email, password, cargo, horario_entrada, horario_salida) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, employee.nombre, employee.email, hashPassword ,employee.cargo, employee.horarioEntrada, employee.horarioSalida]
        );
    }

    async update(employee: Employee): Promise<void> {
        await db.query(
            'UPDATE Employees SET nombre = ?, email = ?, cargo = ?, horario_entrada = ?, horario_salida = ? WHERE id = ?',
            [
                employee.nombre,
                employee.email,
                employee.cargo,
                employee.horarioEntrada,
                employee.horarioSalida,
                employee.id,
            ]
        );
    }

    async delete(id: string): Promise<void> {
        await db.query('DELETE FROM Employees WHERE id = ?', [id]);
    }

    // Método privado para convertir una fila de la base de datos a la entidad Employee
    private toDomain(row: any): Employee {
        return new Employee(
            row.id,
            row.nombre,
            row.email,
            row.password,
            row.cargo,
            row.horario_entrada,
            row.horario_salida,
            new Date(row.fecha_contratacion)
        );
    }
}
