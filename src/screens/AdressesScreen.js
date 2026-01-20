/* eslint-disable no-useless-escape */
import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  I18nManager
} from 'react-native'
import * as global from '../common/LocationData'
import { putHttp } from '../common/WooComFetch'
import Button from '../common/Button'
import Spinner from 'react-native-loading-spinner-overlay'
import { createSelector } from 'reselect'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import { appTextStyle } from '../common/Theme.style'
import {
  getCountry,
  getStates,
  getAddress,
  addAddressValue,
  REGISTER_USER
} from '../redux/actions/actions'
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
      headerTitle: this.props.language.Payment,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      billingFirstName: this.props.userData.billing.first_name,
      billingLastName: this.props.userData.billing.last_name,
      billingCountryArray: global.data.countries,
      billingSelectedCountry: this.getCountryObject(this.props.userData.billing.country),
      addressArray: [],
      billingSelectedState: this.getStateObject(this.props.userData.billing.country, this.props.userData.billing.state),
      billingAddressOne: this.props.userData.billing.address_1,
      billingEmailText: this.props.userData.email,
      billingZip: this.props.userData.billing.postcode,
      stateValue: '',
      spinnerTempTextInput: false,
      billingCity: this.props.userData.billing.city,
      email: '',
      spinnerTemp: false,
      billingPhone: this.props.userData.billing.phone,
      indicator: true,
      delspinnerTemp: false,
      editAddressId: '',
      saveDefaultAddress: '',
      otherArray: [{ value: 'other', name: 'other' }],

      shippingFirstName: this.props.userData.shipping.first_name,
      shippingLastName: this.props.userData.shipping.last_name,
      shippingSelectedCountry: this.getCountryObject(this.props.userData.shipping.country),
      shippingSelectedState: this.getStateObject(this.props.userData.shipping.country, this.props.userData.shipping.state),
      shippingAddressOne: this.props.userData.shipping.address_1,
      shippingZip: this.props.userData.shipping.postcode,
      shippingCity: this.props.userData.shipping.city
    }
    this.toast = null
  }

  canBeSubmitted () {
    const {
      billingFirstName, billingLastName, billingSelectedCountry, billingAddressOne, billingZip, billingSelectedState,
      billingCity, billingPhone, billingEmailText
    } = this.state
    return (
      billingFirstName.length > 0 &&
      billingLastName.length > 0 &&
      billingAddressOne.length > 0 &&
      billingZip.length > 0 &&
      Object.keys(billingSelectedState).length > 0 &&
      billingCity.length > 0 &&
      billingPhone.length > 0 &&
      billingEmailText.length > 0
    )
  }

  canBeSubmittedShipping () {
    const {
      shippingFirstName, shippingLastName, shippingSelectedCountry, shippingAddressOne, shippingZip, shippingSelectedState,
      shippingCity
    } = this.state
    return (
      shippingFirstName.length > 0 &&
      shippingLastName.length > 0 &&
      shippingAddressOne.length > 0 &&
      shippingZip.length > 0 &&
      Object.keys(shippingSelectedState).length > 0 &&
      shippingCity.length > 0
    )
  }

  saveFunBilling = async () => {
    const billing = {
      first_name: this.state.billingFirstName,
      last_name: this.state.billingLastName,
      company: 'null',
      address_1: this.state.billingAddressOne,
      address_2: '',
      city: this.state.billingCity,
      state: this.state.billingSelectedState.value,
      postcode: this.state.billingZip,
      country: this.state.billingSelectedCountry.value,
      email: this.state.billingEmailText,
      phone: this.state.billingPhone
    }
    var data = {
      billing: billing
    }
    const json = await putHttp('customers/' + this.props.userData.id, data)
    if (json.status === 'success') {
      this.props.userSave(json.data)
    }
    this.setState({
      temp: false,
      spinnerTempTextInput: false
    })
  }

  saveFunShipping = async () => {
    const shipping = {
      first_name: this.state.shippingFirstName,
      last_name: this.state.shippingLastName,
      company: 'null',
      address_1: this.state.shippingAddressOne,
      address_2: '',
      city: this.state.shippingCity,
      state: this.state.shippingSelectedState.value,
      postcode: this.state.shippingZip,
      country: this.state.shippingSelectedCountry.value
    }
    var data = {
      shipping: shipping
    }
    const json = await putHttp('customers/' + this.props.userData.id, data)
    if (json.status === 'success') {
      this.props.userSave(json.data)
    }
    this.setState({
      temp: false,
      spinnerTempTextInput: false
    })
  }

  getCountryObject (val) {
    let name = ''
    for (const v of global.data.countries) {
      if (val.toString() === v.value.toString()) {
        name = v
      }
    }
    return name
  }

  getStateObject (val, val2) {
    let name = ''
    if (global.data.states[val]) {
      for (const v of global.data.states[val]) {
        if (val2 === v.value) name = v
      }
    } else {
      name = 'other'
    }

    return name
  }

  // return false;
  getCountryName (val) {
    let name = ''
    for (const v of global.data.countries) {
      if (val.toString() === v.name.toString()) {
        name = v.value
      }
    }
    return name
  }

  getCountryNameArray () {
    const name = []
    for (const v of global.data.countries) {
      name.push(v.name)
    }
    return name
  }

  getStateName (val, val2) {
    let name = ''
    if (global.data.states[val]) {
      for (const v of global.data.states[val]) {
        if (val2 === v.name) name = v.value
      }
    } else {
      name = 'other'
    }

    return name
  }

  refresh = (name, selectedValue, address) => {
    if (selectedValue === 'state') {
      if (address === 'shipping') {
        this.setState({
          shippingSelectedState: name
        })
      } else {
        this.setState({
          billingSelectedState: name
        })
      }
    } else {
      if (address === 'shipping') {
        this.setState({
          shippingSelectedCountry: name
        })
      } else {
        this.setState({
          billingSelectedCountry: name
        })
      }
    }
  }

  /// //////
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
            marginBottom: 20
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

          <Spinner
            visible={this.state.spinnerTempTextInput}
            textStyle={{
              backgroundColor: this.props.themeStyle.loadingIndicatorColor,
              color: this.props.themeStyle.primary
            }}
          />
          <Text style={[styles.headingText, {
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {this.props.language['Billing Address']}
          </Text>

          <Text style={[styles.headingTwoText, {
            color: this.state.billingFirstName.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language['First Name']}
            </Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language['First Name']}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingFirstName: text })
            }}
            value={this.state.billingFirstName}
          />
          <Text style={[styles.headingTwoText, {
            color: this.state.billingLastName.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '} <Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language['Last Name']}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              borderLeftWidth: 1
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language['Last Name']}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingLastName: text })
            }}
            value={this.state.billingLastName}
          />
          <Text style={[styles.headingTwoText, {
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* ' + this.props.language.Country}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SearchFilterClass', {
                data: this.state.billingCountryArray,
                onSelectionBase: 'shipping',
                onGoBack: (name, selectedValue) =>
                  this.refresh(name, 'country', 'billing')
              })
            }}
            style={[styles.stateCountryStyles, {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}>

            <Text style={[{
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              fontSize: appTextStyle.mediumSize
            }]}>
              {this.state.billingSelectedCountry.name}
            </Text>

            <FontAwesome
              style={{
                color: this.props.themeStyle.textColor,
                fontSize: appTextStyle.smallSize
              }}
              active
              name={'chevron-down'}
            />

          </TouchableOpacity>

          <Text style={[styles.headingTwoText, {
            color: Object.keys(this.state.billingSelectedState).length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.State}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SearchFilterClass', {
                data: this.state.billingSelectedCountry.name === 'Country'
                  ? this.state.otherArray
                  : global.data.states[
                    this.getCountryName(this.state.billingSelectedCountry.name)
                  ] !== undefined
                    ? global.data.states[
                      this.getCountryName(this.state.billingSelectedCountry.name)
                    ]
                    : this.state.otherArray,
                onSelectionBase: 'shipping',
                onGoBack: (name, selectedValue) =>
                  this.refresh(name, 'state', 'billing')
              })
            }}
            style={[styles.stateCountryStyles, {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor

            }]}>

            <Text style={[{
              fontFamily: appTextStyle.fontFamily,
              color: this.state.billingSelectedState === '' ? '#c0c0c0' : this.props.themeStyle.textColor,
              fontSize: appTextStyle.mediumSize
            }]}>
              {this.state.billingSelectedState === '' ? this.props.language.State : this.state.billingSelectedState.name}
            </Text>

            <FontAwesome
              style={{
                color: this.props.themeStyle.textColor,
                fontSize: appTextStyle.smallSize
              }}
              active
              name={'chevron-down'}
            />

          </TouchableOpacity>

          <Text style={[styles.headingTwoText, {
            color: this.state.billingAddressOne.length
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.Address}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language.Address}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingAddressOne: text })
            }}
            value={this.state.billingAddressOne}
          />

          <Text style={[styles.headingTwoText, {
            color: this.state.billingCity.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.City}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language.City}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingCity: text })
            }}
            value={this.state.billingCity}
          />

          <Text style={[styles.headingTwoText, {
            color: this.state.billingZip.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language['Post code']}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language['Post code']}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingZip: text })
            }}
            value={this.state.billingZip}
          />

          <Text style={[styles.headingTwoText, {
            fontFamily: appTextStyle.fontFamily,
            color: this.state.billingPhone.length > 0
              ? this.props.themeStyle.textColor : 'red',
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              fontFamily: appTextStyle.fontFamily,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.Phone}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            keyboardType={'number-pad'}
            selectionColor='#51688F'
            placeholder={this.props.language.Phone}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingPhone: text })
            }}
            value={this.state.billingPhone}
          />

          <Text style={[styles.headingTwoText, {
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* ' + this.props.language.Email}
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language.Email}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ billingEmailText: text })
            }}
            value={this.state.billingEmailText}
          />

          <View style={{
            marginVertical: 10,
            marginTop: 30,
            width: WIDTH
          }}>
            <Button onPress={() => {
              if (this.canBeSubmitted()) {
                this.setState({
                  spinnerTempTextInput: true
                }, () => {
                  this.saveFunBilling()
                })
              }
            }}
            borderRadius={true}
            disable={!!this.canBeSubmitted()} themeStyle={this.props.themeStyle}
            navigation={this.props.navigation}
            title={this.props.language['Update Billing']}
            ></Button>
          </View>

          {/* ///// */}

          <Text style={[styles.headingText, {
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {this.props.language['Shipping Address']}
          </Text>

          <Text style={[styles.headingTwoText, {
            color: this.state.shippingFirstName.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language['First Name']}
            </Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language['First Name']}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ shippingFirstName: text })
            }}
            value={this.state.shippingFirstName}
          />
          <Text style={[styles.headingTwoText, {
            color: this.state.shippingLastName.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '} <Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language['Last Name']}/</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              borderLeftWidth: 1
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language['Last Name']}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ shippingLastName: text })
            }}
            value={this.state.shippingLastName}
          />
          <Text style={[styles.headingTwoText, {
            color: this.props.themeStyle.textColor,
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* ' + this.props.language.Country}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SearchFilterClass', {
                data: this.state.billingCountryArray,
                onSelectionBase: 'shipping',
                onGoBack: (name, selectedValue) =>
                  this.refresh(name, 'country', 'shipping')
              })
            }}
            style={[styles.stateCountryStyles, {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}>

            <Text style={[{
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              fontSize: appTextStyle.mediumSize
            }]}>
              {this.state.shippingSelectedCountry.name}
            </Text>

            <FontAwesome
              style={{
                color: this.props.themeStyle.textColor,
                fontSize: appTextStyle.smallSize
              }}
              active
              name={'chevron-down'}
            />

          </TouchableOpacity>

          <Text style={[styles.headingTwoText, {
            color: Object.keys(this.state.shippingSelectedState).length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.State}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SearchFilterClass', {
                data: this.state.shippingSelectedCountry.name === 'Country'
                  ? this.state.otherArray
                  : global.data.states[
                    this.getCountryName(this.state.shippingSelectedCountry.name)
                  ] !== undefined
                    ? global.data.states[
                      this.getCountryName(this.state.shippingSelectedCountry.name)
                    ]
                    : this.state.otherArray,
                onSelectionBase: 'shippingState',
                onGoBack: (name, selectedValue) =>
                  this.refresh(name, 'state', 'shipping')
              })
            }}
            style={[styles.stateCountryStyles, {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor

            }]}>

            <Text style={[{
              fontFamily: appTextStyle.fontFamily,
              color: this.state.shippingSelectedState === '' ? '#c0c0c0' : this.props.themeStyle.textColor,
              fontSize: appTextStyle.mediumSize
            }]}>
              {this.state.shippingSelectedState === '' ? this.props.language.State : this.state.shippingSelectedState.name}
            </Text>

            <FontAwesome
              style={{
                color: this.props.themeStyle.textColor,
                fontSize: appTextStyle.smallSize
              }}
              active
              name={'chevron-down'}
            />

          </TouchableOpacity>

          <Text style={[styles.headingTwoText, {
            color: this.state.shippingAddressOne.length
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.Address}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language.Address}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ shippingAddressOne: text })
            }}
            value={this.state.shippingAddressOne}
          />

          <Text style={[styles.headingTwoText, {
            color: this.state.shippingCity.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language.City}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language.City}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ shippingCity: text })
            }}
            value={this.state.shippingCity}
          />

          <Text style={[styles.headingTwoText, {
            color: this.state.shippingZip.length > 0
              ? this.props.themeStyle.textColor : 'red',
            fontFamily: appTextStyle.fontFamily,
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
            {'* '}<Text style={[styles.headingTwoText, {
              color: this.props.themeStyle.textColor,
              fontFamily: appTextStyle.fontFamily,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor
            }]}>{this.props.language['Post code']}</Text>
          </Text>
          <TextInput
            style={[styles.textInputStyle, {
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              marginBottom: 20
            }]}
            selectionColor='#51688F'
            placeholder={this.props.language['Post code']}
            placeholderTextColor={'#c0c0c0'}
            onChangeText={text => {
              this.setState({ shippingZip: text })
            }}
            value={this.state.shippingZip}
          />

          <View style={{
            marginVertical: 10,
            width: WIDTH
          }}>
            <Button onPress={() => {
              if (this.canBeSubmittedShipping()) {
                this.setState({
                  spinnerTempTextInput: true
                }, () => {
                  this.saveFunShipping()
                })
              }
            }}
            borderRadius={true}
            disable={!!this.canBeSubmittedShipping()} themeStyle={this.props.themeStyle}
            navigation={this.props.navigation}
            title={this.props.language['Update Shipping']}
            ></Button>
          </View>

        </ScrollView>

      </View>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  userSave: (data, th) => {
    dispatch({
      type: REGISTER_USER,
      payload: data
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
  getStatesCall: (th, id, langId, lang) => {
    dispatch(async dispatch => {
      await getStates(dispatch, th, id, langId, lang)
    })
  },
  addAddressCall: (billingFirstName, billingLastName, billingSelectedCountry, billingSelectedState, billingAddressOne,
    billingEmailText, billingZip, stateValue, billingCity, email, billingPhone,

    shippingFirstName, shippingLastName, shippingSelectedCountry, shippingAddressOne, shippingZip, shippingSelectedState,
    shippingCity

  ) =>
    dispatch(addAddressValue(billingFirstName, billingLastName, billingSelectedCountry, billingSelectedState,
      billingAddressOne, billingEmailText, billingZip, stateValue, billingCity, email, billingPhone,
      shippingFirstName, shippingLastName, shippingSelectedCountry, shippingAddressOne, shippingZip, shippingSelectedState,
      shippingCity))

})

const getTheme = (state) => state.appConfig.themeStyle
const getSessionId = (state) => state.userData.sessionId
const getUserData = (state) => state.userData.user
const getSettings = (state) => state.settingsCall.settings

const getUserDataFun = createSelector(
  [getUserData],
  (getUserData) => {
    return getUserData
  }
)
const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
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
  userData: getUserDataFun(state),
  settings: getSettingsFun(state)

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14
  },
  textInputStyle: {
    height: 36,
    width: '94%',
    borderColor: '#e6e8e9',
    borderWidth: 1,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 2
  },
  stateCountryStyles: {
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e6e8e9',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 10
  },
  addAddressBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
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
    paddingVertical: 20,
    width: WIDTH,
    textAlign: 'center'
  },
  headingTwoText: {
    fontSize: appTextStyle.largeSize,
    paddingVertical: 8,
    width: WIDTH,
    paddingHorizontal: 12
  },
  cardView: {
    marginBottom: 9,
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14
  },
  addressText: {
    paddingTop: 4,
    paddingBottom: 1
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)
