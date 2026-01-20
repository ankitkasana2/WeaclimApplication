import React from 'react'
import { View, TouchableOpacity, Text, Platform, I18nManager, StyleSheet } from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import { appTextStyle } from '../Theme.style'
import Timer from '../Timer'

import { getThumbnailImage } from '../WooComFetch'
export default CardOne = ({ props, widthPic, t, s, btnWidth }) => (
  <View
    style={[styles.container, {
      backgroundColor: props.backgroundColor
    }]}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}

    <View
      style={{
        backgroundColor: props.backgroundColor,
        borderRadius: appTextStyle.customRadius - 11
      }}>
      <TouchableOpacity
        style={styles.imageTouchContainer}
        onPress={() =>
          props.navigation.push('ProductDetails', {
            objectArray: props.objectArray //
          })
        }>
        <ImageLoad
          key={props.objectArray.id}
          style={{
            height: widthPic,
            width: widthPic,
            backgroundColor:
                props.backgroundColor,
            borderRadius: appTextStyle.customRadius - 11,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}
          source={{ uri: props.objectArray.images[0].src }}>
        </ImageLoad>

        <View
          style={[styles.priceView, {
            marginBottom: props.objectArray.flash_price === undefined ? 0 : 2
          }]}>
          {t.priceFun(
            appTextStyle.mediumSize,
            s,
            widthPic
          )
          }
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.titleText, {
          color: props.themeStyle.cardTextColor,
          width: widthPic * 0.8
        }]}
        numberOfLines={1}>
        {props.objectArray.name}
      </Text>
      <View
        style={[styles.priceView, {
          marginBottom: props.objectArray.flash_price === undefined ? 0 : 2
        }]}>

      </View>
      {props.objectArray.product_type === 'simple'
        ? <TouchableOpacity
          style={[styles.btnView, {
            width: btnWidth * 0.9,
            backgroundColor: props.themeStyle.primary
          }]}
          onPress={() => {
            if (t.newMethod3(props, t) !== 1) {
              t.newMethod6(props, t)
            }
          }}>
          <Text
            style={[styles.removebtnView.btnText, {
              color: props.themeStyle.textTintColor
            }]}>
            {t.props.language['Add to Bag']}
          </Text>

        </TouchableOpacity>
        : props.objectArray.product_type === 'variable'
          ? <TouchableOpacity
            style={[styles.btnView, {
              width: btnWidth * 0.9,
              backgroundColor: props.themeStyle.primary
            }]}
            onPress={() => {
              if (t.newMethod3(props, t) !== 1) {
                props.navigation.push('ProductDetails', {
                  objectArray: props.objectArray //
                })
              }
            }}>
            <Text
              style={[styles.removebtnView.btnText, {
                color: props.themeStyle.textTintColor
              }]}>
              {t.props.language.Details}
            </Text>

          </TouchableOpacity> : null
      }
    </View>
    {t.props.dataName === 'Flash' ? (
      <Timer
        props={t.props}
        widthPic={widthPic}
        t={t}
        text={null}
        objectArray={props.objectArray}
        s={s}
        btnWidth={btnWidth}></Timer>
    ) : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    margin: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 3,
    paddingBottom: 8,
    borderRadius: appTextStyle.customRadius - 11
  },
  imageTouchContainer: {
    flex: 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: appTextStyle.customRadius - 11
  },
  priceView: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 3
  },
  tagsView: {
    zIndex: 6,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 0,
    borderRadius: appTextStyle.customRadius - 15,
    left: 8,
    top: 10,
    position: 'absolute'
  },
  removebtnView: {
    alignItems: 'center',
    height: Platform.OS === 'android' ? 30 : 28,
    justifyContent: 'center'
  },
  btnText: {
    fontSize: appTextStyle.mediumSize + 1,
    fontWeight: '500',
    fontFamily: appTextStyle.fontFamily
  },
  titleText: {
    fontSize: appTextStyle.mediumSize,
    fontFamily: appTextStyle.fontFamily,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    margin: 0,
    padding: 5,
    paddingTop: 3,
    paddingLeft: 5,
    paddingBottom: 8,
    marginBottom: 0,
    fontWeight: '400'
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 2,
    borderRadius: appTextStyle.customRadius
  }
})
