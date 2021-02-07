import axios from 'axios'

import {
  PRODUCTS_REQUEST_INITIAL,
  PRODUCTS_REQUEST_SUCCESS,
  PRODUCTS_REQUEST_FAIL,
  PRODUCT_SINGLE_INITIAL,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_SINGLE_FAIL,
} from '../consts/productConsts'

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_REQUEST_INITIAL,
    })

    const {data} = await axios.get('/api/products')
    // console.log(data)

    dispatch({
      type: PRODUCTS_REQUEST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_SINGLE_INITIAL,
    })

    const {data} = await axios.get(`/api/products/${id}`)
    // console.log(data)

    dispatch({
      type: PRODUCT_SINGLE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_SINGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
