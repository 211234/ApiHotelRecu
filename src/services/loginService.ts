import { ManagerRepository } from '../domain/Managers/repositories/managerRepository';
import { EmployeeRepository } from '../domain/Employees/repositories/employeeRepository';
import { CustomerRepository } from '../domain/Customers/repositories/customerRepository';
import { comparePassword, generateToken } from './auth';

export class LoginService {
    constructor(
        private managerRepository: ManagerRepository,
        private employeeRepository: EmployeeRepository,
        private customerRepository: CustomerRepository
    ) {}

    async login(email: string, password: string): Promise<{ token: string; role: string }> {
        const userRoles = [
            { repository: this.managerRepository, role: 'manager' },
            { repository: this.employeeRepository, role: 'employee' },
            { repository: this.customerRepository, role: 'customer' },
        ];

        for (const userRole of userRoles) {
            const user = await userRole.repository.findByEmail(email);
            if (user && await comparePassword(password, user.password)) {
                const token = generateToken(user.id, userRole.role);
                return { token, role: userRole.role };
            }
        }

        throw new Error('Invalid email or password');
    }
}
