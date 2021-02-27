import errorHandler from 'express-async-handler'

import Order from '../models/order.js'

// @route       POST /api/orders
// @desc        Add new order
// @privacy     Private

const addNewOrder = errorHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items!')
  } else {
    const newOrder = await new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }).save()

    res.status(201).json(newOrder)
  }
})

// @route       GET /api/orders/:id
// @desc        Get order by id
// @privacy     Private

const getOrderById = errorHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(401)
    throw new Error('Order not found!')
  }
})

// @route       PUT /api/orders/:id/pay
// @desc        Update order to pay
// @privacy     Private

const updateOrderToPay = errorHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body._id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(401)
    throw new Error('Order not found!')
  }
})

// @route       GET /api/orders/userorders
// @desc        Get logged in user orders
// @privacy     Private

const getUserOrders = errorHandler(async (req, res) => {
  try {
    const orders = await Order.find({user: req.user._id})
    if (orders) {
      res.status(200).json(orders)
    } else {
      res.status(401)
      throw new Error('No orders found for this user.')
    }
  } catch (error) {
    throw new Error(`Error: ${error}`)
  }
})

export {addNewOrder, getOrderById, updateOrderToPay, getUserOrders}
