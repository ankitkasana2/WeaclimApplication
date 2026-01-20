/* eslint-disable no-useless-escape */
import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  I18nManager,
  Platform,
  Ionicons
} from 'react-native'
import { createSelector } from 'reselect'
import { UIActivityIndicator } from 'react-native-indicators'
import { getFetchHttp } from '../common/WooComFetch'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import NewsCard from '../common/NewsCard'
import CategoriesNews from '../common/CategoriesNews'
import Header from '../common/HeaderCustom'
import { Icon } from 'native-base'
import { CardStyleInterpolators } from 'react-navigation-stack'
import ImageLoad from '../common/RnImagePlaceH'

const WIDTH = Dimensions.get('window').width

class Login extends PureComponent {
  /// /////////////////////////////////////////////////////////
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
        // elevation: 0, // remove shadow on Android
        // shadowOpacity: 0 // remove shadow on iOS
      },
      headerLeft: () => <Icon
        onPress={() => { navigation.pop() }}
        name={!I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
        style={{
          color: iconColor,
          fontSize: appTextStyle.largeSize + 8,
          paddingLeft: 10

        }}
      />,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 6,
        color: iconColor
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: false
    }
  }

  /// /////////////////////////////////////////////////////////
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.language.News,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
    this.getPosts()
  }

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      spinnerTemp: false,
      selectedTab: '1',
      /// ////
      featuredPosts: [],
      indicatorValue: true,
      indicatorValue2: true,
      isRefreshing: false,
      arrayLength: 0,
      page: 1,
      callStart: true,
      page2: 1,
      categories: [],
      posts: []
    }
    this.toast = null
  }

  getPosts = async () => {
    this.setState({ temp: true })

    const productsArguments = {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    }
    // console.log(productsArguments);console.log(this.state.page);console.log(this.state.page);
    const json = await getFetchHttp(ThemeStyle.url + '/wp-json/wp/v2/posts/?page=' + this.state.page + '&' + productsArguments, {})
    if (json.status === 'success' && json.data.length > 0) {
      if (json.data !== undefined && json.data !== '' && json.data.length > 0) {
        const responce = json.data

        if (this.state.page === 1) {
          this.state.posts = []
          this.getCategories()
        }

        json.data.forEach((value, index) => {
          this.getImagePost(value)
        })
        this.setState({
          featuredPosts: json.data
        })
      }
    }

    this.setState({
      page: this.state.page,
      isRefreshing: false,
      callStart: true
    })
  }

  // getImagePost = async (post) => {
  //   post.image = require('../images/dumy.jpg')
  //   if (post._links['wp:featuredmedia']) {
  //     const json = await getFetchHttp(post._links['wp:featuredmedia'][0].href, {})
  //     if (json.status === 'success') {
  //       const responce = json.data
  //       post.image = responce.source_url
  //     }
  //   }
  //   this.setState({
  //     posts: [...this.state.posts, post],
  //     indicatorValue: false
  //   })
  // }
  getImagePost = async (post) => {
  post.image = require('../images/dumy.jpg')

  if (post._links['wp:featuredmedia']) {
    const json = await getFetchHttp(post._links['wp:featuredmedia'][0].href, {})
    if (json.status === 'success') {
      const responce = json.data
      post.image = responce.source_url
    }
  }

  this.setState(prevState => ({
    posts: [
      ...prevState.posts,
      post
    ].sort((a, b) => new Date(b.date) - new Date(a.date)), // <-- LATEST FIRST
    indicatorValue: false
  }))
}


  getCategories = async () => {
    const data = {}
    data.language_id = '1'
    data.page_number = this.state.page2

    const productsArguments = {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    }
    const json = await getFetchHttp(ThemeStyle.url + '/wp-json/wp/v2/categories/?page=' + this.state.page2 + '&' + productsArguments, {})

    if (json.data.length > 0) {
      if (this.state.page2 === 1) { this.state.categories = [] }

      json.data.forEach((value, index) => {
        this.state.categories.push(Object.assign(value, { image: require('../images/dumy.jpg') }))
      })
      this.setState({ categories: this.state.categories, page2: this.state.page2 + 1 }, () => {
        if (json.data.length === 0) { // if we get less than 10 products then infinite scroll will de disabled
          this.getRandomImage()
        } else this.getCategories()
      })
    }
    this.setState({ indicatorValue2: false })
    //   }
    // })
  };

  // <!-- 2.0 updates -->
  getRandomImage = async () => {
    try {
      this.state.categories.forEach(async (value, index) => {
        value.image = require('../images/dumy.jpg')
        const rand = this.getRandomPost()
        if (rand._links['wp:featuredmedia']) {
          const data = await getFetchHttp(rand._links['wp:featuredmedia'][0].href, {})
          if (data.status === 'success' && data.data.length > 0) {
            const responce = data.data
            value.image = responce.source_url
          }
          // })
        }
      })
    } catch (error) {

    }
  }

  getRandomPost () {
    const rand = this.state.posts[Math.floor(Math.random() * this.state.posts.length)]
    if (rand.sticky === false) return rand
    else this.getRandomPost()
  }

  convertHtmlTag = htmlprice => {
    const str = htmlprice
    return str.replace(/<[^>]*>/g, '')
  }

  openSubCategories = data => {
    this.props.navigation.navigate('NewsDetails', {
      data
    })
  }

  openSubCategories2 = data => {
    this.props.navigation.navigate('newsList', {
      data
    })
  }

  onRefreshTemp () {
    this.setState({ isRefreshing: true, page: 1 }, () => {
      this.getPosts()
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
      this.getPosts()
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

  render () {
    return (

      <View
        style={[styles.container, {
          backgroundColor: this.props.themeStyle.primaryBackgroundColor
        }]}>

        {
          this.props.navigation.state.params !== undefined
            ? this.props.navigation.state.params.headerHide === undefined
              ? <Header searchIcon={true} menuIcon={true} cartIcon={true} navigation={this.props.navigation} name={this.props.language.News}/>
              : null : null }
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
            backgroundColor: this.props.themeStyle.primary,
            color: this.props.themeStyle.primary
          }}
        />

        {/* {
          this.state.posts !== undefined ? (
            this.state.posts.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push('NewestScreen', { id: '' })
                }}>
                <ImageLoad
                  style={styles.singleBanner}
                  loadingStyle={{
                    size: 'large',
                    color: this.props.themeStyle.primary
                  }}
                  source={{
                    uri: this.state.posts[0].image !== undefined
                      ? this.state.posts[0].image
                        ? this.state.posts[0].image
                        : this.state.posts[0].image
                      : ''
                  }}
                />
              </TouchableOpacity>

            ) : null
          ) : null
        } */}

        <View style={[styles.tabContainer]}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedTab: '1' })
            }}
            style={[styles.tabText, {
              backgroundColor: this.state.selectedTab === '1' ? this.props.themeStyle.primary : '#ecf0f6'
            }]}>
            <Text style={{
              fontSize: appTextStyle.largeSize,
              paddingVertical: 6,
              fontFamily: appTextStyle.fontFamily,
              color: this.state.selectedTab === '1' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
            }}>{this.props.language.Newest}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedTab: '2' })
            }}
            style={[styles.tabText, {
              backgroundColor: this.state.selectedTab === '2' ? this.props.themeStyle.primary : '#ecf0f6'
            }]}>
            <Text style={{
              fontSize: appTextStyle.largeSize,
              paddingVertical: 6,
              fontFamily: appTextStyle.fontFamily,
              color: this.state.selectedTab === '2' ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
            }}>{this.props.language.Categories}</Text>
          </TouchableOpacity>

        </View>

        {/* <View
          style={styles.screenContainer}>
          {
            this.state.selectedTab === '1'
              ? <View style={styles.screenInnerContainer}>
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
                <FlatList
                  data={this.state.posts}
                  tabLabel={{
                    label: this.props.language.Posts
                  }}
                  showsVerticalScrollIndicator={false}
                  vertical={true}
                  listKey={'1'}
                  extraData={this.state}
                  key={'_'}
                  keyExtractor={item => '_' + item.id}
                  numColumns={1}
                  renderItem={item => (
                    <NewsCard
                      item={item.item}
                      id={item.index}
                      themeStyle={this.props.themeStyle}
                      html={this.convertHtmlTag(item.item.content.rendered)}
                      image={item.item.image === require('../images/dumy.jpg') ? require('../images/dumy.jpg') : { uri: item.item.image }}
                      openSubCategories={(t, n) => this.openSubCategories(t, n)}
                    />
                  )}
                />

              </View>
              : <View style={styles.screenInnerContainer}>

                {this.state.indicatorValue2
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
                <FlatList
                  data={this.state.categories}
                  tabLabel={{
                    label: this.props.language.Categories
                  }}
                  showsVerticalScrollIndicator={false}
                  vertical={true}
                  key={'#'}
                  keyExtractor={item => '#' + item.id}
                  extraData={this.state || this.props}
                  contentContainerStyle={{
                    alignSelf: this.state.categories.length === 1 ? 'flex-start' : 'center',
                    width: WIDTH,
                    paddingLeft:
                      WIDTH >= 375
                        ? WIDTH * 0.009
                        : WIDTH >= 300 && WIDTH <= 75
                          ? WIDTH * 0.008
                          : WIDTH * 0.004

                  }}
                  numColumns={2}
                  renderItem={item => (
                    <CategoriesNews
                      item={item.item}
                      id={item.index}
                      posts2={this.state.posts}
                      posts={this.state.categories}
                      themeStyle={this.props.themeStyle}
                      image={item.item.image === require('../images/dumy.jpg') ? require('../images/dumy.jpg') : item.item.image}
                      openSubCategories2={t => this.openSubCategories2(item.item)}
                    />
                  )}
                />

              </View>}

        </View> */}
      </View>

    //    )}
    //  />
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
    flex: 1
    // justifyContent: 'space-between',
    // alignItems: 'center'
  },
   backIconView: {
    padding: 10,
    alignSelf: 'flex-start'
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
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
    marginLeft: 5,
    alignSelf: 'center'
    // height: 1
  },
  tabText: {
    paddingBottom: 3,
    borderRadius: 30,
    width: WIDTH * 0.45,
    height: 40,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  singleBanner: {
    width: WIDTH,
    height: 200,
    marginTop: 0,
    marginBottom: 15
  },
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenInnerContainer: {
    flex: 1
  }
})
export default connect(mapStateToProps, null)(Login)
