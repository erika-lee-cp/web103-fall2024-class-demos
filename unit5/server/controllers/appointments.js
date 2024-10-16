import { pool } from '../config/database.js'

const getAppointments = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM appointments ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getAppointmentsById = async (req, res) => {
    try {
        const apptId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM appointments WHERE id=$1', [apptId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getAppointments,
    getAppointmentsById,
}