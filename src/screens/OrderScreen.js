/* eslint-disable no-useless-escape */
import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  I18nManager,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Image
} from 'react-native'
import CartCard from '../common/CartCard'
import Button from '../common/Button'
import Spinner from 'react-native-loading-spinner-overlay'
import { createSelector } from 'reselect'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import {
  getCountry,
  getStates,
  getAddress,
  placeOrderFun,
  deleteProductFromCart,
  deleteAllProductFromCart
} from '../redux/actions/actions'
import PageIndicator from '../common/pageIndicator'
import { postFetchHttp, postHttp } from '../common/WooComFetch'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

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
        backgroundColor: colorProps,
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0
      },
      headerTintColor: iconColor,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 6
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          // style={{backgroundColor:'red'}}
          onPress={() => navigation.navigate('Home1Screen')}>
          <Image
            style={{ width: 25, height: 25, tintColor: 'black', marginRight: 10 }}
            source={require('../images/homeicon3.png')}
          />
        </TouchableOpacity>
      )
    }
  }

  /// /////////////////////////////////////////////////////////
 async componentDidMount() {
    // alert(JSON.stringify(this.props.cartProductsArray[0].product_id));

    const productIds = await this.props.cartProductsArray.map(product => product.product_id);
    this.setState({productsIDS:  productIds });
  

    this.props.navigation.setParams({
      headerTitle: this.props.language.ReviewOrder,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  /// //////////////////////////////////////////////////////////
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      countryModal: false,
      stateModal: false,
      firstName: '',
      lastName: '',
      countryArray: [],
      statesArray: [],
      cvc: '',
      monthArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      yearArray: ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'],
      cardNumber: '',
      selectedCountry: {
        country_id: 223,
        country_name: 'United States'
      },
      selectedState: '',
      expireMonth: '12',
      expireYear: '2021',
      isMonthSelected: true,
      addressOne: '',
      addressTwo: '',
      zip: '',
      stateValue: '',
      city: '',
      email: '',
      spinnerTemp: true,
      phone: '',
      modalVisibleSubCategory: false,
      tax: 0,
      customerNotes: '',
      productsIDS: []
    }
    this.toast = null
    this.calculateTax()
  }

  calculateTax = async () => {
    const billing = {
      first_name: this.props.addressData.delivery_first_name,
      last_name: this.props.addressData.delivery_last_name,
      company: 'null',
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
      company: 'null',
      address_1: this.props.shippingAddress.shippingAddressOne,
      address_2: '',
      city: this.props.shippingAddress.shippingCity,
      state: this.props.shippingAddress.shippingSelectedState.value,
      postcode: this.props.shippingAddress.postcode,
      country: this.props.shippingAddress.shippingSelectedCountry.value
    }

    var data = {
      billing: billing,
      shipping: shipping,
      products: this.getProducts(),
      // shipping_ids: this.props.shippingLines
    }
    const json = await postFetchHttp(ThemeStyle.url + '/wp-json/api/tc_settings/app_get_tax', data)

    let res = 0
    if (json.status === 'success') {
      if (json.data.result !== undefined) { res = json.data.result }
    } else if (json.status === 'error') {
      res = 0
    }
    this.setState({ tax: res, spinnerTemp: false })
    // });
  }

  getProducts() {
    var data = []
    for (const v of this.props.cartProductsArray) {
      var obj = { quantity: v.quantity, product_id: v.product_id, total: v.total.toString(), price: v.price.toString() }
      if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id })
      data.push(obj)
    }
    return data
  }

  singleRow = (text, value, isSign) => (
    <View style={styles.priceRow}>
      <Text style={[styles.priceText, {
        color: this.props.themeStyle.textColor,
        fontFamily: appTextStyle.fontFamily,
        fontSize: appTextStyle.largeSize + 1,
        fontWeight: '600'
      }]}>
        {text}
      </Text>
      <View style={{ flexDirection: 'row', paddingRight: 0 }}>
        {!isSign
          ? <Text style={[styles.priceText, {
            // color: this.props.themeStyle.textColor,
            color: "#01010",
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize + 1,
            fontWeight: "700"

          }]}>
            {/* {this.props.currencySymbol} */}
            ₹
          </Text> : null}
        <Text style={[styles.priceText, {
          color: this.props.themeStyle.textColor,
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.largeSize + 1

        }]}>
          {value}
        </Text>
      </View>
    </View>
  )

  saveFun = async (productsIDS) => {
    // alert(productsIDS)
    // alert(this.props.cartSubTotalFloat)
    // alert(JSON.stringify(this.props.navigation.state.params))

    // alert(this.props.navigate.state.params.product_id)
    var data = {}
    // if (Object.keys(this.props.userData).length > 0) { data.customer_id = this.props.userData.id } else { data.customer_id = 0 }
    // if (Object.keys(this.props.userData).length > 0) { data.token = this.props.session } else { data.token = null }
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

    let line_items = [];
    this.props.cartProductsArray.map((item) => {
      let obj = {};
      obj.product_id = item.product_id;
      obj.quantity = item.quantity;
      if (item.variation_id) {
        obj.variation_id = item.variation_id || null;
      }
      line_items.push(obj);
    });
    data.line_items = line_items


    data.coupons = this.props.coupon
    data.customer_note = this.props.navigation.state.params.orderNote
    data.platform = ''
    data.one_page = true

    const json = await postHttp('orders', data);
    // alert(JSON.stringify(this.props.cartProductsArray.length))
    if (json.status == 'success') {

      await this.props.cartProductsArray.map(async(data) => {
        // alert(JSON.stringify(data))
         await this.props.deleteProductFromCartCall(
          data.cart_id,
          this.props.sessionId,
          data.product_combination_id,
          data.quantity,
          this,
          data.product_id,
        )
      
      });
      if(this.props.cartProductsArray.length > 0){
        await this.props.cartProductsArray.map(async(data) => {
          // alert(JSON.stringify(data))
           await this.props.deleteProductFromCartCall(
            data.cart_id,
            this.props.sessionId,
            data.product_combination_id,
            data.quantity,
            this,
            data.product_id,
          )
        
        });
      }
      console.log("productsIDS",productsIDS);
      // console.log("cartProductsArray",this.props.cartProductsArray)
      // this.props.navigation.navigate('Payment', { orderid: json.data.id })
      this.props.navigation.navigate('Payment', { 
        orderid: json.data.id,
        productsIDS: productsIDS
    });

    }
    // })
  }

  openLink = async () => {
    const url = 'https://weaclimsolutions.com/?hweorders=12';

    // Check if the device can open the given URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  setModalVisible = visible => {
    this.setState({ modalVisibleSubCategory: visible })
  }

  monthYearList = (arr, selection) => (
    <ScrollView>

      {arr.map((val, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.modalText,
            backgroundColor: this.props.themeStyle.backgroundColor,
            padding: 8,
            width: WIDTH * 0.5
          }}
          onPress={() => {
            selection === 'month'
              ? this.setState({
                expireMonth: val,
                modalVisibleSubCategory: false
              })
              : this.setState({
                expireYear: val,
                modalVisibleSubCategory: false
              })
          }}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.textStyle,
              {
                padding: 5,
                textAlign: 'center',
                fontFamily: appTextStyle.fontFamily,
                color: this.props.themeStyle.textColor
              }
            ]}>
            {val}
          </Text>
        </TouchableOpacity>
      ))}

    </ScrollView>
  )

  calculateDiscount() {
    return this.props.cartTotalFloat - this.props.cartSubTotalFloat
  };

  calculateTotal() {
    return (this.props.cartTotalFloat + this.state.tax);
  };

  addressFun = (heading, countryName, address, city, postcode) => (
    <View
      style={[styles.cardView, {
        backgroundColor: this.props.themeStyle.primaryBackgroundColor,
        borderColor: this.props.themeStyle.primary
      }]}>

      <FontAwesome
        name={'map-marker'}
        style={{
          color: this.props.themeStyle.iconPrimaryColor,
          fontSize: appTextStyle.largeSize + 12,
          paddingRight: 22
        }}
      />

      <View>
        <Text style={[{
          color: this.props.themeStyle.textColor,
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.largeSize
        }]}>
          {heading}
        </Text>
        <Text style={[styles.addressText, {
          color: this.props.themeStyle.iconPrimaryColor,
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.mediumSize
        }]}>
          {countryName}
        </Text>
        <Text style={[styles.addressText, {
          color: this.props.themeStyle.iconPrimaryColor,
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.mediumSize
        }]}>
          {address + ' ' + city + ' ' + postcode}
        </Text>

      </View>

    </View>

  )

  /// //////
  render() {
    // alert(JSON.stringify(this.state.productsIDS))
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

          <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisibleSubCategory}
            onRequestClose={() => { this.setModalVisible(!this.state.modalVisibleSubCategory) }}
            style={{
              backgroundColor: this.props.themeStyle.secondryBackgroundColor,
              flex: 1
            }}>
            <TouchableWithoutFeedback onPress={() => this.setModalVisible(!this.state.modalVisibleSubCategory)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setModalVisible(!this.state.modalVisibleSubCategory)
              }}
              style={{ flex: 1, backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>
              <View
                style={[
                  styles.centeredView,
                  {
                    flexDirection: 'column',
                    alignItems: 'center',
                    top:
                      Platform.OS === 'ios' ? HEIGHT * 0.218 : HEIGHT * 0.117,
                    left: WIDTH * 0.01
                  }
                ]}>
                <View style={[styles.modalView, {
                  backgroundColor: this.props.themeStyle.secondryBackgroundColor
                }]}>

                  {this.monthYearList(this.state.isMonthSelected
                    ? this.state.monthArray : this.state.yearArray,
                    this.state.isMonthSelected
                      ? 'month' : 'year')}

                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View style={[styles.pageIndicatorStlye, {
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
            paddingTop: 30
          }]}>
            <PageIndicator th={this} selected={4}
              backgroundColor={this.props.themeStyle.secondryBackgroundColor
              }
              language={this.props.language} />
          </View>

          {this.props.cartProductsArray.length > 0

            ? this.props.cartProductsArray.map((data, index) => (
              // this.cartCard(data)
              <CartCard
                key={index}
                index={index}
                th={this}
                deleteProductFromCartCall={this.props.deleteProductFromCartCall}
                language={this.props.language}
                data={data}
                themeStyle={this.props.themeStyle}
                sessionId={this.props.sessionId}
                settings={this.props.settings}>

              </CartCard>
            ))
            : null}

          {this.addressFun(this.props.language['Shipping Address'], this.props.addressData.delivery_country.name, this.props.addressData.delivery_street_aadress, this.props.addressData.delivery_city, this.props.addressData.delivery_postcode)}
          {this.addressFun(this.props.language['Billing Address'], this.props.shippingAddress.shippingSelectedCountry.name, this.props.shippingAddress.shippingAddressOne, this.props.shippingAddress.shippingCity, this.props.shippingAddress.postcode)}

          <View
            style={{
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              justifyContent: 'space-between',
              borderColor: this.props.themeStyle.primary,
              borderWidth: 1,
              marginTop: 10,
              marginBottom: 19,
              width: WIDTH * 0.92,
              borderRadius: appTextStyle.customRadius - 10,
              alignSelf: 'center'
            }}>

            <Text
              style={{
                padding: 10,
                fontSize: appTextStyle.largeSize,
                fontWeight: '500',
                borderRadius: appTextStyle.customRadius - 10
              }}>
              {this.props.language['Order Notes']}
            </Text>
            <TextInput
              style={{
                marginTop: 2,
                height: 60,
                width: '97%',
                borderColor: this.props.themeStyle.primary,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                borderWidth: 1,
                margin: 6,
                paddingLeft: 6,
                fontSize: appTextStyle.mediumSize,
                color: this.props.themeStyle.textColor,
                borderRadius: appTextStyle.customRadius - 11,
                textAlignVertical: 'top',
                alignItems: 'flex-start'
              }}
              editable={true}
              multiline={true}
              numberOfLines={5}
              placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
              selectionColor={this.props.themeStyle.iconPrimaryColor}
              placeholder={`  ${this.props.language['Note to the buyer']}`}
              onChangeText={customerNotes => {
                this.setState({ customerNotes, errorMessage: '' })
              }}
              value={this.state.customerNotes}
            />

            {/* ///////////////////////////////// */}
          </View>

          <View style={[styles.viewContainer, {
            backgroundColor: this.props.themeStyle.primaryBackgroundColor,
            borderColor: this.props.themeStyle.primary
          }]}>
            {this.singleRow(this.props.language['Payment Method'], this.props.navigation.state.params.methodName, true)}
            {/* {this.singleRow(this.props.language['Payment Method'], this.props.shippingLines[0].method_title, true)} */}

            {this.singleRow(this.props.language.SubTotal, this.props.cartSubTotalFloat)}
            {this.singleRow(this.props.language.Discount, this.props.cartDiscountFloat)}
            {/* {this.singleRow(this.props.language.EstimatedShiping, this.props.shippingLines[0].total)} */}
            {this.singleRow(this.props.language.Tax, this.state.tax)}
            <View style={{ marginVertical: 5 }} />
            {this.singleRow(this.props.language.OrderTotal, this.calculateTotal())}
          </View>

          {this.props.navigation.state.params.method === 'Stripe'
            ? <View style={[styles.viewContainer, {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              borderColor: this.props.themeStyle.primary
            }]}>

              <Text style={{
                fontFamily: appTextStyle.fontFamily,
                color: this.props.themeStyle.textColor,
                fontSize: appTextStyle.largeSize + 2,
                alignSelf: 'center'
              }}>{this.props.language['Stripe Payment']}</Text>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>

                <Text style={[styles.cardTextHeading, {
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor,
                  fontSize: appTextStyle.largeSize
                }]}>{this.props.language['Card Number']}</Text>

                <TextInput
                  style={[styles.textInputStyle, {
                    color: this.props.themeStyle.textColor,
                    borderColor: this.props.themeStyle.primary,
                    backgroundColor: this.props.themeStyle.secondryBackgroundColor
                  }]}
                  placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
                  selectionColor={this.props.themeStyle.iconPrimaryColor}
                  placeholder={
                    this.props.language['Card Number']
                  }
                  onChangeText={cardNumber =>
                    this.setState({ cardNumber, errorMessageSignUp: '' })
                  }
                  value={this.state.cardNumber}
                />
              </View>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>

                <Text style={[styles.cardTextHeading, {
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor,
                  fontSize: appTextStyle.largeSize
                }]}>{this.props.language['Expire Month']}</Text>

                <TouchableOpacity onPress={() => {
                  this.setState({
                    modalVisibleSubCategory: true,
                    isMonthSelected: true
                  })
                }} style={[styles.selectedView, {
                  borderColor: this.props.themeStyle.primary
                }]}>

                  <Text style={{ color: this.props.themeStyle.textColor }}>
                    {this.state.expireMonth}
                  </Text>

                  <FontAwesome
                    name={'chevron-down'
                    }
                    style={[styles.downIcon, {
                      color: this.props.themeStyle.textColor
                    }]}
                  />
                </TouchableOpacity>
              </View>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>

                <Text style={[styles.cardTextHeading, {
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor,
                  fontSize: appTextStyle.largeSize
                }]}>{this.props.language['Expire Year']}</Text>

                <TouchableOpacity onPress={() => {
                  this.setState({
                    modalVisibleSubCategory: true,
                    isMonthSelected: false
                  })
                }} style={[styles.selectedView, {
                  borderColor: this.props.themeStyle.primary
                }]}>

                  <Text style={{ color: this.props.themeStyle.textColor }}>
                    {this.state.expireYear}
                  </Text>

                  <FontAwesome
                    name={'chevron-down'
                    }
                    style={[styles.downIcon, {
                      color: this.props.themeStyle.textColor
                    }]}
                  />
                </TouchableOpacity>
              </View>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>

                <Text style={[styles.cardTextHeading, {
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor,
                  fontSize: appTextStyle.largeSize
                }]}>{this.props.language.Cvc}</Text>

                <TextInput
                  style={[styles.textInputStyle, {
                    color: this.props.themeStyle.textColor,
                    borderColor: this.props.themeStyle.primary,
                    backgroundColor: this.props.themeStyle.secondryBackgroundColor
                  }]}
                  placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
                  selectionColor={this.props.themeStyle.iconPrimaryColor}
                  placeholder={
                    this.props.language.Cvc
                  }
                  onChangeText={cvc =>
                    this.setState({ cvc, errorMessageSignUp: '' })
                  }
                  value={this.state.cvc}
                />
              </View>

            </View>
            : null}
          <View style={{
            width: WIDTH,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
            height: HEIGHT * 0.16,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 5,
            paddingBottom: 20
          }}>
            <Button onPress={() => { this.saveFun(this.state.productsIDS) }}
              borderRadius={true}
              disable={true} themeStyle={this.props.themeStyle}
              navigation={this.props.navigation}
              title={this.props.language.PlaceOrder}
            ></Button>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({

  getCountryCall: (th) => {
    dispatch(async dispatch => {
      await getCountry(dispatch, th)
    })
  },
  getStatesCall: (th, id) => {
    dispatch(async dispatch => {
      await getStates(dispatch, th, id)
    })
  },
  placeOrderCall: (th, data, sessionId, method, obj) => {
    dispatch(async dispatch => {
      await placeOrderFun(dispatch, data, sessionId, th, method, obj)
    })
  },
  deleteProductFromCartCall: (id, sessionId, combinationId, qty, th) => {
    dispatch(async dispatch => {
      await deleteAllProductFromCart(dispatch, id, sessionId, combinationId, qty, th, th.props.languageCode,
        th.props.currencyCode)
    })
  },


})

const getTheme = (state) => state.appConfig.themeStyle
const getSessionId = (state) => state.userData.sessionId
const getCartArray = (state) => state.cartData.cartProductsArray
const getSettings = (state) => state.settingsCall.settings

const cartSubTotalFloatFun = (state) => state.cartData.cartSubTotalFloat
const cartDiscountFloatFun = (state) => state.cartData.cartDiscountFloat
const cartShippingFloatFun = (state) => state.cartData.cartShippingFloat
const cartTaxFloatFun = (state) => state.cartData.cartTaxFloat
const cartTotalFloatFun = (state) => state.cartData.cartTotalFloat

const cartSubTotalFloatState = createSelector(
  [cartSubTotalFloatFun],
  (cartSubTotalFloatFun) => {
    return cartSubTotalFloatFun
  }
)
const cartDiscountFloatState = createSelector(
  [cartDiscountFloatFun],
  (cartDiscountFloatFun) => {
    return cartDiscountFloatFun
  }
)
const cartShippingFloatState = createSelector(
  [cartShippingFloatFun],
  (cartShippingFloatFun) => {
    return cartShippingFloatFun
  }
)
const cartTaxFloatState = createSelector(
  [cartTaxFloatFun],
  (cartTaxFloatFun) => {
    return cartTaxFloatFun
  }
)
const cartTotalFloatState = createSelector(
  [cartTotalFloatFun],
  (cartTotalFloatFun) => {
    return cartTotalFloatFun
  }
)

const getCartArrayFun = createSelector(
  [getCartArray],
  (getCartArray) => {
    return getCartArray
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
const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
  }
)
const getLanguage = (state) => state.appConfig.languageJson
const getAddressData = (state) => state.shippingAddress.addressData
const getcurrencySymbol = (state) => state.appConfig.currencySymbol
const addressData = (state) => state.shippingAddress.addressData
const shippingAddress = (state) => state.shippingAddress.shippingAddress
// const shippingLines = (state) => state.shippingAddress.shipping_lines

// const shippingLinesFun = createSelector(
//   [shippingLines],
//   (shippingLines) => {
//     return shippingLines
//   }
// )

const getcurrencySymbolFun = createSelector(
  [getcurrencySymbol],
  (getcurrencySymbol) => {
    return getcurrencySymbol
  }
)

const getgetAddressDataFun = createSelector(
  [getAddressData],
  (getAddressData) => {
    return getAddressData
  }
)
const shippingAddressFun = createSelector(
  [shippingAddress],
  (shippingAddress) => {
    return shippingAddress
  }
)
const addressDataFun = createSelector(
  [addressData],
  (addressData) => {
    return addressData
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
  cartProductsArray: getCartArrayFun(state),
  settings: getSettingsFun(state),
  cartSubTotalFloat: cartSubTotalFloatState(state),
  cartDiscountFloat: cartDiscountFloatState(state),
  cartShippingFloat: cartShippingFloatState(state),
  cartTaxFloat: cartTaxFloatState(state),
  cartTotalFloat: cartTotalFloatState(state),
  getAddressData: getgetAddressDataFun(state),
  currencySymbol: getcurrencySymbolFun(state),
  shippingAddress: shippingAddressFun(state),
  addressData: addressDataFun(state),
  // shippingLines: shippingLinesFun(state)

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
  downIcon: {
    paddingRight: 12,
    paddingLeft: 12,
    fontSize: 10
  },
  selectedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH * 0.85,
    padding: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: appTextStyle.customRadius - 12

  },
  modalText: {
    marginBottom: 0,
    textAlign: 'center'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  modalView: {
    margin: 20,
    borderRadius: appTextStyle.customRadius - 15,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: HEIGHT * 0.5
  },
  cardTextHeading: {
    alignSelf: 'flex-start',
    padding: 15,
    paddingBottom: 8
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingVertical: 4
  },
  priceText: {
    paddingRight: 6,
    alignSelf: 'flex-start',
    textAlign: 'left'
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
  viewContainer: {
    paddingVertical: 9,
    width: WIDTH * 0.93,
    borderRadius: appTextStyle.customRadius - 10,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 1
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
  textInputStyle: {
    height: 38,
    width: WIDTH * 0.85,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 12,
    fontSize: appTextStyle.mediumSize + 1,
    borderRadius: appTextStyle.customRadius - 12,
    borderWidth: 1
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
    marginVertical: 14,
    width: WIDTH * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 19,
    borderRadius: appTextStyle.customRadius - 10,
    alignSelf: 'center',
    borderWidth: 1
  },
  addressText: {
    paddingTop: 4,
    paddingBottom: 1
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)
