import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/user.js'

export const userAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedToken.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorized, token is not valid.')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorized, token is not found.')
  }
})
