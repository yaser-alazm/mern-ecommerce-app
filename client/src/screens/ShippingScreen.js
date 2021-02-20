import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Form, Button} from 'react-bootstrap'

import FormContainer from '../components/utils/FormContainer'
import CheckoutSteps from '../components/checkout/CheckoutSteps'

import {saveShippingAddress} from '../redux/actions/cartActions'

function ShippingScreen({history}) {
  const {shippingAddress} = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history.push('/payment')
  }

  return (
    <>
      <CheckoutSteps stp1 stp2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='address'
              required
              placeholder='Enter your address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='city'
              required
              placeholder='Enter your city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='postalCode'
              required
              placeholder='Enter your postal code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='country'
              required
              placeholder='Enter your country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
