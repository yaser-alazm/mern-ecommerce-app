import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Button, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import Message from '../components/utils/Message'
import Loading from '../components/utils/Loading'

import {getUserList} from '../redux/actions/userActions'

function UserList() {
  const dispatch = useDispatch()

  const {users, error, loading} = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

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
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{color: 'green'}}></i>
                  ) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/profile/${user._id}/edit`}>
                    <Button>Edit User</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserList
