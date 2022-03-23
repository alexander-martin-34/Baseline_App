import React, { Component, useEffect } from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

export default class HomeScreen extends Component {
    
    render() {
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

// I don't understand how this styling works yet, this could be dramatically improved and anyone is welcome to have a try at it
// I basically just adjusted values until it looked okay
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