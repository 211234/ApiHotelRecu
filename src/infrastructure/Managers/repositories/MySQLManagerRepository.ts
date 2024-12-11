import { Manager } from '../../../domain/Managers/entities/manager';
import { ManagerRepository } from '../../../domain/Managers/repositories/managerRepository';
import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../../services/auth';

export class MySQLManagerRepository implements ManagerRepository {
    async findAll(): Promise<Manager[]> {
        const [rows]: any[] = await db.query('SELECT * FROM Managers');
        return rows.map((row: any) => this.toDomain(row)) as Manager[];
    }

    async findById(id: string): Promise<Manager | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Managers WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async findByEmail(email: string): Promise<Manager | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Managers WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async save(manager: Manager): Promise<void> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO Managers (id, nombre, email, password, telefono) VALUES (?, ?, ?, ?, ?)',
            [id, manager.nombre, manager.email, manager.password ,manager.telefono]
        );
    }

    async update(manager: Manager): Promise<void> {
        await db.query(
            'UPDATE Managers SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
            [manager.nombre, manager.email, manager.telefono, manager.id]
        );
    }

    async delete(id: string): Promise<void> {
        await db.query('DELETE FROM Managers WHERE id = ?', [id]);
    }

    private toDomain(row: any): Manager {
        return new Manager(
            row.id,
            row.nombre,
            row.email,
            row.password,
            row.telefono,
            new Date(row.fecha_contratacion)
        );
    }
}
