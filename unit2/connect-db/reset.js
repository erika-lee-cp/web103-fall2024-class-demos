import { pool } from './database.js'

const createBossTable = async () => {
    const createBossTableQuery = `
        DROP TABLE IF EXISTS bosses;

        CREATE TABLE IF NOT EXISTS bosses (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            health INTEGER NOT NULL
        )
    `

    try {
        const res = await pool.query(createBossTableQuery)
    } catch (err) {
        console.error('error creating boss table', err)
    }
}

const bossData = [
    {
        name: "Broken Vessel",
        health: 525,
    },
    {
        name: "Crystal Guardian",
        health: 280,
    },
    {
        name: "Mantis Lords",
        health: 550,
    }
]
const seedTable = async () => {
    await createBossTable()

    bossData.forEach((boss) => {
        const insertQuery = {
            text: 'INSERT INTO bosses (name, health) VALUES ($1, $2)'
        }

        const values = [
            boss.name,
            boss.health,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('error inserting boss', err)
                return
            }

            console.log(`${boss.name} added successfully`)
        })
    })
}

seedTable()