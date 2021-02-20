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
      taxPrice,
      shippingPrice,
      totalPrice,
    }).save()

    res.status(201).json(newOrder)
  }
})

export {addNewOrder}
