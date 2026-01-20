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
import { appTextStyle } from '../common/Theme.style'
import {
  getCountry,
  getStates,
  getAddress
} from '../redux/actions/actions'
import { getUrl, getHttp } from '../common/WooComFetch'
import PageIndicator from '../common/pageIndicator'
import { data } from '../common/LocationData'
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
    this.getPaymentMethods()
  }

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
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
    this.props.navigation.navigate('OrderScreen')
  }

  getPaymentMethods = async () => {
    let url = 'payment_method'
    url += '?language_id=' + this.props.settings.language_id
    url += '&getDetail=1'
    url += '&currency=' + this.props.settings.currency_id

    const json = await getHttp('payment_gateways', {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    })
    if (json.status === 'success') {
      this.setState({
        paymentMethodsArray: json.data,
        spinnerTemp: false
      })
    } else {
      this.toast.show(json.data.message)
      this.setState({
        spinnerTemp: false
      })
    }
  }

  checkBoxComponent = (name, key) => (
    <View
      key={key}
      style={[styles.cardView, {
        backgroundColor: this.props.themeStyle.primaryBackgroundColor,
        borderColor: this.props.themeStyle.primary,
        borderWidth: 1
      }]}>

      <FontAwesome
        name={'map-marker'}
        style={{
          color: this.props.themeStyle.iconPrimaryColor,
          fontSize: appTextStyle.largeSize + 4,
          paddingRight: 22
        }}
      />

      <View>
        <Text style={[{
          fontFamily: appTextStyle.fontFamily,
          color: this.props.themeStyle.textColor,
          fontSize: appTextStyle.largeSize
        }]}>
          {name}
        </Text>
      </View>

    </View>
  )

  /// //////
  render () {
    // alert(JSON.stringify(data));
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
            <PageIndicator th={this} selected={3}
              backgroundColor={this.props.themeStyle.primaryBackgroundColor
              }
              language={this.props.language} />
          </View>

          <Text style={[styles.headingText, {
            fontFamily: appTextStyle.fontFamily,
            color: this.props.themeStyle.textColor,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {this.props.language['Payment Method']}
          </Text>

          {this.state.paymentMethodsArray.map((data, key) => (
            <View key={key} >
              {data.enabled
                ? <TouchableOpacity
                  key={key}
                  onPress={
                    () => this.props.navigation.navigate('OrderScreen', {
                      methodType: data.id,
                      methodName: data.title
                    })
                  }>
                  {this.checkBoxComponent(data.title, key)}
                </TouchableOpacity> : null }
            </View>
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
