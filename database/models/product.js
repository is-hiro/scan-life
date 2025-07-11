import {Schema, model} from 'mongoose'

const ProductSchema = new Schema({
  matrix_code: {type: String, required: true},
  name: {type: String, required: true},
  fact: {type: String, required: true},
  image: {type: String, default: null},
  compound: {
    weight: Number,
    protein: Number,
    fats: Number,
    carbohydrates: Number,
    energy_value: Number,
  },
  category: {type: String, required: true},
})

const Product = model('Product', ProductSchema)

export default Product