import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import HTML from 'react-native-render-html'
import theme, { appConfigStyle, appTextStyle } from './Theme.style'
import Snackbar from 'react-native-snackbar'
import CardOne from './CardStyles/CardOne'
import CardTwo from './CardStyles/CardTwo'
import CardThree from './CardStyles/CardThree'
import CardFour from './CardStyles/CardFour'
import CardFive from './CardStyles/CardFive'
import CardSix from './CardStyles/CardSix'
import CardSeven from './CardStyles/CardSeven'
import CardEight from './CardStyles/CardEight'
import CardNine from './CardStyles/CardNine'
import CardTenth from './CardStyles/CardTenth'
import CardElev from './CardStyles/CardElev'
import CardTwelve from './CardStyles/CardTwelve'
import CardThirteen from './CardStyles/CardThirteen'
import CardFourteen from './CardStyles/CardFourteen'
import CardFifteen from './CardStyles/CardFifteen'
import CardSixteen from './CardStyles/CardSixteen'
import CardZero from './CardStyles/CardZero'
import CardSeventeen from './CardStyles/CardSeventeen'
import CardEighteen from './CardStyles/CardEighteen'
import CardNineteen from './CardStyles/CardNineteen'
import CardTwenty from './CardStyles/CardTwenty'
import CardTOne from './CardStyles/CardTOne'
import CardTtwo from './CardStyles/CardTtwo'
import CardtThree from './CardStyles/CardtThree'
import CardTFour from './CardStyles/CardTFour'
import CardTFive from './CardStyles/CardTFive'
import CardTSix from './CardStyles/cardTSix'
import CardZeroOne from './CardStyles/CardZeroOne'
import { store } from '../redux/store/index'

import CardtSeven from './CardStyles/CardtSeven'

import { createSelector } from 'reselect'
import { removeWishlistFun, storeWishlist, addToCartFun } from '../redux/actions/actions'

import Toast from 'react-native-easy-toast'

class CardTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      spinnerTemp: false,
      page: 11,
      refreshing: false,
      temp1: 0,
      counter: 0,
      stepperArray: [],
      wishListId: 0,
      quantityNumber: 0,
      wishListValue: '0',
      counterQuantity: 1 //
    }
    global.SampleVar = false
    this.toast = null
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.settings.card_style === '24' ||
      this.props.settings.card_style === '25' ||
      this.props.settings.card_style === '26' ||
      this.props.settings.card_style === '27' ||
      this.props.settings.card_style === '28') {
      this.props.cartProductsArray.forEach(element => {
        if (this.props.objectArray.product_id === element.product_id) {
          if (element.qty !== prevState.quantityNumber && this.props.objectArray.product_id === element.product_id) {
            this.setState({
              quantityNumber: element.qty,
              counterQuantity: element.qty //
            })
          }
        }
      })
    }
  }

  componentDidMount () {
    if (this.props.settings.card_style === '24' ||
      this.props.settings.card_style === '25' ||
      this.props.settings.card_style === '26' ||
      this.props.settings.card_style === '27' ||
      this.props.settings.card_style === '28') {
      this.setState({}) // render counter update
    }
  }

  checkProductNew = props => {
    const pDate = new Date(props.objectArray.date_created)
    const date =
      pDate.getTime() +
      this.props.newProductDuration * 86400000
    const todayDate = new Date().getTime()
    if (date > todayDate) {
      return true
    }
    return false
  }

  priceFun = (size, htmlValue, widthPic, textColor) => (
    <HTML
      html={htmlValue}
      baseFontStyle={{
        fontSize: size + 1,
        color: appConfigStyle.cardsColor ? textColor ? '#fff' : 'green'
          : textColor ? '#fff' : store.getState().appConfig.themeStyle.textColor,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      }}
      alterNode={node => {
        const { name } = node
        if (
          name === 'ins' &&
            node.children[0] !== undefined &&
            node.children[0] !== null
        ) {
          if (
            name === 'ins' &&
              node.children[0].children[0] !== undefined &&
              node.children[0].children[0] !== null
          ) {
            if (node.children[0].children[0].children === undefined) {
              if (
                name === 'ins' &&
                    node.children[0].children[0].data !== undefined
              ) {
                node.children[0].children[0].data = `${' - ' + node.children[0].children[0].data}`
                return node
              }
            } else {
              if (
                name === 'ins' &&
                    node.children[0].children[0].children[0].data !== undefined
              ) {
                node.children[0].children[0].children[0].data = `${' - ' + node.children[0].children[0].children[0].data}`
                return node
              }
            }
          }
        }
      }}
      tagsStyles={{
        ins: {
          color: appConfigStyle.cardsColor ? textColor ? '#fff' : 'green'
            : textColor ? '#fff' : store.getState().appConfig.themeStyle.textColor,
          fontSize: size + 1,
          fontWeight: 'bold'
        },
        del: {
          textDecorationLine: 'line-through',
          fontSize:
            widthPic < 159
              ? size
              : size,
          color: appConfigStyle.cardsColor ? textColor ? '#fff' : 'red'
            : textColor ? '#fff' : store.getState().appConfig.themeStyle.textColor,
          fontWeight: '500'
        }
      }}
    />
  )

  SingleComponent = (props, widthPic, t, s, btnWidth) =>
    this.props.cardStyle === '118' ? (
      <CardZero
        props={props}
        widthPic={widthPic}
        t={this}
        s={s}
        btnWidth={btnWidth}
        cartProductArray={this.props.cartProductArrayViewedProducts}
        recentViewedProducts={false}
        wishListProducts={false}
        card_style={this.props.settings.card_style}
        newProductDuration={this.props.newProductDuration}
        cartButton={this.props.cartButton}
        inventory={this.props.inventory}
        language={this.props.language}
        language2={this.props.language2}
      />
      
    )
      : this.props.settings.card_style === '1' ? (
        <CardZeroOne
          props={props}
          widthPic={widthPic}
          t={this}
          s={s}
          btnWidth={btnWidth}
          cartProductArray={this.props.cartProductArrayViewedProducts}
          recentViewedProducts={false}
          wishListProducts={false}
          card_style={this.props.settings.card_style}
          newProductDuration={this.props.newProductDuration}
          cartButton={this.props.cartButton}
          inventory={this.props.inventory}
          language={this.props.language}
          language2={this.props.language2}
        />
      )
        : this.props.settings.card_style === '2' ? (
          <CardOne
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '3' ? (
          <CardTwo
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '4' ? (
          <CardThree
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '5' ? (
          <CardFour
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '6' ? (
          <CardFive
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '7' ? (
          <CardSix
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '8' ? (
          <CardSeven
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '9' ? (
          <CardEight
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '10' ? (
          <CardNine
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '11' ? (
          <CardTenth
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '12' ? (
          <CardElev
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '13' ? (
          <CardTwelve
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '14' ? (
          <CardThirteen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '15' ? (
          <CardFourteen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '16' ? (
          <CardFifteen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '17' ? (
          <CardSixteen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '18' ? (
          <CardSeventeen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '19' ? (
          <CardEighteen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '20' ? (
          <CardNineteen
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '21' ? (
          <CardTwenty
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '22' ? (
          <CardTOne
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '23' ? (
          <CardTtwo
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '24' ? (
          <CardtThree
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '25' ? (
          <CardTFour
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '26' ? (
          <CardTFive
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '27' ? (
          <CardTSix
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : this.props.settings.card_style === '28' ? (
          <CardtSeven
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
        ) : (
          <CardZeroOne
            props={props}
            widthPic={widthPic}
            t={this}
            s={s}
            btnWidth={btnWidth}
            cartProductArray={this.props.cartProductArrayViewedProducts}
            recentViewedProducts={false}
            wishListProducts={false}
            card_style={this.props.settings.card_style}
            newProductDuration={this.props.newProductDuration}
            cartButton={this.props.cartButton}
            inventory={this.props.inventory}
            language={this.props.language}
            language2={this.props.language2}
          />
          
        )

  /// ////////////////////
  getPer = (r, s) => {
    const a = r / 100
    const b = r - s
    return b / a
  }

  /// ///////////////////
  imageIcon = (bagBtn, otherBtn, h, w) => {
    return (
      <Image
        source={require('../images/shopping_bag.png')}
        style={{
          height: h,
          width: w,
          marginBottom: 2,
          tintColor:
            this.newMethod3(this.props, this) === 1 ? otherBtn : bagBtn
        }}></Image>
    )
  }

  getCategoryName () {
    if (this.props.objectArray.categories.length !== 0) { return this.props.objectArray.categories[0].categories_name }
  }

  productDiscount (props) {
    var rtn = ''

    const result = Math.floor(
      this.getPer(
        props.objectArray.regular_price,
        props.objectArray.sale_price
      )
    )
    if (result === 0) {
      rtn = '-' + result + '%'
      return rtn
    }
    rtn = '-' + result + '%'
    return rtn
  }

  /// /////////////////
  pDiscount (props) {
    if (props.dataName !== 'Flash') {
      var rtn = ''
      var p1 = parseInt(props.objectArray.products_price)
      var p2 = parseInt(props.objectArray.discount_price)
      if (p1 === 0 || p2 == null || p2 === undefined || p2 === 0) {
        rtn = ''
      }
      var result = Math.abs(((p1 - p2) / p1) * 100)
      result = parseInt(result.toString())
      if (result === 0) {
        rtn = ''
      }
      rtn = result + '%'
      return rtn
    } else if (props.dataName === 'Flash') {
      let rtn = ''
      const p1 = parseInt(props.objectArray.products_price)
      const p2 = parseInt(props.objectArray.flash_price)
      if (p1 === 0 || p2 == null || p2 === undefined || p2 === 0) {
        rtn = ''
      }
      let result = Math.abs(((p1 - p2) / p1) * 100)
      result = parseInt(result.toString())
      if (result === 0) {
        rtn = ''
      }
      rtn = result + '%'
      return rtn
    }
  }

  productIsInList = (id) => {
    let found = false
    if (this.props.wishlistArray !== undefined &&
      this.props.wishlistArray !== null &&
      this.props.wishlistArray !== '') {
      this.props.wishlistArray.forEach(element => {
        if (element === id) { found = true }
      })
    }
    return found
  }

  quantityMinus = (value) => {
    if (this.state.quantityNumber > 0) {
      this.setState({ quantityNumber: value }, () => {
        this.setState({ spinnerTemp: true, counter: this.state.counter + 1 })
        this.props.addToCartCall(this.props.objectArray.product_id, value, null,
          this.props.sessionId, this)
      })
    }
  }

  quantityPlus = (value) => {
    this.setState({ quantityNumber: value }, () => {
      this.setState({ spinnerTemp: true, counter: this.state.counter + 1 })
      this.props.addToCartCall(this.props.objectArray.product_id, this.state.quantityNumber, null,
        this.props.sessionId, this)
    })
  }

  quantityMinusTwo = (value) => { //
    if (this.state.counterQuantity > 0) {
      this.setState({ counterQuantity: value }, () => {
      })
    }
  }

  quantityPlusTwo = (value) => { //
    this.setState({ counterQuantity: value }, () => {
    })
  }

  addToCartTwo = (props, t) => { //
    t.setState({ spinnerTemp: true })
    this.props.addToCartCall(props.objectArray.product_id, this.state.counterQuantity, null,
      this.props.sessionId, this)
  }

  getWishListId = (id) => {
    let found = 0
    if (this.props.wishlistArray !== undefined &&
      this.props.wishlistArray !== null &&
      this.props.wishlistArray !== '') {
      this.props.wishlistArray.forEach(element => {
        if (element.id === id) { found = element.wishlist }
      })
    }
    return found
  }

  removeWishlist = (props, t) => {
    const wishListId = this.getWishListId(props.objectArray.id)
    this.props.removeWishlistCall(this.props.userData, props.objectArray.id,
      this, wishListId)
    Snackbar.show({
      backgroundColor: this.props.themeStyle.primary,
      textColor: this.props.themeStyle.textTintColor,
      text: this.props.language['Removed From Wish List!'],
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: this.props.language.Close,
        textColor: this.props.themeStyle.secondry,
        backgroundColor: this.props.themeStyle.primary
      }
    })
  }

  addWishlist = async (props, t) => {
    if (this.productIsInList(props.objectArray.id)) {
      this.props.removeWishlistCall(this.props.userData, props.objectArray.id,
        this)
      Snackbar.show({
        backgroundColor: this.props.themeStyle.primary,
        textColor: this.props.themeStyle.textTintColor,
        text: this.props.language['Removed From Wish List!'],
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: this.props.language.Close,
          textColor: this.props.themeStyle.secondry,
          backgroundColor: this.props.themeStyle.primary
        }
      })
    } else {
      const data2 = this.props.storeWishlistCall(this.props.userData, props.objectArray.id,
        this)

      Snackbar.show({
        backgroundColor: this.props.themeStyle.primary,
        textColor: this.props.themeStyle.textTintColor,
        text: this.props.language['Added To Wish List!'],
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: this.props.language.Close,
          textColor: this.props.themeStyle.secondry,
          backgroundColor: this.props.themeStyle.primary
        }
      })
    }
  }

  /// ///////////////////////////////////////////////////////////
  removeRecent = (props, t) => {
    t.setState({ spinnerTemp: true })
    setTimeout(() => {
      props.removeRecentItems(props.objectArray)
      this.setState({ spinnerTemp: false })
    }, Math.floor(100 / 360000))
  }

  /// //////////////////////////////////////////////////////////
  newMethod6 = (props, t) => {
    t.setState({ spinnerTemp: true, counter: t.state.counter + 1 })
    this.props.addToCartCall(props.objectArray.product_id, 1, null,
      this.props.sessionId, this)
  }

  /// ////////////////////////////////////////////////////////////
  setTimePassed (props, q) {
    props.addItemToCart(
      props.objectArray,
      q,
      this.props.settings.card_style
    )
    this.setState({ spinnerTemp: false })
  }

  /// ///////////////////////////////////////////////////////////////
  removeCartitems = (props, t) => {
    if (props.settings.card_style === '22') {
      if (
        props.objectArray.quantity === undefined ||
        props.objectArray.quantity === null
      ) {
        let temp2 = 0
        props.cartProductArrayViewedProducts.map((val, key) => {
          const temp = []
          for (
            let i = 0;
            i < props.cartProductArrayViewedProducts.length;
            i++
          ) {
            if (val.products_id === props.objectArray.product_id || temp2 === 1) {
              temp[i] = props.cartProductArrayViewedProducts[i]
              val.quantity = val.quantity - 1
              props.objectArray.quantity = val.quantity
            } else {
              temp2 = 1
            }
          }
          props.cartProductArrayViewedProducts = temp
        })
      } else {
        let temp2 = 0
        const temp = []
        for (
          let i = 0;
          i < props.cartProductArrayViewedProducts.length;
          i++
        ) {
          if (
            props.cartProductArrayViewedProducts[i].products_id ===
            props.objectArray.product_id ||
            temp2 === 1
          ) {
            temp[i] = props.cartProductArrayViewedProducts[i]
            props.cartProductArrayViewedProducts[i].quantity =
              props.cartProductArrayViewedProducts[i].quantity - 1
            props.objectArray.quantity =
              props.cartProductArrayViewedProducts[i].quantity
          } else {
            temp2 = 1
          }
        }
        props.cartProductArrayViewedProducts = temp
        return
      }
      setTimeout(() => { }, Math.floor(100 / 360000))
    }
  }

  /// ////////////////////////////////////////////////////////////
  newMethod3 = (props, t) => {
    let temp = 0
    props.cartProductArrayViewedProducts.map(row => {
      if (row.products_id === props.objectArray.products_id) {
        temp = 1
      }
    })
    if (temp === 1) {
      return 1
    }
    temp = 0
    return 0
  }

  /// ////////////////////////////////////////////////////////////

  /// /////////////////////////////////////////////////////////////
  componentWillUnmount () {
    clearInterval(this.state.spinnerTemp)
  }

  render () {
    const s = this.props.objectArray.price_html
    // alert(JSON.stringify(this.props));
    return (
      // <View>
      //   <Text>Ankit</Text>
      // </View>
      <View>
        <Spinner visible={this.state.spinnerTemp} />
        <Toast
          ref={ref => { this.toast = ref }}
          style={{
            backgroundColor: '#c1c1c1'
          }}
          position='top'
          positionValue={10}
          fadeOutDuration={7000}
          textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.mediumSize }}
        />
        {this.props.rows === false
          ? 
           this.SingleComponent(
            this.props,
            this.props.width ? this.props.width : theme.singleRowCardWidth,
            this,
            s,
            this.props.width
              ? this.props.width
              : theme.singleRowCardWidth
          )
          : 
          
          this.SingleComponent(
            this.props,
            this.props.width ? this.props.width : theme.singleRowCardWidth,
            this,
            s,
            this.props.width
              ? this.props.width
              : theme.singleRowCardWidth
          )
          }
      </View>
    )
  }
}

const wishlistArray = (state) => state.wishlistData.wishlistArray
const wishlistArrayFun = createSelector(
  [wishlistArray],
  (wishlistArray) => {
    return wishlistArray
  }
)
const getLanguage2 = (state) => state.appConfig.languageJson
const getLanguage = (state) => state.appConfig.languageJson
const getCurrencyPos = (state) => state.appConfig.currencyPos
const getCartArray = (state) => state.cartData.cartProductsArray
const getSettings = (state) => state.settingsCall.settings
const getSessionId = (state) => state.userData.sessionId
const getUserData = (state) => state.userData.user

const getCurrencyPosFun = createSelector(
  [getCurrencyPos],
  (getCurrencyPos) => {
    return getCurrencyPos
  }
)

const getSessionIdFun = createSelector(
  [getSessionId],
  (getSessionId) => {
    return getSessionId
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
const getCartArrayFun = createSelector(
  [getCartArray],
  (getCartArray) => {
    return getCartArray
  }
)
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const getLanguageFun2 = createSelector(
  [getLanguage2],
  (getLanguage2) => {
    return getLanguage2
  }
)

const getTheme = (state) => state.appConfig.themeStyle
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)

const mapStateToProps = state => {
  return {
    themeStyle: getThemeFun(state),
    cartProductArrayViewedProducts: [],
    newProductDuration: 20,
    cartButton: true,
    inventory: true,
    language: getLanguageFun(state),
    language2: getLanguageFun2(state),
    settings: getSettingsFun(state),
    sessionId: getSessionIdFun(state),
    userData: getUserDataFun(state),
    wishlistArray: wishlistArrayFun(state),
    cartProductsArray: getCartArrayFun(state),
    getCurrency: getCurrencyPosFun(state)

  }
}

const mapDispatchToProps = dispatch => ({
  addToCartCall: (productId, quantityNumber, productCombinationId, sessionId, th) => {
    dispatch(async dispatch => {
      await addToCartFun(dispatch, productId, quantityNumber, productCombinationId,
        sessionId, th)
    })
  },
  removeWishlistCall: (userData, productId, th, wishListId) => {
    dispatch(dispatch => {
      removeWishlistFun(dispatch, userData, productId, th, wishListId)
    })
  },
  storeWishlistCall: (userData, productId, th) => {
    dispatch(dispatch => {
      storeWishlist(dispatch, userData, productId, th)
    })
  },
  addItemToCart: (product, productQuantity, card) => {
    dispatch({
      type: 'ADD_TO_CARTS',
      product,
      attributes: [],
      productQuantity,
      card
    })
  },
  removeCardFromCart: productObject => {
    dispatch({
      type: 'REMOVE_CARD_FROM_CART',
      product: productObject,
      variation: null,
      metaData: null
    })
  },
  removeFlashCard: productObject => {
    dispatch({
      type: 'REMOVE_FLASH_CARD',
      product: productObject
    })
  },
  cartTotalItems: () => {
    dispatch({
      type: 'CART_TOTAL_ITEMS'
    })
  },
  removeItemToCart: (productObject, productQuantity) =>
    dispatch({
      type: 'REMOVE_TO_CARTS_QUANTITY',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: null,
      metaData: null
    }),
  removeRecentItems: productArray =>
    dispatch({ type: 'REMOVE_RECENT', product: productArray }),
  addWishlistProduct: productArray =>
    dispatch({ type: 'ADD_WISHLIST_PRODUCTS', product: productArray }),
  removeWishListProduct: productArray =>
    dispatch({ type: 'REMOVE_WISHLIST_PRODUCTS', product: productArray })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(CardTemplate))
