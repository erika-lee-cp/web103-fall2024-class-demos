import { pool } from './database.js'
import fs from 'fs'
import path from 'path'

const jsonString = fs.readFileSync(path.resolve('./', 'config/', 'data/', 'data.json'), 'utf-8')
const jsonData = JSON.parse(jsonString)

const setup = async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        await client.query(
            `DROP TABLE IF EXISTS coding_music;
            CREATE TABLE IF NOT EXISTS coding_music (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                youtube VARCHAR(255)
             )`
        )

        for (const data of jsonData) {
            const { name, youtube } = data;
            await client.query(
                `INSERT INTO coding_music (name, youtube)
                VALUES ($1, $2)
                RETURNING *`,
                [name, youtube]
            )
        }

        await client.query('COMMIT')
        console.log('Database created and data loaded successfully')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error creating database or loading data', error)
    } finally {
        client.release()
    }
}

export { setup }