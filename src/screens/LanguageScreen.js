import React, { PureComponent } from 'react'
import { CardStyleInterpolators } from 'react-navigation-stack'
import {
  View,
  FlatList,
  I18nManager,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import Button from '../common/Button'
import { createSelector } from 'reselect'
import { UIActivityIndicator } from 'react-native-indicators'
import Spinner from 'react-native-loading-spinner-overlay'
import { Container, Text } from 'native-base'
import RNRestart from 'react-native-restart'
import { connect } from 'react-redux'
import { appTextStyle } from '../common/Theme.style'
import { LANG_CODE, SET_LANGUAGE, SET_LANGUAGE_ID } from '../redux/actions/actions'
const WIDTH = Dimensions.get('window').width

class Language extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
      gestureEnabled: false
    }
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language['Select Language'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      spinnerTemp: false,
      selectedItem: this.props.getSelectedlang,
      languageList: [
        {
          id: 0,
          name: 'English',
          code: 'en',
          image: require('../images/flags/english.png'),
          direction: 'ltr'
        },
        {
          id: 1,
          name: 'Arabic',
          code: 'ar',
          image: require('../images/flags/uae.png'),
          direction: 'rtl'
        }
      ]
    }
  }

  /// //////////////////////////////////////////
  updateLanguage (item) {
    this.props.setLanguageIdFun(item)
    this.props.setLanguageCodeFun(item.code)
    if (item.direction === 'rtl') {
      I18nManager.forceRTL(true)
    } else {
      I18nManager.forceRTL(false)
    }
    this.props.getTranslationData(item, this)
  }

  render () {
    return this.state.languageList.length === 0 ? (
      <View
        style={[styles.container, {
          backgroundColor: this.props.themeStyle.secondryBackgroundColor
        }]}>
        <UIActivityIndicator
          size={27}
          color={this.props.themeStyle.primary}
        />
      </View>
    ) : (
      <Container style={{ backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>
        <View style={{ backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>
          <Spinner visible={this.state.spinnerTemp} />

          <FlatList
            style={{
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              margin: 10,
              borderRadius: appTextStyle.customRadius - 8
            }}
            data={this.state.languageList}
            horizontal={false}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View
                style={[styles.listContainer, {
                  borderBottomColor: this.props.themeStyle.secondryBackgroundColor,
                  backgroundColor: this.state.selectedItem.code === item.item.code
                    ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                }]}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ selectedItem: item.item })
                  }}
                  style={styles.touchableView}>

                  <Text
                    style={[styles.nameStyle, {
                      fontSize: appTextStyle.largeSize,
                      color: this.state.selectedItem.code === item.item.code
                        ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                    }]}>
                    {item.item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

        </View>
        <View style={{
          position: 'absolute',
          bottom: 15,
          width: WIDTH
        }}>
          <Button onPress={() => {
            this.setState({ spinnerTemp: true }, () =>
              this.updateLanguage(this.state.selectedItem)
            )
          }}
          borderRadius={true}
          disable={true} themeStyle={this.props.themeStyle}
          navigation={this.props.navigation}
          title={this.props.language.Select}
          ></Button>
        </View>
      </Container>
    )
  }
}
/// ///////////////////////////////////////
const mapDispatchToProps = dispatch => ({
  setLanguageIdFun: (value) => {
    dispatch({
      type: SET_LANGUAGE_ID,
      value: value
    })
  },
  setLanguageCodeFun: (value) => {
    dispatch({
      type: LANG_CODE,
      value: value
    })
  },
  getTranslationData: (data, t) => {
    dispatch(dispatch => {
      dispatch({
        type: SET_LANGUAGE,
        payload: data
      })
      setTimeout(() => {
        t.setState({ spinnerTemp: false }, () => {
          RNRestart.Restart()
        })
      }, 1000)
    })
  }
})

const getTheme = (state) => state.appConfig.themeStyle
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)

const getLanguagesArray = (state) => state.languagesData.languages

const getSelectedlangArray = (state) => state.languagesData.selectedlang
const getLanguage = (state) => state.appConfig.languageJson
const getSelectedlangArrayFun = createSelector(
  [getSelectedlangArray],
  (getSelectedlangArray) => {
    return getSelectedlangArray
  }
)

const getLanguagesArrayFun = createSelector(
  [getLanguagesArray],
  (getLanguagesArray) => {
    return getLanguagesArray
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
  getLanguagesArray: getLanguagesArrayFun(state),
  getSelectedlang: getSelectedlangArrayFun(state),
  language: getLanguageFun(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Language)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    marginTop: 0,
    paddingVertical: 11,
    borderBottomWidth: 1
  },
  touchableView: {
    flexDirection: 'row', alignItems: 'center', padding: 0
  },
  nameStyle: {
    marginHorizontal: 10,
    fontFamily: appTextStyle.fontFamily
  }
})
