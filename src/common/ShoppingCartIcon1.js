import React from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, Share, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import RateUsButton from '../screens/RateUs'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { createSelector } from 'reselect'
import DeviceInfo from 'react-native-device-info'

const onShare = async props => {
  try {
    let result = ''
    if (Platform.OS === 'android') {
      result = await Share.share({
        message: `https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`
      })
    } else {
      DeviceInfo.getBuildId().then(async (buildId) => {
        result = await Share.share({
          message: `https://play.google.com/store/apps/details?id=${buildId}`
        })
      })
    }
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    Alert.alert(error.message)
  }
}
const ShoppingCartIcon = props => (
  <View
    style={styles.maincontainer}>
    {/* <RateUsButton
      text={'text'}
      iconName={'md-star-half'}
    /> */}
  </View>
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
export default connect(mapStateToProps, null)(withNavigation(ShoppingCartIcon))

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 5,
    paddingRight: 6
  },
  shareView: {
    padding: 5,
    paddingRight: 6,
    paddingTop: 2,
    alignItems: 'center',
    height: 40
  },
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 5
  }
})
