import { RoomRepository } from '../../../domain/Rooms/repositories/roomRepository';
import { Room } from '../../../domain/Rooms/entities/room';

export class GetRoomById {
    constructor(private roomRepository: RoomRepository) {}

    async execute(id: string): Promise<Room | null> {
        const room = await this.roomRepository.findById(id);

        if (!room) {
            throw new Error('Room not found');
        }

        return room;
    }
}
