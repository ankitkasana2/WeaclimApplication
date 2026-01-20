import {
  LANG_CODE,
  SET_MODE,
  SET_THEME,
  SHOW_INTRO,
  GET_CODE,
  SET_LANGUAGE_ID,
  SET_CURRENCY_ID
} from '../actions/actions'
import { I18nManager } from 'react-native'
import * as global from '../../common/GlobalLanguageJson'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeStyle, { appTextStyle, appDarkTheme, appLightTheme } from '../../common/Theme.style'
const initialState = {
  counter: 0,
  isloading: true,
  themeStyle: appTextStyle.isDarkMode ? appDarkTheme : appLightTheme,
  appTextStyle: appTextStyle,
  appDarkTheme: appDarkTheme,
  appLightTheme: appLightTheme,
  isDarkMode: appTextStyle.isDarkMode,
  showIntro: true,
  languageJson: global.getLanguage(themeStyle.languageCode),
  appInProduction: themeStyle.appInProduction,
  currencyPos: I18nManager.isRTL ? 'right' : 'left',
  languageDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  languageCode: I18nManager.isRTL ? themeStyle.rtllanguageCode : themeStyle.ltrlanguageCode,
  currency: themeStyle.defaultCurrency,
  currencyCode: themeStyle.currencyCode,
  currencySymbol: themeStyle.defaultCurrencySymbol,
  decimals: themeStyle.priceDecimals,
  cartProducts: null
}

function appConfig (state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE_ID:
      state.languageCode = action.value.code
      state.languageDirection = action.value.direction
      return { ...state }
    case SET_CURRENCY_ID:
      state.decimals = action.currencyDecimals
      state.currencyPos = action.currencyPos
      state.currencyCode = action.currencyCode
      state.currencySymbol = action.currencySymbol
      return { ...state }
    case LANG_CODE:
      state.languageCode = action.value
      state.languageJson = global.getLanguage(state.languageCode)
      return { ...state }

    case GET_CODE:
      state.languageJson = global.getLanguage(state.languageCode)
      return { ...state }

    case SHOW_INTRO:
      state.showIntro = action.value
      return { ...state }

    case SET_THEME:

      state.appDarkTheme = action.appDarkTheme
      state.appLightTheme = action.appLightTheme
      if (state.isDarkMode) {
        state.themeStyle = action.appDarkTheme
      } else {
        state.themeStyle = action.appLightTheme
      }
      return { ...state }

    case SET_MODE:
      state.isDarkMode = action.isDarkMode
      if (state.isDarkMode) {
        state.themeStyle = state.appDarkTheme
      } else {
        state.themeStyle = state.appLightTheme
      }
      return { ...state }

    default:
      return state
  }
}

const persistConfig = {
  key: 'config',
  storage: AsyncStorage,
  whitelist: [
    'themeStyle',
    'appTextStyle',
    'appDarkTheme',
    'appLightTheme',
    'isDarkMode',
    'showIntro', 'languageCode', 'currencyCode', 'decimals', 'currencyPos',
    'currencySymbol'], // will be persisted
  blacklist: ['languageJson']
}

export default persistReducer(persistConfig, appConfig)
