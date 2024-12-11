import { ReservationRepository } from '../../../domain/Reservations/repositories/reservationRepository';
import { Reservation } from '../../../domain/Reservations/entities/reservation';

export class GetReservationById {
    constructor(private reservationRepository: ReservationRepository) {}

    async execute(id: string): Promise<Reservation | null> {
        // Buscar la reserva por ID
        const reservation = await this.reservationRepository.findById(id);

        // Si no se encuentra la reserva, lanzar un error
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        return reservation;
    }
}
