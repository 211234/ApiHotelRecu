import { ManagerRepository } from '../../../domain/Managers/repositories/managerRepository';
import { Manager } from '../../../domain/Managers/entities/manager';

export class UpdateManager {
    constructor(private managerRepository: ManagerRepository) {}

    async execute(id: string, data: { nombre?: string; email?: string; paasword?:string; telefono?: string }) {
        const existingManager = await this.managerRepository.findById(id);
        if (!existingManager) {
            throw new Error('Manager not found');
        }

        const updatedManager = new Manager(
            id,
            data.nombre ?? existingManager.nombre,
            data.email ?? existingManager.email,
            data.paasword ?? existingManager.password,
            data.telefono ?? existingManager.telefono,
            existingManager.fechaContratacion
        );

        await this.managerRepository.update(updatedManager);
    }
}
