import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/mongodb.js'
import users from './data/users.js'
import products from './data/products.js'

import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'

dotenv.config()

connectDB()

const addData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    await User.insertMany(users)

    const admin = await User.findOne({isAdmin: true})

    const sampleProducts = products.map((p) => {
      return {...p, user: admin._id}
    })

    await Product.insertMany(sampleProducts)

    console.log(`Data Imported successfully!`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Seerder Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log(`Data Destroyed successfully!`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Data Destroy Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] == '-d') {
  destroyData()
} else {
  addData()
}
