import express from 'express'
const router = express.Router()

import errorHandler from 'express-async-handler'
import Product from '../models/product.js'

// router.get('/test', (req, res) => {
//   res.send('Hello From Node Server..')
// })

// @route       /api/products
// @desc        Fetch all products
// @privacy     Public

router.get(
  '/',
  errorHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
  })
)

// @route       /api/products/:id
// @desc        Fetch a single products
// @privacy     Public

router.get(
  '/:id',
  errorHandler(async (req, res) => {
    await Product.findById(req.params.id)
      .then((product) => {
        res.json(product)
      })
      .catch((err) => {
        throw new Error('Product not found!')
      })
  })
)

export default router
