import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/mongodb.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorHandlingMiddleware.js'

const app = express()

connectDB()

// accept JSON data in the request body
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)

// Override 404 route not found error
app.use(notFoundHandler)

// Custom error handling
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
)
