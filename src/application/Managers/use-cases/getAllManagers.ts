import { ManagerRepository } from '../../../domain/Managers/repositories/managerRepository';

export class GetAllManagers {
    constructor(private managerRepository: ManagerRepository) {}

    async execute() {
        return await this.managerRepository.findAll();
    }
}
