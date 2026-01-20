import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  Linking,
  Image,
  ActivityIndicator,
  Animated,

} from 'react-native';
import {createSelector} from 'reselect';
import {
  getProducts,
  CLEAR_PRODUCTS,
  getOneProduct,
  colorFun,
} from '../../redux/actions/actions';
import {UIActivityIndicator} from 'react-native-indicators';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../common/HeaderCustom';
import {connect} from 'react-redux';
import CardTem from '../../common/CardTemplate';
import {Icon} from 'native-base';
import Loader from 'react-native-easy-content-loader';
import Banner from '../../common/Banner';
import ImageLoad from '../../common/RnImagePlaceH';
import FlatListView from '../../common/FlatListView';
import CategoryFlatList from '../../common/CategoriesFlatList';
import theme, {appTextStyle} from '../../common/Theme.style';
import {getThumbnailImage} from '../../common/WooComFetch';
import SwiperFlatList from 'react-native-swiper-flatlist';
import WeatherScreen from './WeatherScreen';
import MenuFooterScreen from './MenuFooterScreen';
import Iframe from 'react-iframe';
import WebView from 'react-native-webview';
import RenewaleImage from "../../images/RenewableProducts/App_Images/RenewableEnergy1.webp"

import { logOut } from '../../redux/actions/actions';

const WIDTH = Dimensions.get('window').width;



const image = [
  {
    id: 1,
    name: 'Global Forecast',
    src: require('../../images/front/earth.jpg'),
    navigateTo: 'GlobalForecast',
  },
  {
    id: 2,
    name: 'India Forecast',
    src: require('../../images/front/india.jpg'),
    navigateTo: 'IndiaForecast',
  },
  {
    id: 3,
    name: 'Aviation',
    src: require('../../images/front/aviation.jpg'),
    navigateTo: 'LocationForecast',
  },
  // {
  //   id: 4,
  //   name: 'WRF Ver 4.2 Forecast',
  //   src: require('../../images/front/track.jpeg'),
  //   navigateTo: 'WrfVersion',
  // },
  // {
  //   id: 5,
  //   name: 'Location Specific Forecast',
  //   src: require('../../images/front/map.jpeg'),
  //   navigateTo: 'LocationForecast',
  // },
];

const imageslider = [
  {
    id: 1,
    src: require('../../images/banners/w1.jpg'),
  },
  {
    id: 2,
    src: require('../../images/banners/w2.jpg'),
  },
  {
    id: 3,
    src: require('../../images/banners/w3.jpg'),
  },
  {
    id: 4,
    src: require('../../images/banners/w4.jpg'),
  },
  {
    id: 5,
    src: require('../../images/banners/w5.jpg'),
  },
];
class Newest extends Component {
  static navigationOptions = () => ({
    headerShown: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      fabB: false,
      selected: '',
      timeValue: 400,
      selectedTab: '',
      productView: 'grid',
      loading: false,
      activityIndicatorTemp: true,
      spinnerTemp: false,
      //
      page: 1,
      productColorCounter: 0,
      loader: true,
      drawerWidth: new Animated.Value(0),
      isDrawerOpen: false,

    };
  }

