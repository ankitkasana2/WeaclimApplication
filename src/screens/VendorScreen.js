import React, { Component } from 'react'
import { CardStyleInterpolators } from 'react-navigation-stack'
import {
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Text,
  Alert,
  StyleSheet,
  Platform
} from 'react-native'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { UIActivityIndicator } from 'react-native-indicators'
import Stars from 'react-native-stars'
import Spinner from 'react-native-loading-spinner-overlay'
import ImageLoad from '../common/RnImagePlaceH'
import { getFetchHttp, getHttp, postFetchHttp } from '../common/WooComFetch'
import CardTem from '../common/CardTemplate'
import { Icon } from 'native-base'
import { NavigationEvents } from 'react-navigation'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import Mailer from 'react-native-mail'
import { colorFun } from '../redux/actions/actions'
const WIDTH = Dimensions.get('window').width
class VendorScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerForceInset: { top: 'never', vertical: 'never' },
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
      headerTitleAlign: 'center'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      objectArray: [],
      fabB: false,
      isLoading: false,
      spinnerTemp: true,
      recent: false,
      rating: this.props.navigation.state.params.data.rating
        ? this.props.navigation.state.params.data.rating
        : 0,
      id: this.props.navigation.state.params.id
        ? this.props.navigation.state.params.id
        : null,
      name: this.props.navigation.state.params.data.display_name
        ? this.props.navigation.state.params.data.display_name
        : this.props.navigation.state.params.data.name,
      banner:
        this.props.navigation.state.params.data.banner === false ||
        this.props.navigation.state.params.data.banner === undefined
          ? ''
          : this.props.navigation.state.params.data.banner,
      gravatar: this.props.navigation.state.params.data.display_name
        ? ''
        : this.props.navigation.state.params.data.gravatar,
      email: this.props.navigation.state.params.data.user_email !== undefined
        ? this.props.navigation.state.params.data.user_email : '',
      page: 1,
      productColorCounter: 0
    }
    this.getVendorData()
  }

  getVendorData () {
    if (this.props.settings.mvf_enabled === '1') {
      this.getDokanVendorInfo()
    } else if (this.props.settings.mvf_enabled === '3') {
      this.getWcfmVendorData()
    } else if (this.props.settings.mvf_enabled === '2') {
      this.getWcVendorInfo()
    }
  }

  getData (id) {
    let p
    this.props.navigation.state.params.data.forEach(element => {
      if (element.id) { if (element.id === id) p = element }
      if (element.ID) { if (element.ID === id) p = element }
      if (element.user_id) { if (element.user_id === id) p = element }
    })
    return p
  }

  getWcVendorInfo () {
    const d = this.getData(this.state.id)
    if (d.meta) this.state.name = d.meta.pv_shop_name
    else if (d.first_name) this.state.name = d.first_name + ' ' + d.last_name
    else if (d.display_name) this.state.name = d.display_name
    if (d.user_email) this.state.email = d.user_email
    if (d.user_id) this.state.state.id = d.user_id
    this.state.banner = d.banner
    this.getProducts()
  }

  getDokanVendorInfo = async () => {
    const data = await getFetchHttp(ThemeStyle.url + '/wp-json/dokan/v1/stores/' + this.state.id + '&page=' + this.state.page, {})
    if (data.status === 'success') {
      const responce = data.data
      const d = responce
      if (d.user_email !== undefined) this.state.email = d.user_email
      if (d.email) this.state.email = d.email

      if (d.rating) this.state.rating = d.rating
      this.state.name = d.first_name + ' ' + d.last_name
      this.state.banner = d.banner
      this.state.gravatar = d.gravatar

      this.state.storeName = d.store_name
      this.getProducts()
    }
    // })
  }

  getWcfmVendorData = async () => {
    const data = await getFetchHttp(ThemeStyle.url + '/wp-json/wcfmmp/v1/store-vendors/' + this.state.id, {})
    if (data.status === 'success') {
      const response = data.data
      this.state.id = response.vendor_id
      this.state.email = response.vendor_email
      this.state.name = response.vendor_display_name
      this.state.banner = response.vendor_banner
      this.state.gravatar = response.vendor_shop_logo
      this.getProducts()
    }
  }

  getProducts () {
    if (this.props.settings.mvf_enabled === '1' || this.props.settings.mvf_enabled === '2') {
      this.getVendorProducts()
    } else if (this.props.settings.mvf_enabled === '3') {
      this.getWcfmProducts()
    }
  }

  getVendorProducts = async () => {
    const ddata = {
      post_author: this.state.id,
      page: this.state.page
    }

    const data = await postFetchHttp(ThemeStyle.url + '/wp-json/api/tc_settings/app_vendor_products/?post_author=' + this.state.id + '&page=' + this.state.page, ddata)
    if (data.status === 'success') {
      const response = data.data
      const json = await getHttp('products/', {
        include: response.data,
        lang: this.props.languageCode,
        currency: this.props.currencyCode,
        status: 'publish'
      })
      const d = json
      if (d.length !== 0) {
        for (const value of d) this.state.objectArray.push(value)
        this.setState({
          objectArray: this.state.objectArray
        })
      }
      this.setState({
        spinnerTemp: false
      })
    }
  }

  getWcfmProducts = async () => {
    const ddata = {
      id: this.state.id,
      page: this.state.page
    }
    const data = await getFetchHttp(ThemeStyle.url + '/wp-json/wcfmmp/v1/products/?id=' + this.state.id + '&page=' + this.state.page, ddata)
    if (data.status === 'success') {
      const response = data.data
      const d = response
      if (d.length !== 0) {
        for (const value of d) this.state.objectArray.push(value)
        this.setState({
          objectArray: this.state.objectArray
        })
      }
      this.setState({
        spinnerTemp: false
      })
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language.Vendors,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  handleEmail = () => {
    Mailer.mail(
      {
        recipients: [this.state.email],
        subject: 'your title',
        body: 'your message',
        isHTML: true,
        attachment: {
          path: '', // The absolute path of the file from which to read data.
          type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: '' // Optional: Custom filename for attachment
        }
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response')
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response')
            }
          ],
          { cancelable: true }
        )
      }
    )
  }

  handleLoadMore = () => {
    if (this.state.objectArray.length % 10 === 0) {
      this.setState({
        refreshing: true,
        page: this.state.page + 1,
        fabB: this.state.objectArray.length > 9
      }, () => {
        this.getProducts()
      })
    } else if (this.state.objectArray.length % 10 !== 0) {
      this.setState({
        refreshing: false
      })
    }
  }

  handleScroll (event) {
    if (
      this.state.fabB &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      this.setState({ fabB: false })
    }
  }

  renderItem = item => (
    <View>
      <CardTem
        objectArray={item.item}
        rows={this.props.vertical}
        recent={this.state.recent}
        backgroundColor={colorFun(this, item.index)}
        width={WIDTH * ThemeStyle.twoRowCardWIdth}
        themeStyle={this.props.themeStyle}
      />
    </View>
  )

  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
  )

  renderFooter = () => (
    <View
      style={{
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        backgroundColor: this.props.themeStyle.primaryBackgroundColor
      }}>
      {this.state.refreshing ? (
        <View
          style={{
            height: 10,
            marginTop: 5
          }}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={this.props.themeStyle.primary}
          />
        </View>
      ) : null}
    </View>
  )

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.themeStyle.primaryBackgroundColor }}>
        <NavigationEvents
          onDidFocus={() => {
            this.setState({})
          }}
        />
        {this.state.fabB ? (
          <TouchableOpacity
            style={styles.fabStyle}
            onPress={() => {
              this.flatListRef.scrollToOffset({
                animated: true,
                offset: 0,
                useNativeDriver: true
              }, {
                useNativeDriver: true
              })
              this.setState({ fabB: false })
            }}>
            <View
              style={[styles.fabView, {
                backgroundColor: this.props.themeStyle.primary
              }]}>
              <Icon
                name={'md-arrow-up'}
                style={[styles.fabIcon, {
                  color: this.props.themeStyle.textTintColor
                }]}
              />
            </View>
          </TouchableOpacity>
        ) : null}
        <FlatList
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: this.props.themeStyle.primaryBackgroundColor
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ backgroundColor: this.props.themeStyle.primaryBackgroundColor }}
          columnWrapperStyle={{
            alignItems: 'center',
            padding: 4,
            paddingBottom: 0,
            marginBottom: 0,
            paddingTop: 0,
            marginTop: 0,
            backgroundColor: this.props.themeStyle.primaryBackgroundColor,
            paddingLeft:
              WIDTH >= 375
                ? WIDTH * 0.009
                : WIDTH >= 360 && WIDTH <= 75
                  ? WIDTH * 0.008
                  : WIDTH * 0.007
          }}
          data={this.state.objectArray}
          renderItem={this.renderItem}
          extraData={this.state}
          key={this.state.productView}
          ref={ref => {
            this.flatListRef = ref
          }}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.props.themeStyle.primary,
                width: Dimensions.get('window').width
              }}>
              <Spinner visible={this.state.spinnerTemp} />

              {this.state.banner === undefined ||
              this.state.banner === null ||
              this.state.banner === '' ||
              this.state.banner === false ? null : (
                  <ImageLoad
                    resizeMode={'cover'}
                    key={'1'}
                    style={{
                      width: WIDTH,
                      height:
                      Platform.OS === 'ios'
                        ? WIDTH
                        : WIDTH
                    }}
                    loadingStyle={{
                      size: 'large',
                      color: this.props.themeStyle.primary
                    }}
                    placeholder={false}
                    ActivityIndicator={true}
                    placeholderStyle={{ width: 0, height: 0 }}
                    source={{ uri: this.state.banner }}
                  />
                )}

              {this.state.gravatar !== null ? (
                <ImageLoad
                  key={0}
                  style={{ width: 70, height: 70, margin: 8, marginBottom: 6 }}
                  loadingStyle={{
                    size: 'large',
                    color: this.props.themeStyle.primary
                  }}
                  placeholder={false}
                  ActivityIndicator={true}
                  placeholderStyle={{ width: 0, height: 0 }}
                  source={{ uri: this.state.gravatar }}
                  borderRadius={70 / 2}
                />
              ) : null}
              {this.state.rating > 0 ? (
                <Stars
                  disabled
                  default={parseFloat(this.state.rating)}
                  count={5}
                  starSize={60}
                  half
                  fullStar={
                    <Icon
                      name={'star'}
                      style={{
                        fontSize: 16,
                        color: this.props.themeStyle.primaryBackgroundColor,
                        marginTop: 2
                      }}
                    />
                  }
                  emptyStar={
                    <Icon
                      name={'star-outline'}
                      style={{
                        fontSize: 16,
                        color: this.props.themeStyle.primaryBackgroundColor,
                        marginTop: 2
                      }}
                    />
                  }
                  halfStar={
                    <Icon
                      name={'star-half'}
                      style={{
                        fontSize: 16,
                        color: this.props.themeStyle.primaryBackgroundColor,
                        marginTop: 2
                      }}
                    />
                  }
                />
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Icon
                    name={'star-outline'}
                    style={{
                      fontSize: 16,
                      color: this.props.themeStyle.primaryBackgroundColor
                    }}
                  />
                  <Text
                    style={{
                      padding: 8,
                      color: this.props.themeStyle.primaryBackgroundColor,
                      fontSize: appTextStyle.mediumSize
                    }}>
                    No Ratings found yet
                  </Text>
                </View>
              )}
              <Text
                style={{
                  padding: 6,
                  color: this.props.themeStyle.primaryBackgroundColor,
                  fontWeight: 'bold',
                  fontSize: appTextStyle.largeSize + 2,
                  paddingTop: 0
                }}>
                {this.state.name}
              </Text>
              <Text
                style={{
                  padding: 8,
                  paddingTop: 0,
                  color: this.props.themeStyle.primaryBackgroundColor,
                  fontSize: appTextStyle.mediumSize
                }}>
                {this.state.email}
              </Text>
              <TouchableOpacity
                style={{
                  margin: 10,
                  marginBottom: 20,
                  marginTop: 5
                }}
                onPress={this.handleEmail}>
                <View
                  style={{
                    borderColor: this.props.themeStyle.textColor,
                    alignItems: 'center',
                    backgroundColor: this.props.themeStyle.primaryBackgroundColor,
                    justifyContent: 'center'
                  }}>
                  <Text
                    style={{
                      color: this.props.themeStyle.textColor,
                      fontSize: appTextStyle.mediumSize,
                      fontWeight: '500',
                      padding: 5
                    }}>
                    {this.props.language['Contact Us']}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={() => this.renderFooter()}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false
          }}
          onScroll={this.handleScroll.bind(this)}
          onEndReached={() => {
            if (!this.onEndReachedCalledDuringMomentum) {
              this.handleLoadMore()
              this.onEndReachedCalledDuringMomentum = true
            }
          }}
          onEndReachedThreshold={0.5}
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
  session: getSessionFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state)
})
const mapDispatchToProps = dispatch => ({
  getCartProductsQuantityFun: (th) => {
    dispatch(async dispatch => {
      await getCartProductsQuantity(dispatch, '', th,
        th.props.userData, false)
    })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(VendorScreen)
const styles = StyleSheet.create({
  fabStyle: {
    zIndex: 5,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: 25,
    marginBottom: 60
  },
  fabView: {
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 400,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  fabIcon: {
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    fontSize: 22
  }

})
