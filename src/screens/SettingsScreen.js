/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Switch,
  Dimensions,
  Platform,
  I18nManager,
  SafeAreaView,
  Modal,
  Image,
  Share
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { createSelector } from 'reselect'
import {
  setModeValue,
  logOut
} from '../redux/actions/actions'
import ImageLoad from '../common/RnImagePlaceH'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { NavigationEvents } from 'react-navigation'
import { appConfigStyle, appTextStyle } from '../common/Theme.style'
import RateUsButton from './RateUs'
// import { GoogleSignin } from '@react-native-community/google-signin'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import ShoppingCartIcon from '../common/ShoppingCartIcon1'
import Spinner from 'react-native-loading-spinner-overlay'
import { ScrollView } from 'react-native-gesture-handler'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
class CreateAccount extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerTitle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerTitle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      // headerLeft: () => <TouchableOpacity onPress={navigation.getParam('setModalFun')}>
      //   {/* <Ionicons
      //     name={'settings-outline'}
      //     style={{
      //       color: iconColor,
      //       fontSize: appTextStyle.largeSize + 4,
      //       padding: 10
      //     }}
      //   /> */}
      // </TouchableOpacity>,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colorProps,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 2,
        color: iconColor
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: false
    }
  }

  /// /////////////////////////////////////////////////////////

  componentDidMount () {
    this.props.navigation.setParams({
      // headerTitle: this.props.isLoading.appConfig.languageJson.Account,
      headerTitle: '',
      colorProps: this.props.themeStyle.primary,
      iconColor: this.props.themeStyle.textTintColor,
      setModalFun: this.setModal
    })
  }

  setModal = () => {
    this.setState({ isModalVisible: true })
  };

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      errorMessage: '',
      spinnerTemp: false,
      switch1Value: false,
      switch2Value: false,
      isModalVisible: false
    }
  }

  /// ////////////////////////////////////////////////////
  toggleSwitch1 = value => {
    this.props.setModeValue(!this.props.isDarkMode)
    this.setState({ isModalVisible: false }, () => {
      this.props.navigation.navigate('Home')
    })
  }
  /// /////////////////////////////////////////

   onShare = async () => {
     try {
       let result = ''
       if (Platform.OS === 'android') {
         result = await Share.share({
           message: `https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`
         })
       } else {
         DeviceInfo.getBuildId().then(async (buildId) => {
           result = await Share.share({
             message: `https://play.google.com/store/apps/details?id=${buildId}`
           })
         })
       }
       if (result.action === Share.sharedAction) {
         if (result.activityType) {
         } else {
         }
       } else if (result.action === Share.dismissedAction) {
       }
     } catch (error) {
       Alert.alert(error.message)
     }
   }

  ///
  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess()
  //     await GoogleSignin.signOut()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  checkShareComponent = (heading, points, icon, backColor, borderColor) => (
    <TouchableOpacity style={{
      width: WIDTH * 0.45,
      backgroundColor: backColor,
      flexDirection: 'row',
      borderRadius: 4,
      margin: 8,
      padding: 5,
      paddingHorizontal: 0,
      borderWidth: 1,
      borderColor: borderColor
    }}>

      <View style={{ padding: 18 }}>
        <Text
          style={{
            color: '#000',
            fontSize: appTextStyle.mediumSize,
            fontFamily: appTextStyle.fontFamily,
            paddingBottom: 6
          }}>
          {heading}
        </Text>

        <Text style={{
          color: this.props.themeStyle.primary,
          fontSize: appTextStyle.smallSize - 1,
          fontFamily: appTextStyle.fontFamily
        }}>
          {points}
        </Text>
      </View>

      <View style={{
        backgroundColor: borderColor,
        padding: 12,
        alignSelf: 'center',
        borderRadius: 30,
        right: 10,
        position: 'absolute'
      }}>
        <Image style={{ height: 28, width: 30 }}
          source={icon}
        />
      </View>

    </TouchableOpacity>
  )

  /// ////////////////////////////////////////////
  categoryFun (text, iconName, nav, font, borderWidth) {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            width: WIDTH * 0.94,
            alignSelf: 'center'
          }}>
          {nav === 'rate1' ? (
            <RateUsButton
              text={text}
              iconName={iconName}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onPress={() => {
                text ===
                  this.props.isLoading.appConfig.languageJson['Official Website']
                  ? Linking.openURL(nav)
                  : text !==
                    this.props.isLoading.appConfig.languageJson[
                      'Dark Mode'
                    ] &&
                    text !==
                    this.props.isLoading.appConfig.languageJson[
                      'Light Mode'
                    ] ? this.setState({
                      isModalVisible: false
                    }, () => {
                      this.props.navigation.navigate(nav)
                    }) : null
              }}>
              <View style={styles.tabComponents}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: appTextStyle.mediumSize + 1,
                    fontFamily: appTextStyle.fontFamily,
                    color: this.props.themeStyle.textColor
                  }}>{text}</Text>
                </View>

                {text ===
                  this.props.isLoading.appConfig.languageJson[
                    'Dark Mode'
                  ] ? (
                    <View style={{ marginLeft: 60, position: 'absolute', right: 0 }}>
                      <Switch
                        thumbColor={this.props.themeStyle.primary}
                        style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }}
                        onValueChange={() => this.toggleSwitch1(false)}
                        value={this.state.switch1Value}
                      />
                    </View>
                  ) : text ===
                  this.props.isLoading.appConfig.languageJson[
                    'Light Mode'
                  ] ? (
                      <View style={{ marginLeft: 60, position: 'absolute', right: 0 }}>
                        <Switch
                          thumbColor={this.props.themeStyle.primary}
                          style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }}
                          onValueChange={() => this.toggleSwitch1(true)}
                          value={this.state.switch2Value}
                        />
                      </View>
                    ) : (
                      <Ionicons
                        name={I18nManager.isRTL ? 'chevron-back-outline' : 'chevron-forward-outline'}
                        style={{
                          color: this.props.themeStyle.iconPrimaryColor,
                          fontSize: appTextStyle.largeSize
                        }}
                      />
                    )}
              </View>
            </TouchableOpacity>
          )}
        </View>
        {!borderWidth
          ? <View
            style={{
              width: WIDTH * 0.9299,
              height: 1,
              backgroundColor: this.props.themeStyle.primary
            }}
          /> : null}
      </View>
    )
  }

  /// ////////////////////////////////////////////
  render () {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.themeStyle.secondryBackgroundColor
        }}>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

          {/* <Modal onRequestClose={() => {
            this.setState({
              isModalVisible: false
            })
          }} visible={this.state.isModalVisible} animationType={'fade'}>

            <SafeAreaView style={[styles.modalContainer, { backgroundColor: this.props.themeStyle.secondryBackgroundColor }]}>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: WIDTH
              }}>

                <TouchableOpacity style={{
                  zIndex: 12
                }} onPress={() => this.setState({
                  isModalVisible: false
                })}>
                  <Ionicons
                    name={'close'}
                    style={{
                      color: this.props.themeStyle.textColor,
                      fontSize: appTextStyle.largeSize + 6,
                      padding: 15
                    }}
                  />
                </TouchableOpacity>
                <Text style={{
                  fontSize: appTextStyle.largeSize + 2,
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor,
                  alignSelf: 'center',
                  position: 'absolute',
                  width: WIDTH,
                  textAlign: 'center',
                  fontWeight: 'bold'

                }}>
                  {
                    this.props.isLoading.appConfig.languageJson.Settings
                  }
                </Text>
              </View>

              <View style={{
                borderRadius: appTextStyle.customRadius,
                backgroundColor: this.props.themeStyle.primaryBackgroundColor,
                width: WIDTH * 0.93,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: this.props.themeStyle.primary
              }}>

                {this.categoryFun(!this.props.isDarkMode
                  ? this.props.isLoading.appConfig.languageJson[
                    'Dark Mode'
                  ] : this.props.isLoading.appConfig.languageJson[
                    'Light Mode'
                  ],
                'globe',
                'LanguageScreen'
                )}

                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['Select Language'],
                  'globe',
                  'LanguageScreen'
                )}
                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['Select Currency'],
                  'logo-usd',
                  'CurrencyScreen'
                )}
                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['About Us'],
                  'md-albums',
                  'AboutScreen'
                )}
                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['Privacy Policy'],
                  'cart',
                  'PrivacyPolicyScreen'
                )
                }
                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['Term and Services'],
                  'md-call',
                  'TermAndServiceScreen'
                )}

                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['Refund Policy'],
                  'md-albums',
                  'RefundPolicy'
                )}

                {this.categoryFun(
                  this.props.isLoading.appConfig.languageJson['Contact Us'],
                  'md-call',
                  'ContactUsScreen',
                  false,
                  true
                )}
              </View>

              {this.props.userData !== undefined

                ? Object.keys(this.props.userData).length !== 0
                  ? (
                    <TouchableOpacity
                      style={{
                        paddingTop: 25,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: appTextStyle.customRadius
                      }}
                      onPress={() => {
                        this.setState({
                          spinnerTemp: true,
                          isModalVisible: false
                        }, () => {
                          this.props.logOutCall(this)
                        })
                      }}
                    >
                      <View
                        style={{
                          alignItems: 'center',
                          width: WIDTH * 0.93,
                          backgroundColor: this.props.themeStyle.primary,
                          justifyContent: 'center',
                          borderRadius: appTextStyle.customRadius

                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: appTextStyle.fontFamily,
                            fontSize: appTextStyle.largeSize,
                            color: this.props.themeStyle.textTintColor,
                            padding: 10
                          }}>
                          {this.props.isLoading.appConfig.languageJson['Log Out']}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null : null}
            </SafeAreaView>
          </Modal> */}
          <View
            style={{
              flex: 1,
              backgroundColor: this.props.themeStyle.secondryBackgroundColor,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 30
            }}>
            <Spinner
              visible={this.state.spinnerTemp}
              textStyle={styles.spinnerTextStyle}
            />
            <NavigationEvents
              onDidFocus={() => {
                this.setState({})
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: this.props.themeStyle.primary,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 30
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (Object.keys(this.props.userData).length === 0) { this.props.navigation.navigate('LOGIN') }
                }}>
                <View
                  style={{
                    height: 100,
                    width: WIDTH,
                    backgroundColor: this.props.themeStyle.primary
                  }} >
                  <View style={styles.textImageContainer}>
                    <ImageLoad
                      key={0}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30
                      }}

                      source={require('../images/avatar.png')}
                      borderRadius={50 / 2}
                    />
                    <View>

                      <View>
                        <Text style={{
                          fontSize: appTextStyle.largeSize + 2,
                          fontFamily: appTextStyle.fontFamily,
                          fontWeight: '600',
                          color: this.props.themeStyle.textTintColor,
                          paddingTop: 0,
                          marginLeft: 15
                        }}>

                          {
                            this.props.userData !== undefined

                              ? Object.keys(this.props.userData).length === 0
                                ? this.props.isLoading.appConfig.languageJson[
                                  'Login & Register'
                                ] : this.props.userData.first_name + ' ' +
                                this.props.userData.last_name : this.props.isLoading.appConfig.languageJson[
                                'Login & Register'
                              ]
                          }
                        </Text>

                      </View>

                    </View>
                  </View>
                </View>

              </TouchableOpacity>

            </View>

            {/* ///////////////////////////// */}

            <View style={{
              backgroundColor: appConfigStyle.settingsPageColor ? '#eaf3de'
                : this.props.themeStyle.primaryBackgroundColor,
              width: '94%',
              height: HEIGHT * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
              borderRadius: appTextStyle.customRadius,
              borderWidth: appConfigStyle.settingsPageColor ? 1 : 0,
              borderColor: '#afdf93',
              paddingTop: Platform.OS === 'android' ? '12%' : '10%',

              shadowOffset: { width: 1, height: 1 },
              shadowColor: '#000',
              shadowOpacity: appConfigStyle.settingsPageColor ? 0 : 0.2,
              elevation: appConfigStyle.settingsPageColor ? 0 : 2
            }}>

              <TouchableOpacity
                onPress={() => {
                  if (Object.keys(this.props.userData).length !== 0) {
                    this.props.navigation.navigate('MyOrdersScreen', {
                      selectedTab: '1'
                    })
                  } else {
                    this.props.navigation.navigate('LOGIN')
                  }
                }}
                style={{
                  flexDirection: 'row',
                  width: '92%',
                  justifyContent: 'space-between',
                  padding: 5,
                  paddingTop: 0,
                  alignItems: 'center',
                  marginTop: Platform.OS === 'android' ? -45 : -42,
                  marginBottom: 6
                }}>
                <Text style={{
                  color: '#444444',
                  fontSize: appTextStyle.largeSize - 1,
                  fontFamily: appTextStyle.fontFamily
                }}>{this.props.language['My Orders']}</Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    color: '#444444',
                    fontSize: appTextStyle.smallSize,
                    fontFamily: appTextStyle.fontFamily,
                    paddingLeft: 5,
                    paddingRight: 5
                  }}>{this.props.language['View All']}</Text>

                  <FontIcon
                    name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                    style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 5
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}>
                <TouchableOpacity
                  onPress={() => {
                    if (Object.keys(this.props.userData).length !== 0) {
                      this.props.navigation.navigate('MyOrdersScreen', {
                        selectedTab: '1'
                      })
                    } else {
                      this.props.navigation.navigate('LOGIN')
                    }
                  }}style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons
                    name={'cube-outline'}
                    style={{
                      color: '#444444',
                      fontSize: appTextStyle.largeSize + 16
                    }}
                  />
                  <Text style={{
                    color: '#444444',
                    fontSize: appTextStyle.mediumSize - 1,
                    fontFamily: appTextStyle.fontFamily
                  }}>{this.props.language.InProgress}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (Object.keys(this.props.userData).length !== 0) {
                      this.props.navigation.navigate('MyOrdersScreen', {
                        selectedTab: '2'
                      })
                    } else {
                      this.props.navigation.navigate('LOGIN')
                    }
                  }}
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons
                    name={'airplane-outline'}
                    style={{
                      color: '#444444',
                      fontSize: appTextStyle.largeSize + 16
                    }}
                  />
                  <Text style={{
                    color: '#444444',
                    fontSize: appTextStyle.mediumSize - 1,
                    fontFamily: appTextStyle.fontFamily
                  }}>{this.props.language.Delivered}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    if (Object.keys(this.props.userData).length !== 0) {
                      this.props.navigation.navigate('MyOrdersScreen', {
                        selectedTab: '3'
                      })
                    } else {
                      this.props.navigation.navigate('LOGIN')
                    }
                  }}
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons
                    name={'chatbox-ellipses-outline'}
                    style={{
                      color: '#444444',
                      fontSize: appTextStyle.largeSize + 16
                    }}
                  />
                  <Text style={{
                    color: '#444444',
                    fontSize: appTextStyle.mediumSize - 1,
                    fontFamily: appTextStyle.fontFamily
                  }}>{this.props.language.Reviews}</Text>
                </TouchableOpacity> */}

              </View>

            </View>

            <View height={1} />
            {Object.keys(this.props.userData).length !== 0
              ? <View style={{
                width: '94%',
                borderRadius: appTextStyle.customRadius,
                height: HEIGHT * 0.23,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '3%',
                paddingTop: Platform.OS === 'android' ? HEIGHT * 0.07 : HEIGHT * 0.05,
                backgroundColor: appConfigStyle.settingsPageColor ? '#fbe5e2'
                  : this.props.themeStyle.primaryBackgroundColor,
                borderWidth: appConfigStyle.settingsPageColor ? 1 : 0,
                borderColor: '#ffd8d2',

                shadowOffset: { width: 1, height: 1 },
                shadowColor: '#000',
                shadowOpacity: appConfigStyle.settingsPageColor ? 0 : 0.2,
                elevation: appConfigStyle.settingsPageColor ? 0 : 2
              }}>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '92%',
                    justifyContent: 'space-between',
                    padding: 5,
                    paddingTop: 0,
                    alignItems: 'center',
                    marginTop: Platform.OS === 'android' ? -52 : -42,
                    marginBottom: 5
                  }}>
                  <Text style={{
                    color: '#444444',
                    fontSize: appTextStyle.largeSize - 1,
                    fontFamily: appTextStyle.fontFamily
                  }}>{this.props.language['Help & info']}</Text>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.smallSize,
                      fontFamily: appTextStyle.fontFamily,
                      paddingLeft: 5,
                      paddingRight: 5
                    }}></Text>
                  </View>
                </TouchableOpacity>

                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 12,
                  marginLeft: 0
                }}>
                  <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('MyAccountScreen') }}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Ionicons
                      name={'md-person-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson['Edit Profile']}</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 9
                  }}
                  onPress={() => { this.props.navigation.navigate('AdressesScreen') }}>
                    <Ionicons
                      name={'location-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson.Address}</Text>
                  </TouchableOpacity> */}

                  {/* <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('DownloadScreen') }}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Ionicons
                      name={'md-download-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson.Downloads}</Text>
                  </TouchableOpacity> */}

                  {/* <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                      this.props.navigation.navigate('NewsScreen', {
                        headerHide: '1'
                      })
                    }}>
                    <Ionicons
                      name={'newspaper-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson.News}</Text>
                  </TouchableOpacity> */}

                </View>

                {/* //////////////////// */}

                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 12,
                  marginLeft: 0
                }}>
                  {/* <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 0
                  }}
                  onPress={() => { this.props.navigation.navigate('ContactUsScreen') }}>
                    <Ionicons
                      name={'md-cash-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson['Scratch Cards']}</Text>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: -3
                    }}
                    onPress={() => { this.props.navigation.navigate('RewardPoints') }}>
                    <Ionicons
                      name={'gift-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson['Reward Points']}</Text>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 7
                  }}
                  onPress={() => { this.props.navigation.navigate('ContactUsScreen') }}>
                    <Ionicons
                      name={'md-call-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson['Contact Us']}</Text>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 9
                    }}
                    onPress={() => { this.onShare() }}>
                    <Ionicons
                      name={'share-outline'}
                      style={{
                        color: '#444444',
                        fontSize: appTextStyle.largeSize + 12,
                        alignSelf: 'center',
                        paddingVertical: 1
                      }}
                    />
                    <Text style={{
                      color: '#444444',
                      fontSize: appTextStyle.mediumSize - 1,
                      fontFamily: appTextStyle.fontFamily
                    }}>{this.props.isLoading.appConfig.languageJson.Share}</Text>
                  </TouchableOpacity> */}

                </View>
              </View>
              : null}
          </View>

        </ScrollView>

      </View>
    )
  }
}

const getTheme = (state) => state.appConfig.themeStyle
const getUserData = (state) => state.userData.user
const getLanguage = (state) => state.appConfig.languageJson
const getSettings = (state) => state.settingsCall.settings
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
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
/// ///////////////////////////////////////////////
const mapStateToProps = state => {
  return {
    themeStyle: getThemeFun(state),
    userData: getUserDataFun(state),
    isLoading: state,
    isDarkMode: state.appConfig.isDarkMode,
    language: getLanguageFun(state),
    settings: getSettingsFun(state)

  }
}
const mapDispatchToProps = dispatch => ({
  logOutCall: (th) => {
    dispatch(async dispatch => {
      await logOut(dispatch, th)
    })
  },
  setModeValue: (id) => dispatch(setModeValue(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

const styles = StyleSheet.create({
  textImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: WIDTH,
    zIndex: 9,
    position: 'absolute',
    flex: 1,
    padding: 30,
    paddingTop: 40,
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1
  },
  tabComponents: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 13
  }
})
