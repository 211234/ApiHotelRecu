import { Manager } from '../entities/manager';

export interface ManagerRepository {
    findAll(): Promise<Manager[]>;
    findById(id: string): Promise<Manager | null>;
    findByEmail(email: string): Promise<Manager | null>;
    save(manager: Manager): Promise<void>;
    update(manager: Manager): Promise<void>;
    delete(id: string): Promise<void>;
}