  handleOpenURL = event => {
    // D
    if (event.url !== '' && event.url !== undefined && event.url !== null) {
      const route = event.url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^/]+)\/?$/)[1];
      if (id !== '' && id !== undefined && id !== null) {
        this.setState({spinnerTemp: true}, () => {
          this.props.getOneProductsFun(this.props, this, id);
        });
      }
    }
  };

  navigate = json => {
    // E
    if (json !== '' && json !== undefined && json !== null) {
      Linking.removeEventListener('url', this.handleOpenURL);
      this.props.navigation.navigate('ProductDetails', {objectArray: json});
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({activityIndicatorTemp: false});
    }, 1000);
    this.props.navigation.setParams({
      headerTitle: this.props.language.Home,
    });
    if (Platform.OS === 'android') {
      const NativeLinking = require('../../../node_modules/react-native/Libraries/Linking/NativeIntentAndroid')
        .default;
      NativeLinking.getInitialURL().then(url => {
        if (url !== '' && url !== undefined && url !== null) {
          const route = url.replace(/.*?:\/\//g, '');
          const id = route.match(/\/([^/]+)\/?$/)[1];
          if (id !== '' && id !== undefined && id !== null) {
            this.setState({spinnerTemp: true}, () => {
              this.props.getOneProductsFun(this.props, this, id);
            });
          }
        }
      });
    } else {
      this.dimensionsSubscription = Linking.addEventListener(
        'url',
        this.handleOpenURL,
      );
    }

  //   if (Platform.OS === 'android') {
  //     const NativeLinking = require('react-native/Libraries/Linking/NativeLinking')
  //       .default;
  //     NativeLinking.getInitialURL().then(url => {
  //       if (url !== '' && url !== undefined && url !== null) {
  //         const route = url.replace(/.*?:\/\//g, '');
  //         const id = route.match(/\/([^/]+)\/?$/)[1];
  //         if (id !== '' && id !== undefined && id !== null) {
  //           this.setState({spinnerTemp: true}, () => {
  //             this.props.getOneProductsFun(this.props, this, id);
  //           });
  //         }
  //       }
  //     });
  //   } else {
  //     this.dimensionsSubscription = Linking.addEventListener(
  //       'url',
  //       this.handleOpenURL,
  //     );
  //   }

  }

  componentWillUnmount() {
    clearInterval(this.state.activityIndicatorTemp);
    if (this.dimensionsSubscription !== undefined) {
      this.dimensionsSubscription.remove();
    }
  }

  openDrawer = () => {
    Animated.timing(this.state.drawerWidth, {
      toValue: 250, // Width of the drawer
      duration: 300,
      useNativeDriver: false,
    }).start(() => this.setState({ isDrawerOpen: true }));
  };

  closeDrawer = () => {
    Animated.timing(this.state.drawerWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => this.setState({ isDrawerOpen: false }));
  };

  handleOverlayPress = () => {
    if (this.state.isDrawerOpen) {
      this.closeDrawer();
    }
  };

  handleDrawerOpen = () => {
    this.openDrawer();
  };

  renderItem = (item, index) => (
    <View>
      {/* <Loader
        secondaryColor='rgba(208, 205, 205, 1)'
        primaryColor='rgba(218, 215, 215, 1)'
        animationDuration={this.state.timeValue}
        active
        loading={this.state.loading}
        containerStyles={[styles.loaderContainer, {
          backgroundColor: this.props.themeStyle.secondryBackgroundColor,
          width: WIDTH * theme.twoRowCardWIdth
        }]}
        pRows={3}
        pWidth={['100%', '100%', '80%']}
        pHeight={30}
        titleStyles={[styles.titleStyle, {
          width: WIDTH * theme.twoRowCardWIdth
        }]}
        paragraphStyles={styles.paragraphStyles}>
        <CardTem
          backgroundColor={colorFun(this, item.index)}
          objectArray={item.item}
          rows={this.props.vertical}
          recent={this.state.recent}
          width={WIDTH * theme.twoRowCardWIdth}
        />
      </Loader> */}
    </View>
  );
  // )

  renderSeparator = () => <View style={styles.separatorStyle} />;

  noProductFun = () => (
    <View style={styles.noProductView}>
      <Icon name={'logo-dropbox'} style={{color: 'gray', fontSize: 80}} />
      <Text
        style={{
          fontFamily: appTextStyle.fontFamily,
          fontSize: appTextStyle.largeSize + 2,
          color: this.props.themeStyle.textColor,
        }}>
        {this.props.language['No Products Found']}
      </Text>
    </View>
  );

  handleLoadMore() {
    if (this.props.products.length % 10 === 0) {
      this.setState(
        {
          refreshing: true,
          fabB: this.props.products.length > 9,
        },
        () => {
          this.state.page++;
          this.props.getProductsFun(this.props, this.state.page);
        },
      );
    } else {
      this.setState({
        refreshing: false,
      });
    }
  }

  renderFooter = () => (
    <View
      style={[
        styles.footerStyle,
        {
          marginBottom: this.state.refreshing ? 50 : 10,
        },
      ]}>
      {/* {this.state.refreshing ? (
        <View
          style={{
            height: 10,
            marginTop: 25
          }}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={this.props.themeStyle.primary}
          />
        </View>
      ) : null} */}
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

  categoryHeading(text) {
    return (
      <Text
        style={[
          styles.categoryTypeStyle,
          {
            fontFamily: appTextStyle.fontFamily,
            fontSize: appTextStyle.largeSize + 3,
            color: this.props.themeStyle.textColor,
          },
        ]}>
        {text}
      </Text>
    );
  }

  iconTextFun = (iconName, text) => (
    <View style={styles.iconTextStyle}>
      <FontAwesome
        name={iconName}
        style={{
          color: this.props.themeStyle.iconPrimaryColor,
          transform: [{rotateY: '180deg'}],
          fontSize:
            appTextStyle.largeSize + PixelRatio.getPixelSizeForLayoutSize(6),
        }}
      />
      <Text
        style={{
          fontSize: appTextStyle.smallSize - 1,
          color: this.props.themeStyle.textColor,
          fontFamily: appTextStyle.fontFamily,
          paddingTop: 5,
        }}>
        {text}
      </Text>
    </View>
  );

  render() {
    const {loader} = this.state;
    const { drawerWidth, isDrawerOpen } = this.state;

    // alert(JSON.stringify(this.props.getAllCategories))
    // alert(JSON.stringify(this.props.appInProduction))
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
    // console.log("this", JSON.stringify(this.props.userData))

    return this.state.activityIndicatorTemp ? (
      <View
        style={[
          styles.activityIndicatorContainer,
          {
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
          },
        ]}>
        <UIActivityIndicator size={27} color={this.props.themeStyle.primary} />
      </View>
    ) : (
      // return
      <View
        style={{
          backgroundColor: this.props.themeStyle.secondryBackgroundColor,
        }}>
        <Spinner visible={this.state.spinnerTemp} />
        <Header
          searchIcon={true}
          menuIcon={true}
          cartIcon={true}
          navigation={this.props.navigation}
          name={theme.homeTitle}

          onPressDrawer={this.handleDrawerOpen}
        />
        <Animated.View style={[styles.drawer, {width: this.state.drawerWidth}]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.closeDrawer}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MembershipScreen')} >
                        <View>
                            <Text style={styles.drawerItem}>Membership</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')}>
                        <View>
                            <Text style={styles.drawerItem}>About Us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUsScreen')}>
                        <View>
                            <Text style={styles.drawerItem}>Contact Us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')}>
                        <View>
                            <Text style={styles.drawerItem}>My Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsScreen')}>
                        <View>
                            <Text style={styles.drawerItem}>News & Bulletins</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FaqScreen')}>
                        <View>
                            <Text style={styles.drawerItem}>FAQ</Text>
                        </View>
                    </TouchableOpacity>

        


                    {/* {this.state.isLoggedIn ? ( */}
                    {Object.keys(this.props.userData).length > 0 ? (

                        <TouchableOpacity onPress={() => this.props.logOutCall(this)}>
                            <View>
                                <Text style={styles.drawerItem}>log out</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <View>
                                <Text style={styles.drawerItem}>log in</Text>
                            </View>
                        </TouchableOpacity>
                    )

                    }
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('AccountDelete')}>
                        <View>
                            <Text style={styles.drawerItem}>Delete Account</Text>
                        </View>
                    </TouchableOpacity>
                      {/* Overlay */}
       
        </Animated.View>
        {isDrawerOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={this.handleOverlayPress}
          />
        )}
        <TouchableOpacity style={styles.openButton} onPress={this.openDrawer}>
          {/* <Text style={styles.openText}>Menu</Text> */}
        </TouchableOpacity>
        {/* {this.props.appInProduction ? (
          <TouchableOpacity
            style={[styles.demoPanalContainer, {
              backgroundColor: this.props.themeStyle.primary
            }]}
            onPress={() => {
              this.props.navigation.navigate('DemoScreen')
            }}>

            <Icon
              name={'md-settings'}
              style={[styles.demoPanal, {
                color: this.props.themeStyle.textTintColor
              }]}
            />

          </TouchableOpacity>
        ) : null} */}

        {/* {this.state.fabB ? (
          <TouchableOpacity
            style={styles.fabStyle}
            onPress={() => {
              this.flatListRef.scrollToOffset(
                {
                  animated: true,
                  offset: 0,
                  useNativeDriver: true,
                },
                {
                  useNativeDriver: true,
                },
              );
              this.setState({fabB: false});
            }}>
            <View
              style={[
                styles.fabView,
                {
                  backgroundColor: this.props.themeStyle.primary,
                },
              ]}>
              <Icon
                name={'md-arrow-up'}
                style={[
                  styles.fabIcon,
                  {
                    color: this.props.themeStyle.textTintColor,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        ) : null} */}

        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('GlobalForecast')}><Text>sdghfweruilfh</Text></TouchableOpacity> */}

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
          key={this.state.productView}
          numColumns={2}
          ref={ref => {
            this.flatListRef = ref;
          }}
          ListFooterComponent={() => this.renderFooter()}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{
            paddingLeft: WIDTH * 0.01,
          }}
          contentContainerStyle={{
            backgroundColor: this.props.themeStyle.secondryBackgroundColor,
          }}
          extraData={this.state}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <View style={styles.headerListStyle}>
              <View
                style={{
                  backgroundColor:
                    this.props.themeStyle.secondryBackgroundColor,

                }}>
                {/* slider code................... */}
                {/* <SwiperFlatList

                  autoplay
                  autoplayDelay={2}
                  autoplayLoop={true}

                  index={2}
                  data={imageslider}
                  renderItem={({ item }) => (
                    <View style={{ flex: 1, width: (WIDTH - 10), margin: 5 }}>

                      <Image
                        style={{ width: '100%', height: 180, borderRadius: 5 }}
                        source={item.src} />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                /> */}

                {/* weather screen code................. */}
                {/* <FlatList
                  data={image}

                  numColumns={2}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flex: 1, marginTop: 30 ,width:'50%'}}>

                        <Text style={styles.text}>{item.name}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigateTo)}>

                          <Image
                            style={{ width: '93%', height: 200, margin: 6, borderRadius: 5 }}
                            source={item.src}
                          />
                        </TouchableOpacity>


                      </View>
                    )
                  }

                  }
                  keyExtractor={item => item.id}
                /> */}
                <View style={{flex: 1}}>
                  {/* {
                    loader && (
                      <View style={styles.actvityIndicator}>
                        <ActivityIndicator size={'small'} color={'#447ef2'} />
                      </View>
                    )
                  } */}
                  <WebView
                    scalesPageToFit={true}
                    bounces={false}
                    androidHardwareAccelerationDisabled={true}
                    javaScriptEnabled={true}
                    geolocationEnabled={true}
                    // onPermissionRequest={(request) => {
                    //   if (request.permission === 'geolocation') {
                    //     request.grant(request.origin);
                    //   }
                    // }}
                    style={{flex: 1, height: 270}}
                    source={{
                      html: `
                            <!DOCTYPE html>
                            <html>
                              <head></head>
                              <body>
                                <div>
                                <iframe src="https://weaclimsolutions.com/test.php"
                                  title="iframe Example 1" width="100%" height="680" frameborder="0" >
                                </iframe>
                                </div>
                              </body>
                            </html>
                              `,
                    }}
                    automaticallyAdjustContentInsets={false}
                    startInLoadingState
                    renderLoading={() => (
                      <View style={styles.actvityIndicator}>
                        <ActivityIndicator size={'small'} color={'#447ef2'} />
                      </View>
                    )}
                  />
                  {/* <WebView
                    style={{ flex: 1, width: '100%', height: 300 }}
                    source={{ uri: '' }}
                    // onLoadStart={() => this.setState({ loader: true })}
                    // onLoadEnd={() => this.setState({ loader: false })}
                    scrollEnabled={true}
                    
                    startInLoadingState
                    renderLoading={()=>(
                      <View style={styles.actvityIndicator}>
                      <ActivityIndicator size={'small'} color={'#447ef2'} />
                    </View>
                    )}

                  /> */}
                </View>

                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{width: '46%', margin: 5}}
                      onPress={() =>
                        this.props.navigation.navigate('GlobalForecast')
                      }>
                      <Text style={styles.text}>Global Forecast</Text>
                      <Image
                        style={{
                          width: '100%',
                          height: 200,
                          margin: 6,
                          borderRadius: 5,
                        }}
                        source={require('../../images/front/earth.jpg')}
                      />
                    </TouchableOpacity>
                  
                    <TouchableOpacity
                      style={{width: '46%', margin: 5}}
                      onPress={() =>
                        this.props.navigation.navigate('IndiaForecast')
                      }>
                      <Text style={styles.text}>India Forecast</Text>
                      <Image
                        style={{
                          width: '100%',
                          height: 200,
                          margin: 6,
                          borderRadius: 5,
                        }}
                        source={require('../../images/front/india.jpg')}
                      />
                    </TouchableOpacity>
                      
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{width: '46%', margin: 5}}
                      onPress={() =>
                        this.props.navigation.navigate('WrfVersion')
                      }>
                      <Text style={styles.text}>WRF Ver 4.2 Forecast</Text>
                      <Image
                        style={{
                          width: '100%',
                          height: 200,
                          margin: 6,
                          borderRadius: 5,
                        }}

                        source={require('../../images/front/map.jpeg')}

                        // source={require('../../images/front/track.jpg')}

                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: '46%', margin: 5}}
                      onPress={() =>
                        this.props.navigation.navigate('LocationForecast')
                      }>
                      <Text style={styles.text}>
                        Location Specific Forecast
                      </Text>
                      <Image
                        style={{
                          width: '100%',
                          height: 200,
                          margin: 6,
                          borderRadius: 5,
                        }}

                        // source={require('../../images/front/track.jpeg')}

                        source={require('../../images/front/track.jpeg')}

                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{width: '46%', margin: 5}}
                      onPress={() =>
                        this.props.navigation.navigate('Aviation')
                      }>
                      <Text style={styles.text}>Aviation</Text>
                      <Image
                        style={{
                          width: '100%',
                          height: 200,
                          margin: 6,
                          borderRadius: 5,
                        }}
                        source={require('../../images/front/aviation.jpg')}
                      />
                    </TouchableOpacity>
                           <TouchableOpacity
                      style={{width: '46%', margin: 5}}
                      onPress={() =>
                        this.props.navigation.navigate('RenewableScreen')
                      }>
                      <Text style={styles.text}>Renewable Energy Products
                      </Text>
                      <Image
                        style={{
                          width: '100%',
                          height: 200,
                          margin: 6,
                          borderRadius: 5,
                        }}
                        source={RenewaleImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <WeatherScreen /> */}
                <View style={{marginBottom: 25}}>
                  <MenuFooterScreen
                    onPressMembership={() =>
                      this.props.navigation.navigate('MembershipScreen')
                    }
                    onPressBlog={() =>
                      this.props.navigation.navigate('NewsScreen')
                    }
                    onPressFaq={() =>
                      this.props.navigation.navigate('FaqScreen')
                    }
                    onPressAbout={() =>
                      this.props.navigation.navigate('AboutScreen')
                    }
                    onPressContact={() =>
                      this.props.navigation.navigate('ContactUsScreen')
                    }
                  />

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginBottom: 0,
                    }}>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 10,
                        fontWeight: '900',
                        textAlign: 'center',
                      }}>
                      Copyright © 2022 WeaClim Solutions Pvt. Ltd. All Rights
                      Reserved.
                      </Text>

                    {/* <Text style={{color: 'black', fontSize: 10, fontWeight: "900", textAlign:'center'}}>
                      Copyright © 2022 WeaClim Solutions Pvt. Ltd. All Rights Reserved.

                    </Text> */}
                  </View>
                </View>

                {/* <Banner
                  navigation={this.props.navigation}
                /> */}

                {/* <View style={styles.iconContainer}>
                  {
                    this.iconTextFun('ticket', this.props.language['10% Off First Order'])
                  }
                  {
                    this.iconTextFun('truck', this.props.language['Free shipping on $35+'])
                  }
                  {
                    this.iconTextFun('calendar', this.props.language['30 Days to return'])
                  }
                </View> */}

                {/* {this.categoryHeading(
                  this.props.language['SHOP BY CATEGORY']
                )}
                {
                  <CategoryFlatList
                    dataSource={this.props.appInProduction
                      ? this.props.getAllCategories : this.props.sortCategory}
                    products={this.props.language.Products}
                    allCategories={this.props.appInProduction
                      ? this.props.getAllCategories : this.props.sortCategory}
                    props={this.props}
                    vertical={false}
                    noOfCol={5}
                    categoryPage={61}
                  />
                } */}
              </View>

              {/* {this.props.getVendors.data !== undefined &&
                this.props.getVendors.isData ? (
                  <View>
                    {this.categoryHeading(
                      this.props.language['FEATURED VENDORS']
                    )}
                    <FlatListView
                      vertical={true}
                      noOfCol={1}
                      dataName={'Vendors'}
                      viewButton={true}
                      navigation={this.props.navigation}
                      cardStyle={'118'}
                      tabArray={
                        this.props.getVendors !== undefined &&
                      this.props.getVendors !== null
                          ? this.props.getVendors.data
                          : []
                      }
                    />
                  </View>
               ) : (
                  null
                )}  */}
              {/* {this.props.getVendors.data === undefined &&
                this.props.getVendors.isData === true ? <View>
                  {this.categoryHeading(
                    this.props.language['FEATURED VENDORS']
                  )}
                  <View
                    style={[styles.activityIndicatorContainer, {
                      backgroundColor: this.props.themeStyle.secondryBackgroundColor
                    }]}>
                    <UIActivityIndicator
                      size={27}
                      color={this.props.themeStyle.primary}
                    />
                  </View>
                </View> : null
              } */}

              {/* {this.categoryHeading(
                this.props.language['YEARS END SALE']
              )}

              {
                this.props.banners !== undefined ? (
                  this.props.banners.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('NewestScreen', { id: '' })
                      }}>
                      <ImageLoad
                        style={styles.singleBanner}
                        loadingStyle={{
                          size: 'large',
                          color: this.props.themeStyle.primary
                        }}
                        source={{
                          uri: this.props.banners[this.props.banners.length - 1].banners_image !== undefined
                            ? this.props.banners[this.props.banners.length - 1].banners_image.toString().startsWith('https')
                              ? this.props.banners[this.props.banners.length - 1].banners_image.toString()
                              : this.props.banners[this.props.banners.length - 1].banners_image.toString().replace('http', 'https')
                            : ''
                        }}
                      />
                    </TouchableOpacity>

                  ) : null
                ) : null
              } */}

              {/* {this.categoryHeading(
                this.props.language['TOP RATED'])}
              {this.props.topsellerProducts !== undefined ? (
                <FlatListView
                  vertical={true}
                  noOfCol={1}
                  dataName={'topSelling'}
                  viewButton={true}
                  navigation={this.props.navigation}
                  cardStyle={'118'}
                  tabArray={
                    this.props.topsellerProducts !== undefined &&
                      this.props.topsellerProducts !== null
                      ? this.props.topsellerProducts
                      : []
                  }
                />
              ) : (
                this.noProductFun()
              )} */}

              {/* <View style={{ paddingTop: 16, marginBottom: -14 }}>
                {this.categoryHeading(
                  this.props.language['JUST FOR YOU'])}
                {this.props.products.length > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.props.products}
                    extraData={this.state}
                    horizontal
                    style={{
                      marginTop: 5,
                      paddingTop: 0
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => null}
                  />
                ) : (
                  this.noProductFun()
                )}
              </View> */}
            </View>
          }
          // onScroll={this.handleScroll.bind(this)}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
      </View>
    );
  }
}

