import { RoomRepository } from '../../../domain/Rooms/repositories/roomRepository';

export class GetAllRooms {
    constructor(private roomRepository: RoomRepository) {}

    async execute() {
        return await this.roomRepository.findAll();
    }
}
