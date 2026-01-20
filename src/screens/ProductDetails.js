import React, {PureComponent} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Dimensions,
  I18nManager,
  Platform,
  Modal,
  Share,
  Button,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Header from '../common/HeaderCustom';
import Loader from 'react-native-easy-content-loader';
import CardTem from '../common/CardTemplate';
import Counter from '../common/Counter';
import ImageLoad from '../common/RnImagePlaceH';
import HTML from 'react-native-render-html';
import Snackbar from 'react-native-snackbar';
import {UIActivityIndicator} from 'react-native-indicators';
import {CardStyleInterpolators} from 'react-navigation-stack';
import ProductsBanner from '../common/ProductsBanner';
import Stars from 'react-native-stars';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHttp, getUrl, postFetchHttp} from '../common/WooComFetch';
import ThemeStyle, {appTextStyle} from '../common/Theme.style';
import {Icon} from 'native-base';
import {
  addToCartFun,
  storeWishlist,
  removeWishlistFun,
  CLEAR_DETAIL_PAGE_PRODUCTS,
  getpdRelatedProducts,
  colorFun,
  removeDiacritics,
} from '../redux/actions/actions';
import Toast from 'react-native-easy-toast';
import GroupCard from '../common/groupProduct';

import { ScrollView } from 'react-native-gesture-handler';


const WIDTH = Dimensions.get('window').width;

