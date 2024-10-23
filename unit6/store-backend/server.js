import express from 'express';
import router from './routes/products.js';
import dotenv from 'dotenv';

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})