import { pool } from '../database.js'

const dropTables = async () => {
    const query = `
        DROP TABLE IF EXISTS games;
    `

    try {
        const res = await pool.query(query)
    } catch (err) {
        console.error('error dropping tables', err)
    }
}

dropTables()