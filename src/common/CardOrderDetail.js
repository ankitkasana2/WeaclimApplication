import React from 'react'
import {
  TouchableOpacity,
  View, StyleSheet, Text
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageLoad from '../common/RnImagePlaceH'
import { appTextStyle } from './Theme.style'
import HTML from 'react-native-render-html'

const cartCard = ({
  data, themeStyle, sessionId, settings, language,
  deleteProductFromCartCall, th, indexValue, currencySymbol
}) => (
  <View
    key={indexValue}
    style={[styles.cartCardContainer, {
      backgroundColor: themeStyle.primaryBackgroundColor
    }]}>
      {/* {alert(currencySymbol)} */}
    <View style={styles.cartCardView}>
      {/* {alert(JSON.stringify(data))} */}
      {data.image !== undefined
        ? <ImageLoad
          key={indexValue + '1'}
          style={styles.productsImage}
          source={{ uri: data.image.src}}
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
                color: th.props.themeStyle.primary,
                fontWeight: 'bold'
              }}></HTML>
            <HTML
              html={currencySymbol + data.price.toFixed(2)}
              baseFontStyle={{
                fontSize: appTextStyle.smallSize + 3,
                color: th.props.themeStyle.primary,
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
                  color: th.props.themeStyle.primary,
                  fontWeight: 'bold'
                }}></HTML>
            </View> : <View />
        }
        <Text style={[styles.priceText, {
          color: themeStyle.textColor,
          fontSize: appTextStyle.largeSize,
          marginVertical: 5,
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
          fontSize: appTextStyle.largeSize + 2,
          fontFamily: appTextStyle.fontFamily
        }]}>
          {language.Qty + data.quantity}
        </Text>

      </View>

    </View>

    {deleteProductFromCartCall
      ? <TouchableOpacity onPress={() => {
        th.setState({ spinnerTemp: true }, () => {
          deleteProductFromCartCall(data.product_id,
            sessionId, data.product_combination_id,
            data.qty, th)
        })
      }}>
        <FontAwesome
          name={'trash'}
          style={{
            color: themeStyle.iconPrimaryColor,
            transform: [{ rotateY: '180deg' }],
            fontSize: appTextStyle.largeSize + 2
          }}
        />
      </TouchableOpacity>
      : null}
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
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
  },
  productsImage: {
    height: 68,
    width: 75,
    overflow: 'hidden',
    marginRight: 10,
    borderRadius: appTextStyle.customRadius - 13
  }
})
