import {
  getUrl,
  getHttp,
  postHttp,
  getFetchHttp,
  postFetchHttp,
} from '../../common/WooComFetch';
import {store} from '../store/index';
import Snackbar from 'react-native-snackbar';
import couponProvider from '../../common/CouponClass';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeStyle, {appConfigStyle} from '../../common/Theme.style';
import IndiaForecast from '../../screens/ForecastScreens/IndiaForecast';
import {ToastAndroid} from 'react-native';

export const SET_MODE = 'SET_MODE';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const ADD_TOP_SELLER_PRODUCTS = 'ADD_TOP_SELLER_PRODUCTS';
export const ADD_MOST_LIKED_PRODUCTS = 'ADD_MOST_LIKED_PRODUCTS';
export const DEL_COUPON = 'DEL_COUPON';
export const SET_THEME = 'SET_THEME';
export const ADD_SPECIAL_PRODUCTS = 'ADD_SPECIAL_PRODUCTS';
export const SHOW_INTRO = 'SHOW_INTRO';
export const LANG_CODE = 'LANG_CODE';
export const GET_CODE = 'GET_CODE';
export const GET_BANNERS = 'GET_BANNERS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const ADD_SEARCH_TEXT = 'ADD_SEARCH_TEXT';
export const REMOVE_SEARCH_TEXT = 'REMOVE_SEARCH_TEXT';
export const ADD_SHIPPING_LINES = 'ADD_SHIPPING_LINES';
export const REMOVE_SHIPPING_LINES = 'REMOVE_SHIPPING_LINES';
export const ADD_VENDOR = 'ADD_VENDOR';

export const GET_TOPSELLER_PRODUCTS = 'GET_TOPSELLER_PRODUCTS';
export const CLEAR_TOPSELLER_PRODUCTS = 'CLEAR_TOPSELLER_PRODUCTS';

export const GET_FEATURED_PRODUCTS = 'GET_FEATURED_PRODUCTS';
export const CLEAR_FEATURED_PRODUCTS = 'CLEAR_FEATURED_PRODUCTS';

export const GET_ONSALE_PRODUCTS = 'GET_ONSALE_PRODUCTS';
export const CLEAR_ONSALE_PRODUCTS = 'CLEAR_ONSALE_PRODUCTS';

export const GET_HOT_PRODUCTS = 'GET_HOT_PRODUCTS';

export const GET_DETAIL_PAGE_PRODUCTS = 'GET_DETAIL_PAGE_PRODUCTS';
export const CLEAR_DETAIL_PAGE_PRODUCTS = 'CLEAR_DETAIL_PAGE_PRODUCTS';

export const GET_CART_PAGE_PRODUCTS = 'GET_CART_PAGE_PRODUCTS';
export const CLEAR_CART_PAGE_PRODUCTS = 'CLEAR_CART_PAGE_PRODUCTS';

export const SET_FIRST_SETTINGS = 'SET_FIRST_SETTINGS';

export const ABOUT_SETTINGS = 'ABOUT_SETTINGS';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LANGUAGE_ID = 'SET_LANGUAGE_ID';
export const SET_CURRENCY_ID = 'SET_CURRENCY_ID';
export const CLEAR_LANGUAGES = 'CLEAR_LANGUAGES';
export const CLEAR_CURRENCY = 'CLEAR_CURRENCY';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SET_CURRENCY = 'SET_CURRENCY';
export const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE';
export const SET_BANNER_STYLE = 'SET_BANNER_STYLE';
export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const SET_HOME_STYLE = 'SET_HOME_STYLE';
export const SET_CATEGORY_STYLE = 'SET_CATEGORY_STYLE';

export const SET_SESSION_ID = 'SET_SESSION_ID';
export const REMOVE_SESSION_ID = 'REMOVE_SESSION_ID';

export const ADD_CART_PRODUCTS = 'ADD_CART_PRODUCTS';
export const ADD_ADDRESS = 'ADD_ADDRESS';

export const ADD_CART_QUANTITY = 'ADD_CART_QUANTITY';
export const REMOVE_CART_QUANTITY = 'REMOVE_CART_QUANTITY';
export const CLEAR_CART_QUANTITY = 'CLEAR_CART_QUANTITY';

export const ADD_COUPON = 'ADD_COUPON';

export const REGISTER_USER = 'REGISTER_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const REMOVE_COUPON = 'REMOVE_COUPON';
export const SAVE_ALL_PRICES = 'SAVE_ALL_PRICES';
export const GET_WISHLIST_ARRAY = 'GET_WISHLIST_ARRAY';
export const GET_WISHLIST_REMOVE_ID = 'GET_WISHLIST_REMOVE_ID';

export const STORE_WISHLIST = 'STORE_WISHLIST';
export const DELETE_WISHLIST = 'DELETE_WISHLIST';

export function colorFun(th, index) {
  let productColorsArray = [];
  if (appConfigStyle.cardsColor) {
    productColorsArray = ['#eaf3de', '#fbe5e2', '#d7f2fe', '#ffe9a5'];
  } else {
    productColorsArray = [
      th.props.themeStyle.secondryBackgroundColor,
      th.props.themeStyle.secondryBackgroundColor,
      th.props.themeStyle.secondryBackgroundColor,
      th.props.themeStyle.secondryBackgroundColor,
    ];
  }

  if (th.state.productColorCounter > 3 || index === 0) {
    th.state.productColorCounter = 0;
  }
  th.state.productBackgroundColor =
    productColorsArray[th.state.productColorCounter];
  th.state.productColorCounter = th.state.productColorCounter + 1;
  return th.state.productBackgroundColor;
}

export function ForgotPasswordFun(dispatch, th, email) {
  dispatch(async dispatch => {
    const obj = {};
    obj.email = email;
    const data = await postHttp(getUrl() + 'forget_password?', obj);
    if (data.status === 'Success') {
      th.setState(
        {
          spinnerTemp: false,
        },
        () => {
          th.toast.show(data.message);
        },
      );
    } else {
      th.setState(
        {
          spinnerTemp: false,
        },
        () => {
          th.toast.show(data.data.message);
        },
      );
    }
  });
}

