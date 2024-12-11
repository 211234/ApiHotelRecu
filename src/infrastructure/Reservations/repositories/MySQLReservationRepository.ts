import { Reservation } from '../../../domain/Reservations/entities/reservation';
import { ReservationRepository } from '../../../domain/Reservations/repositories/reservationRepository';
import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export class MySQLReservationRepository implements ReservationRepository {
    async findAll(): Promise<Reservation[]> {
        const [rows]: any[] = await db.query('SELECT * FROM Reservations');
        return rows.map((row: any) => this.toDomain(row)) as Reservation[];
    }

    async findById(id: string): Promise<Reservation | null> {
        const [rows]: any[] = await db.query('SELECT * FROM Reservations WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.toDomain(rows[0]);
    }

    async save(reservation: Reservation): Promise<void> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO Reservations (id, fecha_inicio, fecha_fin, cliente_id, habitacion_id) VALUES (?, ?, ?, ?, ?)',
            [id, reservation.fechaInicio, reservation.fechaFin, reservation.clienteId, reservation.habitacionId]
        );
    }

    async update(reservation: Reservation): Promise<void> {
        await db.query(
            'UPDATE Reservations SET fecha_inicio = ?, fecha_fin = ?, cliente_id = ?, habitacion_id = ? WHERE id = ?',
            [
                reservation.fechaInicio,
                reservation.fechaFin,
                reservation.clienteId,
                reservation.habitacionId,
                reservation.id,
            ]
        );
    }

    async delete(id: string): Promise<void> {
        await db.query('DELETE FROM Reservations WHERE id = ?', [id]);
    }

    private toDomain(row: any): Reservation {
        return new Reservation(
            row.id,
            new Date(row.fecha_inicio),
            new Date(row.fecha_fin),
            row.cliente_id,
            row.habitacion_id,
            new Date(row.fecha_reserva)
        );
    }
}