// //////////////////////
const mapDispatchToProps = dispatch => ({

  logOutCall: (th) => {
    dispatch(async dispatch => {
       
        await logOut(dispatch, th);

        // th.props.navigation.dispatch(DrawerActions.closeDrawer());

    })

},

  getOneProductsFun: (props, th, id) => {
    dispatch(async dispatch => {
      await getOneProduct(
        dispatch,
        props.settings.language_id,
        props.settings.currency_id,
        id,
        th,
      );
    });
  },
  getProductsFun: (props, page) => {
    dispatch(async dispatch => {
      await getProducts(
        dispatch,
        props.languageCode,
        props.currencyCode,
        page,
        '',
      );
    });
  },

  clearProducts: () => {
    dispatch({
      type: CLEAR_PRODUCTS,
    });
  },
});
/// ///////////////////////////////////////////////
const getTheme = state => state.appConfig.themeStyle;
const getLanguage = state => state.appConfig.languageJson;
const getAppinPro = state => state.appConfig.appInProduction;

const getAllCategories = state => state.getCategories.categories;
const getCategories = state => state.getCategories.sortCategory;
const getBanners = state => state.bannersData.banners;
const getSettings = state => state.settingsCall.settings;
const getproductsArray = state => state.productsData.products;
const gettopsellerProductsArray = state => state.productsData.topsellerProducts;
const getCurrency = state => state.appConfig.currencyCode;
const getLanguageCode = state => state.appConfig.languageCode;
const getVendorsArray = state => state.vendorData.vendorsArray;
const getUserData = state => state.userData.user
const getSessionId = state => state.userData.sessionId


