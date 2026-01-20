import React, { Component } from 'react'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { connect } from 'react-redux'
import { View, Dimensions, I18nManager, Platform } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'
import WebView from 'react-native-webview'
import { NavigationEvents } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import { Icon } from 'native-base'
import { createSelector } from 'reselect'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import { getCartProductsQuantity } from '../redux/actions/actions'
import Toast from 'react-native-easy-toast'
import { postFetchHttp, postHttp } from '../common/WooComFetch'

class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const backButton2 = navigation.getParam('backButton')
    const props = navigation.getParam('props1')
    const webViewState = navigation.getParam('webViewState')
    const iconColor = navigation.getParam('iconColor')
    const colorProps = navigation.getParam('colorProps')

    const headerTitle2 = navigation.getParam('headerTitle')
    return {
      headerTitle: headerTitle2,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleAlign: 'center',
      headerTintColor: iconColor,
      headerStyle: {
        backgroundColor: colorProps
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      headerLeft: () => (
        <Icon
          onPress={() => {
            if (props !== undefined) {
              if (webViewState.canGoBack) {
                backButton2.goBack()
              } else {
                props.props.navigation.pop()
              }
            }
          }}
          name={!I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
          style={{
            color: iconColor,
            fontSize: 25,
            padding: 5,
            paddingLeft: 16,
            paddingRight: 16,
            marginRight: 16
          }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          // style={{backgroundColor:'red'}}
          onPress={() => navigation.navigate('Home1Screen')}>
          <Image
          style={{width:25,height:25,tintColor:'black',marginRight:10}}
          source={require('../images/homeicon3.png')}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      uri: '',
      spinnerTemp: true,
      canGoBack: false
    }
    this.toast = null
  }

  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language[
        'Place Your Order'
      ],
      props1: this,
      backButton: this.webview,
      iconColor: this.props.themeStyle.textColor,
      colorProps: this.props.themeStyle.primaryBackgroundColor

    })
    this.onePageCheckOut()
  }

  getProducts () {
    var data = []
    for (const v of this.props.cartProductsArray) {
      var obj = { quantity: v.quantity, product_id: v.product_id, total: v.total.toString(), price: v.price.toString() }
      if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id })
      data.push(obj)
    }
    return data
  }

  getCoupons = globalObject => {
    const data = []
    for (const v of globalObject) {
      data.push({ code: v.code, discount: v.amount })
    }
    return data
  }

  onePageCheckOut = async () => {
    var data = {}
    if (Object.keys(this.props.userData).length > 0) { data.customer_id = this.props.userData.id } else { data.customer_id = 0 }
    if (Object.keys(this.props.userData).length > 0) { data.token = this.props.session } else { data.token = null }
    if (this.props.settings.one_page_checkout === '2') {
      data.payment_method = this.props.navigation.state.params.methodType
      data.payment_method_title = this.props.navigation.state.params.methodName
    }
    if (this.props.settings.one_page_checkout !== '1') {
      const billing = {
        first_name: this.props.addressData.delivery_first_name,
        last_name: this.props.addressData.delivery_last_name,        
        address_1: this.props.addressData.delivery_street_aadress,
        address_2: '',
        city: this.props.addressData.delivery_city,
        state: this.props.addressData.delivery_state.value,
        postcode: this.props.addressData.delivery_postcode,
        country: this.props.addressData.delivery_country.value,
        email: this.props.addressData.delivery_email,
        phone: this.props.addressData.delivery_phone
      }

      const shipping = {
        first_name: this.props.shippingAddress.shippingFirstName,
        last_name: this.props.shippingAddress.shippingLastName,       
        address_1: this.props.shippingAddress.shippingAddressOne,
        address_2: '',
        city: this.props.shippingAddress.shippingCity,
        state: this.props.shippingAddress.shippingSelectedState.value,
        postcode: this.props.shippingAddress.postcode,
        country: this.props.shippingAddress.shippingSelectedCountry.value
      }
    
      data.shipping_ids = this.props.shippingLines
      data.sameAddress = false
      data.billing = billing
      data.shipping = shipping
    }
    // data.products = this.getProducts()

    let line_items =[];
    this.props.cartProductsArray.map((item)=>{
      let obj = {};
      obj.product_id= item.product_id;
      obj.quantity = item.quantity;
       if(item.variation_id){
        obj.variation_id = item.variation_id || null;
       }
       line_items.push(obj);
    });
    data.line_items = line_items


    data.coupons = this.props.coupon
    data.customer_note = this.props.navigation.state.params.orderNote
    data.platform = ''
    data.one_page = true

    const json = await postHttp('orders',data);
    if(json.status == 'success')
    {
      this.props.navigation.navigate('ThankUScreen'); 
    }



    // const json = await postFetchHttp(ThemeStyle.url + '/wp-json/api/tc_settings/app_data_link',
    //   JSON.stringify(data))
    // if (json.status === 'success') {
    //   this.setState({
    //     uri: `${ThemeStyle.url}/mobile-checkout/?order_id=${json.data}`,
    //     spinnerTemp: false
    //   })
    // }
  }

  /// //////////////////////////////////////////////
  _onNavigationStateChange = webViewState => {
    if (webViewState.url.indexOf('/order-received/') !== -1) {
      this.props.getCartProductsQuantityFun(this)
      this.props.navigation.navigate('ThankUScreen')
    } else if (webViewState.url.indexOf('cancel_order=true') !== -1) {
      this.props.navigation.navigate('Cart')
    }

    this.props.navigation.setParams({
      backButton: this.webview,
      props1: this,
      webViewState
    })
    this.setState({
      canGoBack: webViewState.canGoBack,
      spinnerTemp: false
    })
  }

  /// ///////////////
  _refWebView = webview => {
    if (!webview) {
      return
    }
    this.webview = webview
  }

  /// /////////////////////////////////////////////////////
  render () {
    // <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />
    return this.state.uri === '' ? (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: this.props.themeStyle.secondryBackgroundColor
      }}>
        <Toast
          ref={ref => { this.toast = ref }}
          style={{ backgroundColor: this.props.themeStyle.iconPrimaryColor }}
          position='top'
          positionValue={400}
          fadeOutDuration={7000}
          textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.largeSize }}
        />
        <NavigationEvents
          onDidFocus={() => {
            this.setState({})
          }}
        />
        <UIActivityIndicator
          size={27}
          color={this.props.themeStyle.primary}
        />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.themeStyle.secondryBackgroundColor
        }}>
        <Toast
          ref={ref => { this.toast = ref }}
          style={{ backgroundColor: this.props.themeStyle.iconPrimaryColor }}
          position='top'
          positionValue={400}
          fadeOutDuration={7000}
          textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.largeSize }}
        />
        <Spinner visible={this.state.spinnerTemp} />
        <NavigationEvents
          onDidFocus={() => {
            this.setState({})
          }}
        />           


        <WebView
          ref={r => this._refWebView(r)}
          onLoadProgress={() => this.setState({ spinnerTemp: true })}
          onLoadEnd={() => this.setState({ spinnerTemp: false })}
          onNavigationStateChange={this._onNavigationStateChange}
          source={{ uri: this.state.uri }}
          style={{ marginTop: 0, flex: 1, width: Dimensions.get('window').width }}
        />
      </View>
    )
  }
}

