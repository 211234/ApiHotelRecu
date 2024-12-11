import { RoomRepository } from '../../../domain/Rooms/repositories/roomRepository';
import { Room } from '../../../domain/Rooms/entities/room';

export class UpdateRoom {
    constructor(private roomRepository: RoomRepository) {}

    async execute(id: string, data: { numero?: string; tipo?: 'estándar' | 'suite' | 'deluxe'; precio?: number; disponibilidad?: boolean }): Promise<void> {

        const existingRoom = await this.roomRepository.findById(id);
        if (!existingRoom) {
            throw new Error('Room not found');
        }

        if (data.tipo && !['estándar', 'suite', 'deluxe'].includes(data.tipo)) {
            throw new Error('Invalid room type');
        }

        const updatedRoom = new Room(
            id,
            data.numero ?? existingRoom.numero,
            data.tipo ?? existingRoom.tipo,
            data.precio ?? existingRoom.precio,
            data.disponibilidad ?? existingRoom.disponibilidad
        );

        await this.roomRepository.update(updatedRoom);
    }
}
