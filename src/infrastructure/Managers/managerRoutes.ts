import { Router } from 'express';
import { MySQLManagerRepository } from './repositories/MySQLManagerRepository';
import { CreateManager } from '../../application/Managers/use-cases/createManager';
import { GetAllManagers } from '../../application/Managers/use-cases/getAllManagers';
import { GetManagerById } from '../../application/Managers/use-cases/getManagerById';
import { UpdateManager } from '../../application/Managers/use-cases/updateManager';
import { DeleteManager } from '../../application/Managers/use-cases/deleteManager';
import { CreateManagerController } from './controllers/createManagerController';
import { GetAllManagersController } from './controllers/getAllManagersController';
import { GetManagerByIdController } from './controllers/getManagerByIdController';
import { UpdateManagerController } from './controllers/updateManagerController';
import { DeleteManagerController } from './controllers/deleteManagerController';
import { createManagerValidator } from './validators/createManagerValidator';
import { updateManagerValidator } from './validators/updateManagerValidator';

const router = Router();
const managerRepository = new MySQLManagerRepository();

const createManagerController = new CreateManagerController(new CreateManager(managerRepository));
const getAllManagersController = new GetAllManagersController(new GetAllManagers(managerRepository));
const getManagerByIdController = new GetManagerByIdController(new GetManagerById(managerRepository));
const updateManagerController = new UpdateManagerController(new UpdateManager(managerRepository));
const deleteManagerController = new DeleteManagerController(new DeleteManager(managerRepository));

router.post(
    '/v1/managers',
    createManagerValidator,
    (createManagerController.handle.bind(createManagerController))
);
router.get(
    '/v1/managers',
    (getAllManagersController.handle.bind(getAllManagersController))
);
router.get(
    '/v1/managers/:id',
    (getManagerByIdController.handle.bind(getManagerByIdController))
);
router.put(
    '/v1/managers/:id',
    updateManagerValidator,
    (updateManagerController.handle.bind(updateManagerController))
);
router.delete(
    '/v1/managers/:id',
    (deleteManagerController.handle.bind(deleteManagerController))
);

export default router;
