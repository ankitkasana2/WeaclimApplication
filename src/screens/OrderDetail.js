import React, { PureComponent } from 'react'
import { CardStyleInterpolators } from 'react-navigation-stack'
import {
  View,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
  Linking,
  Image
} from 'react-native'
import HTML from 'react-native-render-html'
import Spinner from 'react-native-loading-spinner-overlay'
import { createSelector } from 'reselect'
import CardOrderDetail from '../common/CardOrderDetail'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Text, Icon } from 'native-base'
import { getUrl, getHttp, putHttp } from '../common/WooComFetch'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import { appTextStyle } from '../common/Theme.style'
import { TouchableOpacity } from 'react-native-gesture-handler'
const WIDTH = Dimensions.get('window').width

class orderScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',
      headerTintColor: iconColor,
      headerStyle: {
        backgroundColor: colorProps,
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 6
      },
      headerForceInset: { top: 'never', vertical: 'never' },
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

  componentDidMount () {
    // alert("Hello");
    this.props.navigation.setParams({
      headerTitle: this.props.language['Order Detail'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
    this.getOrders()
  }

  constructor (props) {
    super(props)
    this.state = {
      order: {},
      spinnerTemp: true,
      orderTotal: 0
    }
    this.toast = null
  }
  /// //////////////

  getOrders = async () => {
    const url = 'orders/' + this.props.navigation.state.params.id
    const json = await getHttp(url, {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    })
    this.setState({
      order: json.data,
      spinnerTemp: false
    })
  }
  // ///

  cancelOrder = async () => {
    const orderCreateDate = new Date(
      this.state.order.date_created
    )
    const orderSeconds = orderCreateDate.getTime() / 1000
    const timeknow = new Date()
    const currentTime = timeknow.getTime() / 1000

    const timeToCancelOrder = parseInt(this.props.settings.cancel_order_hours) * 3600
    const timeDiff = currentTime - orderSeconds
    const result = timeToCancelOrder - timeDiff

    if (result < 0) this.toast.show('Order Cancelation Time Expires!')
    else {
      const dat = {
        status: 'cancelled'
      }
      const json = await putHttp('customers/' + this.state.order.id, dat)
      this.toast.show('Order Cancelled')
    }
  }

  ///

  getTrackingId () {
    let id = ''
    for (const v of this.state.order.meta_data) {
      if (v.key === '_aftership_tracking_number') {
        id = v.value
      }
    }
    return id
  }

  //= ===========================================================================================
  // placing order
  singleRow2 = (text, value) => (
    <View style={styles.priceRow}>
      <Text style={[styles.priceText, {
        color: this.props.themeStyle.textColor,
        fontSize: appTextStyle.largeSize + 1
      }]}>
        {text}
      </Text>

      <View style={{ flexDirection: 'row', paddingRight: 0 }}>

        <Text style={[styles.priceText, {
          color: this.props.themeStyle.textColor,
          fontSize: appTextStyle.largeSize + 1

        }]}>
          {value}
        </Text>
      </View>
    </View>
  )
  // <Text style={[styles.priceText, {
  //   color: this.props.themeStyle.textColor,
  //   fontSize: appTextStyle.largeSize + 1

  // }]}>
  //   {this.props.settings.currency_symbol}
  // </Text>
  // <HTML
  // html={this.props.settings.currency_symbol}
  // baseFontStyle={{
  //   fontSize: appTextStyle.smallSize + 3,
  //   color: this.props.themeStyle.primary,
  //   fontWeight: 'bold'
  // }}></HTML>
  singleRow (name, address, body, postcode) {
    return (
      <View
        style={[styles.cardView, {
          backgroundColor: this.props.themeStyle.primaryBackgroundColor,
          borderWidth: 1,
          borderColor: this.props.themeStyle.primary
        }]}>

        <FontAwesome
          name={'map-marker'}
          style={{
            color: this.props.themeStyle.iconPrimaryColor,
            fontSize: appTextStyle.largeSize + 22,
            paddingRight: 22
          }}
        />
        <View style={{ paddingHorizontal: 5 }}>

          <Text style={[{
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize
          }]}>
            {name}   </Text>
          <Text style={[{
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize,
            paddingVertical: 2
          }]}>
            {address}   </Text>
          <Text style={[{
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize
          }]}>
            {body}   </Text>
          <Text style={[{
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize,
            paddingVertical: 2
          }]}>
            {postcode}   </Text>
        </View>

      </View>
    )
  }

  spaceBetweenElement = (heading, text) => (
    <View
      style={{
        flexDirection: 'row',
        padding: 14,
        width: WIDTH,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Text
        style={{
          color: this.props.themeStyle.textColor,
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.largeSize + 2,
          paddingTop: 1
        }}>
        {heading}
      </Text>

      <Text
        style={{
          color: 'red',
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.largeSize + 2,
          paddingTop: 1
        }}>
        {text}
      </Text>
    </View>
  )

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>
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
            color: this.props.themeStyle.primary
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
            marginBottom: 30
          }}>

          {
            this.state.order.line_items !== undefined
              ? this.state.order.line_items.length > 0

                ? this.state.order.line_items.map((data, key) => (
                  <CardOrderDetail
                    key={key}
                    indexValue={key}
                    th={this}
                    language={this.props.language}
                    data={data}
                    themeStyle={this.props.themeStyle}
                    settings={this.props.settings}
                    currencySymbol={"₹"}
                  >

                  </CardOrderDetail>
                ))
                : null : null}

          <View style={{ marginTop: 4 }} />
          {this.state.order.shipping !== undefined
            ? this.singleRow(
              this.state.order.shipping.first_name + ' ' + this.state.order.shipping.last_name,
              this.state.order.shipping.country, this.state.order.shipping.address_1,
              this.state.order.shipping.city + ' ' + this.state.order.shipping.postcode
            ) : null}

          {this.state.order.billing !== undefined
            ? this.singleRow(
              this.state.order.billing.first_name + ' ' + this.state.order.billing.last_name,
              this.state.order.billing.country,
              this.state.order.billing.address_1, this.state.order.billing.city + ' ' + this.state.order.billing.postcode
            ) : null}

          {
            this.state.order.coupon_lines !== undefined
              ? this.state.order.coupon_lines.map((value) => (
                this.singleRow2(this.props.language['Coupons Applied'], value.code + ' ' + value.discount)
              )) : null}

          {this.state.order.total !== undefined
            ? <View style={[styles.viewContainer, {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              borderColor: this.props.themeStyle.primary
            }]}>

              {/* {this.state.order.payment_method !== undefined
                ? this.singleRow2(this.props.language['Payment Method'], this.state.order.payment_method_title) : null}
              {this.state.order.payment_method !== undefined
                ? this.singleRow2(this.props.language['Shipping Method'], this.state.order.shipping_lines[0].method_title) : null} */}

              {
                this.state.order.total_tax !== undefined && this.state.order.total_tax !== null
                  ? this.singleRow2(this.props.language.Tax, this.state.order.total_tax + this.state.order.currency)
                  : null}
              {

                this.state.order.shipping_total !== undefined && this.state.order.shipping_total !== null

                  ? this.singleRow2(this.props.language.EstimatedShiping, this.state.order.shipping_total + this.state.order.currency)
                  : this.singleRow2(this.props.language.EstimatedShiping, '0.00')}

              <View style={{ marginVertical: 5 }} />
              {this.singleRow2(this.props.language.OrderTotal, this.state.order.total + this.state.order.currency)}
            </View>
            : null}

          {
            this.state.order.status !== undefined &&
            this.state.order.status !== 'cancelled' &&
          this.state.order.status !== 'completed' &&
          this.state.order.status !== 'refunded' &&
          this.state.order.status !== 'failed' &&
          this.state.order.status !== 'processing' ? (
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    // this.cancelOrder()
                    this.props.navigation.navigate('Home1Screen')
                  }}>
                  <View
                    style={{
                      borderColor: this.props.themeStyle.primaryBackgroundColor,
                      alignItems: 'center',
                      height: 38,
                      backgroundColor: '#e02727',
                      flexDirection: 'row',
                      padding: 6,
                      width: '96%',
                      alignSelf: 'center',
                      margin: 7,
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.mediumSize,
                        paddingTop: 1,
                        fontWeight: '500'
                      }}>
                      {/* {this.props.language['Cancel Order']} */}
                      {this.props.language['Close']}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

          { this.state.order.meta_data !== undefined && this.getTrackingId() !== ''

            ? <TouchableOpacity
              style={{}}
              onPress={() => {
                Linking.canOpenURL(this.props.settings.tracking_url + this.getTrackingId())
                  .then(supported => {
                    if (!supported) {
                    } else {
                      return Linking.openURL(
                        this.props.settings.tracking_url +
                          this.getTrackingId()
                      )
                    }
                  })
                  .catch(err => console.log('An error occurred', err))
              }}
              disabled={this.state.addToCartButtonValue}>
              <View
                style={{
                  borderColor: this.props.themeStyle.primaryBackgroundColor,
                  alignItems: 'center',
                  height: 38,

                  backgroundColor: '#557f5f',
                  flexDirection: 'row',
                  padding: 4,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    color: this.props.themeStyle.textTintColor,
                    fontSize: appTextStyle.mediumSize,
                    paddingTop: 1
                  }}>
                  {this.props.language['Track Order']}
                </Text>
                <Icon
                  name={'locate'}
                  style={{
                    color: this.props.themeStyle.textTintColor,
                    fontSize: appTextStyle.mediumSize,
                    paddingLeft: 5
                  }}
                />
              </View>
            </TouchableOpacity> : null }
            
        </ScrollView>
        
        {/* <View style={{bottom:30,alignItems: 'center',
                      height: 38,
                      backgroundColor: 'skyblue',
                      flexDirection: 'row',
                      padding: 6,
                      width: '96%',
                      alignSelf: 'center',
                      margin: 7,
                      justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home1Screen')} >
          <Text style={{fontSize:15,textAlign:'center',padding:8,fontWeight:'bold'}}>Go To Home</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      
    )
  }
}

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
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
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
const getcurrencySymbol = (state) => state.appConfig.currencySymbol
const getcurrencySymbolFun = createSelector(
  [getcurrencySymbol],
  (getcurrencySymbol) => {
    return getcurrencySymbol
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  settings: getSettingsFun(state),
  language: getLanguageFun(state),
  currencySymbol: getcurrencySymbolFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state)

})
const styles = StyleSheet.create({
  cardView: {
    marginBottom: 5,
    width: WIDTH * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 8
  },
  viewContainer: {
    paddingVertical: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'center',
    width: WIDTH * 0.92,
    marginTop: 8
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    paddingVertical: 4
  },
  priceText: {
    paddingRight: 6,
    alignSelf: 'flex-start',
    fontFamily: appTextStyle.fontFamily,
    textAlign: 'left'
  }
})
export default connect(mapStateToProps, null)(orderScreen)
