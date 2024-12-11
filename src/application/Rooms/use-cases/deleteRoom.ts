import { RoomRepository } from '../../../domain/Rooms/repositories/roomRepository';

export class DeleteRoom {
    constructor(private roomRepository: RoomRepository) {}

    async execute(id: string): Promise<void> {
        const existingRoom = await this.roomRepository.findById(id);
        if (!existingRoom) {
            throw new Error('Room not found');
        }

        await this.roomRepository.delete(id);
    }
}