const getTheme = (state) => state.appConfig.themeStyle
const getLanguage = (state) => state.appConfig.languageJson
const getUserData = (state) => state.userData.user
const getSession = (state) => state.userData.sessionId
const getSettings = (state) => state.settingsCall.settings
const addressData = (state) => state.shippingAddress.addressData
const shippingAddress = (state) => state.shippingAddress.shippingAddress
const shippingLines = (state) => state.shippingAddress.shipping_lines
const getCartArray = (state) => state.cartData.cartProductsArray
const getCoupon = (state) => state.cartData.coupon

const getSessionFun = createSelector(
  [getSession],
  (getSession) => {
    return getSession
  }
)
const getCouponFun = createSelector(
  [getCoupon],
  (getCoupon) => {
    return getCoupon
  }
)
const getCartArrayFun = createSelector(
  [getCartArray],
  (getCartArray) => {
    return getCartArray
  }
)
const shippingLinesFun = createSelector(
  [shippingLines],
  (shippingLines) => {
    return shippingLines
  }
)
const addressDataFun = createSelector(
  [addressData],
  (addressData) => {
    return addressData
  }
)
const shippingAddressFun = createSelector(
  [shippingAddress],
  (shippingAddress) => {
    return shippingAddress
  }
)

const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
  }
)
const getUserDataFun = createSelector(
  [getUserData],
  (getUserData) => {
    return getUserData
  }
)
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  settings: getSettingsFun(state),
  userData: getUserDataFun(state),
  shippingAddress: shippingAddressFun(state),
  addressData: addressDataFun(state),
  cartProductsArray: getCartArrayFun(state),
  shippingLines: shippingLinesFun(state),
  coupon: getCouponFun(state),
  session: getSessionFun(state)
})
const mapDispatchToProps = dispatch => ({
  getCartProductsQuantityFun: (th) => {
    dispatch(async dispatch => {
      await getCartProductsQuantity(dispatch, '', th,
        th.props.userData, false)
    })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen)
