import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {Button, Card, Col, Form, Image, ListGroup, Row} from 'react-bootstrap'

import Message from '../components/utils/Message'

import {addToCart, removeFromCart} from '../redux/actions/cartActions'

function CartScreen({match, location, history}) {
  const product_id = match.params.id
  const qty = Number(location.search.split('=')[1])
  // console.log(qty)
  const dispatch = useDispatch()

  const {cartItems} = useSelector((state) => state.cart)

  useEffect(() => {
    if (product_id) {
      dispatch(addToCart(product_id, qty))
    }
  }, [dispatch, product_id, qty])

  const updateItemQty = (e, item) => {
    dispatch(addToCart(item.product, Number(e.target.value)))
  }
  const removeFromCartHandler = (id) => {
    // console.log(`Remove ${id} item...`)
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push(`/products/checkout/`)
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <>
            <Message color='info' text='Your Cart is empty' />
            <Link to='/' className='btn btn-light my-3'>
              Go Back
            </Link>
          </>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => updateItemQty(e, item)}
                    >
                      {[...Array(item.countInStock).keys()].map((p) => (
                        <option key={p + 1} value={p + 1}>
                          {p + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, item) => acc + Number(item.qty) * Number(item.price),
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{textTransform: 'uppercase'}}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
