import { CustomerRepository } from '../../../domain/Customers/repositories/customerRepository';

export class GetAllCustomers {
    constructor(private customerRepository: CustomerRepository) {}

    async execute() {
        return await this.customerRepository.findAll();
    }
}
