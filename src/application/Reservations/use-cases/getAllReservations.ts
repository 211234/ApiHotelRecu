import { ReservationRepository } from '../../../domain/Reservations/repositories/reservationRepository';

export class GetAllReservations {
    constructor(private reservationRepository: ReservationRepository) {}

    async execute() {
        return await this.reservationRepository.findAll();
    }
}
