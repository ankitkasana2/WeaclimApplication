import React from 'react'
import {
  TouchableOpacity,
  Text,
  Dimensions,
  PixelRatio,
  StyleSheet
} from 'react-native'
import ImageLoad from './RnImagePlaceH'
import { appTextStyle } from './Theme.style'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getThumbnailImage } from './WooComFetch'
const WIDTH = Dimensions.get('window').width
const Width2 = WIDTH * 0.2


const Category4 = props => (
  
  <TouchableOpacity
    style={[{
      backgroundColor: props.themeStyle.secondryBackgroundColor
    }, styles.container]}
    onPress={() => props.openSubCategories(props.item, props.item.name)}>
      {/* {alert(props.id)} */}
    <ImageLoad
      key={props.id}
      style={{
        height: 70,
        width: 70,
        overflow: 'hidden',
        borderRadius: appTextStyle.customRadius - 9
      }}
      placeholder={false}
      ActivityIndicator={true}
      backgroundColor='transparent'
      color='transparent'
      source={{ uri: props.image }}
    />

    <Text
      style={[styles.textStyle, {
        color: props.themeStyle.textColor,
        fontSize: appTextStyle.smallSize,
        fontFamily: appTextStyle.fontFamily
      }]}>
      {props.item.name}
    </Text>

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
export default connect(mapStateToProps, null)(Category4)

const styles = StyleSheet.create({
  container: {
    width: Width2,
    padding: 2,
    alignItems: 'center',
    paddingHorizontal: 0,
    marginHorizontal: 0
  },
  textStyle: {
    textAlign: 'center',
    paddingTop: 3
  }
})
