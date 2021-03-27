import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Button, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import Message from '../components/utils/Message'
import Loading from '../components/utils/Loading'

import {getUserList} from '../redux/actions/userActions'

function UserListScreen() {
  const dispatch = useDispatch()

  const {users, error, loading} = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

  const onDeleteHandler = (e) => {
    e.preventDefault()
    console.log('Delete User')
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message color='danger' text={error}>
          {error}
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
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{color: '#18bc9c'}}></i>
                  ) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/user/${user._id}/edit`}
                    style={{marginRight: '.5rem'}}
                  >
                    <Button variant='light'>
                      <i className='fas fa-edit' style={{color: '#18bc9c'}}></i>
                    </Button>
                  </LinkContainer>

                  <Button variant='light' onClick={onDeleteHandler}>
                    <i className='fas fa-trash' style={{color: 'red'}}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
