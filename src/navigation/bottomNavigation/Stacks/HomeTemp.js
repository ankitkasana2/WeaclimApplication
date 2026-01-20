import { createStackNavigator } from 'react-navigation-stack';
import Home1Screen from '../../../screens/Home';
import TermAndServiceScreen from '../../../screens/TermAndServiceScreen';
import PrivacyPolicyScreen from '../../../screens/PrivacyPolicyScreen';
import RefundPolicy from '../../../screens/RefundPolicy';
import LoginScreen from '../../../screens/LoginScreen';
import Category from '../../../screens/Category2Screen';
import NewestScreen from '../../bottomNavigation/Stacks/Newest';
import ProductDetails from '../../../screens/ProductDetails';
import RatingAndReviewScreen from '../../../screens/RatingAndReviewScreen';
import DemoScreen from '../../../screens/DemoScreen';
import SearchScreen from '../../../screens/SearchScreen';
import SearchFilterClass from '../../../common/SearchFilterClass';
import PaymentMethodScreen from '../../../screens/PaymentMethodScreen';
import VendorScreen from '../../../screens/VendorScreen';

import CartScreen from '../../../screens/CartScreen';
import ThankUScreen from '../../../screens/ThankUScreen';
import ShippingMethodScreen from '../../../screens/ShippingMethodScreen';
import ShippingAddressScreen from '../../../screens/ShippingAddressScreen';
import OrderScreen from '../../../screens/OrderScreen';
import MyOrdersScreen from '../../../screens/MyOrdersScreen';
import OrderDetail from '../../../screens/OrderDetail';
import WebViewScreen from '../../../screens/WebViewScreen';
import GlobalForecast from '../../../screens/ForecastScreens/GlobalForecast';
import IndiaForecast from '../../../screens/ForecastScreens/IndiaForecast';
import WrfVersion from '../../../screens/ForecastScreens/WrfVersion';
import LocationForecast from '../../../screens/ForecastScreens/LocationForecast';
import Aviation from '../../../screens/ForecastScreens/Aviation';
import AndhraPradesh from '../../../screens/ForecastScreens/Location/AndhraPradesh';
import ArunachalPradesh from '../../../screens/ForecastScreens/Location/ArunachalPradesh';
import AndamanNicobar from '../../../screens/ForecastScreens/Location/AndamanNicobar';
import Assam from '../../../screens/ForecastScreens/Location/Assam';
import Bihar from '../../../screens/ForecastScreens/Location/Bihar';
import Chhatisgarh from '../../../screens/ForecastScreens/Location/Chhatisgarh';
import Delhi from '../../../screens/ForecastScreens/Location/Delhi';
import Gujarat from '../../../screens/ForecastScreens/Location/Gujarat';
import Chandigarh from '../../../screens/ForecastScreens/Location/Chandigarh';
import Haryana from '../../../screens/ForecastScreens/Location/Haryana';
import HimachalPradesh from '../../../screens/ForecastScreens/Location/HimachalPradesh';
import JammuKashmir from '../../../screens/ForecastScreens/Location/JammuKashmir';
import Jharkhand from '../../../screens/ForecastScreens/Location/Jharkhand';
import Karnataka from '../../../screens/ForecastScreens/Location/Karnataka';
import Kerala from '../../../screens/ForecastScreens/Location/Kerala';
import KannurAirTurbulance from '../../../screens/ForecastScreens/Location/KannurAirTurbulance';
import Ladakh from '../../../screens/ForecastScreens/Location/Ladakh';
import Lakshdeep from '../../../screens/ForecastScreens/Location/Lakshdeep';
import MadhyaPradesh from '../../../screens/ForecastScreens/Location/MadhyaPradesh';
import Maharashtra from '../../../screens/ForecastScreens/Location/Maharashtra';
import Manipur from '../../../screens/ForecastScreens/Location/Manipur';
import Meghalaya from '../../../screens/ForecastScreens/Location/Meghalaya';
import Mizoram from '../../../screens/ForecastScreens/Location/Mizoram';
import Nagaland from '../../../screens/ForecastScreens/Location/Nagaland';
import Orissa from '../../../screens/ForecastScreens/Location/Orissa';
import Punjab from '../../../screens/ForecastScreens/Location/Punjab';
import Rajasthan from '../../../screens/ForecastScreens/Location/Rajasthan';
import Sikkim from '../../../screens/ForecastScreens/Location/Sikkim';
import TamilNadu from '../../../screens/ForecastScreens/Location/TamilNadu';
import Talengana from '../../../screens/ForecastScreens/Location/Talengana';
import Tripura from '../../../screens/ForecastScreens/Location/Tripura';
import UttarPradesh from '../../../screens/ForecastScreens/Location/UttarPradesh';
import WestBangal from '../../../screens/ForecastScreens/Location/WestBangal';
import Uttarakhand from '../../../screens/ForecastScreens/Location/Uttarakhand';
import DataScreen from '../../../screens/ForecastScreens/DataScreen';
import AfricaForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/AfricaForecastScreen';
import AustraliaForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/AustraliaForecastScreen';
import EastAsiaForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/EastAsiaForecastScreen';
import EurasiaForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/EurasiaForecastScreen';
import EuropeForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/EuropeForecastScreen';
import NorthAmericaForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/NorthAmericaForecastScreen';
import SouthAmericaForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/SouthAmericaForecastScreen';
import WorldForecastScreen from '../../../screens/ForecastScreens/GlobalForecastScreen/WorldForecastScreen';
import NorthIndiaForecastScreen from '../../../screens/ForecastScreens/WRFScreen/NorthIndiaForecastScreen';
import EastIndiaForecastScreen from '../../../screens/ForecastScreens/WRFScreen/EastIndiaForecastScreen';
import WestIndiaForecastScreen from '../../../screens/ForecastScreens/WRFScreen/WestIndiaForecastScreen';
import SouthIndiaForecastScreen from '../../../screens/ForecastScreens/WRFScreen/SouthIndiaForecastScreen';
import AfricaAviationForecast from '../../../screens/ForecastScreens/Aviation/AfricaAviationForecast';
import AustraliaAviationForecast from '../../../screens/ForecastScreens/Aviation/AustraliaAviationForecast';
import EastAsiaAviationForecast from '../../../screens/ForecastScreens/Aviation/EastAsiaAviationForecast';
import EurasiaAviationForecast from '../../../screens/ForecastScreens/Aviation/EurasiaAviationForecast';
import EuropeAviationForecast from '../../../screens/ForecastScreens/Aviation/EuropeAviationForecast';
import IndiaAviationForecast from '../../../screens/ForecastScreens/Aviation/IndiaAviationForecast';
import NorthAmericaAviationForecast from '../../../screens/ForecastScreens/Aviation/NorthAmericaAviationForecast';
import SouthAmericaAviationForecast from '../../../screens/ForecastScreens/Aviation/SouthAmericaAviationForecast';
import WorldAviationForecast from '../../../screens/ForecastScreens/Aviation/WorldAviationForecast';
import AboutUs from '../../../screens/ForecastScreens/Menu/AboutUs';
import Blog from '../../../screens/ForecastScreens/Menu/Blog';
import MenuFooterScreen from '../../../screens/homeScreens/MenuFooterScreen';
import NewsScreen from '../../../screens/NewsScreen';
import Payment from '../../../screens/Payment';
import AboutScreen from '../../../screens/AboutScreen';
import WRF45km from '../../../screens/ForecastScreens/WRFScreen/WRF45km';
import WRF15km from '../../../screens/ForecastScreens/WRFScreen/WRF15km';
import ContactUsScreen from '../../../screens/ContactUsScreen';
import FaqScreen from '../../../screens/FaqScreen';
import MembershipScreen from '../../../screens/MembershipScreen';
import MembershipComponent from '../../../screens/MembershipComponent';
import Goa from '../../../screens/ForecastScreens/Location/Goa';

