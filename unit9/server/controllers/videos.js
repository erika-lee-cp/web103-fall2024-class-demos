import { pool } from '../config/database.js'

const getVideos = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM coding_music ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getVideosById = async (req, res) => {
    try {
        const videoId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM coding_music WHERE id=$1', [videoId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getVideos,
    getVideosById
}