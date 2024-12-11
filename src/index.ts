import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './config/db';
import { env } from './config/env';
import roomRoutes from './infrastructure/Rooms/roomRoutes';
import reservationRoutes from './infrastructure/Reservations/reservationRoutes';
import employeeRoutes from './infrastructure/Employees/employeeRoutes';
import authRoutes from './infrastructure/Customers/authRoutes';
import customerRoutes from './infrastructure/Customers/customerRoutes';
import managerRoutes from './infrastructure/Managers/managerRoutes';


dotenv.config();

const app = express();
const port = env.port;

app.use(cors());
app.use(express.json());

app.use('/api', roomRoutes);
app.use('/api', reservationRoutes);
app.use('/api', employeeRoutes);
app.use('/api', authRoutes);
app.use('/api', customerRoutes);
app.use('/api', managerRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Welcome to My API Fundación Cuenta Conmigo!');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

async function start() {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`Server running on port W ${port} 🚀`);
        });
    } catch (error) {
        console.error("Failed to start server due to database connection error:", error);
        process.exit(1);
    }
}

start();