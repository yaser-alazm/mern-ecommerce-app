import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_INITIAL,
  ORDER_CREATE_FAIL,
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
    default:
      return state
  }
}
