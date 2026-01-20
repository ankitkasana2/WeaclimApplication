import React, { Component } from 'react'
import AppContainerWithBottom from './src/navigation/Index'
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import { createSelector } from 'reselect'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  LogBox
} from 'react-native'
import {
  GET_CODE,
  firstSettingCallFun,
  settingCallFun,
  getCategories,
  getBanners,
  getProducts,
  getCartProductsQuantity,
  getWishlist,
  getfeaturedProducts,
  gettopsellerProducts,
  getonSaleProducts
} from './src/redux/actions/actions'


import configSettings, { appTextStyle } from './src/common/Theme.style'
const Height = Dimensions.get('window').height
// const MyStatusBar = ({ backgroundColor, ...props }) => (
//   <View style={[styles.statusBar, { backgroundColor }]}>
//     <StatusBar backgroundColor={backgroundColor} {...props} />
//   </View>
// )
///nikita add this code
const MyStatusBar = ({ backgroundColor, barStyle }) => (
  <View
    style={{
      height:
      Platform.OS === 'android'
        ? (Platform.Version >= 35 ? StatusBar.currentHeight || 25 : 0)
        : Height * 0.04,
      backgroundColor: backgroundColor,
    }}
  >
    <StatusBar
      translucent={false}
      backgroundColor={backgroundColor}
      barStyle={barStyle}
    />
  </View>
);
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listTotal: 0,
      isLoading: true,
      data: '',
      SpinnerTemp: false,
      categoryLimit: 10
    }

    this.toast = null

    // OneSignal.init(configSettings.oneSignalAppIdForAndroid)

    // OneSignal.addEventListener('opened', this.onOpened)
  }

  componentDidMount () {

    this.interval = setInterval(() => {
      this.forceUpdate(); // Trigger a re-render
      // alert('Hello')
    }, 150000);


    if (Object.keys(this.props.settings).length === 0) {
      this.props.firstSiteSetting(this.props, this) // first settings call
    } else { // every time call
      this.props.bannersCall(this.props, this)
      this.props.categoryCall(this.props, this)
      this.props.siteSettingFun(this.props, this)
      this.props.getProductsFun(this.props, 1, this)
      this.props.getonSaleProductsFun(this.props, 1, this)
      this.props.gettopsellerProductsFun(this.props, 1, this)
      this.props.getNewArrivalProductsFun(this.props, 1, this)

      if (Object.keys(this.props.userData).length > 0) {
        this.props.wishlistCall(this)
      }
    }
    if (Object.keys(this.props.userData).length > 0) {
      this.props.getCartProductsQuantityCall(this, this.props.userData)
    }

    this.props.getLanguageCodeFun()

    this.setState({ isLoading: false })
    LogBox.ignoreAllLogs = false
    LogBox.ignoreLogs(['Animated:', 'FlatList:', 'useNativeDriver', 'headerForceInset'])
  }

  componentWillUnmount () {
    clearInterval(this.interval);


  }

  onOpened (openResult) {
  }

  render () {
    // alert(JSON.stringify(this.props.userData))
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.SpinnerTemp} />
        <Toast
          ref={ref => { this.toast = ref }}
          style={{ backgroundColor: this.props.themeStyle.iconPrimaryColor }}
          position='top'
          positionValue={400}
          fadeOutDuration={7000}
          textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.largeSize }}
        />
        <MyStatusBar
          backgroundColor={this.props.themeStyle.StatusBarColor}
          barStyle={configSettings.barStyle}
        />
        <AppContainerWithBottom />
      </View>
    )
  }
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Height * 0.04 : 0

const mapDispatchToProps = dispatch => ({
  getCartProductsQuantityCall: (th, userData) => {
    dispatch(async dispatch => {
      await getCartProductsQuantity(dispatch, '', th, userData)
    })
  },
  getLanguageCodeFun: () => {
    dispatch({
      type: GET_CODE
    })
  },
  firstSiteSetting: (props, th) => {
    dispatch(async dispatch => {
      await firstSettingCallFun(dispatch, props, th)
      SplashScreen.hide()
    })
  },
  getProductsFun: (props, page, th) => {
    dispatch(async dispatch => {
      await getProducts(dispatch, props.languageCode, props.currencyCode, page, '', th)
    })
  },

  getNewArrivalProductsFun: (props, page, th) => {
    dispatch(async dispatch => {
      await getfeaturedProducts(dispatch, props.languageCode, props.currencyCode, page, th)
    })
  },
  gettopsellerProductsFun: (props, page, th) => {
    dispatch(async dispatch => {
      await gettopsellerProducts(dispatch, props.languageCode, props.currencyCode, page, th)
    })
  },
  getonSaleProductsFun: (props, page, th) => {
    dispatch(async dispatch => {
      await getonSaleProducts(dispatch, props.languageCode, props.currencyCode, page, th)
    })
  },

  siteSettingFun: (props, th) => {
    dispatch(async dispatch => {
      await settingCallFun(dispatch, props.settings)
      SplashScreen.hide()
    })
  },
  bannersCall: (props, th) => {
    dispatch(async dispatch => {
      await getBanners(dispatch, th)
    })
  },
  categoryCall: (props, th) => {
    dispatch(async dispatch => {
      await getCategories(dispatch, props.languageCode, props.currencyCode, 1, th)
    })
  },
  wishlistCall: (th) => {
    dispatch(async dispatch => {
      await getWishlist(dispatch, th)
    })
  }
})
const getUserData = (state) => state.userData.user

const getUserDataFun = createSelector(
  [getUserData],
  (getUserData) => {
    return getUserData
  }
)
/// ///////////////////////////////////////////////
const getSettings = (state) => state.settingsCall.settings
const getCurrency = (state) => state.appConfig.currencyCode
const getLanguageCode = (state) => state.appConfig.languageCode

const getCurrencyFun = createSelector(
  [getCurrency],
  (getCurrency) => {
    return getCurrency
  }
)
const getLanguageCodeFun = createSelector(
  [getLanguageCode],
  (getLanguageCode) => {
    return getLanguageCode
  }
)
const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
  }
)
const getTheme = (state) => state.appConfig.themeStyle
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  showIntro: state.appConfig.showIntro,
  settings: getSettingsFun(state),
  userData: getUserDataFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state)
})
/// //////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
})
