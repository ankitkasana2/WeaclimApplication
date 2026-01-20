import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native'
import ImageLoad from './RnImagePlaceH'
import theme, { appTextStyle } from './Theme.style'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
const WIDTH = Dimensions.get('window').width
const Width2 = WIDTH * 0.5
Category1 = props => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: props.themeStyle.primaryBackgroundColor,
      width: Width2 * 0.93,
      padding: 16,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: appTextStyle.textColor,
      shadowOpacity: 0.5,
      elevation: 5,
      margin: 5,
      paddingTop: 0,
      paddingBottom: 3
    }}
    onPress={() => props.openSubCategories2(props.item)}>
    <ImageLoad
      key={props.id}
      style={{
        height: 170,
        width: Width2 * 0.93
      }}
      loadingStyle={{ size: 'large', color: props.themeStyle.primary }}
      placeholder={false}
      ActivityIndicator={true}
      placeholderStyle={{ width: 0, height: 0 }}
      backgroundColor='transparent'
      color='transparent'
      source={props.item.image }
    />

    <View
      style={{
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: props.themeStyle.primaryBackgroundColor,
        alignContent: 'center'
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: props.themeStyle.textColor,
          fontSize: appTextStyle.mediumSize + 2
        }}>
        {props.item.name}
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: appTextStyle.smallSize,
          fontWeight: '600'
        }}>{`${props.item.count} ${'Posts'}`}</Text>
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
