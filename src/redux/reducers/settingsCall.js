import {
  SET_FIRST_SETTINGS,
  SET_BANNER_STYLE,
  SET_CARD_STYLE,
  SET_HOME_STYLE,
  SET_CATEGORY_STYLE,
  ABOUT_SETTINGS
} from '../actions/actions'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeStyle from '../../common/Theme.style'

const initialState = {
  settings: {},
  newProductDuration: themeStyle.newProductDuration,
  aboutUs: '',
  refundPolicy: '',
  termServices: '',
  privacyPolicy: ''
}

function settingsCall (state = initialState, action) {


  // console.log("settings : ",state.settings);
  
  switch (action.type) {
    case SET_FIRST_SETTINGS:
      state.settings = action.payload
      state.settings.about_page_id=69
      state.newProductDuration = action.payload.new_product_duration
      return { ...state }

    case ABOUT_SETTINGS:
      for (const value of action.payload) {
        if (parseInt(state.settings.about_page_id) === parseInt(value.id)) {
          state.aboutUs = value.content.rendered
        }
        if (parseInt(state.settings.refund_page_id) === parseInt(value.id)) {
          state.refundPolicy = value.content.rendered
        }
        if (parseInt(state.settings.terms_page_id) === parseInt(value.id)) {
          state.termServices = value.content.rendered
        }
        if (parseInt(state.settings.privacy_page_id) === parseInt(value.id)) {
          state.privacyPolicy = value.content.rendered
        }
      }
      return { ...state }

    case SET_BANNER_STYLE:
      state.settings = { ...state.settings, banner_style: action.payload }
      return { ...state }

    case SET_CARD_STYLE:
      state.settings = { ...state.settings, card_style: action.payload }
      return { ...state }

    case SET_HOME_STYLE:
      state.settings = { ...state.settings, home_style: action.payload }
      return { ...state }

    case SET_CATEGORY_STYLE:
      state.settings = { ...state.settings, category_style: action.payload }
      return { ...state }

    default:
      return state
  }
}

const persistConfig = {
  key: 'settingsCall',
  storage: AsyncStorage,
  whitelist: [
    'settings'] // will be persisted
}
export default persistReducer(persistConfig, settingsCall)
