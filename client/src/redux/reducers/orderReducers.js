import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_INITIAL,
  ORDER_CREATE_FAIL,
  ORDER_SINGLE_INITIAL,
  ORDER_SINGLE_SUCCESS,
  ORDER_SINGLE_FAIL,
  ORDER_PAY_INITIAL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_USER_INITIAL,
  ORDER_LIST_USER_SUCCESS,
  ORDER_LIST_USER_FAIL,
} from '../consts/orderConsts'

export const orderCreateReducer = (state = {success: false}, action) => {
  switch (action.type) {
    case ORDER_CREATE_INITIAL:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderSingleReducer = (
  state = {loading: true, order: {}},
  action
) => {
  switch (action.type) {
    case ORDER_SINGLE_INITIAL:
      return {
        ...state,
        loading: true,
      }
    case ORDER_SINGLE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_SINGLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_INITIAL:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderListUserReducer = (
  state = {loading: true, orders: []},
  action
) => {
  switch (action.type) {
    case ORDER_LIST_USER_INITIAL:
      return {
        ...state,
        loading: true,
      }
    case ORDER_LIST_USER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
