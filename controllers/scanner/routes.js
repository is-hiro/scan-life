import express from 'express'
import {createProduct, Scan} from './controllers.js'
import multer from 'multer'
import Product from '../../database/models/product.js'

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})


const isProductExists = async (req, res, next) => {
  try {
    const matrixData = JSON.parse(req.body.matrixData).isScanned
    const isExists = await Product.findOne({matrix_code: matrixData})

    if (isExists) {
      return res.status(400).send({error: 'Product already exists'})
    }

    next()
  } catch (err) {
    res.status(400).send({error: 'Invalid data'})
  }
}

router.post('/scan', Scan).post('/add-product', upload.single('image'), isProductExists, createProduct)

export default router