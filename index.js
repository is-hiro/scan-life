import express from 'express'
import dotenv from 'dotenv'
import {ConnectDB} from './database/connect.js'
import {RegisterRoutes} from './controllers/register.js'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

const PORT = process.env.PORT || 8082

ConnectDB()
RegisterRoutes(app)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`)
})
