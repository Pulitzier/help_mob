import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginTab from './LoginTabNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginTab,
      Main: MainTabNavigator,
    },
    {
      initialRouteName: 'Login',
    }
  )
);
