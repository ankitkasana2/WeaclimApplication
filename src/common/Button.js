import React from 'react'
import { StyleSheet, Text, TouchableOpacity, PixelRatio } from 'react-native'
import { appTextStyle } from './Theme.style'
const CustomBtn = ({
  navigation, title, themeStyle, disable,
  borderRadius,
  onPress,
  WIDTH,
  HEIGHT
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.saveBtn,
      {
        backgroundColor: disable ? themeStyle.primary : 'gray',
        shadowColor: themeStyle.secondryText,
        borderRadius: borderRadius ? appTextStyle.customRadius : 4,
        width: WIDTH || '93%',
        padding: HEIGHT || 10,
        alignSelf: 'center'
      }
    ]}>
    <Text
      style={[
        styles.btnText,
        {
          fontSize: appTextStyle.mediumSize + PixelRatio.getPixelSizeForLayoutSize(1),
          color: themeStyle.textTintColor
        }
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  saveBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appTextStyle.customRadius - 15
  },
  btnText: {
    fontWeight: '500',
    fontFamily: appTextStyle.fontFamily
  }
})

export default CustomBtn
