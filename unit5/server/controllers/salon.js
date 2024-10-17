import { pool } from '../config/database.js'

// outer join - retrieve the names of all the hair stylists and hair styles
// including stylists that do not have any styles
const query = `
SELECT 
    stylists.name AS stylist,
    hair_styles.name AS style 
FROM stylists 
JOIN stylists_hair_styles
    ON stylists.id = stylists_hair_styles.stylist_id
JOIN hair_styles 
    ON stylists_hair_styles.hair_style_id = hair_styles.id;
`

const getSalonOfferings = async (req, res) => {
    try {
        const results = await pool.query(query)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getSalonOfferings
}