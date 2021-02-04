import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ClosetScreen from './src/screens/ClosetScreen';
import LooksScreen from './src/screens/LooksScreen';

const navigator = createStackNavigator(
	{
		Home: { 
			screen: HomeScreen,
			navigationOptions: {
				header: null,
			}
		},
		Closet: { 
			screen: ClosetScreen,
			navigationOptions: {
				header: null
			}
		},
		Looks: {
			screen: LooksScreen,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOption:{
			title: "App"
		}
	}
);

export default createAppContainer(navigator);