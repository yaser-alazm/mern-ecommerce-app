import {
  USER_LOGIN_FAIL,
  USER_LOGIN_INITIAL,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_INITIAL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_LOGOUT,
  USER_PROFILE_INITIAL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_INITIAL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_INITIAL,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_PROFILE_RESET,
} from '../consts/userConsts'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_INITIAL:
      return {loading: true}
    case USER_LOGIN_SUCCESS:
      return {loading: false, userInfo: action.payload}
    case USER_LOGIN_FAIL:
      return {loading: false, error: action.payload}
    case USER_LOGIN_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_INITIAL:
      return {loading: true}
    case USER_REGISTER_SUCCESS:
      return {loading: false, userInfo: action.payload}
    case USER_REGISTER_FAIL:
      return {loading: false, error: action.payload}
    case USER_REGISTER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userProfileReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case USER_PROFILE_INITIAL:
      return {...state, loading: true}
    case USER_PROFILE_SUCCESS:
      return {loading: false, user: action.payload}
    case USER_PROFILE_FAIL:
      return {loading: false, error: action.payload}
    // case USER_PROFILE_RESET:
    //   return {user: {}}
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {success: false}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_INITIAL:
      return {loading: true}
    case USER_UPDATE_PROFILE_SUCCESS:
      return {loading: false, success: true, userInfo: action.payload}
    case USER_UPDATE_PROFILE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const userListReducer = (state = {users: []}, action) => {
  switch (action.type) {
    case USER_LIST_INITIAL:
      return {loading: true}
    case USER_LIST_SUCCESS:
      return {loading: false, users: action.payload}
    case USER_LIST_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}
