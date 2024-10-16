import { pool } from '../config/database.js'

const getHairStyles = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM hair_styles ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getHairStylesById = async (req, res) => {
    try {
        const styleId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM hair_styles WHERE id=$1', [styleId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getHairStyles,
    getHairStylesById,
}