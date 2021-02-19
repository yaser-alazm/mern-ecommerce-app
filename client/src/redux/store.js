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
} from './reducers/userReducer'

const reducer = combineReducers({
  productsList: productListReducer,
  productSingle: productSingleReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

// set the cartItems state default value to the localStorage value
const cartItemsFromLS = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// set the userInfo state default value to the localStorage value
const userInfoFromLS = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const innitialState = {
  cart: {cartItems: cartItemsFromLS},
  userLogin: {userInfo: userInfoFromLS},
  userRegister: {userInfo: userInfoFromLS},
}

const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
