import { RoomRepository } from '../../../domain/Rooms/repositories/roomRepository';
import { Room } from '../../../domain/Rooms/entities/room';
import { v4 as uuidv4 } from 'uuid';

export class CreateRoom {
    constructor(private roomRepository: RoomRepository) {}

    async execute(data: { numero: string; tipo: 'estándar' | 'suite' | 'deluxe'; precio: number; disponibilidad: boolean }) {
        // Validar si ya existe una habitación con el mismo número
        const existingRoom = await this.roomRepository.findByNumber(data.numero);
        if (existingRoom) {
            throw new Error('Room already exists');
        }

        // Validar tipo de habitación
        if (!['estándar', 'suite', 'deluxe'].includes(data.tipo)) {
            throw new Error('Invalid room type');
        }

        // Crear y guardar la habitación
        const room = new Room(uuidv4(), data.numero, data.tipo, data.precio, data.disponibilidad);
        await this.roomRepository.save(room);
    }
}
