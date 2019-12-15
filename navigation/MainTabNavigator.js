import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CenterScreen from '../screens/CenterScreen';
import DoctorScreen from '../screens/DoctorScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
    navigationOptions: { header: null },
  },
});

const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  config
);
HomeStack.navigationOptions = { title: 'Home' };

// Here comes Center Screen
const CenterStack = createStackNavigator(
  { Center: CenterScreen },
  config
);
CenterStack.navigationOptions = { title: 'Center' };
// Here ends Center Screen

// Here comes Doctor Screen
const DoctorStack = createStackNavigator(
  { Doctor: DoctorScreen },
  config
);
DoctorStack.navigationOptions = { title: 'Doctor' };
// Here ends Doctor Screen


const screenNavigator = createStackNavigator({
    HomeStack,
    CenterStack,
    DoctorStack,
  },
  config,
);

screenNavigator.path = '';

export default screenNavigator;
