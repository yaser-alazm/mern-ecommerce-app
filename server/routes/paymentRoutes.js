import express from 'express'
const router = express.Router()

import {getPayPalClientId} from '../controllers/paymentController.js'

router.route('/paypal').get(getPayPalClientId)

export default router
