import express from 'express'
import {getImage} from './controllers.js'
const router = express.Router()


router.get('/image/:filename', getImage)

export default router