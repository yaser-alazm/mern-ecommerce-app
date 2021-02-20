import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Button, ListGroup, Image, Row, Col, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import Message from '../components/utils/Message'
import CheckoutSteps from '../components/checkout/CheckoutSteps'

import {orderCreate} from '../redux/actions/orderActions'

function PlaceOrderScreen({history}) {
  const dispatch = useDispatch()
  const {shippingAddress, paymentMethod, cartItems} = useSelector(
    (state) => state.cart
  )
  const {error, success, order} = useSelector((state) => state.orderCreate)

  useEffect(() => {
    success && history.push(`/order/${order._id}`)
    // eslint-disable-next-line
  }, [success, history])

  // calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  )
  const shippingPrice = itemsPrice < 80 ? 0 : 20

  const taxPrice = itemsPrice * 0.11
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  const placeOrderHandler = (e) => {
    e.preventDefault()
    dispatch(
      orderCreate({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    )
    // success && history.push('/finishorder')
  }

  return (
    <>
      <CheckoutSteps stp1 stp2 stp3 stp4 />
      <h1>Place Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Cart Items</h2>
              {cartItems.length === 0 ? (
                <Message color='danger' text='Your cart is empty!'>
                  Your cart is empty
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
