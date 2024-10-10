import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()
const config = {
    connectionString: process.env.CONNECTION
    // user: process.env.PGUSER,
    // password: process.env.PGPASSWORD,
    // host: process.env.PGHOST,
    // port: process.env.PGPORT,
    // database: process.env.PGDATABASE
}

export const pool = new pg.Pool(config);
