/* eslint-disable no-useless-escape */
import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  I18nManager,
  Image
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { createSelector } from 'reselect'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import * as global from '../common/LocationData'
import { appTextStyle } from '../common/Theme.style'
import {
  getCountry,
  getStates,
  getAddress,
  REMOVE_SHIPPING_LINES,
  ADD_SHIPPING_LINES
} from '../redux/actions/actions'
import { getUrl, getHttp } from '../common/WooComFetch'
import PageIndicator from '../common/pageIndicator'
const WIDTH = Dimensions.get('window').width

class ShippingAddress extends PureComponent {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      headerForceInset: { top: 'never', vertical: 'never' },
      headerStyle: {
        backgroundColor: colorProps
      },
      headerTintColor: iconColor,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 2
      },
      headerTitleAlign: 'center',
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

  /// /////////////////////////////////////////////////////////
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language.Checkout,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
    // this.getPaymentMethods()
    this.getShippingZones()
  }

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {

      shippingLocations: [],
      shippingMethod: [],

      isModalVisible: false,
      countryModal: false,
      stateModal: false,
      firstName: '',
      lastName: '',
      countryArray: [],
      statesArray: [],
      selectedCountry: {
        country_id: 223,
        country_name: 'United States'
      },
      selectedState: '',
      addressOne: '',
      addressTwo: '',
      zip: '',
      stateValue: '',
      city: '',
      email: '',
      spinnerTemp: true,
      phone: '',
      paymentMethodsArray: []
    }
    this.toast = null
  }

  saveFun () {
    this.props.navigation.navigate('PaymentMethodScreen')
  }

  // ////////////////////////////////////

  //= ================================================================================================================================
  getShippingZones = async () => {
    const data = await getHttp('shipping/zones', {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    })
    this.getShippingLocations(data.data)
  }

  //= ================================================================================================================================
  getShippingLocations = async (array) => {
    var count = 0
    for (const v of array) {
      const data = await getHttp('shipping/zones/' + v.id + '/locations', {
        lang: this.props.languageCode,
        currency: this.props.currencyCode
      })
      count++
      const d = data.data
      for (const v2 of d) {
        this.state.shippingLocations.push(Object.assign(v2, { zoneId: v.id }))
      }
      if (array.length === count) { this.sortArray(this.state.shippingLocations) }
      // })
    }
  }

  //= ================================================================================================================================
  sortArray (array) {
    const tempArray = []
    for (const value of array) {
      if (value.type === 'postcode') { tempArray.push(value) }
    }
    for (const value of array) {
      if (value.type === 'state') { tempArray.push(value) }
    }
    for (const value of array) {
      if (value.type === 'country') { tempArray.push(value) }
    }
    for (const value of array) {
      if (value.type === 'continent') { tempArray.push(value) }
    }
    this.findZoneId(tempArray)
  }

  //= ================================================================================================================================
  findZoneId (array) {
    let zoneId = ''
    for (const value of array) {
      if (value.type === 'postcode') {
        if (this.matchPostCode(value)) {
          zoneId = value.zoneId
          break
        }
      } else if (value.type === 'state') {
        if (this.matchState(value)) {
          zoneId = value.zoneId
          break
        }
      } else if (value.type === 'country') {
        if (this.matchCountry(value)) {
          zoneId = value.zoneId
          break
        }
      } else if (value.type === 'continent') {
        if (this.matchContinent(value)) {
          zoneId = value.zoneId
          break
        }
      }
    }

    this.getShippingMethods(zoneId)
  }

  //= ================================================================================================================================
  matchPostCode (value) {
    const postcode = this.props.shippingAddress.postcode
    if (value.code.toUpperCase() === postcode.toUpperCase()) return true
    if (value.code.indexOf('*') > 0) {
      const ind = value.code.indexOf('*')
      const s1 = postcode.substring(0, ind - 1)
      const s2 = value.code.substring(0, ind - 1)

      if (s1.toUpperCase() === s2.toUpperCase()) {
        return true
      }
    }
    if (value.code.indexOf('.') > 0) {
      const i = value.code.indexOf('.')
      let min = value.code.substring(0, i)
      let max = value.code.substring(i + 3, value.code.length)

      min = parseInt(min)
      const p = parseInt(postcode)
      max = parseInt(max)

      if (p >= min && p <= max) {
        return true
      }
    }
  }

  //= ================================================================================================================================
  matchState (value) {
    const s = this.props.shippingAddress.shippingSelectedCountry.value + ':' + this.props.shippingAddress.shippingSelectedState.state
    if (s === value.code) {
      return true
    }
  }

  //= ================================================================================================================================
  matchCountry (value) {
    const s = this.props.shippingAddress.shippingSelectedCountry.value
    if (s === value.code) {
      return true
    }
  }

  //= ================================================================================================================================
  matchContinent (value) {
    const s = this.getContientCode(this.props.shippingAddress.shippingSelectedCountry.value)
    if (s === value.code) return true
  }

  getContientCode (con) {
    return global.data.continent[con]
  }

  //= ================================================================================================================================
  getShippingMethods = async (id) => {
    if (id === '') id = 0
    const data = await getHttp('shipping/zones/' + id + '/methods', {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    })
    this.setState({ shippingMethod: data.data, spinnerTemp: false })
  }

  setMethod (event) {
    const data = event
    this.props.removeShippingLinessCall()
    var s = {}
    if (data.method_id === 'flat_rate') {
      s = {
        ship_id: data.id,
        method_id: data.method_id,
        method_title: data.method_title,
        total: this.calculateFlatRate(data)
      }
    } else if (data.settings.cost) {
      let cal = (data.settings.cost.value).toString()
      if (cal === '') cal = '0'
      s = {
        ship_id: data.id,
        method_id: data.method_id,
        method_title: data.method_title,
        total: cal
      }
    } else {
      s = {
        ship_id: data.id,
        method_id: data.method_id,
        method_title: data.method_title,
        total: '0'
      }
    }
    this.props.shippingLinessCall(s)
    if (this.props.settings.one_page_checkout === '0') {
      this.props.navigation.push('WebViewScreen', {
      })
    } else {
      this.props.navigation.navigate('PaymentMethodScreen'
      )
    }
  }

  calculateFlatRate (data) {
    let cal = (data.settings.cost.value).toString()
    if (cal === '') cal = '0'
    return cal
  }

  // ////////////////////////////////////
  checkBoxComponent = (data, key) => (
    <View key={key} style={[styles.cardView, {
      backgroundColor: this.props.themeStyle.primaryBackgroundColor,
      borderWidth: 1,
      borderColor: this.props.themeStyle.primary
    }]}>

      <FontAwesome
        name={'map-marker'}
        style={{
          color: this.props.themeStyle.iconPrimaryColor,
          fontSize: appTextStyle.largeSize + 4,
          paddingRight: 22
        }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={[{
          fontFamily: appTextStyle.fontFamily,
          color: this.props.themeStyle.textColor,
          fontSize: appTextStyle.largeSize
        }]}>
          {data.method_title}
        </Text>
        {data.settings.cost !== undefined
          ? <Text style={[{
            fontFamily: appTextStyle.fontFamily,
            color: this.props.themeStyle.textColor,
            fontSize: appTextStyle.largeSize
          }]}>
            {' (' + this.props.currencySymbol + ' ' + data.settings.cost.value + ') '}
          </Text> : null }
      </View>

    </View>
  )

  /// //////
  render () {
    // alert(this.state.shippingMethod);
    return (
      <View style={{ flex: 1 }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
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

          <Spinner
            visible={this.state.spinnerTemp}
            textStyle={{
              backgroundColor: this.props.themeStyle.loadingIndicatorColor,
              color: this.props.themeStyle.primary
            }}
          />

          <View style={[styles.pageIndicatorStlye, {
            backgroundColor: this.props.themeStyle.primaryBackgroundColor,
            paddingTop: 30
          }]}>
            <PageIndicator th={this} selected={2}
              backgroundColor={this.props.themeStyle.primaryBackgroundColor
              }
              language={this.props.language} />
          </View>

          <Text style={[styles.headingText, {
            fontFamily: appTextStyle.fontFamily,
            color: this.props.themeStyle.textColor,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {this.props.language['Shipping Method']}
            
          </Text>
          
          {this.state.shippingMethod.map((data, key) => (
            <TouchableOpacity onPress={ () => {
              this.setMethod(data)
            }
            }
            key={key}
            >

              {this.checkBoxComponent(data, key)}
            </TouchableOpacity>
          ))}

        </ScrollView>
        <View style={{
          position: 'absolute',
          bottom: 15,

          width: WIDTH
        }}>

        </View>
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  removeShippingLinessCall: () => {
    dispatch({
      type: REMOVE_SHIPPING_LINES
    })
  },
  shippingLinessCall: (data) => {
    dispatch({
      type: ADD_SHIPPING_LINES,
      shipping_lines: data
    })
  },
  getAddressCall: (th) => {
    dispatch(async dispatch => {
      await getAddress(dispatch, th)
    })
  },
  getCountryCall: (th) => {
    dispatch(async dispatch => {
      await getCountry(dispatch, th)
    })
  },
  getStatesCall: (th, id) => {
    dispatch(async dispatch => {
      await getStates(dispatch, th, id)
    })
  }
})

const getTheme = (state) => state.appConfig.themeStyle
const getSessionId = (state) => state.userData.sessionId
const addressData = (state) => state.shippingAddress.addressData
const shippingAddress = (state) => state.shippingAddress.shippingAddress
const getcurrencySymbol = (state) => state.appConfig.currencySymbol

const getcurrencySymbolFun = createSelector(
  [getcurrencySymbol],
  (getcurrencySymbol) => {
    return getcurrencySymbol
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

const getSessionIdFun = createSelector(
  [getSessionId],
  (getSessionId) => {
    return getSessionId
  }
)
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const getLanguage = (state) => state.appConfig.languageJson
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
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  sessionId: getSessionIdFun(state),
  settings: getSettingsFun(state),
  shippingAddress: shippingAddressFun(state),
  addressData: addressDataFun(state),
  currencySymbol: getcurrencySymbolFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state)
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14
  },
  textInputStyle: {
    height: 46,
    width: '100%',
    borderColor: '#c0c0c0',
    borderBottomWidth: 1,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 19
  },
  stateCountryStyles: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: '#c0c0c0'
  },
  addAddressBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  pageIndicatorStlye: {
    width: WIDTH,
    paddingBottom: 40,
    paddingTop: 10
  },
  arrayElementRow: {
    flexDirection: 'row',
    width: WIDTH,
    justifyContent: 'space-between',
    padding: 10
  },
  textInputRow: {
    flexDirection: 'row'
  },
  headingText: {
    fontSize: appTextStyle.largeSize,
    paddingVertical: 15,
    width: WIDTH,
    textAlign: 'center'
  },
  cardView: {
    marginBottom: 9,
    width: WIDTH * 0.92,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    alignSelf: 'center'
  },
  addressText: {
    paddingTop: 4,
    paddingBottom: 1
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)
