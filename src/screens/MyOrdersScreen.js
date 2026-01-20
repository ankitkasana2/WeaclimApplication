/* eslint-disable no-useless-escape */
import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  FlatList,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Image
} from 'react-native'
import { createSelector } from 'reselect'
import { UIActivityIndicator } from 'react-native-indicators'
import { getUrl, getHttp } from '../common/WooComFetch'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import Ionicons from 'react-native-vector-icons/Ionicons'
import themeStyle, { appTextStyle } from '../common/Theme.style'
import OrderCard from '../common/orderCard'
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Login extends PureComponent {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
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
      gestureEnabled: false,
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
      headerTitle: this.props.language.Order,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
    this.getOrders()
  }

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      spinnerTemp: false,
      selectedTab: this.props.navigation.state.params.selectedTab,
      /// ////
      ordersPendingArray: [],
      ordersProcessingArray: [],
      ordersHoldArray: [],
      ordersCompletedArray: [],
      ordersFailedArray: [],
      ordersRefundedArray: [],
      ordersCancelledArray: [],
      indicatorValue: true,
      isRefreshing: false,
      arrayLength: 0,
      page: 1,
      callStart: true
    }
    this.toast = null
  }

  getOrders = async () => {
    if (Object.keys(this.props.userData).length > 0) {
      this.setState({ temp: true })

      const json = await getHttp('orders/', {
        page: this.state.page,
        customer: (this.props.userData.id).toString(),
        lang: this.props.languageCode,
        currency: this.props.currencyCode
      })
      this.state.ordersPendingArray = []
      this.state.ordersProcessingArray = []
      this.state.ordersHoldArray = []
      this.state.ordersCompletedArray = []
      this.state.ordersFailedArray = []
      this.state.ordersRefundedArray = []
      this.state.ordersCancelledArray = []
      json.data.forEach(element => {
        if (element.status.toLocaleLowerCase() === 'processing') { this.state.ordersProcessingArray.push(element) }
        if (element.status.toLocaleLowerCase() === 'pending') { this.state.ordersPendingArray.push(element) }
        if (element.status.toLocaleLowerCase() === 'on-hold') { this.state.ordersHoldArray.push(element) }
        if (element.status.toLocaleLowerCase() === 'completed') { this.state.ordersCompletedArray.push(element) }
        if (element.status.toLocaleLowerCase() === 'cancelled') { this.state.ordersCancelledArray.push(element) }
        if (element.status.toLocaleLowerCase() === 'refunded') { this.state.ordersRefundedArray.push(element) }
        if (element.status.toLocaleLowerCase() === 'failed') { this.state.ordersFailedArray.push(element) }
      })
      this.setState({
        page: this.state.page,
        ordersArray: this.state.ordersArray,
        indicatorValue: false,
        isRefreshing: false,
        callStart: true
      })
    } else {
      this.setState({
        indicatorValue: false,
        isRefreshing: false,
        callStart: false
      })
      this.toast.show('Please login or create an account for free')
    }
  }

  onRefreshTemp () {
    this.setState({ isRefreshing: true, page: 1 }, () => {
      this.getOrders()
    })
  }

  onEndReached = () => {
    this.handleLoadMore()
  }

  renderFooter = () => (
    <View
      style={{
        marginBottom: 30,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center'
      }}>
      {!this.state.callStart &&
        this.state.arrayLength > 9 ? (
          <View style={{ height: 20, marginTop: 30 }}>
            <UIActivityIndicator
              size={27}
              count={12}
              color={this.props.themeStyle.primary}
            />
          </View>
        ) : null}
    </View>
  )

  handleLoadMore () {
    if (this.state.arrayLength > 9 &&
      this.state.callStart) {
      this.state.page = this.state.page + 1
      this.state.fabB = this.state.arrayLength > 9
      this.state.callStart = false
      this.getOrders()
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

  getOrderTotalPrice = (o) => {
    const priceFixed = o.total
    return priceFixed + o.currency
  }

   formatDate = (date) => {
     var d = new Date(date)
     var month = '' + (d.getMonth() + 1)
     var day = '' + d.getDate()
     var year = d.getFullYear()

     if (month.length < 2) { month = '0' + month }
     if (day.length < 2) { day = '0' + day }

     return [year, month, day].join('-')
   }

   card = (item, key) => (
     <TouchableOpacity
       key={key}
       style={{
         borderBottomWidth: 5,
         borderColor: this.props.themeStyle.secondryBackgroundColor,
         paddingBottom: 12
       }} onPress={() => {
         this.props.navigation.navigate('OrderDetail', {
           id: item.id
         })
       }}>
       <View style={styles.orderCardContainer}>
         <View>
           <Text style={{
             fontSize: appTextStyle.largeSize,
             color: this.props.themeStyle.textColor,
             fontFamily: appTextStyle.fontFamily
           }}>{this.props.language.Orderid + ': ' + item.number}</Text>
           <Text style={{
             fontSize: appTextStyle.mediumSize,
             color: 'gray',
             paddingVertical: 3,
             fontFamily: appTextStyle.fontFamily
           }}>{this.props.language.PlacedOn + ' ' + this.formatDate(item.date_created)}</Text>
         </View>
         <View style={styles.rowData}>
           <Text style={{
             fontSize: appTextStyle.smallSize,
             color: this.props.themeStyle.textColor,
             fontFamily: appTextStyle.fontFamily
           }}>
             {this.props.language.ViewDetails}
           </Text>
           <Ionicons
             name={!I18nManager.isRTL
               ? 'chevron-forward-outline'
               : 'chevron-back-outline'}
             style={[{
               color: this.props.themeStyle.textColor,
               fontSize: appTextStyle.largeSize
             }]}
           />
         </View>

       </View>
       {
         item.line_items.map((item2, key2) => (
           <OrderCard
             key={key2}
             indexValue={key2}
             th={this}
             language={this.props.language}
             data={item2}
             currencySymbol={this.props.currencySymbol}
             themeStyle={this.props.themeStyle}
             sessionId={this.props.sessionId}
             settings={this.props.settings}
             quantity={item2.quantity}
           />
         ))
       }
       <View style={styles.totalPriceView}>
         <Text style={{
           fontSize: appTextStyle.largeSize,
           color: this.props.themeStyle.textColor,
           paddingHorizontal: 1,
           fontFamily: appTextStyle.fontFamily
         }}>
           {item.line_items.length + ' ' + this.props.language.itemsTotal + ': '}</Text>
         <Text style={{
           fontSize: appTextStyle.mediumSize,
           color: 'gray',
           paddingHorizontal: 8,
           fontFamily: appTextStyle.fontFamily
         }}>
           {this.getOrderTotalPrice(item)}
         </Text>
       </View>
     </TouchableOpacity>
   )

   render () {
    // alert(JSON.stringify(this.state.ordersPendingArray));
     return (
       <FlatList
         data={['']}
         extraData={this.state}
         showsVerticalScrollIndicator={false}
         listKey={'products'}
         keyExtractor={(item, index) => index.toString()}
         ListFooterComponent={() => this.renderFooter()}
         onEndReachedThreshold={0.1}
         style={{ backgroundColor: this.props.themeStyle.secondryBackgroundColor }}
         refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={this.onRefreshTemp.bind(this)}
           />
         }
         onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
         onEndReached={this.onEndReached}
         renderItem={item => (
           <View>

             <Toast
               ref={ref => { this.toast = ref }}
               style={{ backgroundColor: this.props.themeStyle.iconPrimaryColor }}
               position='top'
               positionValue={400}
               fadeOutDuration={7000}
               textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.largeSize }}
             />
             <View
               style={[styles.container, {
                 backgroundColor: this.props.themeStyle.secondryBackgroundColor
               }]}>

               <Spinner
                 visible={this.state.spinnerTemp}
                 textStyle={{
                   backgroundColor: themeStyle.loadingIndicatorColor,
                   color: themeStyle.loadingIndicatorColor
                 }}
               />
               <View style={{ flex: 1 }}>
                 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.tabContainer]}>
                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '1' })
                     }}
                     style={[styles.tabText, {
                       backgroundColor: this.state.selectedTab === '1' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '1' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language.processing}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '2' })
                     }}
                     style={[styles.tabText, {
                       backgroundColor: this.state.selectedTab === '2' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '2' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language.pending}</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '3' })
                     }}
                     style={[styles.tabText, {
                       backgroundColor: this.state.selectedTab === '3' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '3' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language['on-hold']}</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '4' })
                     }}
                     style={[styles.tabText, {
                       backgroundColor: this.state.selectedTab === '4' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '4' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language.completed}</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '5' })
                     }}
                     style={[styles.tabText, {
                       backgroundColor: this.state.selectedTab === '5' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '5' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language.cancelled}</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '6' })
                     }}
                     style={[styles.tabText, {
                       backgroundColor: this.state.selectedTab === '6' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '6' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language.refunded}</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                     onPress={() => {
                       this.setState({ selectedTab: '7' })
                     }}
                     style={[styles.tabText, {
                       marginRight: 12,
                       backgroundColor: this.state.selectedTab === '7' ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                     }]}>
                     <Text style={{
                       fontSize: appTextStyle.largeSize,
                       paddingVertical: 6,
                       fontFamily: appTextStyle.fontFamily,
                       color: this.state.selectedTab === '7' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                     }}>{this.props.language.failed}</Text>
                   </TouchableOpacity>
                 </ScrollView>
               </View>
               {this.state.indicatorValue
                 ? <View style={{
                   paddingVertical: 10,
                   marginBottom: 40
                 }}>
                   <UIActivityIndicator
                     size={27}
                     count={12}
                     color={this.props.themeStyle.primary}
                   />
                 </View>
                 : null}
               <View
                 style={styles.screenContainer}>
                 {
                   this.state.selectedTab === '1'
                     ? <View style={styles.screenInnerContainer}>
                       {this.state.ordersProcessingArray.length === 0 && !this.state.indicatorValue
                         ? <Text style={{
                           fontSize: appTextStyle.largeSize + 2,
                           color: this.props.themeStyle.textColor,
                           paddingVertical: 10,
                           fontFamily: appTextStyle.fontFamily
                         }}>
                           {this.props.language['No Data Found']}
                         </Text> : null}
                       {this.state.ordersProcessingArray.map((item, key) => (
                         this.card(item, key)
                       ))}
                     </View>
                     : this.state.selectedTab === '2'
                       ? <View style={styles.screenInnerContainer}>
                         {this.state.ordersPendingArray.length === 0 && !this.state.indicatorValue
                           ? <Text style={{
                             fontSize: appTextStyle.largeSize + 2,
                             color: this.props.themeStyle.textColor,
                             paddingVertical: 10,
                             fontFamily: appTextStyle.fontFamily
                           }}>
                             {this.props.language['No Data Found']}
                           </Text> : null}
                         {this.state.ordersPendingArray.map((item, key) => (
                           this.card(item, key)
                         ))}
                       </View>
                       : this.state.selectedTab === '3'
                         ? <View style={styles.screenInnerContainer}>
                           {this.state.ordersHoldArray.length === 0 && !this.state.indicatorValue
                             ? <Text style={{
                               fontSize: appTextStyle.largeSize + 2,
                               color: this.props.themeStyle.textColor,
                               paddingVertical: 10,
                               fontFamily: appTextStyle.fontFamily
                             }}>
                               {this.props.language['No Data Found']}
                             </Text> : null}
                           {this.state.ordersHoldArray.map((item, key) => (
                             this.card(item, key)
                           ))}
                         </View>
                         : this.state.selectedTab === '4'
                           ? <View style={styles.screenInnerContainer}>
                             {this.state.ordersCompletedArray.length === 0 && !this.state.indicatorValue
                               ? <Text style={{
                                 fontSize: appTextStyle.largeSize + 2,
                                 color: this.props.themeStyle.textColor,
                                 paddingVertical: 10,
                                 fontFamily: appTextStyle.fontFamily
                               }}>
                                 {this.props.language['No Data Found']}
                               </Text> : null}
                             {this.state.ordersCompletedArray.map((item, key) => (
                               this.card(item, key)
                             ))}
                           </View>
                           : this.state.selectedTab === '5'
                             ? <View style={styles.screenInnerContainer}>
                               {this.state.ordersCancelledArray.length === 0 && !this.state.indicatorValue
                                 ? <Text style={{
                                   fontSize: appTextStyle.largeSize + 2,
                                   color: this.props.themeStyle.textColor,
                                   paddingVertical: 10,
                                   fontFamily: appTextStyle.fontFamily
                                 }}>
                                   {this.props.language['No Data Found']}
                                 </Text> : null}
                               {this.state.ordersCancelledArray.map((item, key) => (
                                 this.card(item, key)
                               ))}
                             </View>
                             : this.state.selectedTab === '6'
                               ? <View style={styles.tabInnerContainer}>
                                 {this.state.ordersRefundedArray.length === 0 && !this.state.indicatorValue
                                   ? <Text style={{
                                     fontSize: appTextStyle.largeSize + 2,
                                     color: this.props.themeStyle.textColor,
                                     paddingVertical: 10,
                                     fontFamily: appTextStyle.fontFamily
                                   }}>
                                     {this.props.language['No Data Found']}
                                   </Text> : null}
                                 {this.state.ordersRefundedArray.map((item, key) => (
                                   this.card(item, key)
                                 ))}
                               </View>
                               : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                 {this.state.ordersFailedArray.length === 0 && !this.state.indicatorValue
                                   ? <Text style={{
                                     fontSize: appTextStyle.largeSize + 2,
                                     color: this.props.themeStyle.textColor,
                                     paddingVertical: 10,
                                     fontFamily: appTextStyle.fontFamily
                                   }}>
                                     {this.props.language['No Data Found']}
                                   </Text> : null}
                                 {this.state.ordersFailedArray.map((item, key) => (
                                   this.card(item, key)
                                 ))}
                               </View>}

               </View>
             </View>
           </View>
         )}
       />
     )
   }
}

const getTheme = (state) => state.appConfig.themeStyle
const getSessionId = (state) => state.userData.sessionId
const getUserData = (state) => state.userData.user
const getSettings = (state) => state.settingsCall.settings
const getcurrencySymbol = (state) => state.appConfig.currencySymbol
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
const getcurrencySymbolFun = createSelector(
  [getcurrencySymbol],
  (getcurrencySymbol) => {
    return getcurrencySymbol
  }
)
const getSessionIdFun = createSelector(
  [getSessionId],
  (getSessionId) => {
    return getSessionId
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
  settings: getSettingsFun(state),
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
  orderCardContainer: {
    flexDirection: 'row',
    width: WIDTH,
    justifyContent: 'space-between',
    padding: 10
  },
  rowData: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  totalPriceView: {
    width: WIDTH,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12
  },
  tabInnerContainer: {
    justifyContent: 'center', alignItems: 'center'
  },
  tabContainer: {
    // justifyContent: 'space-around',
    // width: '100%',
    // flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 5
    // height: 1
  },
  tabText: {
    paddingBottom: 3,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 44,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default connect(mapStateToProps, null)(Login)
