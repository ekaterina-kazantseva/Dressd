import React, {useState, useEffect, useMemo, createContext} from 'react';
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
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

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
const AppStack = createStackNavigator();
export const AuthContext = React.createContext();

const MainStack = () => {
    return (
        <AppStack.Navigator initialRouteName="Home">
            <AppStack.Screen name="Home" component={HomeScreen} options={{
                title: 'MyLook',
                headerTitleStyle: style.headerTitle
            }}/>
            <AppStack.Screen name="Closet" component={ClosetScreen} options={{
                title: 'Closet',
                headerTitleStyle: style.headerTitle
            }}/>
            <AppStack.Screen name="Looks" component={LooksScreen} options={{
                title: 'Looks',
                headerTitleStyle: style.headerTitle
            }}/>
            <AppStack.Screen name="Camera" component={CameraScreen} options={{
                title: 'Camera',
                headerShown: false
            }}/>
            <AppStack.Screen name="Calendar" component={CalendarScreen} options={{
                title: 'Calendar',
                headerTitleStyle: style.headerTitle
            }}/>
        </AppStack.Navigator>
    );
}

const AuthStack = () => {
    return(
        <AppStack.Navigator initialRouteName="SignIn">
            <AppStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
            <AppStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        </AppStack.Navigator>
    );
}

export default function App() {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch(action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    userToken: action.token,
                };
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null,
                };
        }
    }, {
        isLoading: true,
        isSignout: false,
        userToken: null,
        }
    );

    const bootstrapAsync = async () => {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);

        let userToken;
        userToken = await firebase.auth().currentUser;
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    useEffect(() => {
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(data.email, data.password);
                //add error handling
                let user = await firebase.auth().currentUser;
                dispatch({ type: 'SIGN_IN', token: user });
            },
            signOut: async data => {
                firebase.auth().signOut();
                dispatch({type: 'SIGN_OUT'});
            },
            signUp: async data => {
                await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password);
                //add error handling
                let user = await firebase.auth().currentUser;
                dispatch({ type: 'SIGN_IN', token: user });
    }
        }),[]
    );
    if (fontsLoaded) {
        return (
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {
                        state.userToken ?
                            (<MainStack/>)
                        : (<AuthStack/>)
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        );
    } else {
        return <AppLoading / >
    }
}

const style = StyleSheet.create({
    headerTitle: {
        fontFamily: 'advent-pro-semi-bold',
        fontSize: 35
    }
});
