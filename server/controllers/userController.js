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

export {authUser}