class ProductDetail extends PureComponent {
  static navigationOptions = ({navigation}) => {
    return {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerForceInset: {top: 'never', vertical: 'never'},
      headerShown: false,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerRight: () => (
        <TouchableOpacity
          // style={{backgroundColor:'red'}}
          onPress={() => navigation.navigate('Home1Screen')}>
          <Image
            style={{width: 25, height: 25, tintColor: 'white', marginRight: 10}}
            source={require('../images/homeicon3.png')}
          />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      detailsDisplay: false,
      isModalVisible: false,
      quantityNumber:
        this.props.navigation.state.params.objectArray.type === 'grouped'
          ? 0
          : 1,
      priceNumber: 0,
      selectedVariationsArray: [],
      selectedCombitionProductObject: {},
      enableOutOFStockButtonBool: false,
      spinnerTemp: false,
      groupeProductArray: [],
      stockIndicator: false,
      page: 1,
      selected: '',
      timeValue: 400,
      loading: false,
      fabB: false,
      productColorCounter: 0,
      productID: '',
      membershipStatus: 0,
      /// //
      htmlPriceTemp: this.convertHtmlTag(
        this.props.navigation.state.params.objectArray.price_html,
      ),
      variations: [],
      allVariableAttributes: [],
      imageUrlString: '',
      selectAttributes: [],
      selectedVariation: [],
      wcVendorInfo: [],
      refreshing: false,
    };
    this.toast = null;
    this.props.clearProducts();
  }
  async componentDidMount() {
    // alert("Hello");

    const SignInValue = await AsyncStorage.getItem('status');

    this.setState({
      membershipStatus: SignInValue,
    });

    this.stepper = '';
    this.setState({activityIndicatorTemp: false});

    // get all variations
    this.getVariations(this.props.navigation.state.params.objectArray);
    if (this.props.settings.mvf_enabled === '2') this.getWcVendorInfo();

    // get relatedProducts
    this.props.getRelatedProductsFun(
      this.props,
      this.state.page,
      this.props.navigation.state.params.objectArray.related_ids,
    );
    let product_id = await this.props.navigation.state.params.objectArray.id;

    this.setState({
      productID: product_id,
    });
    // alert(JSON.stringify(this.props.navigation.state.params.objectArray))
    if (this.props.navigation.state.params.objectArray.type === 'grouped') {
      this.getGroupedProducrs();
    }
  }

  getWcVendorInfo = async () => {
    const data = await postFetchHttp(
      ThemeStyle.url +
        '/wp-json/api/tc_settings/app_vendor_info/?product_id=' +
        this.props.navigation.state.params.objectArray.id,
      {product_id: this.props.navigation.state.params.objectArray.id},
    );
    if (data.status === 'success') {
      const responce = data.data;
      this.setState({
        wcVendorInfo: responce.data[0],
      });
    }
  };

  getVariations = async obj => {
    const data = await getHttp('products/' + obj.id + '/variations', {
      lang: this.props.languageCode,
      currency: this.props.currencyCode,
      per_page: 100,
      status: 'publish',
    });
    if (data.status === 'success') {
      if (data.status === 'success') {
        this.state.variations = data.data;
        this.state.variations.forEach(element => {
          this.initializeAllVariationAttributes(element);
        });

        this.setState({
          variations: data.data,
          spinnerTemp: false,
        });
      } else {
        this.toast.show(data.status);
        this.setState({
          spinnerTemp: false,
        });
      }
    } else if (data.status === 'error') {
      this.toast.show(data.status);
      this.setState({
        spinnerTemp: false,
      });
    }
  };

  //= ==============================================================================================================================
  initializeAllVariationAttributes(p) {
    const ob = {};
    ob.id = p.id;
    ob.select = false;
    for (const val of this.props.navigation.state.params.objectArray
      .attributes) {
      if (val.variation === false) continue;
      ob[val.name] = 'any';
      for (const v2 of p.attributes) {
        if (removeDiacritics(val.name) === removeDiacritics(v2.name)) {
          ob[val.name] = removeDiacritics(v2.option);
        }
      }
    }
    this.state.allVariableAttributes.push(ob);
    if (
      this.state.allVariableAttributes.length === this.state.variations.length
    ) {
      this.sortAllVariationAttributes();
    }
  }

  // ===============================================================================================================================
  sortAllVariationAttributes() {
    for (const val of this.state.variations) {
      for (const v2 of this.state.allVariableAttributes) {
        if (val === v2.id) {
          this.state.allVariableAttributes.push(v2);
        }
      }
    }
  }

  // function adding attibute into array
  fillAttributes(val, key, position) {
    let count = 0;
    this.state.selectAttributes.forEach((value, index) => {
      if (value.position === position) {
        value.value = val;
        count++;
      }
      if (val === 'choose' && value.position === position) {
        this.state.selectAttributes.splice(index, 1);
      }
      if (removeDiacritics(value.key) === removeDiacritics(key)) {
        value.value = val;
        count++;
      }
    });

    if (count === 0 && val !== 'choose') {
      this.state.selectAttributes.push({
        key: removeDiacritics(key),
        value: removeDiacritics(val),
        position,
      });
    }

    this.sortAttributes();
    if (this.getAttributesLength() === this.state.selectAttributes.length) {
      this.selectVariation();
    }

    if (this.state.selectAttributes.length !== this.getAttributesLength()) {
      this.updateProductDetail();
      this.state.variationPrice = null;
    }
    // this.stepper.resetValue()
    this.setState({
      selectedDropDownValue: [],
      clearButton: true,
    }); // this render is use to show clear button
  }

  // checking avalability of option in all variations
  sortAttributes() {
    this.state.tempAllVariableAttributes = JSON.parse(
      JSON.stringify(this.state.allVariableAttributes),
    );
    let count = 0;
    for (const x of this.state.selectAttributes) {
      for (const y of this.state.tempAllVariableAttributes) {
        let keyOfY = '';
        Object.keys(y).forEach(function(yKeys) {
          const v1 = removeDiacritics(x.key);
          const v2 = removeDiacritics(yKeys);
          if (v1 === v2) {
            keyOfY = yKeys;
          }
        });
        if (
          removeDiacritics(y[keyOfY]) === removeDiacritics(x.value) ||
          y[keyOfY] === 'any'
        ) {
          if (count === 0) {
            y.select = true;
          } else {
            if (y.select === true) y.select = true;
            else y.select = false;
          }
        } else y.select = false;
      }
      count++;
    }
  }

  //= ==============================================================================================================================
  getAttributesLength() {
    let count = 0;
    for (const a of this.props.navigation.state.params.objectArray.attributes) {
      if (a.variation) count++;
    }
    return count;
  }

  //= ==============================================================================================================================
  selectVariation() {
    let pId = null;
    for (const i of this.state.tempAllVariableAttributes) {
      if (i.select === true) {
        pId = i.id;
        break;
      }
    }
    for (const i of this.state.variations) {
      if (i.id === pId) {
        this.state.selectedVariation = i;
        break;
      }
    }
    if (this.state.selectAttributes !== null) {
      this.updateProductDetail(this.state.selectedVariation);
    }
  }

  updateProductDetail(selectedVariation) {
    if (selectedVariation != null) {
      this.state.priceNumber = selectedVariation.price;
      try {
        this.state.imageUrlString = selectedVariation.image.src;
      } catch (error) {}
    } else {
      this.state.imageUrlString = '';
      this.state.priceNumber = 0;
    }

    this.setState({
      imageUrlString: this.state.imageUrlString,
      priceNumber: this.state.priceNumber,
    });
  }
  //

  availableOption(name, val) {
    if (this.state.selectAttributes.length === 0) return true;
    for (const value of this.state.tempAllVariableAttributes) {
      if (value.select === true) {
        if (value[name] === 'any') return true;
        if (removeDiacritics(value[name]) === removeDiacritics(val))
          return true;
      }
    }
  }

  getGroupedProducrs = async () => {
    if (
      this.props.navigation.state.params.objectArray.grouped_products.length > 0
    ) {
      this.setState({spinnerTemp: true});
      const data = await getHttp('products/', {
        lang: this.props.languageCode,
        currency: this.props.currencyCode,
        include: this.props.navigation.state.params.objectArray
          .grouped_products,
        status: 'publish',
      });
      if (data.status === 'success') {
        if (data.status === 'success') {
          data.data.forEach(element => {
            this.state.groupeProductArray.push(
              Object.assign(element, {quantity: 0}),
            );
          });
          this.setState({
            groupeProductArray: this.state.groupeProductArray,
            spinnerTemp: false,
          });
        } else {
          this.toast.show(data.status);
          this.setState({
            spinnerTemp: false,
          });
        }
      } else if (data.status === 'error') {
        this.toast.show(data.status);
        this.setState({
          spinnerTemp: false,
        });
      }
    }
  };

  externalLink = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.log('An error occurred', err));
  };

  convertHtmlTag = htmlprice => {
    let s = htmlprice;
    s = s.replace(/<del>/, '<s>');
    s = s.replace(/<\/del>/, '</s>');
    return s;
  };

  checkProductNew = () => {
    const pDate = new Date(
      this.props.navigation.state.params.objectArray.date_created,
    );
    const date = pDate.getTime() + this.props.newProductDuration * 86400000;
    const todayDate = new Date().getTime();
    if (date > todayDate) {
      return true;
    }
    return false;
  };

  resetAttributes() {
    const s = this.convertHtmlTag(
      this.props.navigation.state.params.objectArray.price_html,
    );
    // this.stepper.resetValue()
    // this.handleClearFields()
    this.setState({
      tempAllVariableAttributes: this.state.allVariableAttributes,
      selectAttributes: [],
      attributes: this.props.navigation.state.params.objectArray.attributes,
      selectedVariation: null,
      imageUrlString: this.props.navigation.state.params.objectArray.images,
      htmlPriceTemp: s,
      quantityNumber:
        this.props.navigation.state.params.objectArray.type === 'grouped'
          ? 0
          : 1,
      priceNumber: 0,
      addToCartButtonValue: true,
      variableItemselected: false,
      clearButton: false,
      isModalVisible: false,
    });
  }

  labelesFun = (color, value) => (
    <View
      style={[
        styles.labelView,
        {
          backgroundColor: color,
        },
      ]}>
      <Text
        style={[
          styles.textBold,
          {
            color: this.props.themeStyle.textTintColor,
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize + 2,
          },
        ]}>
        {value}
      </Text>
    </View>
  );

  productDiscount = data => {
    let rtn = '';
    const p1 = parseInt(data.product_price);
    const p2 = parseInt(data.product_discount_price);

    let result = Mathis.abs(((p1 - p2) / p1) * 100);
    result = parseInt(result.toString());
    if (result === 0) {
      return false;
    }
    rtn = '-' + result + '%';
    return rtn;
  };

  quantityMinus = value => {
    if (this.state.quantityNumber > 1) {
      this.setState({
        quantityNumber: value,
        productColorCounter: 0,
      });
    }
  };

  calculatePrice = () => {
    if (this.state.priceNumber !== 0) {
      return this.state.quantityNumber * this.state.priceNumber;
    } else return 0;
  };

  quantityPlus = value => {
    this.setState({quantityNumber: value, productColorCounter: 0});
  };

  selectedBadge = (attribute, id) => {
    let found = 0;
    attribute.options.forEach(elementOne => {
      this.state.selectAttributes.forEach(elemenTwo => {
        if (elementOne.toUpperCase() === elemenTwo.value.toUpperCase()) {
          found++;
        }
      });
    });

    if (found === 0) {
      return false;
    } else {
      return true;
    }
  };

  addVaration = (attribute, id, name) => {
    const array = [...this.state.selectedVariationsArray];
    let found = 0;
    array.forEach(element => {
      if (attribute === element.attribute) {
        element.id = id;
        element.name = name;
        found++;
      }
    });
    if (found === 0) {
      array.push({attribute: attribute, id: id, name: name});
    }
    this.setState(
      {selectedVariationsArray: array, enableOutOFStockButtonBool: false},
      () => {
        if (
          array.length ===
          this.props.navigation.state.params.objectArray.attribute.length
        ) {
          this.findAndSelectProductCombination();
        }
      },
    );
  };

  findAndSelectProductCombination = () => {
    let found = 0;
    this.props.navigation.state.params.objectArray.product_combination.forEach(
      combination => {
        found = 0;
        this.state.selectedVariationsArray.forEach(inner => {
          const searchString = JSON.stringify(combination);
          if (searchString.includes('"variation_id":' + inner.id)) found++;
          if (found === this.state.selectedVariationsArray.length) {
            this.state.selectedCombitionProductObject = combination;
          }
        });
      },
    );

    this.setState({
      priceNumber: this.state.selectedCombitionProductObject.price,
      enableOutOFStockButtonBool: false,
    });
  };
  /// /////

  productIsInList = id => {
    let found = false;
    if (
      this.props.wishlistArray !== undefined &&
      this.props.wishlistArray !== null &&
      this.props.wishlistArray !== ''
    ) {
      this.props.wishlistArray.forEach(element => {
        if (element === id) {
          found = true;
        }
      });
    }
    return found;
  };

  getWishListId = id => {
    let found = 0;
    if (
      this.props.wishlistArray !== undefined &&
      this.props.wishlistArray !== null &&
      this.props.wishlistArray !== ''
    ) {
      this.props.wishlistArray.forEach(element => {
        if (element === id) {
          found = element.wishlist;
        }
      });
    }
    return found;
  };

  addWishlist = (props, t, data) => {
    if (this.productIsInList(data.id)) {
      const wishListId = this.getWishListId(data.id);
      this.props.removeWishlistCall(
        this.props.userData,
        data.id,
        this,
        wishListId,
      );
      Snackbar.show({
        backgroundColor: this.props.themeStyle.primary,
        textColor: this.props.themeStyle.textTintColor,
        text: this.props.language['Removed From Wish List!'],
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: this.props.language.Close,
          textColor: this.props.themeStyle.secondry,
          backgroundColor: this.props.themeStyle.primary,
        },
      });
    } else {
      const data2 = this.props.storeWishlistCall(
        this.props.userData,
        data.id,
        this,
      );
      Snackbar.show({
        backgroundColor: this.props.themeStyle.primary,
        textColor: this.props.themeStyle.textTintColor,
        text: this.props.language['Added To Wish List!'],
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: this.props.language.Close,
          textColor: this.props.themeStyle.secondry,
          backgroundColor: this.props.themeStyle.primary,
        },
      });
    }
  };

  // /////////////////
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          getUrl() +
          'product/' +
          this.props.navigation.state.params.objectArray.id,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  /// ///////////////

  handleLoadMore() {
    if (this.props.products.length % 10 === 0) {
      this.setState(
        {
          refreshing: true,
          fabB: this.props.products.length > 9,
        },
        () => {
          this.state.page++;
          this.props.getRelatedProductsFun(
            this.props,
            this.state.page,
            this.props.navigation.state.params.objectArray.category[0]
              .category_detail.detail[0].category_id,
          );
        },
      );
    } else {
      this.setState({
        refreshing: false,
      });
    }
  }

  //= ==============================================================================================================================
  qunatityGroupPlus(p) {
    if (p.stock_quantity == null || p.stock_quantity > p.quantity)
      p.quantity = p.quantity + 1;
    else if (p.stock_quantity === p.quantity) {
    }
  }

  //= ==============================================================================================================================
  // function decreasing the quantity
  qunatityGroupMinus(p) {
    if (p.quantity !== 0) {
      p.quantity = p.quantity - 1;
    }
  }

  openStore = () => {
    if (this.props.settings.mvf_enabled === '1') {
      this.props.navigation.navigate('VendorScreen', {
        data: this.props.navigation.state.params.objectArray.store,
        id: this.props.navigation.state.params.objectArray.store.id,
      });
    } else if (this.props.settings.mvf_enabled === '2') {
      let id;
      if (this.props.navigation.state.params.objectArray.store.ID)
        id = this.props.navigation.state.params.objectArray.store.ID;
      if (this.props.navigation.state.params.objectArray.store.id)
        id = this.props.navigation.state.params.objectArray.store.id;
      if (this.props.navigation.state.params.objectArray.store.user_id)
        id = this.props.navigation.state.params.objectArray.store.user_id;
      this.props.navigation.navigate('VendorScreen', {
        data: this.props.navigation.state.params.objectArray.store,
        id: id,
      });
    } else if (this.props.settings.mvf_enabled === '3') {
      const id = this.props.navigation.state.params.objectArray.store.vendor_id;
      this.props.navigation.navigate('VendorScreen', {
        data: this.props.navigation.state.params.objectArray.store,
        id: id,
      });
    }
  };

  sellerInfo = name => (
    <View
      style={{
        flex: 1,
        backgroundColor: this.props.themeStyle.primaryBackgroundColor,
        padding: 15,
        paddingVertical: 12,
      }}>
      <View
        style={{backgroundColor: this.props.themeStyle.primaryBackgroundColor}}>
        <Text
          style={{
            justifyContent: 'flex-start',
            fontSize: appTextStyle.largeSize,
            color: this.props.themeStyle.textColor,
          }}>
          {this.props.language['Seller Information']}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              paddingTop: 8,
            }}>
            {this.props.language['Sold by'] + ' '}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              paddingTop: 8,
            }}>
            {name}
          </Text>
        </View>

        <Button
          color={this.props.themeStyle.primary}
          onPress={() => {
            this.openStore();
          }}
          title={this.props.language['View Store']}
        />
      </View>
    </View>
  );

  renderItem = (item, index) => (
    <View>
      <Loader
        secondaryColor="rgba(208, 205, 205, 1)"
        primaryColor="rgba(218, 215, 215, 1)"
        animationDuration={this.state.timeValue}
        active
        loading={this.state.loading}
        containerStyles={[
          styles.loaderContainer,
          {
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
            width: WIDTH * ThemeStyle.twoRowCardWIdth,
          },
        ]}
        pRows={3}
        pWidth={['100%', '100%', '80%']}
        pHeight={30}
        titleStyles={[
          styles.titleStyle,
          {
            width: WIDTH * ThemeStyle.twoRowCardWIdth,
          },
        ]}
        paragraphStyles={styles.paragraphStyles}>
        <CardTem
          key={index}
          backgroundColor={colorFun(this, item.index)}
          objectArray={item.item}
          index={index}
          rows={this.props.vertical}
          recent={this.state.recent}
          width={WIDTH * ThemeStyle.twoRowCardWIdth}
        />
      </Loader>
    </View>
  );
  // )

  renderSeparator = () => <View style={styles.separatorStyle} />;

  renderFooter = () => (
    <View
      style={[
        styles.footerStyle,
        {
          marginBottom: this.state.refreshing ? 50 : 10,
        },
      ]}>
      {this.state.refreshing ? (
        <View
          style={{
            height: 10,
            marginTop: 25,
          }}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={this.props.themeStyle.primary}
          />
        </View>
      ) : null}
    </View>
  );

  onEndReached = () => {
    this.handleLoadMore();
    this.onEndReachedCalledDuringMomentum = true;
    // }
  };

  handleScroll(event) {
    if (
      this.state.fabB &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      this.setState({fabB: false});
    }
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
      // alert("Refreshed")
    this.setState({ refreshing: false });
  };

  /// /////////////

 
  render() {
    // alert(JSON.stringify(this.state.productID))
    // console.warn(this.state.quantityNumber);
    // alert(JSON.stringify(this.state.productID))


    const data = this.props.navigation.state.params.objectArray;

    if (this.props.products.length > 0) {
      this.state.loading = false;
      this.state.timeValue = 400;
      if (this.props.products.length % 10 === 0) {
        this.state.refreshing = true;
      } else {
        this.state.refreshing = false;
      }
    } else {
      this.state.loading = true;
      this.state.timeValue = 400;
      this.state.refreshing = false;
    }

    return this.state.activityIndicatorTemp ? (
      // <ScrollView
      // style={{ flex: 1 }}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={this.state.refreshing}
      //     onRefresh={this.onRefresh}
      //     colors={['#fff', 'red', 'blue']}
      //     tintColor={'orange'}
      //   />
      // }>

   
      <View style={styles.IndicatorStyles}>
        <Toast
          ref={ref => {
            this.toast = ref;
          }}
          style={styles.toastStyle}
          position="bottom"
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{
            color: this.props.themeStyle.textColor,
            fontSize: appTextStyle.mediumSize,
          }}
        />
        <UIActivityIndicator size={27} color={this.props.themeStyle.primary} />
      </View>
      // </ScrollView>
    ) : (
      // <ScrollView
      // style={{ flex: 1 }}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={this.state.refreshing}
      //     onRefresh={this.onRefresh}
      //     colors={['#fff', 'red', 'blue']}
      //     tintColor={'orange'}
      //   />
      // }>

      <View
        style={[
          styles.container,
          {backgroundColor: this.props.themeStyle.primaryBackgroundColor},
        ]}>
        <Header
          shadow={false}
          backIcon={true}
          cartIcon={true}
          navigation={this.props.navigation}
          name={this.props.language['Product Details']}
          homeIcon={true}
        />

        {/* {this.state.fabB ? (
          <TouchableOpacity
            style={styles.fabStyle}
            onPress={() => {
              this.flatListRef.scrollToOffset({
                animated: true,
                offset: 0,
                useNativeDriver: true
              }, {
                useNativeDriver: true
              })
              this.setState({ fabB: false })
            }}>
            <View
              style={[styles.fabView, {
                backgroundColor: this.props.themeStyle.primary
              }]}>
              <Icon
                name={'md-arrow-up'}
                style={[styles.fabIcon, {
                  color: this.props.themeStyle.textTintColor
                }]}
              />
            </View>
          </TouchableOpacity>
        ) : null} */}

        <Toast
          ref={ref => {
            this.toast = ref;
          }}
          style={styles.toastStyle}
          position="bottom"
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{
            color: this.props.themeStyle.textColor,
            fontSize: appTextStyle.mediumSize,
          }}
        />

        {/* add to cart modal start */}

        <Modal
          visible={this.state.isModalVisible}
          transparent={true}
          onRequestClose={() => {
            this.setState({isModalVisible: false});
          }}
          animationType={'fade'}>
          <Toast
            ref={ref => {
              this.toast = ref;
            }}
            style={styles.toastStyle}
            position="bottom"
            positionValue={200}
            fadeOutDuration={7000}
            textStyle={{
              color: this.props.themeStyle.textColor,
              fontSize: appTextStyle.mediumSize,
            }}
          />

          {this.state.clearButton ? (
            <TouchableOpacity
              style={{
                height: 33,
                zIndex: 5,
                width: 40,
                position: 'absolute',
                bottom: 100,
                right: 30,
                shadowOffset: {width: 1, height: 1},
                shadowColor: '#000',
                shadowOpacity: 0.4,
                elevation: 3,
              }}
              onPress={() => this.resetAttributes()}>
              <View
                style={{
                  alignItems: 'center',
                  height: 52,
                  width: 52,
                  borderRadius: 400,
                  backgroundColor: 'red',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: this.props.themeStyle.textTintColor,
                    fontSize: appTextStyle.mediumSize,
                    fontWeight: 'bold',
                  }}>
                  {this.props.language.Clear}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {data.type === 'variable' ? (
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({isModalVisible: false})}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: this.props.themeStyle
                    .secondryBackgroundColor,
                  paddingHorizontal: 10,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}>
                <View
                  style={[
                    styles.closeIconView,
                    {
                      backgroundColor: this.props.themeStyle.iconPrimaryColor,
                    },
                  ]}
                />

                <View style={styles.modalDetailContainer}>
                  {data.images[0].src !== undefined ? (
                    <ImageLoad
                      key={1}
                      style={styles.modalProductImage}
                      source={
                        this.state.imageUrlString === ''
                          ? require('../images/dumy.jpg')
                          : {uri: this.state.imageUrlString}
                      }
                    />
                  ) : null}
                  {console.log('currency', this.props.settings)}
                  <View style={styles.modalPriceContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <HTML
                        html={this.props.currencySymbol}
                        baseFontStyle={{
                          fontSize: appTextStyle.smallSize + 3,
                          color: this.props.themeStyle.primary,
                          fontWeight: 'bold',
                        }}
                      />
                      <Text
                        style={[
                          styles.priceText,
                          {
                            color: this.props.themeStyle.primary,
                            fontSize: appTextStyle.largeSize,
                            fontFamily: appTextStyle.fontFamily,
                            fontWeight: 'bold',
                          },
                        ]}>
                        {' ' + this.calculatePrice()}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tagView,
                        {
                          paddingTop: 5,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: this.props.themeStyle.iconPrimaryColor,
                            fontSize: appTextStyle.largeSize,
                            fontFamily: appTextStyle.fontFamily,
                            fontWeight: 'bold',
                            paddingRight: 3,
                          },
                        ]}>
                        {this.props.language.Selected + ': '}
                      </Text>
                      {this.state.selectAttributes.map((value, key) => (
                        <Text
                          key={key}
                          style={[
                            {
                              color: this.props.themeStyle.textColor,
                              fontFamily: appTextStyle.fontFamily,
                              fontSize: appTextStyle.mediumSize - 1,
                              fontWeight: 'bold',
                            },
                          ]}>
                          {this.state.selectAttributes.length - 1 !== key
                            ? value.value + ', '
                            : value.value}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                {this.props.navigation.state.params.objectArray.attributes !==
                undefined
                  ? this.props.navigation.state.params.objectArray.attributes.map(
                      (att, ind) => (
                        <View key={ind}>
                          <Text
                            style={[
                              styles.modalAttrKey,
                              {
                                color: this.props.themeStyle.textColor,
                                fontFamily: appTextStyle.fontFamily,
                                fontSize: appTextStyle.largeSize + 2,
                              },
                            ]}>
                            {att.name}
                          </Text>

                          <View style={styles.modalWrapAtt}>
                            {att.options.map((attValue, key) =>
                              this.availableOption(att.name, attValue) ? (
                                <TouchableOpacity
                                  key={key}
                                  style={[
                                    styles.attributeView,
                                    {
                                      backgroundColor: this.selectedBadge(
                                        att,
                                        att.id,
                                      )
                                        ? this.props.themeStyle.primary
                                        : this.props.themeStyle
                                            .secondryBackgroundColor,
                                      borderColor: this.selectedBadge(
                                        att,
                                        att.id,
                                      )
                                        ? this.props.themeStyle.primary
                                        : this.props.themeStyle
                                            .iconPrimaryColor,
                                    },
                                  ]}
                                  onPress={() =>
                                    this.fillAttributes(attValue, att.name, ind)
                                  }>
                                  <Text
                                    style={[
                                      {
                                        color: !this.selectedBadge(att, att.id)
                                          ? this.props.themeStyle.textColor
                                          : this.props.themeStyle.textTintColor,
                                        fontSize: appTextStyle.largeSize,
                                        fontFamily: appTextStyle.fontFamily,
                                      },
                                    ]}>
                                    {attValue}
                                  </Text>
                                </TouchableOpacity>
                              ) : null,
                            )}
                          </View>
                        </View>
                      ),
                    )
                  : null}

                <Text
                  style={[
                    styles.modalQltyText,
                    {
                      color: this.props.themeStyle.textColor,
                      fontFamily: appTextStyle.fontFamily,
                      fontSize: appTextStyle.largeSize,
                    },
                  ]}>
                  {this.props.language.Quantity}
                </Text>

                <Counter
                  minimumValue={1}
                  initialValue={this.state.quantityNumber}
                  width={35}
                  containerWidth={90}
                  height={4}
                  onDecrement={value => this.quantityMinus(value)}
                  onIncrement={value => this.quantityPlus(value)}
                />
                {this.state.stockIndicator ? (
                  <UIActivityIndicator
                    style={styles.stockIndicator}
                    size={27}
                    color={this.props.themeStyle.primary}
                  />
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.addtoCartBtn,
                      {
                        paddingBottom: 30,
                      },
                    ]}
                    onPress={() => {
                      this.props.addToCartCall(
                        data,
                        this.state.selectedVariation,
                        this.state.quantityNumber,
                        this.state.selectAttributes,
                        this,
                      );
                      this.resetAttributes();
                    }}
                    disabled={
                      this.state.selectAttributes.length !==
                      this.props.navigation.state.params.objectArray.attributes
                        .length
                    }>
                    <View
                      style={[
                        styles.btnView,
                        {
                          width: WIDTH * 0.8,
                          backgroundColor:
                            this.state.selectAttributes.length !==
                            this.props.navigation.state.params.objectArray
                              .attributes.length
                              ? 'gray'
                              : this.props.themeStyle.primary,
                        },
                      ]}>
                      <Icon
                        name={'cart'}
                        style={[
                          styles.myStarStyle,
                          {
                            color: this.props.themeStyle.primary,
                          },
                          styles.myEmptyStarStyle,
                        ]}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: appTextStyle.mediumSize,
                          fontFamily: appTextStyle.fontFamily,
                          color: this.props.themeStyle.textTintColor,
                          padding: 10,
                        }}>
                        {this.state.enableOutOFStockButtonBool
                          ? this.props.language['Out of Stock']
                          : this.props.language.Continue}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
        </Modal>

        {/* add to cart modal end */}

        <Spinner
          visible={this.state.spinnerTemp}
          textStyle={styles.spinnerTextStyle}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          windowSize={50}
          initialNumToRender={6}
          removeClippedSubviews={true}
          legacyImplementation={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={10}
          data={
            this.props.products !== undefined &&
            this.props.products !== null &&
            this.props.products.length > 0
              ? this.props.products
              : ['', '', '', '']
          }
          key={'1'}
          numColumns={2}
          ref={ref => {
            this.flatListRef = ref;
          }}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{
            paddingLeft: '0.7%',
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
          }}
          contentContainerStyle={{
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
          }}
          extraData={this.state}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <View style={styles.headerListStyle}>
              <View style={[styles.headerBar, {width: WIDTH}]}>
                <TouchableOpacity
                  onPress={() => {
                    this.onShare();
                  }}>
                  <FontAwesome
                    style={{
                      color: this.props.themeStyle.textTintColor,
                      fontSize: appTextStyle.largeSize + 4,
                      paddingRight: 12,
                    }}
                    active
                    name="share"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.addWishlist(this.props, this, data);
                  }}>
                  <Ionicons
                    style={{
                      color: this.props.themeStyle.textTintColor,
                      fontSize: appTextStyle.largeSize + 8,
                    }}
                    active
                    name={
                      this.productIsInList(
                        this.props.navigation.state.params.objectArray.id,
                      )
                        ? 'heart'
                        : 'heart-outline'
                    }
                  />
                </TouchableOpacity>
              </View>

              <ProductsBanner
                productImage={data.images}
                navigation={this.props.navigation}
                reset={() => this.setState({visible: false})}
                objectArray={data.images}
              />

              <View
                style={[
                  styles.labelsContainer,
                  {
                    backgroundColor: this.props.themeStyle
                      .secondryBackgroundColor,
                  },
                ]}>
                <View style={[styles.labelRow]}>
                  <View style={styles.labelsView}>
                    {data.on_sale ? (
                      this.labelesFun('red', this.props.language.SALE)
                    ) : (
                      <View />
                    )}

                    {data.featured ? (
                      this.labelesFun(
                        this.props.themeStyle.primary,
                        this.props.language.FEATURED,
                      )
                    ) : (
                      <View />
                    )}
                    {this.checkProductNew() ? (
                      this.labelesFun('green', this.props.language.NEW)
                    ) : (
                      <View />
                    )}
                  </View>
                </View>

                {/* category heading */}

                <Text
                  style={[
                    styles.titleText,
                    {
                      color: this.props.themeStyle.textColor,
                      fontFamily: appTextStyle.fontFamily,
                      fontSize: appTextStyle.largeSize + 2,
                      fontWeight: 'bold',
                    },
                  ]}>
                  {data.name}
                </Text>

                {this.state.membershipStatus === '0' && data.id === 510970 && data.id === 510974 && data.id === 510977 ? (
                  <HTML
                    html={this.state.htmlPriceTemp}
                    baseFontStyle={{
                      fontSize: appTextStyle.smallSize + 3,
                      color: this.props.themeStyle.textColor,
                      fontWeight: 'bold',
                    }}
                    alterNode={node => {
                      const {name} = node;

                      if (
                        name === 'ins' &&
                        node.children[0] !== undefined &&
                        node.children[0] !== null
                      ) {
                        if (
                          name === 'ins' &&
                          node.children[0].children[0] !== undefined &&
                          node.children[0].children[0] !== null
                        ) {
                          if (
                            node.children[0].children[0].children === undefined
                          ) {
                            if (
                              name === 'ins' &&
                              node.children[0].children[0].data !== undefined
                            ) {
                              node.children[0].children[0].data = `${' - ' +
                                node.children[0].children[0].data}`;
                              return node;
                            }
                          } else {
                            if (
                              name === 'ins' &&
                              node.children[0].children[0].children[0].data !==
                                undefined
                            ) {
                              node.children[0].children[0].children[0].data = `${' - ' +
                                node.children[0].children[0].children[0].data}`;
                              return node;
                            }
                          }
                        }
                      }
                    }}
                    tagsStyles={{
                      ins: {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                        textDecorationLine: 'none',
                      },
                      del: {
                        textDecorationLine: 'line-through',
                        fontSize: appTextStyle.smallSize + 3,
                        color: 'gray',
                        fontWeight: '300',
                      },
                    }}
                  />
                ) : this.state.membershipStatus === '1' && data.id !== 510970 && data.id !== 510974 && data.id !== 510977 ? (
                  <Text
                    style={{
                      fontSize: appTextStyle.mediumSize,
                      fontWeight: 'bold',
                      // textDecorationLine: 'line-through',
                      color: 'black',
                    }}>
                    ₹ 00.00
                  </Text>
                ) : <HTML
                html={this.state.htmlPriceTemp}
                baseFontStyle={{
                  fontSize: appTextStyle.smallSize + 3,
                  color: this.props.themeStyle.textColor,
                  fontWeight: 'bold',
                }}
                alterNode={node => {
                  const {name} = node;

                  if (
                    name === 'ins' &&
                    node.children[0] !== undefined &&
                    node.children[0] !== null
                  ) {
                    if (
                      name === 'ins' &&
                      node.children[0].children[0] !== undefined &&
                      node.children[0].children[0] !== null
                    ) {
                      if (
                        node.children[0].children[0].children === undefined
                      ) {
                        if (
                          name === 'ins' &&
                          node.children[0].children[0].data !== undefined
                        ) {
                          node.children[0].children[0].data = `${' - ' +
                            node.children[0].children[0].data}`;
                          return node;
                        }
                      } else {
                        if (
                          name === 'ins' &&
                          node.children[0].children[0].children[0].data !==
                            undefined
                        ) {
                          node.children[0].children[0].children[0].data = `${' - ' +
                            node.children[0].children[0].children[0].data}`;
                          return node;
                        }
                      }
                    }
                  }
                }}
                tagsStyles={{
                  ins: {
                    color: this.props.themeStyle.textColor,
                    fontSize: appTextStyle.largeSize + 4,
                    textDecorationLine: 'none',
                  },
                  del: {
                    textDecorationLine: 'line-through',
                    fontSize: appTextStyle.smallSize + 3,
                    color: 'gray',
                    fontWeight: '300',
                  },
                }}
              />}

                {/* <HTML
                  html={this.state.htmlPriceTemp}
                  baseFontStyle={{
                    fontSize: appTextStyle.smallSize + 3,
                    color: this.props.themeStyle.textColor,
                    fontWeight: 'bold'
                  }}

                  alterNode={node => {
                    const { name } = node

                    if (
                      name === 'ins' &&
            node.children[0] !== undefined &&
            node.children[0] !== null
                    ) {
                      if (
                        name === 'ins' &&
              node.children[0].children[0] !== undefined &&
              node.children[0].children[0] !== null
                      ) {
                        if (node.children[0].children[0].children === undefined) {
                          if (
                            name === 'ins' &&
                    node.children[0].children[0].data !== undefined
                          ) {
                            node.children[0].children[0].data = `${' - ' + node.children[0].children[0].data}`
                            return node
                          }
                        } else {
                          if (
                            name === 'ins' &&
                    node.children[0].children[0].children[0].data !== undefined
                          ) {
                            node.children[0].children[0].children[0].data = `${' - ' + node.children[0].children[0].children[0].data}`
                            return node
                          }
                        }
                      }
                    }
                  }}

                  tagsStyles={{
                    ins: {
                      color: this.props.themeStyle.textColor,
                      fontSize: appTextStyle.largeSize + 4,
                      textDecorationLine: 'none'
                    },
                    del: {
                      textDecorationLine: 'line-through',
                      fontSize: appTextStyle.smallSize + 3,
                      color: 'gray',
                      fontWeight: '300'
                    }
                  }}
                /> */}
              </View>

              {/* Product description start */}
              <View
                style={[
                  styles.productDetailsView,
                  {
                    backgroundColor: this.props.themeStyle
                      .secondryBackgroundColor,
                    padding: 15,
                    paddingVertical: 0,
                  },
                ]}>
                <View>
                  {/* /////////////////////////////  usefull  */}
                  {this.props.navigation.state.params.objectArray !== null &&
                  this.props.navigation.state.params.objectArray !==
                    undefined ? (
                    this.props.navigation.state.params.objectArray
                      .categories !== null &&
                    this.props.navigation.state.params.objectArray
                      .categories !== undefined ? (
                      <View style={[styles.tagView, {paddingTop: 9}]}>
                        <Text
                          style={[
                            styles.detailText,
                            {
                              color: this.props.themeStyle.textColor,
                              fontFamily: appTextStyle.fontFamily,
                              fontSize: appTextStyle.largeSize,
                              paddingTop: 0,
                            },
                          ]}>
                          {this.props.language.Categories + ': '}
                        </Text>

                        {this.props.navigation.state.params.objectArray.categories.map(
                          (item, key) => (
                            <HTML
                              key={key}
                              html={item.name + ' '}
                              baseFontStyle={{
                                fontSize: appTextStyle.smallSize + 3,
                                color: '#b3b4b5',
                                marginTop: 9,
                              }}
                            />
                          ),
                        )}
                      </View>
                    ) : null
                  ) : null}
                  <View style={styles.tagView}>
                    <Text
                      style={[
                        styles.detailText,
                        {
                          color: this.props.themeStyle.textColor,
                          fontFamily: appTextStyle.fontFamily,
                          fontSize: appTextStyle.largeSize,
                        },
                      ]}>
                      {this.props.language.Id + ': '}
                    </Text>
                    <Text
                      style={[
                        styles.detailText,
                        {
                          color: this.props.themeStyle.iconPrimaryColor,
                          fontFamily: appTextStyle.fontFamily,
                          fontSize: appTextStyle.largeSize,
                        },
                      ]}>
                      {data.id}
                    </Text>
                  </View>

                  {/* /////////////////////////////  usefull  */}
                  {this.props.navigation.state.params.objectArray !== null &&
                  this.props.navigation.state.params.objectArray !==
                    undefined ? (
                    this.props.navigation.state.params.objectArray.tags !==
                      null &&
                    this.props.navigation.state.params.objectArray.tags !==
                      undefined ? (
                      <View style={[styles.tagView, {paddingTop: 9}]}>
                        <Text
                          style={[
                            styles.detailText,
                            {
                              color: this.props.themeStyle.textColor,
                              fontFamily: appTextStyle.fontFamily,
                              fontSize: appTextStyle.largeSize,
                              paddingTop: 0,
                            },
                          ]}>
                          {this.props.language.Tags + ': '}
                        </Text>

                        {this.props.navigation.state.params.objectArray.tags.map(
                          (item, key) => (
                            <Text
                              key={key}
                              style={[
                                styles.detailText,
                                {
                                  color: this.props.themeStyle.textColor,
                                  fontFamily: appTextStyle.fontFamily,
                                  fontSize: appTextStyle.largeSize,
                                  paddingTop: 0,
                                },
                              ]}>
                              {item.name + ', '}
                            </Text>
                          ),
                        )}
                      </View>
                    ) : null
                  ) : null}

                  {/* {this.state.groupeProductArray.length > 0
                    ? this.state.groupeProductArray.map((data, index) => (

                      <GroupCard
                        key={index}
                        th={this}
                        language={this.props.language}
                        data={data}
                        themeStyle={this.props.themeStyle}
                        sessionId={this.props.sessionId}
                        settings={this.props.settings}
                        index={index}
                      />
                    )
                    )
                    : null} */}

                  {this.props.navigation.state.params.objectArray
                    .description ? (
                    <View>
                      <Text
                        style={[
                          styles.detailText,
                          {
                            color: this.props.themeStyle.primary,
                            fontFamily: appTextStyle.fontFamily,
                            fontSize: appTextStyle.largeSize,
                          },
                        ]}>
                        {this.props.language['Product Details']}
                      </Text>

                      <HTML
                        html={
                          this.props.navigation.state.params.objectArray
                            .description
                        }
                        baseFontStyle={{
                          color: this.props.themeStyle.textColor,
                          fontFamily: appTextStyle.fontFamily,
                          fontSize: appTextStyle.mediumSize,
                        }}
                        alterNode={node => {
                          const {name} = node;
                          if (
                            name === 'ins' &&
                            node.children[0].children[0].data !== undefined
                          ) {
                            node.children[0].children[0].data = ` ${
                              node.children[0].children[0].data
                            }`;
                            return node;
                          }

                          if (
                            name === 'ins' &&
                            node.children[0].children[0].children[0].data !==
                              undefined
                          ) {
                            node.children[0].children[0].children[0].data = `  ${
                              node.children[0].children[0].children[0].data
                            }`;
                            return node;
                          }
                        }}
                        tagsStyles={{
                          ins: {
                            color: this.props.themeStyle.textColor,
                            fontSize: appTextStyle.largeSize + 4,
                          },
                          del: {
                            textDecorationLine: 'line-through',
                            fontSize: appTextStyle.smallSize + 3,
                            color: 'gray',
                            fontWeight: '300',
                          },
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              </View>

              {/* /////////////////////////////////////////////////////////////// */}
              {this.props.navigation.state.params.objectArray.store !==
                undefined && this.props.settings.mvf_enabled === '1'
                ? this.sellerInfo(
                    this.props.navigation.state.params.objectArray.store.name,
                  )
                : null}
              {this.state.wcVendorInfo.display_name !== undefined &&
              this.props.settings.mvf_enabled === '2'
                ? this.sellerInfo(this.state.wcVendorInfo.display_name)
                : null}

              {this.props.navigation.state.params.objectArray.store !==
                undefined && this.props.settings.mvf_enabled === '3'
                ? this.sellerInfo(
                    this.props.navigation.state.params.objectArray.store
                      .vendor_display_name,
                  )
                : null}

              {/* Product description end */}

              {data.type === 'variable' ? (
                <TouchableOpacity
                  onPress={() => this.setState({isModalVisible: true})}
                  style={[
                    styles.productDetailsView,
                    styles.productDetailsRow,
                    styles.shadow,
                    {
                      backgroundColor: this.props.themeStyle
                        .primaryBackgroundColor,
                      borderColor: this.props.themeStyle.primary,
                      padding: 12,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        color: this.props.themeStyle.textColor,
                        fontFamily: appTextStyle.fontFamily,
                        fontSize: appTextStyle.mediumSize,
                      },
                    ]}>
                    {this.props.language.SelectColorSizeQuality}
                  </Text>

                  <FontAwesome
                    style={{
                      color: this.props.themeStyle.iconPrimaryColor,
                      fontSize: appTextStyle.largeSize,
                    }}
                    active
                    name={
                      this.state.detailsDisplay
                        ? 'chevron-down'
                        : !I18nManager.isRTL
                        ? 'chevron-right'
                        : 'chevron-left'
                    }
                  />
                </TouchableOpacity>
// Changes done by Ankit 29-04-2024


              ) : data.type === 'simple' ? (

                <View
                  style={[
                    styles.productDetailsView,
                    styles.productDetailsRow,
                    styles.shadow,
                    {
                      backgroundColor: this.props.themeStyle
                        .primaryBackgroundColor,
                      padding: 8,
                      borderColor: this.props.themeStyle.primary,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.priceText,
                      styles.simpleQuantityText,
                      {
                        color: this.props.themeStyle.textColor,
                        fontFamily: appTextStyle.fontFamily,
                        fontSize: appTextStyle.mediumSize + 1,
                      },
                    ]}>
                    {this.props.language.Quantity}
                  </Text>
                  <Counter
                    minimumValue={1}
                    containerWidth={90}
                    initialValue={this.state.quantityNumber}
                    width={34}
                    height={1}
                    onDecrement={value => this.quantityMinus(value)}
                    onIncrement={value => this.quantityPlus(value)}
                  />
                </View>

              ) : null}

              <TouchableOpacity
                style={[
                  styles.productDetailsView,
                  {
                    backgroundColor: this.props.themeStyle
                      .secondryBackgroundColor,
                  },
                ]}
                onPress={() => {
                  if (Object.keys(this.props.userData).length !== 0) {
                    this.props.navigation.navigate('RatingAndReviewScreen', {
                      id: data.id,
                    });
                  }
                }}>
                <View
                  style={[
                    styles.productDetailsRow,
                    {
                      borderWidth: 0,
                    },
                  ]}>
                  <View style={styles.reviewContainer}>
                    <Text
                      style={[
                        styles.priceText,
                        {
                          color: this.props.themeStyle.textColor,
                          fontFamily: appTextStyle.fontFamily,
                          fontSize: appTextStyle.largeSize,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {this.props.language.AllReviews}
                    </Text>

                    <Text
                      style={[
                        styles.priceText,
                        {
                          color: this.props.themeStyle.iconPrimaryColor,
                          fontFamily: appTextStyle.fontFamily,
                          fontSize: appTextStyle.largeSize,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {'(' +
                        this.props.navigation.state.params.objectArray
                          .rating_count +
                        ')'}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        color: this.props.themeStyle.textColor,
                        fontFamily: appTextStyle.fontFamily,
                        fontSize: appTextStyle.smallSize,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {this.props.language['View All']}
                  </Text>
                </View>
                {this.props.navigation.state.params.objectArray
                  .average_rating !== undefined &&
                this.props.navigation.state.params.objectArray
                  .average_rating !== null ? (
                  <View style={styles.avgReviewContainer}>
                    <Text
                      style={[
                        styles.priceText,
                        {
                          color: this.props.themeStyle.textColor,
                          fontFamily: appTextStyle.fontFamily,
                          fontSize: appTextStyle.largeSize + 6,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {
                        this.props.navigation.state.params.objectArray
                          .average_rating
                      }
                    </Text>

                    <Stars
                      disabled
                      default={parseFloat(
                        this.props.navigation.state.params.objectArray
                          .average_rating,
                      )}
                      count={5}
                      starSize={10}
                      half
                      fullStar={
                        <Icon
                          name={'star'}
                          style={[
                            styles.myStarStyle,
                            {
                              color: this.props.themeStyle.primary,
                            },
                          ]}
                        />
                      }
                      emptyStar={
                        <Icon
                          name={'star-outline'}
                          style={[
                            styles.myStarStyle,
                            {
                              color: this.props.themeStyle.primary,
                            },
                            styles.myEmptyStarStyle,
                          ]}
                        />
                      }
                      halfStar={
                        <Icon
                          name={'star-half'}
                          style={[
                            styles.myStarStyle,
                            {
                              color: this.props.themeStyle.primary,
                            },
                          ]}
                        />
                      }
                    />
                  </View>
                ) : null}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addtoCartBtn}
                onPress={() => {
                  if (
                    this.props.navigation.state.params.objectArray
                      .external_url !== '' &&
                    this.props.navigation.state.params.objectArray
                      .external_url !== undefined &&
                    this.props.navigation.state.params.objectArray
                      .external_url !== null
                  ) {
                    this.externalLink(
                      this.props.navigation.state.params.objectArray
                        .external_url,
                    );
                  } else if (data.type === 'variable') {
                    this.setState({
                      isModalVisible: true,
                    });
                  } else if (data.type === 'simple') {

                    console.log("datadatadata",JSON.stringify(data))
                    console.log("quantityNumber",this.state.quantityNumber)
                    this.componentDidMount();

                    this.setState({spinnerTemp: true}, async () => {
                      this.props.addToCartCall(
                        data,
                        null,
                        this.state.quantityNumber,
                        null,
                        this,
                      );
                    });
                    // }
                  } else if (data.type === 'grouped') {
                    // alert(data.type)

                    let total = 0;
                    for (const a of this.state.groupeProductArray) {
                      total = total + a.quantity;
                    }
                    if (total === 0) {
                      this.toast.show('Please Add Quantity');
                    } else {
                      for (const value of this.state.groupeProductArray) {
                        if (value.quantity > 0) {
                          this.props.addToCartCall(
                            value,
                            null,
                            value.quantity,
                            null,
                            this,
                          );
                        }
                      }
                    }
                  }
                }}
                disabled={this.state.enableOutOFStockButtonBool}>
                <View
                  style={[
                    styles.btnView,
                    {
                      backgroundColor: this.props.themeStyle.primary,
                    },
                  ]}>
                  <Icon
                    name={'cart'}
                    style={{
                      color: this.props.themeStyle.textTintColor,
                      fontSize: 17,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: appTextStyle.mediumSize,
                      fontFamily: appTextStyle.fontFamily,
                      color: this.props.themeStyle.textTintColor,
                      padding: 10,
                    }}>
                    {this.props.navigation.state.params.objectArray.external_url
                      ? this.props.navigation.state.params.objectArray
                          .button_text
                      : this.state.enableOutOFStockButtonBool
                      ? this.props.language['Out of Stock']
                      : this.props.language['ADD TO CART']}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={[
                  styles.headingView,
                  {
                    backgroundColor: this.props.themeStyle
                      .secondryBackgroundColor,
                  },
                ]}>
                <Text
                  style={{
                    color: this.props.themeStyle.textColor,
                    fontFamily: appTextStyle.fontFamily,
                    fontSize: appTextStyle.largeSize,
                    alignSelf: 'flex-start',
                    fontWeight: 'bold',
                  }}>
                  {this.props.language['JUST FOR YOU']}
                </Text>
              </View>
            </View>
          }
          onScroll={this.handleScroll.bind(this)}
        />
      </View>
      // </ScrollView>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalAddToCartBtn: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 50,
    shadowOffset: {width: 1, height: 1},
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 1,
    shadowOffset: {width: 1, height: 1},
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  productsImage: {
    height: 45,
    width: 45,
    overflow: 'hidden',
    marginTop: 10,
    marginRight: 10,
  },
  headingView: {
    alignSelf: 'center',
    padding: 12,
    width: WIDTH,
    marginTop: 0,
    marginBottom: -5,
  },
  avgReviewContainer: {
    flexDirection: 'row',
    width: WIDTH * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  modalDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  commentStars: {
    width: WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 50,
    paddingBottom: 10,
  },
  attributeView: {
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: appTextStyle.customRadius - 15,
    margin: 10,
    marginLeft: 0,
    marginBottom: 0,
    borderWidth: 1,
  },
  reviewImageWrap: {
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleBannerView: {
    paddingVertical: 8,
    marginTop: 8,
  },
  btnView: {
    alignItems: 'center',
    width: WIDTH * 0.93,
    justifyContent: 'center',
    borderRadius: appTextStyle.customRadius,
    flexDirection: 'row',
  },
  labelsContainer: {
    padding: 15,
    width: WIDTH,
    marginBottom: 6,
    paddingBottom: 0,
  },
  commentNameContainer: {
    paddingHorizontal: 12,
  },
  absoluteAddtoCartText: {
    padding: 10,
    textAlign: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  absoluteAddtoCart: {
    width: WIDTH * 0.9,
    borderRadius: appTextStyle.customRadius,
    alignSelf: 'center',
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  simpleQuantityText: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  commentAvatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    overflow: 'hidden',
  },
  modalAddToCartText: {
    padding: 10,
    alignSelf: 'center',
    marginTop: 60,
    width: WIDTH * 0.9,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalWrapAtt: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  closeIconView: {
    alignSelf: 'center',
    height: 3,
    marginTop: 20,
    marginBottom: 10,
    width: 70,
  },
  labelsView: {
    flexDirection: 'row',
  },
  modalQltyText: {
    paddingVertical: 15,
  },
  modalAttrKey: {
    margin: 10,
    marginLeft: 5,
    marginBottom: 0,
  },
  addtoCartBtn: {
    paddingTop: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: appTextStyle.customRadius,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2,
    right: 15,
    top: 12,
  },
  stockIndicator: {
    padding: 19,
    alignSelf: 'center',
    marginTop: 60,
    width: WIDTH * 0.9,
    textAlign: 'center',
    marginBottom: 19,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  productDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH * 0.94,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: appTextStyle.customRadius - 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -1,
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetailsView: {
    padding: 15,
    width: WIDTH,
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    paddingBottom: 9,
    justifyContent: 'space-between',
  },
  labelView: {
    padding: 0,
    paddingHorizontal: 6,
    marginRight: 6,
    borderRadius: appTextStyle.customRadius - 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  categoryLabel: {
    paddingBottom: 4,
    alignSelf: 'flex-start',
  },
  modalPriceContainer: {
    paddingHorizontal: 10,
  },
  toastStyle: {
    backgroundColor: '#c1c1c1',
  },
  titleText: {
    paddingBottom: 10,
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: -2,
  },
  modalProductImage: {
    height: 90,
    width: 90,
    backgroundColor: 'rgb(236, 236, 236)',
    borderRadius: appTextStyle.customRadius - 11,
  },
  priceText: {
    paddingRight: 6,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  detailText: {
    paddingTop: 9,
    paddingRight: 6,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  percentText: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    backgroundColor: 'red',
    fontWeight: 'bold',
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  loaderContainer: {
    height: Platform.OS === 'android' ? 260 : 230,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 3,
    margin: 5,
  },
  IndicatorStyles: {
    flex: 1,
    justifyContent: 'center',
  },
  titleStyle: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    borderWidth: 0,
    flex: 1,
    height: 130,
  },
  paragraphStyles: {
    paddingTop: 7,
    padding: 6,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  separatorStyle: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
  },
  footerStyle: {
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  fabStyle: {
    zIndex: 5,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: 25,
    marginBottom: 50,
  },
  fabView: {
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 400,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    fontSize: 22,
  },
  headerListStyle: {
    marginBottom: 5,
    // backgroundColor: 'red'
  },
  singleBanner: {
    width: WIDTH,
    height: 160,
    marginVertical: 5,
  },
  myStarStyle: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: '#e0e0e0',
  },
});

/// ///////////////////////////////////////////////
const getTheme = state => state.appConfig.themeStyle;
const getLanguage = state => state.appConfig.languageJson;
const getAppinPro = state => state.appConfig.appInProduction;
const getCartArray = state => state.cartData.cartProductsArray;
const getCategories = state => state.getCategories.categories;
const getBanners = state => state.bannersData.banners;
const getSettings = state => state.settingsCall.settings;
const getproductsArray = state => state.productsData.pdRelatedProducts;
const getSessionId = state => state.userData.sessionId;
const wishlistArray = state => state.wishlistData.wishlistArray;
const getUserData = state => state.userData.user;
const getCurrency = state => state.appConfig.currencyCode;
const getLanguageCode = state => state.appConfig.languageCode;
const getCurrencyPos = state => state.appConfig.currencyPos;
const getCurrencySymbol = state => state.appConfig.currencySymbol;
const getnewProductDuration = state => state.settingsCall.newProductDuration;

const getnewProductDurationFun = createSelector(
  [getnewProductDuration],
  getnewProductDuration => {
    return getnewProductDuration;
  },
);
const getCurrencySymbolFun = createSelector(
  [getCurrencySymbol],
  getCurrencySymbol => {
    return getCurrencySymbol;
  },
);
const getCurrencyPosFun = createSelector(
  [getCurrencyPos],
  getCurrencyPos => {
    return getCurrencyPos;
  },
);
const getCurrencyFun = createSelector(
  [getCurrency],
  getCurrency => {
    return getCurrency;
  },
);
const getLanguageCodeFun = createSelector(
  [getLanguageCode],
  getLanguageCode => {
    return getLanguageCode;
  },
);
const getUserDataFun = createSelector(
  [getUserData],
  getUserData => {
    return getUserData;
  },
);
const wishlistArrayFun = createSelector(
  [wishlistArray],
  wishlistArray => {
    return wishlistArray;
  },
);

const getSessionIdFun = createSelector(
  [getSessionId],
  getSessionId => {
    return getSessionId;
  },
);
const getCartArrayFun = createSelector(
  [getCartArray],
  getCartArray => {
    return getCartArray;
  },
);
const getAppinProFun = createSelector(
  [getAppinPro],
  getAppinPro => {
    return getAppinPro;
  },
);

const getproductsArrayFun = createSelector(
  [getproductsArray],
  getproductsArray => {
    return getproductsArray;
  },
);

const getBannersFun = createSelector(
  [getBanners],
  getBanners => {
    return getBanners;
  },
);

const getCategoriesFun = createSelector(
  [getCategories],
  getCategories => {
    return getCategories;
  },
);

const getThemeFun = createSelector(
  [getTheme],
  getTheme => {
    return getTheme;
  },
);

const getLanguageFun = createSelector(
  [getLanguage],
  getLanguage => {
    return getLanguage;
  },
);

const getSettingsFun = createSelector(
  [getSettings],
  getSettings => {
    return getSettings;
  },
);
const mapDispatchToProps = dispatch => ({
  removeWishlistCall: (userData, productId, th, wishListId) => {
    dispatch(async dispatch => {
      await removeWishlistFun(dispatch, userData, productId, th, wishListId);
    });
  },
  storeWishlistCall: (userData, productId, th) => {
    dispatch(async dispatch => {
      await storeWishlist(dispatch, userData, productId, th);
    });
  },
  getRelatedProductsFun: (props, page, selectedItem) => {
    dispatch(async dispatch => {
      // Assuming this.state is an object that you want to pass
      // alert(JSON.stringify( this.state))
      await getpdRelatedProducts(
        dispatch,
        props.languageCode,
        props.currencyCode,
        page,
        selectedItem,
        props,
        this.state,
      );
    });
  },

  clearProducts: () => {
    dispatch({
      type: CLEAR_DETAIL_PAGE_PRODUCTS,
    });
  },
  addToCartCall: (
    product,
    selectedVariation,
    quantityNumber,
    selectAttributes,
    th,
  ) => {
    dispatch(dispatch => {
      addToCartFun(
        dispatch,
        product,
        selectedVariation,
        quantityNumber,
        selectAttributes,
        th,
      );
    });
  },
});
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  sessionId: getSessionIdFun(state),
  categories: getCategoriesFun(state),
  banners: getBannersFun(state),
  settings: getSettingsFun(state),
  products: getproductsArrayFun(state),
  appInProduction: getAppinProFun(state),
  wishlistArray: wishlistArrayFun(state),
  userData: getUserDataFun(state),
  cartProductsArray: getCartArrayFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state),
  getCurrency: getCurrencyPosFun(state),
  currencySymbol: getCurrencySymbolFun(state),
  newProductDuration: getnewProductDurationFun(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetail);
