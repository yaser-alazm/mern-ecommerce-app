import axios from 'axios'

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_INITIAL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_INITIAL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT,
  USER_PROFILE_INITIAL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_INITIAL,
  USER_UPDATE_PROFILE_FAIL,
} from '../consts/userConsts'

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_INITIAL,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const {data} = await axios.post(
      '/api/users/login',
      {email, password},
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const logoutUser = (email, password) => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo')
    dispatch({
      type: USER_LOGIN_LOGOUT,
    })
    dispatch({
      type: USER_REGISTER_LOGOUT,
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_INITIAL,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const {data} = await axios.post(
      '/api/users',
      {name, email, password},
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_INITIAL,
    })

    const {userInfo} = getState().userLogin
    // console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_INITIAL,
    })

    const {userInfo} = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
