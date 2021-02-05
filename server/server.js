import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/mongodb.js'
import products from './data/products.js'

const app = express()

connectDB()

app.get('/', (req, res) => {
  res.send('Hello From Node Server..')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
)
