import {
  ADD_ADDRESS, ADD_SHIPPING_LINES, REMOVE_SHIPPING_LINES
} from '../actions/actions'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  addressData: {},
  shippingAddress: {},
  shipping_lines: []
}

function shippingAddressData (state = initialState, action) {
  switch (action.type) {
    case ADD_SHIPPING_LINES :
      state.shipping_lines.push(action.shipping_lines)
      return {
        ...state
      }
    case REMOVE_SHIPPING_LINES :
      state.shipping_lines = []
      return {
        ...state
      }
    case ADD_ADDRESS:
      state.addressData = {
        ...state.addressData,
        delivery_first_name: action.firstName,
        delivery_last_name: action.lastName,
        delivery_country: action.selectedCountry,
        delivery_country_name: action.selectedCountry.country_name,
        delivery_street_aadress: action.addressOne,
        delivery_postcode: action.zip,
        delivery_state: action.selectedState,
        delivery_state_name: action.selectedState.name,
        delivery_city: action.city,
        delivery_phone: action.phone,
        delivery_email: action.email
      }

      state.shippingAddress = {
        ...state.shippingAddress,
        shippingFirstName: action.shippingFirstName,
        shippingLastName: action.shippingLastName,
        shippingSelectedCountry: action.shippingSelectedCountry,
        shippingAddressOne: action.shippingAddressOne,
        postcode: action.shippingZip,
        shippingSelectedState: action.shippingSelectedState,
        shippingCity: action.shippingCity
      }
      return {
        ...state
      }

    default:
      return state
  }
}

const persistConfig = {
  key: 'shippingAddressData',
  storage: AsyncStorage,
  blacklist: [
    'addressData', 'shippingAddress', 'shipping_lines'] // will be persisted
}
export default persistReducer(persistConfig, shippingAddressData)
