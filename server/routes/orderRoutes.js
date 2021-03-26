import express from 'express'
const router = express.Router()

import {userAuthorized} from '../middlewares/userAuthMiddleware.js'
import {
  addNewOrder,
  getOrderById,
  updateOrderToPay,
  getUserOrders,
} from '../controllers/orderController.js'

router.route('/').post(userAuthorized, addNewOrder)
router.route('/userorders').get(userAuthorized, getUserOrders)
router.route('/:id').get(userAuthorized, getOrderById)
router.route('/:id/pay').put(userAuthorized, updateOrderToPay)

export default router
