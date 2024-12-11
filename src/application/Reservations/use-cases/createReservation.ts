import { ReservationRepository } from '../../../domain/Reservations/repositories/reservationRepository';
import { Reservation } from '../../../domain/Reservations/entities/reservation';
import { v4 as uuidv4 } from 'uuid';

export class CreateReservation {
    constructor(private reservationRepository: ReservationRepository) {}

    async execute(data: { fechaInicio: Date; fechaFin: Date; clienteId: string; habitacionId: string }) {
        if (data.fechaFin <= data.fechaInicio) {
            throw new Error('End date must be after start date');
        }

        const reservation = new Reservation(
            uuidv4(),
            data.fechaInicio,
            data.fechaFin,
            data.clienteId,
            data.habitacionId,
            new Date()
        );

        await this.reservationRepository.save(reservation);
    }
}