const getAllCategoriesFun = createSelector(
  [getAllCategories],
  getAllCategories => {
    return getAllCategories;
  },
);

const getUserDataFun = createSelector(
  [getUserData],
  (getUserData) => {
      return getUserData
  }
);

const getSessionIdFun = createSelector(
  [getSessionId],
  (getSessionId) => {
      return getSessionId
  }
)


const getVendorsArrayFun = createSelector(
  [getVendorsArray],
  getVendorsArray => {
    return getVendorsArray;
  },
);

{/* const getCurrencyFun = createSelector([getCurrency], getCurrency => {
  return getCurrency;
}); */}

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
const gettopsellerProductsArrayFun = createSelector(
  [gettopsellerProductsArray],
  gettopsellerProductsArray => {
    return gettopsellerProductsArray;
  },
);


{/* const getAppinProFun = createSelector([getAppinPro], getAppinPro => {
  return getAppinPro;
}); */}

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

const getBannersFun = createSelector([getBanners], getBanners => {
  return getBanners;
});

const getCategoriesFun = createSelector([getCategories], getCategories => {
  return getCategories;
});

const getThemeFun = createSelector([getTheme], getTheme => {
  return getTheme;
});

const getLanguageFun = createSelector([getLanguage], getLanguage => {
  return getLanguage;
});

