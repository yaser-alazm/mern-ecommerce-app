// @route       GET /api/payment/paypal
// @desc        Get the paypal account client id
// @privacy     Public

const getPayPalClientId = async (req, res) => {
  try {
    res.send(process.env.PAYPAL_CLIENT_ID)
  } catch (error) {
    res.status(400)
    throw new Error('Error: ' + error)
  }
}

export {getPayPalClientId}
