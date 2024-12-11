import { Router } from 'express';
import { MySQLManagerRepository } from '../Managers/repositories/MySQLManagerRepository';
import { MySQLEmployeeRepository } from '../Employees/repositories/MySQLEmployeeRepository';
import { MySQLCustomerRepository } from './repositories/MySQLCustomersRepository';
import { LoginService } from '../../services/loginService';
import { LoginController } from './controllers/LoginController';

const router = Router();

// Repositorios
const managerRepository = new MySQLManagerRepository();
const employeeRepository = new MySQLEmployeeRepository();
const customerRepository = new MySQLCustomerRepository();

// Servicios y controladores
const loginService = new LoginService(managerRepository, employeeRepository, customerRepository);
const loginController = new LoginController(loginService);

// Ruta de login
router.post('/v1/auth/login', loginController.handle.bind(loginController));

export default router;
