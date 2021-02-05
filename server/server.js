import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/mongodb.js'
import productRoutes from './routes/productRoutes.js'
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorHandlingMiddleware.js'

const app = express()

connectDB()

app.use('/api/products', productRoutes)

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
