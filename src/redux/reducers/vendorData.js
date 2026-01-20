import {
  ADD_VENDOR
} from '../actions/actions'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  vendorsArray: {}
}

function vendorData (state = initialState, action) {
  switch (action.type) {
    case ADD_VENDOR:
      state.vendorsArray = action.payload
      return { ...state }

    default:
      return state
  }
}

const persistConfig = {
  key: 'vendorsArray',
  storage: AsyncStorage,
  blacklist: [
    'vendorsArray'] // will be persisted
}
export default persistReducer(persistConfig, vendorData)
