import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Button, ListGroup, Image, Row, Col, Card} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Message from '../components/utils/Message'
import Loading from '../components/utils/Loading'

import {orderSingle, orderPay} from '../redux/actions/orderActions'
import {ORDER_PAY_RESET} from '../redux/consts/orderConsts'

function OrderScreen({match}) {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const [sdkScriptReady, setSdkScriptReady] = useState(false)

  const {error, order, loading} = useSelector((state) => state.orderSingle)
  const {success: paySuccess, loading: payLoading} = useSelector(
    (state) => state.orderPay
  )

  useEffect(() => {
    const createPaypalSdkScript = async () => {
      const {data: paypalClientId} = await axios.get('/api/payment/paypal')

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`
      script.type = 'text/javascript'
      script.async = true
      script.onload = () => setSdkScriptReady(true)
      document.body.appendChild(script)
    }

    if (Object.keys(order).length === 0 || paySuccess) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch(orderSingle(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        createPaypalSdkScript()
      } else {
        setSdkScriptReady(true)
      }
    }
  }, [dispatch, orderId, order, paySuccess])

  const onSuccessPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(orderPay(orderId, paymentResult))
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <Message color='danger' text={error}>
      {error}
    </Message>
  ) : (
    <>
      <h1>Order ID: ({order._id})</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message
                  color='success'
                  text={`Delivered at ${order.deliveredAt}`}
                />
              ) : (
                <Message color='danger' text='Not Delivered' />
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message color='success' text={`Paid at ${order.paidAt}`} />
              ) : (
                <Message color='danger' text='Not Paid' />
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message color='danger' text='Your order is empty!'>
                  Your order is empty
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {payLoading && <Loading />}
                  {!sdkScriptReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={onSuccessPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  )
}

export default OrderScreen
