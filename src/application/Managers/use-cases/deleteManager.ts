import { ManagerRepository } from '../../../domain/Managers/repositories/managerRepository';

export class DeleteManager {
    constructor(private managerRepository: ManagerRepository) {}

    async execute(id: string): Promise<void> {
        const existingManager = await this.managerRepository.findById(id);
        if (!existingManager) {
            throw new Error('Manager not found');
        }

        await this.managerRepository.delete(id);
    }
}
