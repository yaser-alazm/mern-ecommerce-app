import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
  productListReducer,
  productSingleReducer,
} from './reducers/productsReducer'
import {cartReducer} from './reducers/cartReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/userReducer'
import {
  orderCreateReducer,
  orderSingleReducer,
  orderPayReducer,
  orderListUserReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productsList: productListReducer,
  productSingle: productSingleReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderSingle: orderSingleReducer,
  orderPay: orderPayReducer,
  orderListUser: orderListUserReducer,
})

// set the cartItems state default value to the localStorage value
const cartItemsFromLS = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// set the userInfo state default value to the localStorage value
const userInfoFromLS = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// set the shippingAddress state default value to the localStorage value
const shippingAddressFromLS = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

// set the paymentMethod state default value to the localStorage value
const paymentMethodFromLS = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const innitialState = {
  cart: {
    cartItems: cartItemsFromLS,
    shippingAddress: shippingAddressFromLS,
    paymentMethod: paymentMethodFromLS,
  },
  userLogin: {userInfo: userInfoFromLS},
  userRegister: {userInfo: userInfoFromLS},
}

const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
