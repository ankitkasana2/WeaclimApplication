import React, { Component } from 'react'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { View, FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
import NewsCard from '../common/NewsCard'
import SyncStorage from 'sync-storage'
import { getFetchHttp } from '../common/WooComFetch'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import { createSelector } from 'reselect'
import { UIActivityIndicator } from 'react-native-indicators'
class RewardPoints extends Component {
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
      gestureEnabled: false
    }
  }

  componentDidMount () {
    this.getPosts()
    this.props.navigation.setParams({
      headerTitle: this.props.language['News List'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: appTextStyle.textColor
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      page2: 1,
      page: 1,
      posts: [],
      name: this.props.navigation.state.params.data.name,
      id: this.props.navigation.state.params.data.id,
      refreshing: false,
      tempRef: true
    }
  }

  //= ===========================================================================================
  // getting list of posts
  getPosts = async () => {
    this.setState({ temp: true })

    const productsArguments = {
      lang: this.props.languageCode,
      currency: this.props.currencyCode
    }

    const json = await getFetchHttp(ThemeStyle.url + '/wp-json/wp/v2/posts/?categories=' + this.state.id + '&page=' + this.state.page + '&' + productsArguments, {})
    if (json.status === 'success' && json.data !== undefined && json.data !== '') {
      if (json.data.length > 0) {
        if (this.state.page === 1) {
          this.state.posts = []
        }

        json.data.forEach((value, index) => {
          this.getImagePost(value)
        })
        this.setState({
          featuredPosts: json.data
        })
      } else {
        this.setState({
          tempRef: false
        })
      }
    }

    this.setState({
      page: this.state.page,
      refreshing: false,
      callStart: true
    })
  }

  getImagePost = async (post) => {
    post.image = require('../images/dumy.jpg')
    if (post._links['wp:featuredmedia']) {
      const json = await getFetchHttp(post._links['wp:featuredmedia'][0].href, {})
      if (json.status === 'success') {
        const responce = json.data
        post.image = responce.source_url
      }
    }
    this.setState({
      posts: [...this.state.posts, post],
      indicatorValue: false
    })
  }

  //= ===========================================================================================
  convertHtmlTag = htmlprice => {
    const str = htmlprice
    return str.replace(/<[^>]*>/g, '')
  }

  /// ///////////////////////////////////
  renderFooter = () => (
    <View
      style={{
        marginBottom: 130,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center'
      }}>
      {this.state.refreshing && this.state.posts.length !== 0 ? (
        <View
          style={{
            marginTop: 30
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

  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
  )

  openSubCategories = data => {
    this.props.navigation.navigate('NewsDetails', {
      data
    })
  }

  temp = () => {
    if (this.state.posts.length % 10 === 0) {
      this.setState({ refreshing: true, page2: this.state.page2 + 1 }, () => {
        this.getPosts()
      })
    } else if (
      this.state.posts.length === 0
    ) {
      this.setState({
        refreshing: false
      })
    }
  }

  render () {
    return this.state.tempRef && this.state.posts.length === 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.themeStyle.primaryBackgroundColor
        }}>
        <UIActivityIndicator
          size={27}
          style={{ height: 20, marginTop: 30, alignSelf: 'center' }}
          color={this.props.themeStyle.primary}
        />
      </View>
    ) : (
      <View style={{ backgroundColor: this.props.themeStyle.primaryBackgroundColor, flex: 1 }}>
        <FlatList
          data={this.state.posts}
          tabLabel={{
            label: this.props.isLoading.appConfig.languageJson.newest
          }}
          showsVerticalScrollIndicator={false}
          vertical
          listKey={'123'}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={item => (
            <NewsCard
              item={item.item}
              id={item.index}
              themeStyle= {this.props.themeStyle}

              html={this.convertHtmlTag(item.item.content.rendered)}
              image={item.item.image === require('../images/dumy.jpg') ? require('../images/dumy.jpg') : { uri: item.item.image }}
              openSubCategories={(t, n) => this.openSubCategories(t, n)}
            />
          )}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => this.renderFooter()}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false
          }}
          onEndReached={() => {
            if (!this.onEndReachedCalledDuringMomentum) {
              this.temp()
              this.onEndReachedCalledDuringMomentum = true
            }
          }}
        />
      </View>
    )
  }
}

const getTheme = (state) => state.appConfig.themeStyle
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
  isLoading: state,
  language: getLanguageFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state)
})

export default connect(mapStateToProps, null)(RewardPoints)