export function addSearchValue(value) {
  return {
    type: ADD_SEARCH_TEXT,
    value,
  };
}

export function clearSearchValue() {
  return {
    type: REMOVE_SEARCH_TEXT,
  };
}

export function placeOrderFun(dispatch, data, sessionId, th, method) {
  dispatch(async dispatch => {
    const obj = data;
    if (sessionId === '') {
      obj.currency_id = th.props.settings.currency_id;
      obj.payment_method = method;
    } else {
      obj.currency_id = th.props.settings.currency_id;
      obj.session_id = sessionId;
      obj.payment_method = method;
    }
    const json = await postHttp(getUrl() + 'order', obj);
    if (json.status === 'Success') {
      th.setState(
        {
          spinnerTemp: false,
        },
        () => {
          th.toast.show('Order Placed');
          th.props.navigation.navigate('ThankUScreen');
        },
      );
      // }
      getCartProductsQuantity(dispatch, '', th, json.data, false);
    } else {
      th.setState({
        spinnerTemp: false,
      });
      th.toast.show(th.props.language.EmailandPasswordareWrong);
    }
  });
}

export function getAddress(dispatch, th) {
  dispatch(async dispatch => {
    const data = await getHttp(getUrl() + 'customer_address_book', {});
  });
}

export function getOneProduct(dispatch, languageId, currencyId, id, th) {
  dispatch(async dispatch => {
    let url = 'products/' + id;
    url += '?getCategory=1';
    url += '&getDetail=1';
    url += '&language_id=' + languageId;
    url += '&stock=1';
    url += '&currency=' + currencyId;

    const data = await getHttp(getUrl() + url, {});
    if (data.data.status === 'Success') {
      th.setState({spinnerTemp: false}, () => {
        th.navigate(data.data.data);
      });
    } else {
      th.setState({spinnerTemp: false});
    }
  });
}

export function getStates(dispatch, th, id, langId, lang) {
  dispatch(async dispatch => {
    let url = 'country/' + id;
    url += '?getStates=1';
    url += '&language_id=' + langId;

    const data = await getHttp(getUrl() + url, {});
    if (data.data.status === 'Success') {
      if (data.data.data.states.length > 0) {
        th.setState({
          statesArray: data.data.data.states,
          spinnerTemp: false,
        });
      } else {
        th.setState({
          statesArray: [
            {
              name: lang.other,
              country_id: 0,
              id: 0,
            },
          ],
          spinnerTemp: false,
        });
      }
    } else {
      th.setState({
        statesArray: [],
        spinnerTemp: false,
      });
    }
  });
}

export function getCountry(dispatch, th) {
  dispatch(async dispatch => {
    const data = await getHttp(getUrl() + 'country?sortBy=id&limit=999', {});
    if (data.data.status === 'Success') {
      th.setState({
        countryArray: data.data.data,
      });
    } else {
      th.setState({
        countryArray: [],
      });
    }
  });
}

export async function logOut(dispatch, th) {
  const status = 0;
  await AsyncStorage.setItem('status', JSON.stringify(status));

  dispatch(async dispatch => {
    th.setState({
      spinnerTemp: false,
    });
    dispatch({
      type: REMOVE_USER,
      dispatch,
    });

    dispatch({
      type: ADD_CART_PRODUCTS,
      payload: [],
      dispatch,
    });
    dispatch({
      type: GET_WISHLIST_ARRAY,
      payload: [],
      dispatch,
    });
    dispatch({
      type: REMOVE_SESSION_ID,
      dispatch,
    });
    dispatch({
      type: CLEAR_CART_QUANTITY,
    });
  });
}

export function clearCartQuantity() {
  return {
    type: CLEAR_CART_QUANTITY,
  };
}

export function allPrices(
  cartSubTotalFloat,
  cartDiscountFloat,
  cartShippingFloat,
  cartTaxFloat,
  cartTotalFloat,
) {
  return {
    type: SAVE_ALL_PRICES,
    cartSubTotalFloat: cartSubTotalFloat,
    cartDiscountFloat: cartDiscountFloat,
    cartShippingFloat: cartShippingFloat,
    cartTaxFloat: cartTaxFloat,
    cartTotalFloat: cartTotalFloat,
  };
}

export function signIn(
  dispatch,
  emailSignIn,
  passwordSignIn,
  sessionId,
  th,
  languageId,
  currencyId,
) {
  // alert(emailSignIn);
  // alert(passwordSignIn);

  dispatch(async dispatch => {
    var dat = {};
    dat.username = emailSignIn;
    dat.password = passwordSignIn;

    // console.warn(JSON.stringify(dat));

    // Changes Done by Ankit
    const userDataString = JSON.stringify(dat);
    // Save userDataString to AsyncStorage
    await AsyncStorage.setItem('userData', userDataString);


    // alert(JSON.stringify(dat));

    // const json = await postFetchHttp(ThemeStyle.url + '/wp-json/api/tc_user/generate_cookie/?insecure=cool',
    const json = await postFetchHttp(
      ThemeStyle.url + '/getuserdetails.php',
      JSON.stringify(dat),
    );
    // console.log("json ",json);
    // console.log("dat ",dat);
    console.log("json : ",JSON.stringify(json));

    console.log(ThemeStyle.url + '/getuserdetails.php');

    console.log(json.data.status);

    const status = await json.data.status;

    await AsyncStorage.setItem('status', JSON.stringify(status));

    // let apiUserData = AsyncStorage.setItem(ApiUserData : JSON.stringify(json))
    if (json.data.success) {
      // console.log("id ",json.data.user.id);
      const data = await getHttp('customers/' + json.data.user.id, {
        lang: languageId,
        currency: currencyId,
      });
      // console.log("data ",data);
      th.setState(
        {
          spinnerTemp: false,
          emailSignIn: '',
          passwordSignIn: '',
          firstNameSignUp: '',
          lastNameSignUp: '',
          emailSignUp: '',
          passwordSignUp: '',
          confirmPasswordSignUp: '',
          membership: json.data.status,
        },
        () => {
          th.props.navigation.pop();
        },
      );
      dispatch({
        type: REGISTER_USER,
        payload: data.data,
        dispatch,
      });
      dispatch({
        type: SET_SESSION_ID,
        payload: json.data.cookie,
        dispatch,
      });
    } else {
      // console.log('email apsswrod wrong');
      // alert('xyz');
      th.setState({
        spinnerTemp: false,
      });
      th.toast.show(th.props.language.EmailandPasswordareWrong);
      // th.toast.show('Email & Password wrong. please enter valid crediential !')
      // ToastAndroid.show('Email & Password are wrong. please enter valid crediential !',ToastAndroid.LONG)
    }
  });
}

