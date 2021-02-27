import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import Message from '../components/utils/Message'

import {getUserProfile, updateUserProfile} from '../redux/actions/userActions'
import {orderListUser} from '../redux/actions/orderActions'
import Loading from '../components/utils/Loading'

function ProfileScreen({location, history}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState('')

  const {loading, user, error} = useSelector((state) => state.userProfile)
  const {userInfo} = useSelector((state) => state.userLogin)
  const {success} = useSelector((state) => state.userUpdateProfile)

  const {orders, loading: ordersLoading, error: ordersError} = useSelector(
    (state) => state.orderListUser
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserProfile('profile'))
        dispatch(orderListUser())
      } else {
        // console.log(user)
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, history, dispatch, user])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords must be matched!')
    } else {
      //Dispatch update profile
      console.log('This is submit handler!')
      setMessage('')
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        {error && (
          <Message color='danger' text={error}>
            {error}
          </Message>
        )}
        {message && (
          <Message color='danger' text={message}>
            {message}
          </Message>
        )}
        {success && (
          <Message color='success' text='User Profile Updated'>
            User Profile Updated
          </Message>
        )}
        {loading ? (
          <Loading />
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Re-Enter password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update Profile
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {ordersLoading ? (
          <Loading />
        ) : ordersError ? (
          <Message color='danger' text={ordersError}>
            {ordersError}
          </Message>
        ) : (
          <Table
            striped
            hover
            borderless
            responsive
            className='table-sm text-center'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{Number(order.totalPrice).toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{color: 'red'}}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{color: 'red'}}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
