import { Room } from '../entities/room';

export interface RoomRepository {
    findAll(): Promise<Room[]>;
    findById(id: string): Promise<Room | null>;
    findByNumber (numero: string): Promise<Room | null>;
    save(room: Room): Promise<void>;
    update(room: Room): Promise<void>;
    delete(id: string): Promise<void>;
}
