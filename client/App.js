import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation'; 

import HomeScreen from './Home.js';
import LogInScreen from './LogIn.js'; 
import RegisterScreen from './Register.js'; 


const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    LogIn: LogInScreen, 
    Register: RegisterScreen, 
}, {
    initialRouteName: 'Home',
    headerMode: 'none', 
});

const App = createAppContainer(AppNavigator); 

export default App; 

/*
import React, { Component } from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'; 
import { createStackNavigator, createAppContainer } from '@react-navigation/native'; 
import Login from "./LogIn"; 





const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('./assets/speechPortrait.png')}
            style={styles.background}
        >
            <View>
                <Text
                    style={styles.title}
                >
                    BaseLine
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(Login, { name: 'Login' } ); 
                    }}
                >
                    <Text style={styles.login}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // onPress={}
                >
                    <Text style={styles.signup}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};
*/