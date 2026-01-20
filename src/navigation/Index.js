import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HOME from '../navigation/bottomNavigation/Index';
import INTRO from './bottomNavigation/Stacks/Intro';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: INTRO,
      Home: HOME
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
