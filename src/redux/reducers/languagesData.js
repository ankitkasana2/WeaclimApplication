import {
  SET_LANGUAGE
} from '../actions/actions'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../common/Theme.style'
const initialState = {
  selectedlang: { code: config.ltrlanguageCode }
}

function languagesCall (state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      state.selectedlang = action.payload
      return { ...state }

    default:
      return state
  }
}

const persistConfig = {
  key: 'languagesCall',
  storage: AsyncStorage,
  whitelist: ['selectedlang']
}
export default persistReducer(persistConfig, languagesCall)
