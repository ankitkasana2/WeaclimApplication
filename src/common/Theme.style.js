import React from 'react';
import { Dimensions, Image, Platform, View } from 'react-native'
const WIDTH = Dimensions.get('window').width
// set card width according to your requirement
const cardWidth = WIDTH * 0.3991
export default {
  /// /////////////////////////////

  url: 'https://weaclimsolutions.com/', // your site URL
  consumerKey: 'ck_ed191130d98e568d94df6fc40060d6228deebe0f', // Your consumer secret
  consumerSecret: 'cs_989b17886a06bd64b504f42fd8d84cb8c23eddbd', // Your consumer secret


  // please reset app cache after changing these five values
  defaultCurrencySymbol: '₹',
  currencyCode: 'Rupee',
  priceDecimals: 2,
  // by default language for ltr
  ltrlanguageCode: 'en',
  // by default language for rtl
  rtllanguageCode: 'ar',

  yourVendorUserNameString: 'admin',
  yourVendorPasswordString: '3AK%mGj%r$',

  oneSignalAppIdForAndroid: '',
  webClientIdForGoogleSign: '930506877678-bf26utnomcqku7smdtquau8e7aoftc5b.apps.googleusercontent.com',
  /// //// navigation
  newProductDuration: 20,
  languageCode: 'EN',
  homeTitle: <View >
    <Image
    style={{width:70,height:70,borderRadius:50,marginLeft:Platform.OS==='ios'?167:null}}
    source={require('../images/Logo/AppLogo.png')}
    />
  </View>,
  perPageNumber: 10,

  // Banners props
  autoplay: true,
  autoplayDelay: 2,
  autoplayLoop: true,
  appInProduction: true,

  /// //////// cartWidth
  singleRowCardWidth: cardWidth,
  twoRowCardWIdth: 0.465,
  barStyle: 'light-content' // dark-content, default
}

export const appTextStyle = {
  smallSize: 11,
  mediumSize: 12,
  largeSize: 14,
  customRadius: 19,
  fontFamily: 'Montserrat-Regular',
  isDarkMode: false
}

export const appConfigStyle = { // dont change its value on run time
  cardsColor: false,
  settingsPageColor: false,
  headerMenuImage: false,
  headerSearchBar: false,
  introStyle: 1,
  headerColor: true,
  bottomNavText: false
}
export const appLightTheme = {
  StatusBarColor: '#0478ed',
  barStyle: 'light-content',
  primary: '#0478ed',
  secondry: '#ffc854',
  primaryLight: '#f1f3f2',
  primaryBackgroundColor: '#ffffff',
  secondryBackgroundColor: '#f1f1f1', // backgroundcolor black
  textColor: '#444444',
  cardTextColor: appConfigStyle.cardsColor ? '#000000' : '#444444',
  textTintColor: '#ffffff',
  iconPrimaryColor: '#9ba5a7',
  iconSecondryColor: '#000000'
}
export const appDarkTheme = {
  StatusBarColor: '#0478ed',
  barStyle: 'light-content',
  primary: '#0478ed',
  primaryLight: '#f1f3f2',
  secondry: '#ffc854',
  cardTextColor: appConfigStyle.cardsColor ? '#000000' : '#ffffff',
  primaryBackgroundColor: '#252525', //
  secondryBackgroundColor: '#252525', // backgroundcolor white
  textColor: '#ffffff',
  textTintColor: '#ffffff',
  iconPrimaryColor: '#9ba5a7',
  iconSecondryColor: '#ffffff'
}
