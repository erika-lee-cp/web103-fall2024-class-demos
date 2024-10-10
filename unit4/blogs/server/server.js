const express = require('express')
const router = require('./routes/posts.js')
const dotenv = require('dotenv')
const { setup } = require('./database/setup.js')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
setup()

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('<h1>Blog Posts API</h1>')
})

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})