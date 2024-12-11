import { ManagerRepository } from '../../../domain/Managers/repositories/managerRepository';
import { Manager } from '../../../domain/Managers/entities/manager';

export class GetManagerById {
    constructor(private managerRepository: ManagerRepository) {}

    async execute(id: string): Promise<Manager | null> {
        const manager = await this.managerRepository.findById(id);
        if (!manager) {
            throw new Error('Manager not found');
        }
        return manager;
    }
}
