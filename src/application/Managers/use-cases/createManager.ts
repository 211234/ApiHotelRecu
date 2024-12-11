import { ManagerRepository } from '../../../domain/Managers/repositories/managerRepository';
import { Manager } from '../../../domain/Managers/entities/manager';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../../services/auth';

export class CreateManager {
    constructor(private managerRepository: ManagerRepository) {}

    async execute(data: { nombre: string; email: string; password: string; telefono: string }) {
        const existingManager = await this.managerRepository.findByEmail(data.email);
        if (existingManager) {
            throw new Error('Manager already exists');
        }

        const manager = new Manager(uuidv4(), data.nombre, data.email, data.password, data.telefono, new Date());
        await this.managerRepository.save(manager);
    }
}
