import Product from '../../database/models/product.js'
import fs from 'fs/promises'
import path from 'path'
import {getProductHealthScoreWithCategory} from '../../functions/health_calculator.js'
import {PRODUCT_CATEGORIES} from '../../constants/product_data.js'
import {normalizeNumber} from '../../functions/format.js'

export const Scan = async (req, res) => {
  try {
    const {matrixData} = req.body

    if (!matrixData) {
      return res.status(400).send({
        error: '`gtin` parameter is required`'
      })
    }

    const product = await Product.findOne({
      matrix_code: matrixData
    })

    if (!product) {
      return res.status(404).send({
        error: 'Product not found',
        categories: PRODUCT_CATEGORIES
      })
    }

    const {weight, protein, fats, carbohydrates, energy_value} = product.compound
    const healthPercent = getProductHealthScoreWithCategory({weight, protein, fats, carbohydrates, energy_value, category: product.category})
    const category = PRODUCT_CATEGORIES.find(c => c.value === product.category)
    const host = process.env.NODE_ENV === 'development' ? process.env.DEV_HOST : process.env.HOST
    const image = `${host}/image/${product.image}`
    return res.status(200).json({...product._doc, image, healthPercent, category: category.key})

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: 'Server error'
    })
  }
}

export const createProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData)
    const matrixData = JSON.parse(req.body.matrixData).isScanned

    const {weight, protein, fats, carbohydrates, energy_value} = productData

    if (!productData || !req.file?.buffer) {
      return res.status(400).send({error: 'Wrong data'})
    }

    const ext = path.extname(req.file.originalname)
    const name = path.basename(req.file.originalname, ext)
    const safeName = name.replace(/[^\w\s]/g, '')
    const filename = `${Date.now()}-${safeName}${ext}`

    const filepath = path.join('uploads', filename)

    await fs.writeFile(filepath, req.file.buffer)

    await Product.create({
      ...productData,
      matrix_code: matrixData,
      image: filename,
      compound: {weight: normalizeNumber(weight), protein: normalizeNumber(protein), fats: normalizeNumber(fats), carbohydrates: normalizeNumber(carbohydrates), energy_value: normalizeNumber(energy_value)}
    })

    res.json({success: true})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Server error'})
  }
}