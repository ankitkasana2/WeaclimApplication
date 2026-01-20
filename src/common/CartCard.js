import React from 'react'
import {
  TouchableOpacity,
  View, StyleSheet, Text
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageLoad from '../common/RnImagePlaceH'
import { appTextStyle } from './Theme.style'

const cartCard = ({
  data, themeStyle, sessionId, settings, language,
  deleteProductFromCartCall, th, index
}) => (
  <View key={index} style={[styles.cartCardContainer, {
    backgroundColor: themeStyle.secondryBackgroundColor
  }]}>
    <View key={index} style={styles.cartCardView}>
      {data.image !== undefined
        ? <ImageLoad
          key={index}
          style={styles.productsImage}
          source={{ uri: data.image }}
        />
        : <ImageLoad
          key={index}
          style={styles.productsImage}
          source={require('../images/avatar.png')}
        />
      }

      <View>
        <Text
          numberOfLines={1}
          style={[styles.priceText, {
            color: themeStyle.textColor,
            fontSize: appTextStyle.largeSize,
            marginLeft: -4,
            fontWeight: 'bold',
            fontFamily: appTextStyle.fontFamily,
            width: '90%'
          }]}>
          {data.name}
        </Text>

        <Text style={[styles.priceText, {
          color: themeStyle.primary,
          fontSize: appTextStyle.mediumSize + 1,
          fontFamily: appTextStyle.fontFamily
        }]}>
          {"₹" + ' ' + data.price}
        </Text>

        <View style={{ marginVertical: 5 }}>

          {data.meta_data !== undefined
            ? data.meta_data.map((att, index) => (

              <Text style={[styles.modalAttrKey, {
                color: themeStyle.iconPrimaryColor,
                fontSize: appTextStyle.mediumSize,
                fontFamily: appTextStyle.fontFamily
              }]}>
                {att.value}
              </Text>

            )) : null}

        </View>

        <Text style={[{
          color: themeStyle.textColor,
          fontSize: appTextStyle.mediumSize,
          fontFamily: appTextStyle.fontFamily
        }]}>
          {language.Qty + data.quantity}
        </Text>

      </View>

    </View>

    {deleteProductFromCartCall
      ? <TouchableOpacity
        onPress={() => {
          th.setState({ spinnerTemp: true }, () => {
            deleteProductFromCartCall(data.cart_id,
              sessionId, data.product_combination_id,
              data.qty, th)
          })
        }}>
        <FontAwesome
          name={'trash'}
          style={{
            color: themeStyle.iconPrimaryColor,
            transform: [{ rotateY: '180deg' }],
            fontSize: appTextStyle.largeSize + 2,
            paddingLeft: 10
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
  },
  priceText: {
    paddingVertical: 3
  },
  productsImage: {
    height: 68,
    width: 65,
    overflow: 'hidden',
    marginRight: 10,
    borderRadius: appTextStyle.customRadius - 7
  }
})
