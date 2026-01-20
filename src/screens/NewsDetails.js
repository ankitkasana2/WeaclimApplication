import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Linking,
  Dimensions,
  Platform,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import { createSelector } from 'reselect'
import WebView from 'react-native-webview'
import { CardStyleInterpolators } from 'react-navigation-stack'
import HTML from 'react-native-render-html'
import ImageLoad from '../common/RnImagePlaceH'
import { Icon } from 'native-base'
import themeStyle, { appTextStyle } from '../common/Theme.style'
const WIDTH = Dimensions.get('window').width
class NewDetail extends PureComponent {
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

  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language['News Details'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: appTextStyle.textColor
    })
  }

  render () {
    return Platform.OS === 'android' ? (
      <View style={{
        flex: 1,
        backgroundColor: this.props.themeStyle.primaryBackgroundColor
      }}>
        <ScrollView>
          <ImageLoad
            key={this.props.navigation.state.params.data.id}
            style={{
              height: 380,
              width: Dimensions.get('window').width,
              overflow: 'hidden'
            }}
            placeholder={false}
            ActivityIndicator={true}
            placeholderStyle={{ width: 0, height: 0 }}
            backgroundColor='transparent'
            color='transparent'
            source={
              this.props.navigation.state.params.data.image
            }
          />
          <View
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 10,
              paddingRight: 10
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: this.props.themeStyle.primaryBackgroundColor
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  margin: 5,
                  marginTop: 0,
                  fontFamily: appTextStyle.fontFamily,
                  color: this.props.themeStyle.textColor,
                  width: WIDTH * 0.7
                }}>
                {this.props.navigation.state.params.data.title.rendered}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name={'time'}
                  style={{
                    color: 'gray',
                    fontSize: 20,
                    paddingRight: 6,
                    paddingTop: 1,
                    paddingLeft: 5
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'normal',
                    paddingBottom: 2,
                    fontFamily: appTextStyle.fontFamily,
                    color: '#51534f',
                    fontSize: 17
                  }}>
                  {this.props.navigation.state.params.data.date}
                </Text>
              </View>
            </View>

            <HTML
              onLinkPress={(event, href) => {
                Linking.openURL(href)
              }}
              html={this.props.navigation.state.params.data.content.rendered}
              imagesMaxWidth={Dimensions.get('window').width - 20}
              allowFontScaling
              imagesInitialDimensions={{ width: 100, height: 100 }}
              baseFontStyle={{ fontSize: 16, color: this.props.themeStyle.textColor }}
            />
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={{
        flex: 1,
        backgroundColor: this.props.themeStyle.primaryBackgroundColor
      }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: this.props.themeStyle.primaryBackgroundColor
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              margin: 5,
              marginTop: 0,
              fontFamily: appTextStyle.fontFamily,
              color: this.props.themeStyle.textColor,
              width: WIDTH * 0.7
            }}>
            {this.props.navigation.state.params.data.title.rendered}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name={'time'}
              style={{
                color: 'gray',
                fontSize: 20,
                paddingRight: 6,
                paddingLeft: 5
              }}
            />
            <Text
              style={{
                fontWeight: 'normal',
                padding: 1,
                fontFamily: appTextStyle.fontFamily,
                color: '#51534f',
                fontSize: 17
              }}>
              {this.props.navigation.state.params.data.date}
            </Text>
          </View>
        </View>
        <WebView
          originWhitelist={['*']}
          source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>' + this.props.navigation.state.params.data.content.rendered + '</p></body></html>' }}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            color: this.props.themeStyle.textColor,
            fontSize: 30
          }}
          scrollEnabled
        />
      </View>
    )
  }
}

const getTheme = (state) => state.appConfig.themeStyle
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
  isLoading: state
})

export default connect(mapStateToProps, null)(NewDetail)