import AccountDelete from '../../../screens/AccountDelete';
import CustomDrawer from '../../../screens/CustomDrawer';
import RenewableScreen from '../../../screens/ForecastScreens/RenewableScreen';
import AfricaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/AfricaProductScreen';
import AustraliaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/AustraliaProductScreen';
import EurasiaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/EurasiaProductScreen';
import EuropeProductScreen from '../../../screens/ForecastScreens/RenewableScreen/EuropeProductScreen';
import NorthAmericaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/NorthAmericaProductScreen';
import IndiaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/IndiaProductScreen';
import SouthAmericaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/SouthAmericaProductScreen';
import WorldProductScreen from '../../../screens/ForecastScreens/RenewableScreen/WorldProductScreen';
import EastAsiaProductScreen from '../../../screens/ForecastScreens/RenewableScreen/EastAsiaProductScreen';
import WRF_45kmProductScreen from '../../../screens/ForecastScreens/RenewableScreen/WRF_45kmProductScreen';
import WRF_15kmProductScreen from '../../../screens/ForecastScreens/RenewableScreen/WRF_15kmProductScreen';
import RenewableEnergyProducts15km from '../../../screens/ForecastScreens/WRFScreen/RenewableEnergyProducts15km';
import RenewableEnergyProducts45km from '../../../screens/ForecastScreens/WRFScreen/RenewableEnergyProducts45km';


