import { Reservation } from '../entities/reservation';

export interface ReservationRepository {
    findAll(): Promise<Reservation[]>;
    findById(id: string): Promise<Reservation | null>;
    save(reservation: Reservation): Promise<void>;
    update(reservation: Reservation): Promise<void>;
    delete(id: string): Promise<void>;
}
