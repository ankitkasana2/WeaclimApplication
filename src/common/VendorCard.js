import React from 'react'
import { TouchableOpacity, Text, Dimensions } from 'react-native'
import ImageLoad from './RnImagePlaceH'
import { appTextStyle } from './Theme.style'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
const WIDTH = Dimensions.get('window').width

VendorCard = props => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      backgroundColor: props.themeStyle.primaryBackgroungColor,
      alignItems: 'center',
      marginTop: 3,
      marginBottom: 5,
      margin: 5
    }}
    onPress={async () => {
      if (props.settings.mvf_enabled === '1') {
        props.navigation.navigate('VendorScreen', {
          data: props.objectArray,
          id: props.objectArray.id
        })
      } else if (props.settings.mvf_enabled === '2') {
        let id
        if (props.objectArray.ID) id = props.objectArray.ID
        if (props.objectArray.id) id = props.objectArray.id
        if (props.objectArray.user_id) id = props.objectArray.user_id
        props.navigation.navigate('VendorScreen', {
          data: props.objectArray,
          id: id
        })
      } else if (props.settings.mvf_enabled === '3') {
        const id = props.objectArray.vendor_id
        props.navigation.navigate('VendorScreen', {
          data: props.objectArray,
          id: id
        })
      }
    }}>

    <ImageLoad
      key={props.objectArray.vendor_id}
      style={{
        height: WIDTH * 0.4182 - 10,
        width: WIDTH * 0.4182 - 10,
        borderRadius: appTextStyle.customRadius
      }}
      resizeMode={'cover'}
      loadingStyle={{ size: 'large', color: props.themeStyle.primary }}
      source={props.objectArray.banner === ''
        ? require('../images/placeholder-v.png') : { uri: props.objectArray.banner }}
    />

    <Text
      style={{
        fontWeight: 'normal',
        padding: 6,
        color: props.themeStyle.textColor,
        fontSize: appTextStyle.mediumSize + 1
      }}>
      {props.objectArray.name}
    </Text>

  </TouchableOpacity>
)

const getTheme = (state) => state.appConfig.themeStyle
const getSettings = (state) => state.settingsCall.settings

const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  settings: getSettingsFun(state)
})
export default connect(mapStateToProps, null)(VendorCard)
