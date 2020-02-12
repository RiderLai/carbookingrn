/*
 * @Author: Rider
 * @Date: 2020-01-23 13:57:32
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-02 16:12:25
 * @Description: file content
 */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Icon } from 'native-base';

import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import CarDetialScreen from './screens/CarDetialScreen';
import LoginScreen from './screens/LoginScreen';
import DriveScreen from './screens/DriveScreen';

const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};

const TabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen:	HomeScreen,
			navigationOptions: {
				tabBarLabel: '主页',
				tabBarIcon: ({tintColor}) => (
					<Icon name='home' style={{color: tintColor}} />
				),
			}
		},
		Booking: {
			screen: BookingScreen,
			navigationOptions: {
				tabBarLabel: '预约信息',
				tabBarIcon: ({tintColor}) => (
					<Icon name='browsers' style={{color: tintColor}} />
				),
			}
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarLabel: '个人信息',
				tabBarIcon: ({tintColor}) => (
					<Icon name='person' style={{color: tintColor}} />
				),
			}
		}
	},
	{
		tabBarOptions: {
			showIcon: true,
		}
	});

const AppStack = createStackNavigator(
  {
    Tab: {
      screen: TabNavigator,
      ...doNotShowHeaderOption
    },
    CarDetial: {
			screen: CarDetialScreen,
			navigationOptions: {
				title: '车辆详细信息',
			}
    }
  }
);

export default createAppContainer(
	createSwitchNavigator(
		{
			App: AppStack,
			Login: LoginScreen,
			Drive: DriveScreen,
		},
		{
			initialRouteName: 'Login',
		}
	)
);
