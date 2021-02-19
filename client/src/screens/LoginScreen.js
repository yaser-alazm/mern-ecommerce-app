import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import FormContainer from '../components/utils/FormContainer'
import Message from '../components/utils/Message'

import {loginUser} from '../redux/actions/userActions'
import Loading from '../components/utils/Loading'

function LoginScreen({location, history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loading, userInfo, error} = useSelector((state) => state.userLogin)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && (
            <Message color='danger' text={error}>
              {error}
            </Message>
          )}
          <Form onSubmit={(e) => onSubmitHandler(e)}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email Address'
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

            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Cunstomer ?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  )
}

export default LoginScreen
