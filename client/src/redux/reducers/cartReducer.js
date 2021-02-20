import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../consts/cartConsts'

export const cartReducer = (
  state = {cartItems: [], shippingAddress: {}, paymentMethod: ''},
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // check if the item is already in the cart
      const exists = state.cartItems.find(
        (i) => i.product === action.payload.product
      )

      //   console.log(exists)
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            action.payload.product === p.product ? action.payload : p
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (p) => action.payload.product !== p.product
        ),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