const getSettingsFun = createSelector([getSettings], getSettings => {
  return getSettings;
});
{/* const getBannersFun = createSelector(
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
); */}


const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  sortCategory: getCategoriesFun(state),
  banners: getBannersFun(state),
  settings: getSettingsFun(state),
  products: getproductsArrayFun(state),
  appInProduction: getAppinProFun(state),
  getAllCategories: getAllCategoriesFun(state),
  topsellerProducts: gettopsellerProductsArrayFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state),
  getVendors: getVendorsArrayFun(state),

  userData: getUserDataFun(state),
  sessionId: getSessionIdFun(state),
  
});

/// //////////////////////////////////////////
{/* export default connect(mapStateToProps, mapDispatchToProps)(Newest); */}

{/* }); */}

/// //////////////////////////////////////////
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Newest);

/// /////////////////////////////////////////////
const styles = StyleSheet.create({
  loaderContainer: {
    height: Platform.OS === 'android' ? 260 : 230,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 3,
    margin: 5,
  },
  actvityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    // marginTop: 20,
    // paddingBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  categoryTypeStyle: {
    padding: 10,
    alignSelf: 'center',
  },
  iconTextStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    alignSelf: 'center',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoPanalContainer: {
    zIndex: 5,
    position: 'absolute',
    left: 20,
    bottom: 70,
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  demoPanal: {
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    fontSize: 22,
  },
  fabStyle: {
    zIndex: 5,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: 25,
    marginBottom: 60,
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
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  singleBanner: {
    width: WIDTH,
    height: 200,
    marginTop: 0,
    marginBottom: 5,
  },
  noProductView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 30,
    alignSelf: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 8,
    marginBottom: 5,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 50,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
  },
  closeButton: {
    padding: 16,
    alignSelf: 'flex-end'
  },
  closeText: {
    fontSize: 18,
    color: 'red',
    fontWeight: '600'
  },
  drawerItem: {
    padding: 16,
    fontSize: 18,
    color: 'black',
    fontWeight: '600'
  },
  openButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    padding: 10,
    // backgroundColor: '#ccc',
    borderRadius: 5,
    zIndex: 1000,
    height: 50,
    width: 50
  },
  openText: {
    fontSize: 18,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  noProductView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    fontFamily: appTextStyle.fontFamily,
    fontSize: appTextStyle.largeSize + 2,
    color: '#000', // Adjust based on your themeStyle
  },
  categoryTypeStyle: {
    fontFamily: appTextStyle.fontFamily,
    fontSize: appTextStyle.largeSize + 3,
    color: '#000', // Adjust based on your themeStyle
  },
  iconTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#000', // Adjust based on your themeStyle
    fontSize: appTextStyle.largeSize + PixelRatio.getPixelSizeForLayoutSize(6),
  },
  iconTextLabel: {
    fontSize: appTextStyle.smallSize - 1,
    color: '#000', // Adjust based on your themeStyle
    fontFamily: appTextStyle.fontFamily,
    paddingTop: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 5,
  },


});
