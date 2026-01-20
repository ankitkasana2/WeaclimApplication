import {
  GET_CURRENCY,
  SET_CURRENCY,
  CLEAR_CURRENCY
} from '../actions/actions'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeStyle from '../../common/Theme.style'

const initialState = {
  currency: [],
  selectedCurrency: themeStyle.currencyCode
}

function currencyCall (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCY:
      state.currency = action.payload
      return { ...state }
    case SET_CURRENCY:
      state.selectedCurrency = action.payload
      return { ...state }
    case CLEAR_CURRENCY:
      state.currency = []
      return { ...state }
    default:
      return state
  }
}

const persistConfig = {
  key: 'currencyCall',
  storage: AsyncStorage,
  whitelist: [
    'selectedCurrency'], // will be persisted
  blacklist: ['currency']
}
export default persistReducer(persistConfig, currencyCall)
