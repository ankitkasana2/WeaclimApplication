import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NewestScreen from '../../../screens/NewestScreen';

const StackNavigator = createStackNavigator({
  NewestScreen: {
    screen: NewestScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      disableGestures: true,
      swipeEnabled: false,
      headerShown: false 
    }),
  },
});

export default StackNavigator;
