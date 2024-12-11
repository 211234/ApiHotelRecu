import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../../middleware/auth';
import { CreateReservationController } from './controllers/createReservation';
import { GetAllReservationsController } from './controllers/getAllReservationsController';
import { GetReservationByIdController } from './controllers/getReservationByIdController';
import { UpdateReservationController } from './controllers/updateReservationController';
import { DeleteReservationController } from './controllers/deleteReservationController';
import { createReservationValidator } from './validators/createReservationValidator';
import { updateReservationValidator } from './validators/updateReservationValidator';
import { CreateReservation } from '../../application/Reservations/use-cases/createReservation';
import { GetAllReservations } from '../../application/Reservations/use-cases/getAllReservations';
import { GetReservationById } from '../../application/Reservations/use-cases/getReservationById';
import { UpdateReservation } from '../../application/Reservations/use-cases/updateReservation';
import { DeleteReservation } from '../../application/Reservations/use-cases/deleteReservation';
import { MySQLReservationRepository } from './repositories/MySQLReservationRepository';

const router = Router();
const reservationRepository = new MySQLReservationRepository();

const createReservationController = new CreateReservationController(new CreateReservation(reservationRepository));
const getAllReservationsController = new GetAllReservationsController(new GetAllReservations(reservationRepository));
const getReservationByIdController = new GetReservationByIdController(new GetReservationById(reservationRepository));
const updateReservationController = new UpdateReservationController(new UpdateReservation(reservationRepository));
const deleteReservationController = new DeleteReservationController(new DeleteReservation(reservationRepository));

router.post(
    '/v1/reservations',
    authenticateToken,
    authorizeRoles('employee', 'customer'),
    createReservationValidator,
    createReservationController.handle.bind(createReservationController)
);

router.get('/v1/reservations', getAllReservationsController.handle.bind(getAllReservationsController));
router.get('/v1/reservations/:id', getReservationByIdController.handle.bind(getReservationByIdController));
router.put('/v1/reservations/:id', updateReservationValidator, updateReservationController.handle.bind(updateReservationController));
router.delete('/v1/reservations/:id', deleteReservationController.handle.bind(deleteReservationController));

export default router;
