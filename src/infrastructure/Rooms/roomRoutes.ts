import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../../middleware/auth';
import { CreateRoomController } from './controllers/createRoomController';
import { UpdateRoomController } from './controllers/updateRoomController';
import { DeleteRoomController } from './controllers/deleteRoomController';
import { GetRoomByIdController } from './controllers/getRoomByIdController';
import { createRoomValidator } from './validators/createRoomValidator';
import { updateRoomValidator } from './validators/updateRoomValidator';
import { CreateRoom } from '../../application/Rooms/use-cases/createRoom';
import { UpdateRoom } from '../../application/Rooms/use-cases/updateRoom';
import { DeleteRoom } from '../../application/Rooms/use-cases/deleteRoom';
import { GetRoomById } from '../../application/Rooms/use-cases/getRoomById';
import { MySQLRoomRepository } from './repositories/MySQLRoomRepository';

const router = Router();
const roomRepository = new MySQLRoomRepository();

const createRoomController = new CreateRoomController(new CreateRoom(roomRepository));
const updateRoomController = new UpdateRoomController(new UpdateRoom(roomRepository));
const deleteRoomController = new DeleteRoomController(new DeleteRoom(roomRepository));
const getRoomByIdController = new GetRoomByIdController(new GetRoomById(roomRepository));

router.post(
    '/v1/rooms',
    authenticateToken,
    authorizeRoles('manager'),
    createRoomValidator,
    createRoomController.handle.bind(createRoomController)
);

router.put('/v1/rooms/:id', updateRoomValidator, updateRoomController.handle.bind(updateRoomController));
router.delete('/v1/rooms/:id', deleteRoomController.handle.bind(deleteRoomController));
router.get('/v1/rooms/:id', getRoomByIdController.handle.bind(getRoomByIdController));

export default router;
