import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView,
  RefreshControl
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { getUrl, postHttp, postFetchHttp, getHttp } from '../common/WooComFetch'
import { UIActivityIndicator } from 'react-native-indicators'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createSelector } from 'reselect'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class DownloadScreen extends PureComponent {
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

  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language.Downloads,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      spinnerTemp: true,
      pointsArray: [],
      spinVar: false,
      isRefreshing: false
    }
    this.toast = null
    this.getData()
  }

  getData = async () => {
    const json = await getHttp('customers/' + this.props.userData.id + '/downloads', {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    })
    this.setState({
      pointsArray: json.data.length > 0 ? json.data : [],
      spinnerTemp: false,
      isRefreshing: false
    })
  }

  singaleRow (placeholderText, name, check, Status) {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          padding: 6,
          flexDirection: 'row',
          backgroundColor:
            Status === 'Status' && name === 'pending'
              ? 'yellow'
              : Status === 'Status' && name === 'refunded'
                ? 'orange'
                : Status === 'Status' && name === 'cancelled'
                  ? 'red'
                  : Status === 'Status' && name === 'failed'
                    ? 'gray'
                    : Status === 'Status' && name === 'processing'
                      ? 'blue'
                      : Status === 'Status' && name === 'completed'
                        ? 'green'
                        : this.props.themeStyle.primaryBackgroundColor
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color:
              Status === 'Status' && name === 'pending'
                ? this.props.themeStyle.textColor
                : Status === 'Status' && name === 'refunded'
                  ? this.props.themeStyle.textColor
                  : Status === 'Status' && name === 'cancelled'
                    ? this.props.themeStyle.textColor
                    : Status === 'Status' && name === 'failed'
                      ? this.props.themeStyle.textColor
                      : Status === 'Status' && name === 'processing'
                        ? this.props.themeStyle.textColor
                        : Status === 'Status' && name === 'completed'
                          ? this.props.themeStyle.textColor
                          : this.props.themeStyle.primary,
            paddingTop: 3
          }}>
          {placeholderText}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color:
              Status === 'Status' && name === 'pending'
                ? this.props.themeStyle.textColor
                : Status === 'Status' && name === 'refunded'
                  ? this.props.themeStyle.textColor
                  : Status === 'Status' && name === 'cancelled'
                    ? this.props.themeStyle.textColor
                    : Status === 'Status' && name === 'failed'
                      ? this.props.themeStyle.textColor
                      : Status === 'Status' && name === 'processing'
                        ? this.props.themeStyle.textColor
                        : Status === 'Status' && name === 'completed'
                          ? this.props.themeStyle.textColor
                          : themeStyle.textContrast,
            fontWeight: check === 1 ? 'bold' : 'normal'
          }}>
          {name}
        </Text>
      </View>
    )
  }

  onRefreshTemp () {
    this.setState({ isRefreshing: true, page: 1 }, () => {
      this.getData()
    })
  }

  cardView = (label, label2, points, key) => (
    <View key={key} style={[styles.totalView, styles.cardMainView, {
      backgroundColor: this.props.themeStyle.primaryBackgroundColor,
      borderBottomColor: this.props.themeStyle.primaryLight
    }]}>
      <Ionicons
        name={'gift-outline'}
        style={{
          color: this.props.themeStyle.textColor,
          fontSize: appTextStyle.largeSize + 10
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: appTextStyle.largeSize + 2,
          fontWeight: 'bold',
          fontFamily: appTextStyle.fontFamily,
          color: this.props.themeStyle.textColor,
          width: WIDTH * 0.6,
          textAlign: 'center'
        }}>{label + ' ' + label2}</Text>
      <Text style={{
        fontSize: appTextStyle.smallSize + 2,
        fontFamily: appTextStyle.fontFamily,
        color: this.props.themeStyle.primary
      }}>{points}</Text>
    </View>
  )

  /// ///////////////////////////////////////
  render () {
    return (
      this.state.spinnerTemp ? (
        <View
          style={[styles.activityIndicatorContainer, {
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}>
          <UIActivityIndicator
            size={27}
            color={this.props.themeStyle.primary}
          />
        </View>
      ) : (
        <SafeAreaView style={[styles.modalContainer, {
          backgroundColor: this.props.themeStyle.secondryBackgroundColor
        }]}>
          <Toast
            ref={ref => { this.toast = ref }}
            style={{
              backgroundColor: '#c1c1c1'
            }}
            position='bottom'
            positionValue={300}
            fadeOutDuration={7000}
            textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.mediumSize }}
          />

          <Spinner
            visible={this.state.spinVar}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, {
            backgroundColor: this.props.themeStyle.secondryBackgroundColor
          }]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefreshTemp.bind(this)}
            />
          }
          >
            {this.state.pointsArray.length === 0 && !this.state.spinnerTemp
              ? <Text
                style={{
                  fontSize: appTextStyle.largeSize + 2,
                  textAlign: 'center',
                  margin: 2,
                  color: this.props.themeStyle.textColor,
                  alignSelf: 'center',
                  marginTop: HEIGHT * 0.4
                }}>
                {
                  this.props.language[
                    'Your Download List is Empty'
                  ]
                }
              </Text> : null }
            {this.state.pointsArray.map((value, key) => (

              <View
                style={{
                  backgroundColor: this.props.themeStyle.primaryBackgroundColor,
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: this.props.themeStyle.primaryLight,
                  shadowOpacity: 0.5,
                  margin: 10,
                  marginTop: 3,
                  marginBottom: 5,
                  elevation: 5
                }}>
                <View
                  style={{
                    justifyContent: 'space-between'
                  }}>
                  <View style={{ padding: 5 }}>
                    {this.singaleRow(
                      this.props.language.Product,
                        `#${value.product_name}`,
                        0
                    )}

                    {this.singaleRow(
                      this.props.language[
                        'Downloads remaining'
                      ],
                      value.downloads_remaining,
                      1,
                      'Status'
                    )}
                    {value.access_expires === 'never'
                      ? this.singaleRow(
                        this.props.language.Expires,
                        value.access_expires,
                        0
                      )
                      : this.singaleRow(
                        value.date.substr(
                          0,
                          value.access_expires.indexOf(' ')
                        ),
                        value.access_expires,
                        0
                      )}

                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        Linking.canOpenURL(value.download_url)
                          .then(supported => {
                            if (!supported) {
                            } else {
                              return Linking.openURL(value.download_url)
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
                          justifyContent: 'center',
                          width: '100%'
                        }}>
                        <Text
                          style={{
                            color: this.props.themeStyle.textColor,
                            fontSize: 17,
                            paddingTop: 1
                          }}>
                          {this.props.language.Test}
                        </Text>
                        <Icon
                          name={'download'}
                          style={{
                            color: this.props.themeStyle.textColor,
                            fontSize: 22,
                            paddingLeft: 5
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

        </SafeAreaView>
      )
    )
  }
}
const getTheme = (state) => state.appConfig.themeStyle
const getSettings = (state) => state.settingsCall.settings
const getLanguage = (state) => state.appConfig.languageJson
const getUserData = (state) => state.userData.user
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
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  settings: getSettingsFun(state),
  language: getLanguageFun(state),
  userData: getUserDataFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state)
})

export default connect(mapStateToProps, null)(DownloadScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  totalPointsText: {
    fontWeight: 'bold',
    paddingHorizontal: 3
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardMainView: {
    width: WIDTH * 0.95,
    alignSelf: 'center',
    paddingVertical: 12,
    marginBottom: 8,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderRadius: appTextStyle.customRadius - 15
  },
  btnView: {
    paddingTop: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1
  },
  totalView: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  textView: {
    alignItems: 'center',
    width: WIDTH * 0.8,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: appTextStyle.customRadius
  }
})
