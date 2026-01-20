import React from 'react'
import {
  View, StyleSheet, Text
} from 'react-native'
import ImageLoad from '../common/RnImagePlaceH'
import { appTextStyle } from './Theme.style'
import HTML from 'react-native-render-html'

const cartCard = ({
  data, themeStyle, settings, language, quantity, indexValue, currencySymbol
}) => (
  <View
    key={indexValue}
    style={[styles.cartCardContainer, {
      backgroundColor: themeStyle.primaryBackgroundColor,
      borderBottomWidth: 1,
      borderColor: themeStyle.secondryBackgroundColor,
      paddingVertical: 11,
      paddingTop: 11
    }]}>
    <View style={styles.cartCardView}>
      {data.image !== undefined
        ? <ImageLoad
          key={indexValue + '1'}
          style={styles.productsImage}
          source={{ uri: data.image }}
        />
        : <ImageLoad
          key={indexValue + '1'}
          style={styles.productsImage}
          source={require('../images/dumy.jpg')}
        />
      }
      <View>

      {data.product_discount !== null &&
          data.product_discount !== undefined

          ? <View style={{ flexDirection: 'row' }}>
            <HTML
              html={currencySymbol + data.product_discount.toFixed(2)}
              baseFontStyle={{
                fontSize: appTextStyle.smallSize + 3,
                color: themeStyle.primary,
                fontWeight: 'bold'
              }}></HTML>
            <HTML
              html={currencySymbol + data.price.toFixed(2)}
              baseFontStyle={{
                fontSize: appTextStyle.smallSize + 3,
                color: themeStyle.primary,
                fontWeight: 'bold',
                textDecorationLine: 'line-through'

              }}></HTML>
          </View>
          : data.product_discount === null ||
            data.product_discount === undefined
            ? <View style={{ flexDirection: 'row' }}>
              <HTML
                html={currencySymbol + data.price.toFixed(2)}
                baseFontStyle={{
                  fontSize: appTextStyle.smallSize + 3,
                  color: themeStyle.primary,
                  fontWeight: 'bold'
                }}></HTML>
            </View> : <View />
        }

        <Text style={[styles.priceText, {
          color: themeStyle.textColor,
          fontSize: appTextStyle.largeSize,
          paddingVertical: 5,
          fontFamily: appTextStyle.fontFamily
        }]}>
          {data.name}
        </Text>

        <View style={styles.cartAttContainer}>

          {data.product_combination !== undefined
            ? data.product_combination.map((att, index) => (

              <Text style={[styles.modalAttrKey, {
                color: themeStyle.iconPrimaryColor,
                fontSize: appTextStyle.mediumSize,
                fontFamily: appTextStyle.fontFamily
              }]}>
                {data.product_combination.length === (index + 1)
                  ? att.variation.detail[0].name + ' '
                  : att.variation.detail[0].name + ', '}
              </Text>

            )) : null}

        </View>

        <Text style={[{
          color: themeStyle.textColor,
          fontSize: appTextStyle.mediumSize,
          fontFamily: appTextStyle.fontFamily
        }]}>
          {language.Qty + quantity}
        </Text>

      </View>

    </View>
  </View>
)

/// //////////////////////////////////////////
export default cartCard

const styles = StyleSheet.create({

  cartCardView: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  cartCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0
  },
  productsImage: {
    height: 68,
    width: 65,
    overflow: 'hidden',
    marginRight: 10,
    borderRadius: appTextStyle.customRadius - 7
  }
})
