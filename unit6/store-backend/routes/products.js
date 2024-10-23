import express from 'express';
import {getProducts, getProductsById, createProduct, updateProduct, deleteProduct} from '../controllers/products.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;