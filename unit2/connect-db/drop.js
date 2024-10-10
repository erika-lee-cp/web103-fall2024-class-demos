import { pool } from './database.js'

const dropTables = async () => {
    const query = `
        DROP TABLE IF EXISTS bosses;
        DROP TABLE IF EXISTS song;
        DROP TABLE IF EXISTS customers;

    `

    try {
        const res = await pool.query(query)
    } catch (err) {
        console.error('error dropping tables', err)
    }
}

dropTables()