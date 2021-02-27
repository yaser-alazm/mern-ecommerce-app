import express from 'express'
const router = express.Router()

import {userAuth} from '../middlewares/userAuthMiddleware.js'
import {
  addNewOrder,
  getOrderById,
  updateOrderToPay,
  getUserOrders,
} from '../controllers/orderController.js'

router.route('/').post(userAuth, addNewOrder)
router.route('/userorders').get(userAuth, getUserOrders)
router.route('/:id').get(userAuth, getOrderById)
router.route('/:id/pay').put(userAuth, updateOrderToPay)

export default router
