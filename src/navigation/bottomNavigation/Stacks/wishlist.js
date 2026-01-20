import { createStackNavigator } from 'react-navigation-stack'
import Home1Screen from '../../../screens/Home'
import LoginScreen from '../../../screens/LoginScreen'
import Category from '../../../screens/Category2Screen'
import NewestScreen from '../../bottomNavigation/Stacks/Newest'
import ProductDetails from '../../../screens/ProductDetails'
import RatingAndReviewScreen from '../../../screens/RatingAndReviewScreen'
import DemoScreen from '../../../screens/DemoScreen'
import Wishlist from '../../../screens/MyFavorites'
import SearchScreen from '../../../screens/SearchScreen'
import SearchFilterClass from '../../../common/SearchFilterClass'
import PaymentMethodScreen from '../../../screens/PaymentMethodScreen'

import CartScreen from '../../../screens/CartScreen'
import ThankUScreen from '../../../screens/ThankUScreen'
import ShippingMethodScreen from '../../../screens/ShippingMethodScreen'
import ShippingAddressScreen from '../../../screens/ShippingAddressScreen'
import OrderScreen from '../../../screens/OrderScreen'
import MyOrdersScreen from '../../../screens/MyOrdersScreen'
import OrderDetail from '../../../screens/OrderDetail'
import WebViewScreen from '../../../screens/WebViewScreen'
import MembershipScreen from '../../../screens/MembershipScreen'
import MembershipComponent from '../../../screens/MembershipComponent'

/// ////////////////////////////////////////////////// Home Stack Start
const SearchStackNavigator = createStackNavigator(
  {
    Wishlist: {
      screen: Wishlist,
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
    PaymentMethodScreen: {
      screen: PaymentMethodScreen,
      navigationOptions: () => ({
        gestureEnabled: false
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
    ProductDetails: {
      screen: ProductDetails,
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
    RatingAndReviewScreen: {
      screen: RatingAndReviewScreen,
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
    },
    DemoScreen: {
      screen: DemoScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
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
    Category: {
      screen: Category,
      navigationOptions: () => ({
        gestureEnabled: true
      })
    }
  }
)

SearchStackNavigator.navigationOptions = ({ navigation }) => {
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

export default SearchStackNavigator
