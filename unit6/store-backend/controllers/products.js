import { pool } from '../config/database.js';


const getProducts = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM products ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const getProductsById = async (req, res) => {
    try {
        const productId = req.params.id
        const results = await pool.query('SELECT * FROM products WHERE id = $1', [productId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, price, description, image } = req.body;
        const results = await pool.query('INSERT INTO products (title, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *', [title, price, description, image])
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { title, price, description, image } = req.body
        const results = await pool.query('UPDATE products SET title = $1, price = $2, description = $3, image = $4 WHERE id = $5', [title,  price, description, image, productId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id)
    try {
        const results = await pool.query('DELETE FROM products WHERE id = $1', [productId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

export {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};