import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import { appTextStyle } from '../Theme.style'
export default CardOne = ({ props, widthPic, t, s, btnWidth }) => (
  <View
    style={[styles.cardContainer, {
      backgroundColor: props.backgroundColor,
      width: widthPic,
      borderRadius: appTextStyle.customRadius
    }]}>

    <TouchableOpacity
      style={{
        height: widthPic * 1.18,
        borderRadius: appTextStyle.customRadius

      }}
      onPress={() =>
        props.navigation.push('ProductDetails', {
          objectArray: props.objectArray //
        })
      }>
      {props.objectArray.images[0] !== null &&
            props.objectArray.images[0] !== undefined
        ? <ImageLoad
          key={props.objectArray.id}
          style={{
            height: widthPic,
            width: widthPic,
            backgroundColor:
                props.backgroundColor,
            borderTopLeftRadius: appTextStyle.customRadius,
            borderTopRightRadius: appTextStyle.customRadius
          }}
          source={{ uri: props.objectArray.images[0].src }}>
        </ImageLoad>
        : null }

    </TouchableOpacity>
    <View
      style={[styles.textContainer, {
        backgroundColor: props.backgroundColor,
        width: widthPic * 0.85
      }]}>
      <Text
        style={[styles.textStyle, {
          fontSize: appTextStyle.smallSize,
          color: props.themeStyle.cardTextColor,
          width: widthPic * 0.8
        }]}
        numberOfLines={1}>
        {props.objectArray.name}
      </Text>

    </View>
  </View>
)
/// /////////////////////////////////////////////
const styles = StyleSheet.create({
  cardContainer: {
    margin: 5
    // marginBottom: -16
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 9
  },
  textStyle: {
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    fontWeight: 'bold',
    fontFamily: appTextStyle.fontFamily
  }
})
