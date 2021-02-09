import errorHandler from 'express-async-handler'
import Product from '../models/product.js'

// @route       /api/products
// @desc        Fetch all products
// @privacy     Public

const getProducts = errorHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

// @route       /api/products/:id
// @desc        Fetch a single products
// @privacy     Public

const getProductById = errorHandler(async (req, res) => {
  await Product.findById(req.params.id)
    .then((product) => {
      res.json(product)
    })
    .catch((err) => {
      throw new Error('Product not found!')
    })
})

export {getProducts, getProductById}
