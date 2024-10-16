import { pool } from '../config/database.js'

const getCustomers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM customers ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM customers WHERE id=$1', [customerId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

// inner join - retrieve all the appointments for a specific customer and include
// information about the hair stylist for each appointment
const innerJoinQuery = `
SELECT 
    appointments.id,
    stylists.name AS stylist,
    appointments.date_time
FROM appointments
INNER JOIN stylists 
    ON appointments.stylist_id = stylists.id
WHERE appointments.customer_id = $1;
` 

const getCustomerAppointments = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id)
        const results = await pool.query(innerJoinQuery, [customerId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getCustomers,
    getCustomerById,
    getCustomerAppointments
}