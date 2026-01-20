import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { appConfigStyle, appTextStyle } from './Theme.style';
import { createSelector } from 'reselect';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShoppingCartIcon = props => {
  const [totalQ, setTotalQ] = useState(0);
  const [refreshCounter, setRefreshCounter] = useState(0);

  
  useEffect(() => {
    const newTotalQ = props.cartProductsArray.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  
    setTotalQ(newTotalQ);
  }, [props.cartQuantity, props.cartProductsArray, totalQ, refreshCounter]); 

  // useEffect(() => {

  //   const newTotalQ = props.cartProductsArray.reduce((total, product) => {
  //     return total + product.quantity;
  //   }, 0);
  
  //   setTotalQ(newTotalQ);
  // }, [props.cartQuantity, props.cartProductsArray, totalQ]); // Re-run the effect whenever cartProductsArray changes

  useEffect(() => {
    // Here you can trigger a page refresh by incrementing the refreshCounter
    setRefreshCounter(prevCounter => prevCounter + 1);
  }, [props.cartQuantity, props.cartProductsArray, totalQ]);

  return (
    <TouchableOpacity
      style={[{ padding: 5 }]}
      onPress={() => {
        props.navigation.navigate('CartScreen');
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'red',
          },
        ]}>
        <Text
          style={[
            styles.textStyle,
            {
              color: props.themeStyle.textTintColor,
            },
          ]}>
          {totalQ}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('CartScreen');
        }}>
        <Ionicons
          name={'cart-outline'}
          style={{
            color: appConfigStyle.headerColor
              ? props.themeStyle.textTintColor
              : props.themeStyle.textColor,
            // color: props.props.themeStyle.textColor,
            fontSize: 22,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const getTheme = state => state.appConfig.themeStyle;
const cartQuantity = state => state.cartData.cartQuantity;
const getCartArray = (state) => state.cartData.cartProductsArray;

const cartQuantityFun = createSelector(
  [cartQuantity],
  cartQuantity => {
    return cartQuantity;
  },
);

const getCartArrayFun = createSelector(
  [getCartArray],
  (getCartArray) => {
    return getCartArray
  }
);

const getThemeFun = createSelector(
  [getTheme],
  getTheme => {
    return getTheme;
  },
);
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  cartQuantity: cartQuantityFun(state),
  cartProductsArray: getCartArrayFun(state),
});
export default connect(
  mapStateToProps,
  null,
)(withNavigation(ShoppingCartIcon));

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 15,
    width: 17,
    borderRadius: 30,
    right: -3,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  textStyle: {
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 10,
    fontFamily: appTextStyle.fontFamily,
  },
});
