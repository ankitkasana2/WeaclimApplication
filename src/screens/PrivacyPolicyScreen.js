import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { UIActivityIndicator } from 'react-native-indicators'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import { createSelector } from 'reselect'
import { appTextStyle } from '../common/Theme.style'
class TermAndCon extends PureComponent {
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
      headerTitle: this.props.language['Privacy Policy'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      spinnerTemp: false,
      privacyPolicy: this.props.settings
    }
  }

  /// ///////////////////////////////////////
  render () {
    return (
      this.state.spinnerTemp ? (
        <View
          style={[styles.activityIndicatorContainer, {
            backgroundColor: this.props.themeStyle.primaryBackgroundColor
          }]}>
          <UIActivityIndicator
            size={27}
            color={this.props.themeStyle.primary}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{
          flex: 1,
          padding: 6,
          backgroundColor: this.props.themeStyle.secondryBackgroundColor
        }}>

          {this.state.privacyPolicy !== undefined && this.state.privacyPolicy !== ''
            ? <View>
              <HTML
                html={this.state.privacyPolicy}
                baseFontStyle={{
                  fontSize: appTextStyle.largeSize,
                  color: this.props.themeStyle.textColor
                }}
              />
            </View>
            : <View style={{ flex: 1, alignSelf: 'center', marginTop: 30 }}>
              <Text
                style={{
                  fontSize: appTextStyle.largeSize + 2,
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor
                }}>
                {
                  this.props.language[
                    'No Products Found'
                  ]
                }
              </Text>
            </View>
          }

        </ScrollView>
      )
    )
  }
}
const getTheme = (state) => state.appConfig.themeStyle
const getLanguage = (state) => state.appConfig.languageJson
const getSettings = (state) => state.settingsCall.privacyPolicy
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
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  settings: getSettingsFun(state),
  language: getLanguageFun(state)
})

export default connect(mapStateToProps, null)(TermAndCon)

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
