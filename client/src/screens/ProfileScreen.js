import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Form, Button, Row, Col} from 'react-bootstrap'

import Message from '../components/utils/Message'

import {getUserProfile, updateUserProfile} from '../redux/actions/userActions'
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

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserProfile('profile'))
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
        {loading && <Loading />}

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
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
