import { pool } from '../database.js'

const createGamesTable = async () => {
    const createGamesTableQuery = `
        DROP TABLE IF EXISTS games;

        CREATE TABLE IF NOT EXISTS games (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            platform VARCHAR(255) NOT NULL,
            imageUrl VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createGamesTableQuery);
    } catch (err) {
        console.error('error creating games table', err)
    }
}

const gameData = [
    {
        title: "Super Mario 64",
        genre: "action-adventure",
        platform: "n64",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg",
    },
    {
        title: "Donkey Kong 64",
        genre: "platformer",
        platform: "n64",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/DonkeyKong64CoverArt.jpg",
    },
    {
        title: "Final Fantasy VII",
        genre: "rpg",
        platform: "playstation",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Final_Fantasy_VII_Box_Art.jpg/220px-Final_Fantasy_VII_Box_Art.jpg",
    },
    {
        title: "Metal Gear Solid",
        genre: "action-adventure",
        platform: "playstation",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Metal_Gear_Solid_cover_art.png/220px-Metal_Gear_Solid_cover_art.png",
    },
];

const seedTable = async () => {
    await createGamesTable();

    gameData.forEach((game) => {
        const insertQuery = {
            text: 'INSERT INTO games (title, genre, platform, imageUrl) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            game.title,
            game.genre,
            game.platform,
            game.imageUrl,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('error inserting game', err)
                return
            }

            console.log(`${game.title} added successfully`)
        })
    })
}

seedTable();