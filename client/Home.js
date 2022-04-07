import React, { Component, useEffect } from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default class HomeScreen extends Component {

    // log user out everytime they're redirected to home page
    // this will avoid any bugs that might occur if the app crashes
    logOut = async () => {
        try {
            let loggedIn = await AsyncStorage.getItem("username"); 
            if(loggedIn != null) {
                await AsyncStorage.removeItem("username"); 
                await AsyncStorage.removeItem("password"); 
            }
        }
        catch(e) {
            console.log("Error when trying to log out in home page."); 
            console.log(e); 
        }
    }
    
    render() {
        this.logOut();

        return (
            <ImageBackground
                source={require('./assets/speechPortrait.png')}
                style={styles.background}
            >
                <View style = {styles.page}>
                    <Text
                        style={styles.title}
                    >
                        BaseLine
                    </Text>

                    <TouchableOpacity
                        style = {styles.loginContainer}
                        onPress={() => {
                            this.props.navigation.navigate('LogIn');  
                        }}
                    >
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.registerContainer}
                        onPress={() => {
                            this.props.navigation.navigate('Register'); 
                        }}
                    >
                        <Text style={styles.register}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
   page: {
       justifyContent: 'center', 
       alignItems: 'center', 
   },
   background: {
       width: '100%', 
       height: '100%', 
   },
    title: {
        width: '100%', 
        // height: '25%', 
        top: '10%',
        backgroundColor: '#AE87D0', 
        fontFamily: 'Optima', 
        fontSize: 75, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: '#7851a9',
    },
    loginContainer: {
        width: '75%', 
        height: '25%',
        top: '90%', // top, right, left, bottom can be greater than 100% because it is relative positioning
        // backgroundColor: 'red', // for debugging purposes
    },
    login: {
        fontFamily: 'Optima',
        backgroundColor: '#1f262a',
        color: '#3499ad',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35, 
        overflow: 'hidden', 
    },
    registerContainer: {
        width: '75%', 
        height: '25%', 
        top: '80%',
        // backgroundColor: 'red', // for debugging purposes
    },
    register: {
        fontFamily: 'Optima',
        backgroundColor: '#1f262a',
        color: '#3499ad',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35, 
        overflow: 'hidden', 
    }
});