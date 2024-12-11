import { Customer } from '../../../domain/Customers/entities/customer';
import { CustomerRepository } from '../../../domain/Customers/repositories/customerRepository';
import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export class MySQLCustomerRepository implements CustomerRepository {
    async findAll(): Promise<Customer[]> {
        const [rows]: any[] = await db.query('SELECT * FROM Customers');
        return rows.map((row: any) => this.toDomain(row)) as Customer[];
    }

    async findById(id: string): Promise<Customer | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Customers WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async save(customer: Customer): Promise<void> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO Customers (id, nombre, email, telefono, password) VALUES (?, ?, ?, ?, ?)',
            [id, customer.nombre, customer.email, customer.telefono, customer.password]
        );
    }

    async update(customer: Customer): Promise<void> {
        await db.query(
            'UPDATE Customers SET nombre = ?, email = ?, telefono = ?, password = ? WHERE id = ?',
            [
                customer.nombre,
                customer.email,
                customer.telefono,
                customer.password,
                customer.id,
            ]
        );
    }

    async delete(id: string): Promise<void> {
        await db.query('DELETE FROM Customers WHERE id = ?', [id]);
    }

    // Método privado para convertir una fila de la base de datos a la entidad Customer
    private toDomain(row: any): Customer {
        return new Customer(
            row.id,
            row.nombre,
            row.email,
            row.telefono,
            row.password,
            new Date(row.fecha_registro) // Convertir la fecha de la base de datos al tipo Date
        );
    }
}
