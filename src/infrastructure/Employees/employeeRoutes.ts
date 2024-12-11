import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../../middleware/auth';
import { CreateEmployeeController } from './controllers/createEmployeeController';
import { GetAllEmployeesController } from './controllers/getAllEmployeesController';
import { GetEmployeeByIdController } from './controllers/getEmployeeByIdController';
import { UpdateEmployeeController } from './controllers/updateEmployeeController';
import { DeleteEmployeeController } from './controllers/deleteEmployeeController';
import { createEmployeeValidator } from './validators/createEmployeeValidator';
import { CreateEmployee } from '../../application/Employees/use-cases/createEmployee';
import { GetAllEmployees } from '../../application/Employees/use-cases/getAllEmployees';
import { GetEmployeeById } from '../../application/Employees/use-cases/getByIdEmployee';
import { UpdateEmployee } from '../../application/Employees/use-cases/updateEmployee';
import { DeleteEmployee } from '../../application/Employees/use-cases/deleteEmployee';
import { MySQLEmployeeRepository } from './repositories/MySQLEmployeeRepository';

const router = Router();
const employeeRepository = new MySQLEmployeeRepository();

const createEmployeeController = new CreateEmployeeController(new CreateEmployee(employeeRepository));
const getAllEmployeesController = new GetAllEmployeesController(new GetAllEmployees(employeeRepository));
const getEmployeeByIdController = new GetEmployeeByIdController(new GetEmployeeById(employeeRepository));
const updateEmployeeController = new UpdateEmployeeController(new UpdateEmployee(employeeRepository));
const deleteEmployeeController = new DeleteEmployeeController(new DeleteEmployee(employeeRepository));

router.post(
    '/v1/employees',
    authenticateToken,
    authorizeRoles('manager'),
    createEmployeeValidator,
    createEmployeeController.handle.bind(createEmployeeController)
);

router.get('/v1/employees', getAllEmployeesController.handle.bind(getAllEmployeesController));
router.get('/v1/employees/:id', getEmployeeByIdController.handle.bind(getEmployeeByIdController));
router.put('/v1/employees/:id', createEmployeeValidator, updateEmployeeController.handle.bind(updateEmployeeController));
router.delete('/v1/employees/:id', deleteEmployeeController.handle.bind(deleteEmployeeController));

export default router;
