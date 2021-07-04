import errorHandler from 'express-async-handler'

import {generateToken} from '../utils/jwtGenerator.js'
import User from '../models/user.js'

// @route       POST /api/users/login
// @desc        Authenticate user & get token
// @privacy     Public

const authUser = errorHandler(async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if (user && (await user.validatePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Not Authenticated! Email or password is not correct')
  }
})

// @route       POST /api/users/
// @desc        Register a new user
// @privacy     Public

const registerUser = errorHandler(async (req, res) => {
  const {name, email, password} = req.body

  const existUser = await User.findOne({email})

  if (existUser) {
    res.status(400)
    throw new Error('User already exists!')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @route       POST /api/users/profile
// @desc        Get user profile
// @privacy     Private

const getUserProfile = errorHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @route       PUT /api/users/profile
// @desc        Update user profile
// @privacy     Private

const updateUserProfile = errorHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: await generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @route       GET /api/users/
// @desc        Get admin users
// @privacy     Private/Admin - Only admins authorized

const getUsers = errorHandler(async (req, res) => {
  const users = await User.find({})

  if (!users) {
    res.status(404)
    throw new Error('No users found!')
  } else {
    res.status(200)
    res.json(users)
  }
})

// @route       DELETE /api/users/:id
// @desc        Delete a user
// @privacy     Private/Admin - Only admins authorized

const deleteUser = errorHandler(async (req, res) => {
  const deletedUser = await User.findById(req.params.id)

  if (!deletedUser) {
    res.status(404)
    throw new Error('No user found!')
  } else {
    await deletedUser.remove()
    res.status(200)
    res.json({message: 'User deleted successfully.'})
  }
})

// @route       GET /api/users/:id
// @desc        Get user by ID
// @privacy     Private/Admin - Only admins authorized

const getUserById = errorHandler(async (req, res) => {
  const user = await User.find(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('No users found!')
  } else {
    res.status(200)
    res.json(user)
  }
})

// @route       PUT /api/users/:id
// @desc        Update user
// @privacy     Private/Admin - Only admins authorized

const updateUser = errorHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