/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator({
  Home1Screen: {
    screen: Home1Screen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  WebViewScreen: {
    screen: WebViewScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      headerRight: null,
    }),
  },
  Payment: {
    screen: Payment,
    navigationOptions: () => ({
      gestureEnabled: false,
      headerRight: null,
    }),
  },
  PaymentMethodScreen: {
    screen: PaymentMethodScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  TermAndServiceScreen: {
    screen: TermAndServiceScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  SearchFilterClass: {
    screen: SearchFilterClass,
    navigationOptions: () => ({
      gestureEnabled: false,
      headerRight: null,
    }),
  },
  PrivacyPolicyScreen: {
    screen: PrivacyPolicyScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  RefundPolicy: {
    screen: RefundPolicy,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  DemoScreen: {
    screen: DemoScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  Category: {
    screen: Category,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: () => ({
      gestureEnabled: false,
      tabBarVisible: false,
      drawerLockMode: 'locked-closed',
    }),
  },
  RatingAndReviewScreen: {
    screen: RatingAndReviewScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  NewestScreen: {
    screen: NewestScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      title: 'Shop',
      headerTitleStyle: {
        marginRight: 80,
        alignSelf: 'center',
        fontSize: 18
      }

    }),
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  MyOrdersScreen: {
    screen: MyOrdersScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  OrderDetail: {
    screen: OrderDetail,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  ThankUScreen: {
    screen: ThankUScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  ShippingAddressScreen: {
    screen: ShippingAddressScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  ShippingMethodScreen: {
    screen: ShippingMethodScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  VendorScreen: {
    screen: VendorScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
    }),
  },
  GlobalForecast: {
    screen: GlobalForecast,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  RenewableScreen: {
    screen: RenewableScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  AfricaProductScreen: {
    screen: AfricaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  AustraliaProductScreen: {
    screen: AustraliaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  EastAsiaProductScreen: {
    screen: EastAsiaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  EurasiaProductScreen: {
    screen: EurasiaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  EuropeProductScreen: {
    screen: EuropeProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  NorthAmericaProductScreen: {
    screen: NorthAmericaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },

  WRF_45kmProductScreen: {
    screen: WRF_45kmProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  WRF_15kmProductScreen: {
    screen: WRF_15kmProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },


  IndiaProductScreen: {
    screen: IndiaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  SouthAmericaProductScreen: {
    screen: SouthAmericaProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  WorldProductScreen: {
    screen: WorldProductScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  IndiaForecast: {
    screen: IndiaForecast,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  WrfVersion: {
    screen: WrfVersion,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },

  RenewableEnergyProducts15km: {
    screen: RenewableEnergyProducts15km,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },

  RenewableEnergyProducts45km: {
    screen: RenewableEnergyProducts45km,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },
  LocationForecast: {
    screen: LocationForecast,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },

  AfricaForecastScreen: {
    screen: AfricaForecastScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      header: null,
      headerShown: false,
    }),
  },

  AustraliaForecastScreen: {
    screen: AustraliaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  EastAsiaForecastScreen: {
    screen: EastAsiaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  EurasiaForecastScreen: {
    screen: EurasiaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  EuropeForecastScreen: {
    screen: EuropeForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  NorthAmericaForecastScreen: {
    screen: NorthAmericaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  SouthAmericaForecastScreen: {
    screen: SouthAmericaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  WorldForecastScreen: {
    screen: WorldForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  WRF45km: {
    screen: WRF45km,
    navigationOptions: () => ({
      header: null,
      gestureEnabled: false,
      headerShown: false,
    }),
  },
  WRF15km: {
    screen: WRF15km,
    navigationOptions: () => ({
      header: null,
      gestureEnabled: false,
      headerShown: false,
    }),
  },

  NorthIndiaForecastScreen: {
    screen: NorthIndiaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  EastIndiaForecastScreen: {
    screen: EastIndiaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  WestIndiaForecastScreen: {
    screen: WestIndiaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  SouthIndiaForecastScreen: {
    screen: SouthIndiaForecastScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  Aviation: {
    screen: Aviation,
    navigationOptions: () => ({
      header: null,
      gestureEnabled: false,
      headerShown: false,
    }),
  },
  AfricaAviationForecast: {
    screen: AfricaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  AustraliaAviationForecast: {
    screen: AustraliaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  EastAsiaAviationForecast: {
    screen: EastAsiaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  EurasiaAviationForecast: {
    screen: EurasiaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  EuropeAviationForecast: {
    screen: EuropeAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  IndiaAviationForecast: {
    screen: IndiaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  NorthAmericaAviationForecast: {
    screen: NorthAmericaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  SouthAmericaAviationForecast: {
    screen: SouthAmericaAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  WorldAviationForecast: {
    screen: WorldAviationForecast,
    navigationOptions: () => ({
      headerShown: false,
      header: null,
      gestureEnabled: false,
    }),
  },

  AndhraPradesh: {
    screen: AndhraPradesh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  ArunachalPradesh: {
    screen: ArunachalPradesh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  AndamanNicobar: {
    screen: AndamanNicobar,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Assam: {
    screen: Assam,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Bihar: {
    screen: Bihar,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Chhatisgarh: {
    screen: Chhatisgarh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Delhi: {
    screen: Delhi,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Gujarat: {
    screen: Gujarat,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Goa: {
    screen: Goa,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Chandigarh: {
    screen: Chandigarh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Haryana: {
    screen: Haryana,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  HimachalPradesh: {
    screen: HimachalPradesh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  JammuKashmir: {
    screen: JammuKashmir,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Jharkhand: {
    screen: Jharkhand,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Karnataka: {
    screen: Karnataka,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Kerala: {
    screen: Kerala,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  KannurAirTurbulance: {
    screen: KannurAirTurbulance,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Ladakh: {
    screen: Ladakh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Lakshdeep: {
    screen: Lakshdeep,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  MadhyaPradesh: {
    screen: MadhyaPradesh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Maharashtra: {
    screen: Maharashtra,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Manipur: {
    screen: Manipur,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Meghalaya: {
    screen: Meghalaya,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Mizoram: {
    screen: Mizoram,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Nagaland: {
    screen: Nagaland,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Orissa: {
    screen: Orissa,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Punjab: {
    screen: Punjab,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Rajasthan: {
    screen: Rajasthan,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Sikkim: {
    screen: Sikkim,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  TamilNadu: {
    screen: TamilNadu,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Talengana: {
    screen: Talengana,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Tripura: {
    screen: Tripura,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  UttarPradesh: {
    screen: UttarPradesh,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  WestBangal: {
    screen: WestBangal,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Uttarakhand: {
    screen: Uttarakhand,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  DataScreen: {
    screen: DataScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  ContactUsScreen: {
    screen: ContactUsScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  FaqScreen: {
    screen: FaqScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  Blog: {
    screen: Blog,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  MenuFooterScreen: {
    screen: MenuFooterScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  // changes done by Ankit
  MembershipScreen: {
    screen: MembershipScreen,
    navigationOptions: () => ({
      headerTitle: 'Subscription',
      headerShown: true,
      headerTitleAlign: 'center',
      gestureEnabled: false,
    }),
  },
  MembershipComponent: {
    screen: MembershipComponent,
    navigationOptions: () => ({
      headerTitle: 'Subscription',
      headerShown: true,
      headerTitleAlign: 'center',
      gestureEnabled: false,
    }),
  },
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: () => ({
      header: null,
      headerShown: false,
      gestureEnabled: false,
    }),
  },

  AccountDelete: {
    screen: AccountDelete,
    navigationOptions: () => ({
      title: 'Delete Account', // Set the header title here
      headerShown: true,
    }),
  },

  CustomDrawer: {
    screen: CustomDrawer,
    navigationOptions: () => ({
      title: 'Custom Drawer',
      headerShown: true,
    }),
  },
});




HomeStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      tabBarVisible = false;
    });
  }

  return {
    tabBarVisible,
  };
};

export default HomeStackNavigator;
