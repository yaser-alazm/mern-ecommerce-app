import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import FormContainer from '../components/utils/FormContainer'
import Message from '../components/utils/Message'
import Loading from '../components/utils/Loading'

import {registerUser} from '../redux/actions/userActions'

function RegisterScreen({location, history}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const {loading, userInfo, error} = useSelector((state) => state.userRegister)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords must be matched!')
    } else {
      dispatch(registerUser(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
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
          <Form onSubmit={(e) => onSubmitHandler(e)}>
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
              Register
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Already registered ?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  )
}

export default RegisterScreen
