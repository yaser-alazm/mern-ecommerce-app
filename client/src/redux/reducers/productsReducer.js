import {
  PRODUCTS_REQUEST_INITIAL,
  PRODUCTS_REQUEST_SUCCESS,
  PRODUCTS_REQUEST_FAIL,
  PRODUCT_SINGLE_INITIAL,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_SINGLE_FAIL,
} from '../consts/productConsts'

export const productListReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST_INITIAL:
      return {loading: true, products: []}
    case PRODUCTS_REQUEST_SUCCESS:
      return {loading: false, products: action.payload}
    case PRODUCTS_REQUEST_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const productSingleReducer = (
  state = {product: {reviews: []}},
  action
) => {
  switch (action.type) {
    case PRODUCT_SINGLE_INITIAL:
      return {loading: true, ...state}
    case PRODUCT_SINGLE_SUCCESS:
      return {loading: false, product: action.payload}
    case PRODUCT_SINGLE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}
