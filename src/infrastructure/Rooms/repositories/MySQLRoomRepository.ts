import { Room } from '../../../domain/Rooms/entities/room';
import { RoomRepository } from '../../../domain/Rooms/repositories/roomRepository';
import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export class MySQLRoomRepository implements RoomRepository {
    async findAll(): Promise<Room[]> {
        const [rows] = await db.query('SELECT * FROM Rooms');
        return rows as Room[];
    }

    async findByNumber (numero: string): Promise<Room | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Rooms WHERE numero = ?', [numero]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    async findById(id: string): Promise<Room | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Rooms WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    async save(room: Room): Promise<void> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO Rooms (id, numero, tipo, precio, disponibilidad) VALUES (?, ?, ?, ?, ?)',
            [id, room.numero, room.tipo, room.precio, room.disponibilidad]
        );
    }

    async update(room: Room): Promise<void> {
        await db.query(
            'UPDATE Rooms SET numero = ?, tipo = ?, precio = ?, disponibilidad = ? WHERE id = ?',
            [room.numero, room.tipo, room.precio, room.disponibilidad, room.id]
        );
    }

    async delete(id: string): Promise<void> {
        await db.query('DELETE FROM Rooms WHERE id = ?', [id]);
    }
}