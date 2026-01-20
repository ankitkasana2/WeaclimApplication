import { createStackNavigator } from 'react-navigation-stack'
import Category from '../../../screens/Category'
import Category1Screen from '../../../screens/Category1Screen'
import NewestScreen from '../../bottomNavigation/Stacks/Newest'
import ProductDetails from '../../../screens/ProductDetails'
import RatingAndReviewScreen from '../../../screens/RatingAndReviewScreen'
import Home1Screen from '../../../screens/Home'
import TermAndServiceScreen from '../../../screens/TermAndServiceScreen'
import PrivacyPolicyScreen from '../../../screens/PrivacyPolicyScreen'
import RefundPolicy from '../../../screens/RefundPolicy'
import LoginScreen from '../../../screens/LoginScreen'
import DemoScreen from '../../../screens/DemoScreen'
import SearchScreen from '../../../screens/SearchScreen'
import CartScreen from '../../../screens/CartScreen'
import SearchFilterClass from '../../../common/SearchFilterClass'
import PaymentMethodScreen from '../../../screens/PaymentMethodScreen'
import ThankUScreen from '../../../screens/ThankUScreen'
import ShippingMethodScreen from '../../../screens/ShippingMethodScreen'
import ShippingAddressScreen from '../../../screens/ShippingAddressScreen'
import OrderScreen from '../../../screens/OrderScreen'
import MyOrdersScreen from '../../../screens/MyOrdersScreen'
import OrderDetail from '../../../screens/OrderDetail'
import WebViewScreen from '../../../screens/WebViewScreen'
import Payment from '../../../screens/Payment'

/// ////////////////////////////////////////////////// Home Stack Start
const CategoryStackNavigator = createStackNavigator(
  {
    Category: {
      screen: Category,
      navigationOptions: () => ({
        gestureEnabled: false,
        header: null,
        headerShown: false
      })
    },
    WebViewScreen: {
      screen: WebViewScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    Payment:{
      screen:Payment,
      navigationOptions:()=>({
        gestureEnabled:false,
        headerRight:null,
      })
    },
    PaymentMethodScreen: {
      screen: PaymentMethodScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    Category1Screen: {
      screen: Category1Screen,
      navigationOptions: () => ({
        gestureEnabled: false,
        header: null,
        headerShown: false
      })
    },
    SearchFilterClass: {
      screen: SearchFilterClass,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    Home1Screen: {
      screen: Home1Screen,
      navigationOptions: () => ({
        gestureEnabled: false,
        header: null,
        headerShown: false
      })
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        header: null,
        headerShown: false
      })
    },
    TermAndServiceScreen: {
      screen: TermAndServiceScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })

    },
    PrivacyPolicyScreen: {
      screen: PrivacyPolicyScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })

    },
    RefundPolicy: {
      screen: RefundPolicy,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })

    },
    DemoScreen: {
      screen: DemoScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    RatingAndReviewScreen: {
      screen: RatingAndReviewScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    NewestScreen: {
      screen: NewestScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    CartScreen: {
      screen: CartScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        header: null,
        headerShown: false
      })
    },
    MyOrdersScreen: {
      screen: MyOrdersScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    OrderDetail: {
      screen: OrderDetail,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    ThankUScreen: {
      screen: ThankUScreen,
      navigationOptions: () => ({
        gestureEnabled: false

      })
    },
    ShippingAddressScreen: {
      screen: ShippingAddressScreen,
      navigationOptions: () => ({
        gestureEnabled: false

      })
    },
    ShippingMethodScreen: {
      screen: ShippingMethodScreen,
      navigationOptions: () => ({
        gestureEnabled: false

      })
    },
    OrderScreen: {
      screen: OrderScreen,
      navigationOptions: () => ({
        gestureEnabled: false

      })
    }
  }

)

CategoryStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      tabBarVisible = false
    })
  }

  return {
    tabBarVisible
  }
}

export default CategoryStackNavigator
