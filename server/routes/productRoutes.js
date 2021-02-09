import express from 'express'
const router = express.Router()

import {getProducts, getProductById} from '../controllers/productController.js'

// using either (route.get) syntax or (.get) directly, still the same

router.route('/').get(getProducts)

router.get('/:id', getProductById)

export default router