export function signUp(
  dispatch,
  firstNameSignUp,
  lastNameSignUp,
  userNameSignUp,
  emailSignUp,
  passwordSignUp,
  confirmPasswordSignUp,
  th,
  sessionId,
  languageId,
  currencyId,
) {
  dispatch(async dispatch => {
    const signUpformData = {
      lang: languageId,
      currency: currencyId,
      email: emailSignUp,
      password: passwordSignUp,
      first_name: firstNameSignUp,
      last_name: lastNameSignUp,
      username: userNameSignUp,
      confirm_password: confirmPasswordSignUp,
      wpgdprc: 1,
      display_name: firstNameSignUp + ' ' + lastNameSignUp,
      register: 'Register',
    };
    // const json = await postFetchHttp(ThemeStyle.url + '/wp-json/api/tc_user/register/?insecure=cool',
    const json = await postFetchHttp(
      ThemeStyle.url + '/signupuser.php',
      JSON.stringify(signUpformData),
    );
    console.log(json);

    // console.log(json)

    signIn(dispatch, emailSignUp, confirmPasswordSignUp, sessionId, th);
    dispatch({
      type: REGISTER_USER,
      payload: json.data,
      dispatch,
    });
  });
}

export function checkCouponAvalability(
  dispatch,
  value,
  th,
  languageId,
  currencyId,
) {
  dispatch(async dispatch => {
    const json = await getHttp('coupons/', {
      code: value,
      lang: languageId,
      currency: currencyId,
    });
    if (json.status === 'success' && json.data.length > 0) {
      th.toast.show(th.props.language['Coupons Applied']);
      th.applyCouponCart(json.data[0]);
    } else {
      th.toast.show(th.props.language['Invalid Coupon Code!']);
      th.setState({spinnerTemp: false});
    }
  });
}

export function removeCoupon() {
  return {
    type: REMOVE_COUPON,
  };
}

export function clearProducts() {
  return {
    type: CLEAR_LANGUAGES,
  };
}

export function clearCurrences(value) {
  return {
    type: CLEAR_CURRENCY,
    value,
  };
}

export function setCurrencyId(value) {
  return {
    type: SET_CURRENCY_ID,
    value,
  };
}

export function clearLanguages(value) {
  return {
    type: CLEAR_LANGUAGES,
    value,
  };
}

export function setLanguageId(value) {
  return {
    type: SET_LANGUAGE_ID,
    value,
  };
}

