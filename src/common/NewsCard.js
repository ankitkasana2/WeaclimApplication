import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  I18nManager,
  image
} from 'react-native'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ImageLoad from './RnImagePlaceH'
import Icon from 'react-native-vector-icons/Ionicons'
import theme, { appTextStyle } from './Theme.style'
const WIDTH = Dimensions.get('window').width
const Width2 = WIDTH

Category1 = props => (
  <TouchableOpacity
    style={{
      justifyContent: 'flex-start',
      backgroundColor: props.themeStyle.primaryBackgroundColor,
      width: Width2,
      padding: 10,
      borderColor: 'gray',
      flexDirection: 'row'
    }}
    onPress={() => props.openSubCategories(props.item)}>
    <ImageLoad
      key={props.item.id}
      style={{
        height: 62,
        width: 64,
        overflow: 'hidden',
        marginRight: 8,
        borderRadius: 10
      }}
      source={props.image}
    />
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: props.themeStyle.primaryBackgroundColor
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: appTextStyle.largeSize,
          color: props.themeStyle.textColor,
          width: WIDTH * 0.7,
          fontFamily: appTextStyle.fontFamily,
          textAlign: I18nManager.isRTL
            ? Platform.OS === 'android'
              ? 'right'
              : 'left'
            : 'left'
        }}
        numberOfLines={1}>
        {props.item.title.rendered}
      </Text>
      <View style={{
        flexDirection: 'row',
        backgroundColor: props.themeStyle.primaryBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2
      }}>
        <Icon
          name={'time-outline'}
          style={{ color: 'gray', fontSize: 14 }}
        />
        <Text style={{
          fontWeight: 'normal',
          color: '#51534f',
          fontFamily: appTextStyle.fontFamily,
          paddingHorizontal: 4,
          fontSize: appTextStyle.mediumSize - 1
        }}>
          {props.item.date}
        </Text>
      </View>
      <View
        style={{
          width: WIDTH * 0.7,
          marginTop: -1
        }}>
        <Text
          style={{
            color: '#51534f',
            fontSize: appTextStyle.mediumSize - 1,
            fontFamily: appTextStyle.fontFamily
          }}
          numberOfLines={4}>
          {props.html}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)
const getTheme = (state) => state.appConfig.themeStyle
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state)
})
export default connect(mapStateToProps, null)(Category1)
