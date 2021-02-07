import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
  productListReducer,
  productSingleReducer,
} from './reducers/productsReducer'

const reducer = combineReducers({
  productsList: productListReducer,
  productSingle: productSingleReducer,
})

const innitialState = {}

const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