export function getCartProducts(
  dispatch,
  sessionId,
  th,
  languageId,
  currencyId,
) {
  dispatch(async dispatch => {
    th.setState({spinnerTemp: true});
    let count = 0;
    th.props.cartProductsArray.forEach(async (value, index) => {
      let id = value.product_id;
      if (value.variation_id !== undefined) id = value.variation_id;
      const data = await getHttp('products/' + id, {
        lang: languageId,
        currency: currencyId,
        status: 'publish',
      });
      count++;
      const p = data.data;
      // alert(JSON.stringify(p.price));
      const membershipStatus = await AsyncStorage.getItem('status');
      // alert(membershipStatus);
      if (p.id === undefined) {
        th.props.cartProductsArray.splice(index, 1);
      } else if (p.status === 'trash') {
        th.props.cartProductsArray.splice(index, 1);
      } else {
        // alert(JSON.stringify(p.id));
        // Changes done by Ankit
        // value.price = p.price
        value.price =

          membershipStatus === '0' &&
          (p.id == 510970 || p.id == 510974 || p.id == 510977)
            ? value.price
            : membershipStatus === '1' &&
              (p.id !== 510970 && p.id !== 510974 && p.id !== 510977)

    // membershipStatus === '0' &&
    // (p.id == 510970 || p.id == 510974 || p.id == 510977)
    //     ? value.price
    //     : membershipStatus === '1' &&
    //     (p.id !== 510970 && p.id !== 510974 && p.id !== 510977)

            ? '00.00'
            : p.price;
        value.name = p.name;
        value.stock_quantity = p.stock_quantity;
        value.tax_status = p.tax_status;
        value.tax_class = p.tax_class;
        value.tax_status = p.tax_status;
        value.on_sale = p.on_sale;
        value.categories = p.categories;

        if (p.stock_quantity === null) {
        } else if (p.stock_quantity < value.quantity)
          value.quantity = p.stock_quantity;
        else if (p.stock_status !== 'instock') {
          th.props.cartProductsArray.splice(index, 1);
        }

        value.subtotal = parseFloat(value.price) * value.quantity;
        value.total = parseFloat(value.price) * value.quantity;
      }
      if (count === th.props.cartProductsArray.length) {
        changingCart(dispatch, th);
      }
    });
    if (th.props.cartProductsArray.length === 0) {
      th.setState({spinnerTemp: false});
    }
  });
}
export function changingCart(dispatch, th) {
  dispatch(async dispatch => {
    dispatch({
      type: ADD_CART_PRODUCTS,
      payload: th.props.cartProductsArray,
      dispatch,
    });

    th.props.coupon.forEach(value => {
      th.props.cartProductsArray = couponProvider.apply(
        value,
        th.props.cartProductsArray,
      ); /// /////////////////
    });

    th.calculateFinalPrice(th.props.cartProductsArray);

    th.setState({spinnerTemp: false});
  });
}
export function getCartProductsQuantity(
  dispatch,
  sessionId,
  th,
  userDat,
  isProductDetailPage,
) {
  dispatch(async dispatch => {
    try {
      dispatch({
        type: ADD_CART_PRODUCTS,
        payload: [],
        dispatch,
      });
      dispatch({
        type: ADD_COUPON,
        payload: [],
        dispatch,
      });
      dispatch({
        type: DEL_COUPON,
        code: '',
        dispatch,
      });
      dispatch({
        type: ADD_CART_QUANTITY,
        payload: 0,
        dispatch,
      });
      if (isProductDetailPage) {
        th.setState(
          {
            stockIndicator: false,
            isModalVisible: false,
            spinnerTemp: false,
          },
          () => {},
        );
      }
    } catch (error) {
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}

export function deleteProductFromCart(
  dispatch,
  id,
  sessionId,
  combinationId,
  qty,
  th,
) {
  dispatch(async dispatch => {
    th.props.cartProductsArray.forEach((value, index) => {
      if (value.cart_id === id) {
        th.props.cartProductsArray.splice(index, 1);
      }
    });
    getCartProducts(dispatch, sessionId, th);
    dispatch({
      type: ADD_CART_QUANTITY,
      payload: th.props.cartProductsArray.length,
      dispatch,
    });
  });
}
export function deleteAllProductFromCart(
  dispatch,
  id,
  sessionId,
  combinationId,
  qty,
  th,
) {
  dispatch(async dispatch => {
    th.props.cartProductsArray.forEach((value, index) => {
      // if (value.cart_id === id) {
      th.props.cartProductsArray.splice(index, 1);
      // }
    });
    getCartProducts(dispatch, sessionId, th);
    dispatch({
      type: ADD_CART_QUANTITY,
      payload: th.props.cartProductsArray.length,
      dispatch,
    });
  });
}
export async function checkProductStock(
  id,
  type,
  combinationId = null,
  quantity,
) {
  let url = 'available_qty';
  url += '?product_id=' + id;
  if (combinationId != null) url += '&product_combination_id=' + combinationId;
  url += '&product_type=' + type;
  const json = await getHttp(getUrl() + url, {});
  const stock = parseInt(json.data.data.remaining_stock);

  if (stock === 0) {
    return {status: 'outOfStock'};
  } else if (stock >= quantity) {
    return {status: 'canAddToCart'};
  } else if (stock < quantity) {
    return {status: 'quantityIsLimited', stock: stock};
  }
}

export function getCurrency(dispatch) {
  dispatch(async dispatch => {
    const data = await postFetchHttp(
      ThemeStyle.url + '/wp-json/api/tc_settings/app_all_currencies',
      {},
    );
    dispatch({
      type: GET_CURRENCY,
      payload: data.data.data,
      dispatch,
    });
  });
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('settings');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('settings', jsonValue);
  } catch (e) {
    // saving error
  }
};

export function aboutUsData(dispatch, temp) {
  dispatch(async dispatch => {
    let url = ThemeStyle.url + '/wp-json/wp/v2/pages/69';

    if (temp.about_page_id !== undefined) {
      const ids =
        temp.about_page_id +
        ',' +
        temp.refund_page_id +
        ',' +
        temp.terms_page_id +
        ',' +
        temp.privacy_page_id;

      url = url + '?include=' + ids;
    }

    const settings = await getFetchHttp(url, {});

    dispatch({
      type: ABOUT_SETTINGS,
      payload: settings.data,
      dispatch,
    });
  });
}

export function getVendorList(dispatch, temp) {
  dispatch(async dispatch => {
    if (temp.mvf_enabled === '1') {
      const url =
        ThemeStyle.url +
        '/wp-json/api/tc_settings/app_featured_dokan_vendors_list';
      const data = await postFetchHttp(url, {});

      if (data.status === 'success') {
        let ddata = data.data;
        if (store.getState().vendorData.vendorsArray[0] === 1) {
          dispatch({
            type: ADD_VENDOR,
            payload: {},
            dispatch,
          });
        }

        const dataObj = {};
        dataObj.isData = true;

        if (ddata.data == null) {
          ddata = [];
          dataObj.isData = false;
        }
        const tempArray = [];

        for (const d of ddata) {
          if (d.banner === false) {
            d.banner = '';
          }
          if (d.meta[0].store_name !== '') d.name = d.meta[0].store_name;
          else d.name = d.first_name + ' ' + d.last_name;
          tempArray.push(d);
          dataObj.data = tempArray;
        }

        dispatch({
          type: ADD_VENDOR,
          payload: dataObj,
          dispatch,
        });
      }
    } else if (temp.mvf_enabled === '2') {
      const url =
        ThemeStyle.url + '/wp-json/api/tc_settings/app_featured_wcvendors_list';
      const data = await getFetchHttp(url, {});

      if (data.status === 'success') {
        let ddata = data.data;
        if (store.getState().vendorData.vendorsArray[0] === 1) {
          dispatch({
            type: ADD_VENDOR,
            payload: {},
            dispatch,
          });
        }
        const dataObj = {};
        dataObj.isData = true;

        if (ddata == null) {
          ddata = [];
          dataObj.isData = false;
        }
        const tempArray = [];
        for (const d of ddata) {
          if (d.banner === false) {
            d.banner = '';
          }
          if (d.meta.pv_shop_name !== '') d.name = d.meta.pv_shop_name;
          else d.name = d.first_name + ' ' + d.last_name;
          tempArray.push(d);
          dataObj.data = tempArray;
        }

        dispatch({
          type: ADD_VENDOR,
          payload: dataObj,
          dispatch,
        });
      }
    } else if (temp.mvf_enabled === '3') {
      const url = ThemeStyle.url + '/wp-json/wcfmmp/v1/store-vendors';
      const data = await getFetchHttp(url, {});

      if (data.status === 'success') {
        let ddata = data.data;
        if (store.getState().vendorData.vendorsArray[0] === 1) {
          dispatch({
            type: ADD_VENDOR,
            payload: {},
            dispatch,
          });
        }
        const dataObj = {};
        dataObj.isData = true;
        const tempArray = [];
        if (ddata == null) {
          ddata = [];
          dataObj.isData = false;
        }
        for (const d of ddata) {
          if (d.vendor_banner) {
            d.banner = d.vendor_banner;
          } else {
            d.banner = '';
          }
          d.name = d.vendor_display_name;
          tempArray.push(d);
          dataObj.data = tempArray;
        }
        dispatch({
          type: ADD_VENDOR,
          payload: dataObj,
          dispatch,
        });
      }
    }
  });
}

export function firstSettingCallFun(dispatch, props, th) {
  dispatch(async dispatch => {
    const settings = await getFetchHttp(
      ThemeStyle.url + '/wp-json/api/tc_settings/app_all_settings',
      {},
    );
    let temp = {};
    temp = settings.data;
    storeData(settings.data);
    getBanners(dispatch, th);
    getCategories(dispatch, props.languageCode, props.currencyCode, 1, th);
    getProducts(dispatch, props.languageCode, props.currencyCode, 1, '', th);

    getonSaleProducts(dispatch, props.languageCode, props.currencyCode, 1, th);

    getfeaturedProducts(
      dispatch,
      props.languageCode,
      props.currencyCode,
      1,
      th,
    );

    gettopsellerProducts(
      dispatch,
      props.languageCode,
      props.currencyCode,
      1,
      th,
    );

    setCurrencyId(temp.currency_id, th);
    aboutUsData(dispatch, temp);
    getVendorList(dispatch, temp);
    dispatch({
      type: SET_FIRST_SETTINGS,
      payload: temp,
      dispatch,
    });
  });
}

export function settingCallFun(dispatch, savedSettings) {
  dispatch(async dispatch => {
    getData().then(res => {
      dispatch({
        type: SET_FIRST_SETTINGS,
        payload: res,
        dispatch,
      });
    });

    const settings = await getFetchHttp(
      ThemeStyle.url + '/wp-json/api/tc_settings/app_all_settings',
      {},
    );
    let temp = {};
    temp = settings.data;
    storeData(settings.data);
    aboutUsData(dispatch, temp);
    getVendorList(dispatch, temp);
    /// //////////////////
  });
}

export function getBanners(dispatch) {
  dispatch(async dispatch => {
    const json = await getFetchHttp(
      ThemeStyle.url + '/wp-json/api/tc_settings/app_all_banners',
      {},
    );
    if (json.status === 'success') {
      dispatch({
        type: GET_BANNERS,
        payload: json.data.data,
        dispatch,
      });
    }
  });
}
export function gettopsellerProducts(dispatch, languageId, currencyId, th) {
  dispatch(async dispatch => {
    const data = await getHttp('products/', {
      lang: languageId,
      currency: currencyId,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        dispatch({
          type: GET_TOPSELLER_PRODUCTS,
          payload: data.data,
          dispatch,
        });
      } else {
        th.toast.show(data.status);
        th.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      th.toast.show(data.status);
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}
export function getfeaturedProducts(dispatch, languageId, currencyId, th) {
  dispatch(async dispatch => {
    const data = await getHttp('products/', {
      featured: true,
      lang: languageId,
      currency: currencyId,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        dispatch({
          type: GET_FEATURED_PRODUCTS,
          payload: data.data,
          dispatch,
        });
      } else {
        th.toast.show(data.status);
        th.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      th.toast.show(data.status);
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}
export function getonSaleProducts(dispatch, languageId, currencyId, th) {
  dispatch(async dispatch => {
    const data = await getHttp('products/', {
      on_sale: true,
      lang: languageId,
      currency: currencyId,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        dispatch({
          type: GET_ONSALE_PRODUCTS,
          payload: data.data,
          dispatch,
        });
      } else {
        th.toast.show(data.status);
        th.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      th.toast.show(data.status);
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}

export function getProducts(
  dispatch,
  languageId,
  currencyId,
  page,
  category,
  th,
) {
  dispatch(async dispatch => {
    const data = await getHttp('products/', {
      lang: languageId,
      currency: currencyId,
      page: page,
      category: category,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        dispatch({
          type: GET_PRODUCTS,
          payload: data.data,
          dispatch,
        });
      } else {
        th.toast.show(data.status);
        th.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      th.toast.show(data.status);
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}

// Original code

// export function getpdRelatedProducts (dispatch, languageCode, currencyCode, page, relatedIdsArray, th) {

//   dispatch(async dispatch => {
//     const data = await getHttp('products/', {
//       lang: languageCode,
//       currency: currencyCode,
//       page,
//       per_page: 10,
//       include: relatedIdsArray,
//       status: 'publish'
//     })
//     if (data.status === 'success') {
//       if (data.status === 'success') {
//         dispatch({
//           type: GET_DETAIL_PAGE_PRODUCTS,
//           payload: data.data,
//           dispatch
//         })
//       } else {
//         th.toast.show(data.status)
//         th.setState({
//           spinnerTemp: false
//         })
//       }
//     } else if (data.status === 'error') {
//       th.toast.show(data.status)
//       th.setState({
//         spinnerTemp: false
//       })
//     }
//   })
// }

// Changes done by Bhaskar

export async function getpdRelatedProducts(
  dispatch,
  languageCode,
  currencyCode,
  page,
  relatedIdsArray,
  th,
) {
  let productID = await th.navigation.state.params.objectArray.id;

  let categoryID = await th.navigation.state.params.objectArray.categories[0]
    .id;

  // const resultsArray = [];
  const resultsArray = [];
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  await fetch(
    `https://weaclimsolutions.com/getproducts.php?task=get_related_products&product_id=${productID}&category_id=${categoryID}`,
    requestOptions,
  )
    .then(response => response.json()) // Use response.json() to parse the JSON response
    .then(result => {
      // alert(JSON.stringify(result.related_product_ids));
      resultsArray.push(result.related_product_ids);
      console.log(result);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  dispatch(async dispatch => {
    // alert(JSON.stringify(resultsArray));
    const data = await getHttp('products/', {
      lang: languageCode,
      currency: currencyCode,
      page,
      per_page: 10,
      include: resultsArray,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        dispatch({
          type: GET_DETAIL_PAGE_PRODUCTS,
          payload: data.data,
          dispatch,
        });
      } else {
        th.toast.show(data.status);
        th.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      th.toast.show(data.status);
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}

// export async function getpdRelatedProducts(dispatch, languageCode, currencyCode, page, relatedIdsArray, th, state) {

//   let productID = await th.navigation.state.params.objectArray.id;

//   let categoryID = await th.navigation.state.params.objectArray.categories[0].id;

//   // alert(JSON.stringify(productID))
//   // alert(JSON.stringify(categoryID))

//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   await fetch(`https://weaclimsolutions.com/getproducts.php?task=get_related_products&product_id=633271&category_id=133`, requestOptions)

//     .then(response => response.json())
//     .then(async (result) => {
//       console.log(result);

//       try {
//         const resultsArray = JSON.parse(result);

//         // Assuming resultsArray is an array, modify this part based on the actual structure of your result
//         const include = resultsArray.map(item => item.id).join(',');

//         const data = await getHttp('products/', {
//           lang: languageCode,
//           currency: currencyCode,
//           page,
//           per_page: 10,
//           include,
//           status: 'publish'
//         });

//         if (data.status === 'success') {
//           dispatch({
//             type: GET_DETAIL_PAGE_PRODUCTS,
//             payload: data.data,
//             dispatch
//           });
//         } else {
//           th.toast.show(data.status);
//           th.setState({
//             spinnerTemp: false
//           });
//         }
//       } catch (error) {
//         console.log('Error parsing JSON:', error);
//       }
//     })

//     .catch(error => console.log('error', error));
// }

//original code

export async function getcartRelatedProducts(
  dispatch,
  page,
  languageCode,
  currencyCode,
  data,
) {
  // alert(JSON.stringify(data.cartProductsArray[0].categories[0].id));
  // alert(JSON.stringify(data.cartProductsArray));

  let productID = data.cartProductsArray[0].product_id;

  let categoryID = data.cartProductsArray[0].categories[0].id;

  const resultsArray = [];
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  await fetch(
    `https://weaclimsolutions.com/getproducts.php?task=get_related_products&product_id=${productID}&category_id=${categoryID}`,
    requestOptions,
  )
    .then(response => response.json()) // Use response.json() to parse the JSON response
    .then(result => {
      // alert(JSON.stringify(result.related_product_ids));
      resultsArray.push(result.related_product_ids);
      console.log(result);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  console.log('CartData', data);
  dispatch(async dispatch => {
    const data = await getHttp('products/', {
      lang: languageCode,
      currency: currencyCode,
      // page,
      per_page: 10,
      include: resultsArray,
      status: 'publish',
    });
    dispatch({
      type: GET_CART_PAGE_PRODUCTS,
      payload: data.data,
      dispatch,
    });
  });
}

//code by bhaskar
// export async function getcartRelatedProducts(dispatch, page, languageCode, currencyCode) {

//     let productID =  data.cartProductsArray[0].product_id;

// let categoryID = data.cartProductsArray[0].categories[0].id;

//   const resultsArray = [];
//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   await fetch(`https://weaclimsolutions.com/getproducts.php?task=get_related_products&product_id=${productID}&category_id=${categoryID}`, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       resultsArray.push(result);
//       console.log(result)
//     })

//     .catch(error => console.log('error', error));

//   dispatch(async dispatch => {
//     const data = await getHttp('products/', {
//       lang: languageCode,
//       currency: currencyCode,
//       page,
//       per_page: 10,
//       include: resultsArray,
//       status: 'publish'
//     })
//     dispatch({
//       type: GET_CART_PAGE_PRODUCTS,
//       payload: data.data,
//       dispatch
//     })
//   })
// }

export function getCategories(
  dispatch,
  languageCode,
  currencyCode,
  page = 1,
  th,
) {
  dispatch(async dispatch => {
    const perPage = 99;
    const data = await getHttp('products/categories', {
      lang: languageCode,
      currency: currencyCode,
      page,
      per_page: 50,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        if (data.data.length === perPage) {
          getCategories(dispatch, languageCode, currencyCode, ++page, th);
        }

        dispatch({
          type: GET_CATEGORIES,
          payload: data.data,
          dispatch,
        });
      } else {
        th.toast.show(data.status);
        th.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      th.toast.show(data.status);
      th.setState({
        spinnerTemp: false,
      });
    }
  });
}

export function getWishlist(dispatch) {
  dispatch(async dispatch => {
    const data = await getHttp(getUrl() + 'wishlist', {});
    dispatch({
      type: GET_WISHLIST_ARRAY,
      payload: data.data.data,
      dispatch,
    });
  });
}

export function storeWishlist(dispatch, userData, productId, th) {
  dispatch(dispatch => {
    dispatch({
      type: GET_WISHLIST_ARRAY,
      payload: productId,
      dispatch,
    });
  });
}

export function removeWishlistFun(
  dispatch,
  userData,
  productId,
  th,
  wishListId,
) {
  dispatch(dispatch => {
    dispatch({
      type: GET_WISHLIST_REMOVE_ID,
      removeProductId: productId,
      dispatch,
    });
  });
}

export function setThemeColor(appLightTheme, appDarkTheme) {
  return {
    type: SET_THEME,
    appLightTheme,
    appDarkTheme,
  };
}

export function setLanguageCode(value) {
  return {
    type: LANG_CODE,
    value,
  };
}

export function introShowFun(value) {
  return {
    type: SHOW_INTRO,
    value,
  };
}

export function setModeValue(value) {
  return {
    type: SET_MODE,
    isDarkMode: value,
  };
}

export function addAddressValue(
  firstName,
  lastName,
  selectedCountry,
  selectedState,
  addressOne,
  billingEmailText,
  zip,
  stateValue,
  city,
  email,
  phone,

  shippingFirstName,
  shippingLastName,
  shippingSelectedCountry,
  shippingAddressOne,
  shippingZip,
  shippingSelectedState,
  shippingCity,
) {
  return {
    type: ADD_ADDRESS,
    firstName: firstName,
    lastName: lastName,
    selectedCountry: selectedCountry,
    selectedState: selectedState,
    addressOne: addressOne,
    zip: zip,
    stateValue: stateValue,
    city: city,
    email: billingEmailText,
    phone: phone,
    shippingFirstName: shippingFirstName,
    shippingLastName: shippingLastName,
    shippingSelectedCountry: shippingSelectedCountry,
    shippingAddressOne: shippingAddressOne,
    shippingZip: shippingZip,
    shippingSelectedState: shippingSelectedState,
    shippingCity: shippingCity,
  };
}
/// ///////////////////////////////////////////////// cart data
convertHtmlTag = htmlprice => {
  let s = htmlprice;
  s = s.replace(/<del>/, '<s>');
  s = s.replace(/<\/del>/, '</s>');
  return s;
};
// adding into cart array products
/// /////////////

export const addToCartFun = (
  dispatch,
  product,
  variation,
  quantity,
  metaData,
  th,
  quantityType = null,
) => {
  // alert("product"+JSON.stringify(product));
  // alert("variation"+JSON.stringify(variation));
  // alert("quantity"+JSON.stringify(quantity));
  // alert("metaData"+JSON.stringify(metaData));
  // alert("th"+JSON.stringify(th));

  const p = {};
  if (quantity === null || quantity === 'null') {
    p.quantity = 1;
  } else {
    p.quantity = quantity;
  }

  // checking if variation is out of stock
  if (variation != null) {
    if (variation.stock_status === 'outofstock') {
      Snackbar.show({
        backgroundColor: th.props.themeStyle.primary,
        textColor: th.props.themeStyle.textTintColor,
        text: th.props.language['OUT OF STOCK'],
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: th.props.language.Close,
          textColor: th.props.themeStyle.secondry,
          backgroundColor: th.props.themeStyle.primary,
        },
      });
      th.toast.show('OUT OF STOCK');
      return;
    }
  }
  if (product.stock_status === 'outofstock') {
    th.toast.show('OUT OF STOCK');
    Snackbar.show({
      backgroundColor: th.props.themeStyle.primary,
      textColor: th.props.themeStyle.textTintColor,
      text: th.props.language['OUT OF STOCK'],
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: th.props.language.Close,
        textColor: th.props.themeStyle.secondry,
        backgroundColor: th.props.themeStyle.primary,
      },
    });
    return;
  }
  if (!checkCart(product, quantity)) {
    cartTotalItems(dispatch);

    th.setState({
      spinnerTemp: false,
    });
    return;
  }
  if (alreadyInCart(product, variation, quantity, quantityType)) {
    cartTotalItems(dispatch);
    Snackbar.show({
      backgroundColor: th.props.themeStyle.primary,
      textColor: th.props.themeStyle.textTintColor,
      text: th.props.language['Already In Cart'],
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: th.props.language.Close,
        textColor: th.props.themeStyle.secondry,
        backgroundColor: th.props.themeStyle.primary,
      },
    });
    th.setState({
      spinnerTemp: false,
    });
    return;
  }
  if (quantityType === 'quantityMinus') {
    cartTotalItems(dispatch);

    th.setState({
      spinnerTemp: false,
    });
    return 0;
  }
  p.product_id = product.id;
  p.name = product.name;

  var seconds = new Date().getTime();
  p.cart_id = product.id + seconds;
  if (product.images.length !== 0) {
    p.image = product.images[0].src;
  } else {
    p.image = '';
  }
  p.stock_quantity = product.stock_quantity;
  p.tax_class = product.tax_class;
  p.tax_status = product.tax_status;
  p.price = product.price;
  p.price_html = product.price_html;
  p.subtotal = parseFloat(product.price) * parseInt(p.quantity);
  p.total = parseFloat(product.price) * parseInt(p.quantity);
  p.on_sale = product.on_sale;
  p.categories = product.categories;

  if (metaData != null) p.meta_data = metaData;
  p.sold_individually = product.sold_individually;

  if (product.type === 'variable' && variation != null) {
    p.variation_id = variation.id;
    p.price = parseFloat(variation.price);
    p.subtotal = parseFloat(variation.price) * parseInt(p.quantity);
    p.total = parseFloat(variation.price) * parseInt(p.quantity);
    p.name = variation.name;
    p.stock_quantity = variation.stock_quantity;
    p.tax_status = variation.tax_status;

    try {
      if (variation.image) p.image = variation.image.src;
      else p.image = variation.images[0].src;
    } catch (error) {}
  }
  store.getState().cartData.cartProductsArray.push(p);
  cartTotalItems(dispatch);
  Snackbar.show({
    backgroundColor: th.props.themeStyle.primary,
    textColor: th.props.themeStyle.textTintColor,
    text: th.props.language['Added To Card!'],
    duration: Snackbar.LENGTH_LONG,
    action: {
      text: th.props.language.Close,
      textColor: th.props.themeStyle.secondry,
      backgroundColor: th.props.themeStyle.primary,
    },
  });
  th.setState({
    spinnerTemp: false,
  });

  return 1;
};
/// //////////////////////
export const alreadyInCart = (p, variation, quantity, quantityType) => {
  let count = 0;
  for (const value of store.getState().cartData.cartProductsArray) {
    if (p.type !== 'variable' && value.product_id === p.id) {
      count++;
      if (quantityType === 'quantityPlus') {
        value.quantity++;
      } else if (quantityType === 'quantityMinus') {
        if (value.quantity === 1) {
          removeCartItemWithProductId(p.id);
        } else {
          value.quantity--;
        }
        // Changes done by Ankit on 29-04-2024
      } else if (quantityType == null) {

        // value.quantity = parseInt(value.quantity) + parseInt(quantity);
        value.quantity = parseInt(quantity);

        value.quantity = parseInt(value.quantity) + parseInt(quantity);

      }
    } else if (
      value.product_id === p.id &&
      value.variation_id === variation.id
    ) {
      count++;

      // value.quantity = parseInt(value.quantity) + parseInt(quantity);
      value.quantity = parseInt(value.quantity) + parseInt(quantity);
    }
  }
  if (count !== 0) return true;
  return false;
};

export const removeCartItemWithProductId = id => {
  store.getState().cartData.cartProductsArray.forEach((value, index) => {
    if (value.product_id === id) {
      store.getState().cartData.cartProductsArray.splice(index, 1);
    }
  });
};

export const updateCart = array => {
  this.cartProductsArray = array;
  this.saveCartToLocalStorage(this.cartProductsArray);
};
/// ////////////////////////
export const checkCart = (p, quantity) => {
  let name = null;
  let onlyOneAllowed = true;
  let quantityCheck = true;
  // check for only one item is allowed
  for (const value of store.getState().cartData.cartProductsArray) {
    if (value.sold_individually === true && p.id === value.product_id) {
      onlyOneAllowed = false;
      name = value.name;
    }
  }
  if (onlyOneAllowed === false) console.log("'Only One Item Allowed'");
  if (quantity == null) quantity = 1;

  if (p.stock_quantity == null || p.stock_quantity > quantity) {
    quantityCheck = true;
  } else if (p.stock_quantity < quantity) {
    quantityCheck = false;
  }

  if (onlyOneAllowed && quantityCheck) return true;
  return false;
};

/// /////////////////////////////
// Function calcualte the total items of cart
export const cartTotalItems = dispatch => {
  dispatch({
    type: ADD_CART_QUANTITY,
    payload: store.getState().cartData.cartProductsArray.length,
    dispatch,
  });
};

export const removeHtmlEntites = value => {
  const multiple = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&cent;': '¢',
    '&pound;': '£',
    '&yen;': '¥',
    '&euro;': '€',
    '&copy;': '©',
    '&reg;': '®',
    '&#160;': ' ',
    '&#60;': '<',
    '&#62;': '>',
    '&#38;': '&',
    '&#34;': '"',
    '&#39;': "'",
    '&#162;': '¢',
    '&#163;': '£',
    '&#165;': '¥',
    '&#8364;': '€',
    '&#169;': '©',
    '&#174;': '®',
  };
  for (const char in multiple) {
    const before = char;
    const after = multiple[char];
    const pattern = new RegExp(before, 'g');
    value = value.replace(pattern, after);
  }
  return value;
};

export const removeDiacritics = str => {
  var defaultDiacriticsRemovalMap = [
    {
      base: 'A',
      letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,
    },
    {base: 'AA', letters: /[\uA732]/g},
    {base: 'AE', letters: /[\u00C6\u01FC\u01E2]/g},
    {base: 'AO', letters: /[\uA734]/g},
    {base: 'AU', letters: /[\uA736]/g},
    {base: 'AV', letters: /[\uA738\uA73A]/g},
    {base: 'AY', letters: /[\uA73C]/g},
    {
      base: 'B',
      letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g,
    },
    {
      base: 'C',
      letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,
    },
    {
      base: 'D',
      letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g,
    },
    {base: 'DZ', letters: /[\u01F1\u01C4]/g},
    {base: 'Dz', letters: /[\u01F2\u01C5]/g},
    {
      base: 'E',
      letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g,
    },
    {base: 'F', letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {
      base: 'G',
      letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g,
    },
    {
      base: 'H',
      letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g,
    },
    {
      base: 'I',
      letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g,
    },
    {base: 'J', letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {
      base: 'K',
      letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g,
    },
    {
      base: 'L',
      letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g,
    },
    {base: 'LJ', letters: /[\u01C7]/g},
    {base: 'Lj', letters: /[\u01C8]/g},
    {base: 'M', letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {
      base: 'N',
      letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g,
    },
    {base: 'NJ', letters: /[\u01CA]/g},
    {base: 'Nj', letters: /[\u01CB]/g},
    {
      base: 'O',
      letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
    },
    {base: 'OI', letters: /[\u01A2]/g},
    {base: 'OO', letters: /[\uA74E]/g},
    {base: 'OU', letters: /[\u0222]/g},
    {
      base: 'P',
      letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g,
    },
    {base: 'Q', letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {
      base: 'R',
      letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g,
    },
    {
      base: 'S',
      letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g,
    },
    {
      base: 'T',
      letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,
    },
    {base: 'TZ', letters: /[\uA728]/g},
    {
      base: 'U',
      letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g,
    },
    {base: 'V', letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {base: 'VY', letters: /[\uA760]/g},
    {
      base: 'W',
      letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,
    },
    {base: 'X', letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {
      base: 'Y',
      letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,
    },
    {
      base: 'Z',
      letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g,
    },
    {
      base: 'a',
      letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,
    },
    {base: 'aa', letters: /[\uA733]/g},
    {base: 'ae', letters: /[\u00E6\u01FD\u01E3]/g},
    {base: 'ao', letters: /[\uA735]/g},
    {base: 'au', letters: /[\uA737]/g},
    {base: 'av', letters: /[\uA739\uA73B]/g},
    {base: 'ay', letters: /[\uA73D]/g},
    {
      base: 'b',
      letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g,
    },
    {
      base: 'c',
      letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,
    },
    {
      base: 'd',
      letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g,
    },
    {base: 'dz', letters: /[\u01F3\u01C6]/g},
    {
      base: 'e',
      letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g,
    },
    {base: 'f', letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {
      base: 'g',
      letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g,
    },
    {
      base: 'h',
      letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g,
    },
    {base: 'hv', letters: /[\u0195]/g},
    {
      base: 'i',
      letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g,
    },
    {base: 'j', letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {
      base: 'k',
      letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g,
    },
    {
      base: 'l',
      letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g,
    },
    {base: 'lj', letters: /[\u01C9]/g},
    {base: 'm', letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {
      base: 'n',
      letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g,
    },
    {base: 'nj', letters: /[\u01CC]/g},
    {
      base: 'o',
      letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,
    },
    {base: 'oi', letters: /[\u01A3]/g},
    {base: 'ou', letters: /[\u0223]/g},
    {base: 'oo', letters: /[\uA74F]/g},
    {
      base: 'p',
      letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g,
    },
    {base: 'q', letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {
      base: 'r',
      letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g,
    },
    {
      base: 's',
      letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g,
    },
    {
      base: 't',
      letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g,
    },
    {base: 'tz', letters: /[\uA729]/g},
    {
      base: 'u',
      letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g,
    },
    {base: 'v', letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {base: 'vy', letters: /[\uA761]/g},
    {
      base: 'w',
      letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g,
    },
    {base: 'x', letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {
      base: 'y',
      letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g,
    },
    {
      base: 'z',
      letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g,
    },
  ];
  for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(
      defaultDiacriticsRemovalMap[i].letters,
      defaultDiacriticsRemovalMap[i].base,
    );
  }
  return str.toUpperCase();
};
