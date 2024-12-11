import { ReservationRepository } from '../../../domain/Reservations/repositories/reservationRepository';

export class DeleteReservation {
    constructor(private reservationRepository: ReservationRepository) {}

    async execute(id: string): Promise<void> {
        const existingReservation = await this.reservationRepository.findById(id);
        if (!existingReservation) {
            throw new Error('Reservation not found');
        }

        await this.reservationRepository.delete(id);
    }
}
