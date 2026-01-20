import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  I18nManager,
  Platform,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appConfigStyle, appTextStyle, homeTitle} from '../common/Theme.style';
import ShoppingCartIcon3 from '../common/ShoppingCartIcon3';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {createSelector} from 'reselect';
const WIDTH = Dimensions.get('window').width;
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  render(
    {
      name,
      cartIcon,
      backIcon,
      navigation,
      menuIcon,
      shadow,
      searchIcon,
      homeIcon,
      onPressDrawer
    } = this.props,
  ) {
    const parent = navigation.dangerouslyGetParent().state.index;
    const routeName = navigation.state.routeName;

    return (
      <View
        style={[
          styles.headerView,
          {
            backgroundColor: appConfigStyle.headerColor
              ? this.props.themeStyle.primary
              : this.props.themeStyle.primaryBackgroundColor,
          },
        ]}>

        {(!menuIcon && backIcon && parent >= 0) ||
        routeName === 'CartScreen' ? (
          <Icon
            onPress={() => {
              this.props.navigation.goBack();
            }}
            name={!I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
            style={{
              color: appConfigStyle.headerColor
                ? this.props.themeStyle.textTintColor
                : this.props.themeStyle.textColor,
              fontSize: 24,
              padding: 5,
              paddingHorizontal: 0,
              zIndex: 12,
              marginTop: Platform.OS === 'ios' ? -12 : -19,
            }}
          />
        ) : menuIcon ? null : (
          <View
            style={{
              padding: 15,
              paddingHorizontal: 0,
              marginTop: -8,
            }}
          />
        )}
        {menuIcon && parent >= 0 ? (
          <TouchableOpacity
            style={{
              marginTop: Platform.OS === 'ios' ? -14 : -22,
              zIndex: 40,
            }}
            onPress={() => { // For testing
              if (onPressDrawer) onPressDrawer();
            }}>
            {appConfigStyle.headerMenuImage ? (
              <Image
                style={{
                  height: 28,
                  width: 30,
                  tintColor: this.props.themeStyle.primary,
                }}
                source={require('../images/newImages/Group3009.png')}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ) : (
              <Icon
                // onPress={() => {onPressDrawer}}
                name={'menu'}
                style={{
                  color: appConfigStyle.headerColor
                    ? this.props.themeStyle.textTintColor
                    : this.props.themeStyle.textColor,
                  fontSize: 24,
                  padding: 5,
                  paddingHorizontal: 0,
                }}
              />
            )}
          </TouchableOpacity>
        ) : null}

        {menuIcon ? (
          appConfigStyle.headerSearchBar ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SearchScreen');
              }}
              style={[
                styles.iconStyle,
                {
                  backgroundColor: this.props.themeStyle
                    .secondryBackgroundColor,
                  // width: !category ? WIDTH * 0.7 : WIDTH * 0.85
                  width: WIDTH * 0.7,
                  alignSelf: 'center',
                  marginTop: Platform.OS === 'android' ? -23 : -13,
                  paddingVertical: 6,
                  marginLeft: 9,
                },
              ]}>
              <Ionicons
                name={'search'}
                style={{
                  color: this.props.themeStyle.iconPrimaryColor,
                  fontSize: 18,
                }}
              />
              <Text
                style={[
                  styles.textinputStyle,
                  {
                    // width: !category ? WIDTH * 0.6 : WIDTH * 0.75,
                    width: WIDTH * 0.6,
                    fontSize: appTextStyle.mediumSize,
                    color: this.props.themeStyle.iconPrimaryColor,
                    backgroundColor: this.props.themeStyle
                      .secondryBackgroundColor,
                  },
                ]}>
                {this.props.language['What are you looking for?']}
              </Text>
            </TouchableOpacity>
          ) : homeTitle === '' ? (
            <View
              style={{
                width: WIDTH,
                position: 'absolute',
                paddingBottom: Platform.OS === 'IOS' ? 6 : 4,
              }}>
              <Image
                resizeMode="contain"
                key={0}
                style={{
                  width: 70,
                  height: 30,
                  alignSelf: 'center',
                }}
                source={require('../images/header.png')}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: appTextStyle.largeSize + 2,
                color: appConfigStyle.headerColor
                  ? this.props.themeStyle.textTintColor
                  : this.props.themeStyle.textColor,
                fontWeight: 'bold',
                position: 'absolute',
                width: WIDTH,
                textAlign: 'center',
                fontFamily: appTextStyle.fontFamily,
              }}>
              {name}
            </Text>
          )
        ) : (
          <Text
            style={{
              fontSize: appTextStyle.largeSize + 4,
              color: appConfigStyle.headerColor
                ? this.props.themeStyle.textTintColor
                : this.props.themeStyle.textColor,
              fontWeight: 'bold',
              position: 'absolute',
              width: WIDTH,
              textAlign: 'center',
              fontFamily: appTextStyle.fontFamily,
            }}>
            {name}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 6,
            marginTop: Platform.OS === 'ios' ? -12 : -22,
          }}>
          {searchIcon && !appConfigStyle.headerSearchBar ? (
            <TouchableOpacity
              style={{paddingHorizontal: 14}}
              onPress={() => {
                this.props.navigation.navigate('SearchScreen');
              }}>
              <Icon
                name={'search'}
                style={{
                  color: appConfigStyle.headerColor
                    ? this.props.themeStyle.textTintColor
                    : this.props.themeStyle.textColor,
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          ) : null}
          {homeIcon && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Home1Screen');
              }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: 'white',
                  marginRight: -5,
                }}
                source={require('../images/homeicon3.png')}
              />
            </TouchableOpacity>
          )}
          {cartIcon ? (
            <ShoppingCartIcon3 props={this.props} />
          ) : (
            <View
              style={{
                height: 15,
                width: 17,
              }}
            />
          )}
        </View>
      </View>
    );
  }
}
const getTheme = state => state.appConfig.themeStyle;
const getThemeFun = createSelector(
  [getTheme],
  getTheme => {
    return getTheme;
  },
);
const getLanguage = state => state.appConfig.languageJson;
const getLanguageFun = createSelector(
  [getLanguage],
  getLanguage => {
    return getLanguage;
  },
);
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
});
export default connect(
  mapStateToProps,
  null,
)(Header);

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 28 : 20,
    width: WIDTH,
    paddingBottom: 4,
    marginBottom: 2,
    height: 70,

  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appTextStyle.customRadius - 3,
    padding: Platform.OS === 'ios' ? 3 : 0,
  },
  textinputStyle: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    fontFamily: appTextStyle.fontFamily,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH * 0.8,
    borderRadius: appTextStyle.customRadius - 3,
    padding: Platform.OS === 'ios' ? 3 : 0,
  },
  shadowStyle: {
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
