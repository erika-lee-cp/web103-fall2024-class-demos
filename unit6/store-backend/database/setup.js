import { pool } from '../config/database.js';
import fs from 'fs';

const data = fs.readFileSync(new URL('./data.json', import.meta.url), 'utf8');

const createTable = async () => {
    try {
        const createTableQuery = `
            DROP TABLE IF EXISTS products;
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2)  NOT NULL,
                description TEXT NOT NULL,
                category VARCHAR(255),
                image VARCHAR(255) NOT NULL,
                rating DECIMAL(10, 1),
                count INT
            )
        `
        await pool.query(createTableQuery)
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        const insertQuery = `
            INSERT INTO products (title, price, description, category, image, rating, count)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        const entries = JSON.parse(data)

        for (let entry of entries) {
            const values = [
                entry.title,
                entry.price,
                entry.description,
                entry.category,
                entry.image,
                entry.rating.rate,
                entry.rating.count,
            ]
            
            await pool.query(insertQuery, values)
            console.log(`✅ added ${entry.title}`)
        }
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await createTable()
    await insertData()
}

await setup();

export {
    createTable,
    insertData,
    setup
}