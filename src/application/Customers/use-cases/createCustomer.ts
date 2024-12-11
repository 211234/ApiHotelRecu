import { CustomerRepository } from '../../../domain/Customers/repositories/customerRepository';
import { Customer } from '../../../domain/Customers/entities/customer';
import { v4 as uuidv4 } from 'uuid';

export class CreateCustomer {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(data: { nombre: string; email: string; telefono: string; password: string }) {
        const existingCustomer = await this.customerRepository.findByEmail(data.email);
        if (existingCustomer) {
            throw new Error('Customer already exists');
        }

        const customer = new Customer(uuidv4(), data.nombre, data.email, data.telefono, data.password, new Date());
        await this.customerRepository.save(customer);
    }
}
