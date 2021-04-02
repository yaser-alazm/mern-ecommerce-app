import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js'
import {
  userAuthorized,
  adminsOnlyAuthorized,
} from '../middlewares/userAuthMiddleware.js'

router.post('/login', authUser)
router
  .route('/')
  .post(registerUser)
  .get(userAuthorized, adminsOnlyAuthorized, getUsers)

router.route('/:id').delete(userAuthorized, adminsOnlyAuthorized, deleteUser)

router
  .route('/profile')
  .get(userAuthorized, getUserProfile)
  .put(userAuthorized, updateUserProfile)
export default router
