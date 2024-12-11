import mysql from 'mysql2/promise';
import { env } from "./env";

const db = mysql.createPool({
    host: env.db.host,
    port: Number(env.db.port),
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
});

async function connect() {
    let retries = 5;
    while (retries) {
        try {
            const connection = await db.getConnection();
            console.log("Database connected ✅");
            connection.release();  // Libera la conexión al pool
            break;
        } catch (error) {
            retries -= 1;
            console.error(`Database connection error ❌, retries left: ${retries}`, error);
            if (retries === 0) {
                throw error;
            }
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

export { connect, db };

