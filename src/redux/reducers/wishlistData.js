import {
  GET_WISHLIST_ARRAY,
  GET_WISHLIST_REMOVE_ID
} from '../actions/actions'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  wishlistArray: [],
  removeProductId: ''
}

function wishlistArrayCall (state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST_ARRAY:
      if (!state.wishlistArray.includes(action.payload)) { state.wishlistArray = [...state.wishlistArray, action.payload] }
      return { ...state }
    case GET_WISHLIST_REMOVE_ID:
      state.wishlistArray = state.wishlistArray.filter(
        cartItem => Number(cartItem) !== Number(action.removeProductId)
      )
      return { ...state }
    default:
      return state
  }
}

const persistConfig = {
  key: 'wishlistArrayCall',
  storage: AsyncStorage,
  whitelist: ['wishlistArray', 'removeProductId'] // will be persisted
}
export default persistReducer(persistConfig, wishlistArrayCall)
