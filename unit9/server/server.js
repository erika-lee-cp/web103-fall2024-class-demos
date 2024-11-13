import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

import { setup } from './config/init.js'
import router from './config/routes.js'

dotenv.config()
setup()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
}

app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})