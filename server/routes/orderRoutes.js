import express from 'express'
const router = express.Router()

import {userAuth} from '../middlewares/userAuthMiddleware.js'
import {addNewOrder} from '../controllers/orderController.js'

router.route('/').post(userAuth, addNewOrder)

export default router
