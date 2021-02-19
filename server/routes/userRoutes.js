import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'
import {userAuth} from '../middlewares/userAuthMiddleware.js'

router.post('/login', authUser)
router.route('/').post(registerUser)
router
  .route('/profile')
  .get(userAuth, getUserProfile)
  .put(userAuth, updateUserProfile)

export default router
