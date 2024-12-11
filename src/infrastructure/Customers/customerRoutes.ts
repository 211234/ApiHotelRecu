import { Router } from 'express';
import { CreateCustomer } from '../../application/Customers/use-cases/createCustomer';
import { MySQLCustomerRepository } from './repositories/MySQLCustomersRepository';
import { createCustomerValidator } from './validators/createCustomerValidator';
import { CreateCustomerController } from './controllers/createCustomerController';

const router = Router();
const customerRepository = new MySQLCustomerRepository();
const createCustomerController = new CreateCustomerController(new CreateCustomer(customerRepository));

router.post(
    '/v1/customers',
    createCustomerValidator,
    (createCustomerController.handle.bind(createCustomerController))
);

export default router;
