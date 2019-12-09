import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CenterScreen from '../screens/CenterScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
    navigationOptions: { header: null },
  },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

// Here comes Center Screen
const CenterStack = createStackNavigator(
  {
    Center: CenterScreen,
  },
  config
);

CenterStack.navigationOptions = {
  title: 'Center',
};

CenterStack.path = '';
// Here ends Center Screen

const screenNavigator = createStackNavigator({
    HomeStack,
    CenterStack,
  },
  config,
);

screenNavigator.path = '';

export default screenNavigator;
