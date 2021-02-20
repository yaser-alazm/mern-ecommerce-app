import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Form, Button, Col} from 'react-bootstrap'

import FormContainer from '../components/utils/FormContainer'
import CheckoutSteps from '../components/checkout/CheckoutSteps'

import {savePaymentMethod} from '../redux/actions/cartActions'

function PaymentScreen({history}) {
  const {shippingAddress} = useSelector((state) => state.cart)

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if (Object.keys(shippingAddress).length === 0) {
    history.push('/shipping')
  }

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
      <CheckoutSteps stp1 stp2 stp3 />
      <FormContainer>
        <h1>Payment</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal Or CreditCard'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check> */}
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
