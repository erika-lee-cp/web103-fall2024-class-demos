import { pool } from '../config/database.js'

const createTrip = async (req, res) => {
    try {
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body

        const results = await pool.query(`
            INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [title, description, img_url, num_days, start_date, end_date, total_cost]
        )

        res.status(201).json(results.rows[0])
        console.log('🆕 new trip created')
     }

    catch (error) {
        response.status(409).json( { error: error.message } )
        console.log('Error:', error.message)
    }
}

const getTrips = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM trips ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to GET all trips - Error:', error.message)
    }
}

const getTrip = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM trips WHERE id = $1', [id])
        res.status(200).json(results.rows[0])        
    } catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to get trip - Error:', error.message)
    }
}

const updateTrip = async (req, res) => {
    try {
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
        const id = parseInt(req.params.id)
    
        const results = await pool.query(`
            UPDATE trips SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost= $7 WHERE id = $8`,
            [title, description, img_url, num_days, start_date, end_date, total_cost, id]
        )

        res.status(200).json(results.rows)
        console.log('✨ trip updated')      
    }
    catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to update trip - Error:', error.message)
    }
}

const deleteTrip = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const activity_deletion = await pool.query('DELETE FROM activities WHERE trip_id = $1', [id])
        const results = await pool.query('DELETE FROM trips WHERE id = $1', [id])
        res.status(200).json(results.rows)
        console.log('❌ trip deleted')
    }
    catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
}
