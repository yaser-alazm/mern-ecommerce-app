import axios from 'axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_INITIAL,
  ORDER_SINGLE_INITIAL,
  ORDER_SINGLE_SUCCESS,
  ORDER_SINGLE_FAIL,
  ORDER_PAY_INITIAL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_USER_INITIAL,
  ORDER_LIST_USER_SUCCESS,
  ORDER_LIST_USER_FAIL,
} from '../consts/orderConsts'

export const orderCreate = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_INITIAL,
    })

    const {userInfo} = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const {data} = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderSingle = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_SINGLE_INITIAL,
    })

    const {userInfo} = getState().userLogin
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const {data} = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_SINGLE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_SINGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderPay = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_INITIAL,
    })

    const {userInfo} = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const {data} = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderListUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_USER_INITIAL,
    })

    const {userInfo} = getState().userLogin
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const {data} = await axios.get(`/api/orders/userorders`, config)

    dispatch({
      type: ORDER_LIST_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
