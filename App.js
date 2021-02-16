import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ClosetScreen from './src/screens/ClosetScreen';
import LooksScreen from './src/screens/LooksScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createStackNavigator();

const firebaseConfig = {
    apiKey: "AIzaSyCSq1dCcfJvHIW4Fo22UzQ5pwALd2X3vu8",
    authDomain: "mylook-76a67.firebaseapp.com",
    databaseURL: "https://mylook-76a67.firebaseio.com",
    projectId: "mylook-76a67",
    storageBucket: "mylook-76a67.appspot.com",
    messagingSenderId: "989275616193",
    appId: "1:989275616193:web:642d08e1d183c75b64f540",
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

let customFonts = {
    'advent-pro-semi-bold': require('./assets/fonts/AdventPro-SemiBold.ttf'),
    'advent-pro-bold': require('./assets/fonts/AdventPro-Bold.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf')
};

export default class App extends React.Component {
    state = {
        fontsLoaded: false
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true});
    }

    componentDidMount() {
        this._loadFontsAsync();
    }
    render()
    {
        if (this.state.fontsLoaded) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} options={{
                            title: 'MyLook',
                            headerTitleStyle: style.headerTitle
                        }}/>
                        <Stack.Screen name="Closet" component={ClosetScreen} options = {{
                            title: 'Closet',
                            headerTitleStyle: style.headerTitle
                        }}/>
                        <Stack.Screen name="Looks" component={LooksScreen} options = {{
                            title: 'Looks',
                            headerTitleStyle: style.headerTitle
                        }}/>
                        <Stack.Screen name="Calendar" component={CalendarScreen} options = {{
                            title: 'Calendar',
                            headerTitleStyle: style.headerTitle
                        }}/>
                        <Stack.Screen name="Camera" component={CameraScreen} options = {{
                            title: 'Camera',
                            headerShown: false
                        }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            );
        } else {
            return <AppLoading />;
        }
    }
}

const style = StyleSheet.create({
    headerTitle: {
        fontFamily: 'advent-pro-semi-bold',
        fontSize: 35
    }
});
