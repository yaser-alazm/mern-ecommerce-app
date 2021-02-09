import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
  productListReducer,
  productSingleReducer,
} from './reducers/productsReducer'
import {cartReducer} from './reducers/cartReducer'

const reducer = combineReducers({
  productsList: productListReducer,
  productSingle: productSingleReducer,
  cart: cartReducer,
})

// set the cartItems state default value to the localStorage value
const cartItemsFromLS = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const innitialState = {
  cart: {cartItems: cartItemsFromLS},
}

const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
