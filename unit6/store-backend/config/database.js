import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING
};
export const pool = new pg.Pool(config);