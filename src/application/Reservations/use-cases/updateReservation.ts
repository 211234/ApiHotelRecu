import { ReservationRepository } from '../../../domain/Reservations/repositories/reservationRepository';
import { Reservation } from '../../../domain/Reservations/entities/reservation';

export class UpdateReservation {
    constructor(private reservationRepository: ReservationRepository) {}

    async execute(id: string, data: { fechaInicio?: Date; fechaFin?: Date; clienteId?: string; habitacionId?: string }) {
        const existingReservation = await this.reservationRepository.findById(id);
        if (!existingReservation) {
            throw new Error('Reservation not found');
        }

        if (data.fechaInicio && data.fechaFin && data.fechaFin <= data.fechaInicio) {
            throw new Error('End date must be after start date');
        }

        const updatedReservation = new Reservation(
            id,
            data.fechaInicio ?? existingReservation.fechaInicio,
            data.fechaFin ?? existingReservation.fechaFin,
            data.clienteId ?? existingReservation.clienteId,
            data.habitacionId ?? existingReservation.habitacionId,
            existingReservation.fechaReserva
        );

        await this.reservationRepository.update(updatedReservation);
    }
}
