import React, { Component } from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native'; 
import { createStackNavigator, createAppContainer } from "@react-navigation/native";

export default class RegisterScreen extends Component {

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Registration
                        {"\n"}{"\n"}
                        Registration flavor text here.
                        {"\n"}{"\n"}
                        Usernames and passwords can be between 6 and 15 characters long. 
                    </Text>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.usernameInput}
                        //onChangeText={}
                        placeholder="username"
                    />
                    <TextInput 
                        style={styles.passwordInput}
                        //onChangeText={}
                        placeholder="password"
                        secureTextEntry="true"
                    />
                    {/* test what's saved in username and password */}
                    <Text>Username: {this.username} {"\n"}Password: {this.password}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: { 
        height: '100%', 
        width: '100%',
        backgroundColor: '#1f262a',
    },
    header: {
        height: '40%', 
        width: '100%', 
        top: '0%', 
    }, 
    headerText: {
        height: '80%', 
        width: '90%',  
        marginTop: '20%', 
        marginLeft: '5%', 
        marginRight: '5%', 
        fontFamily: 'Optima',
        color: '#3499ad',
        textAlign: 'center',
        fontSize: 22, 
        overflow: 'hidden', 
    },
    footer: {
        height: '60%',
        width: '100%', 
        top: '0%', 
        alignItems: 'center', 
        // justifyContent: 'center', 
        // backgroundColor: 'red', 
    },
    usernameInput: {
        height: '10%', 
        width: '75%', 
        marginTop: '0%',
        backgroundColor: 'white', 
        textAlign: 'center', 
    },
    passwordInput: {
        height: '10%', 
        width: '75%', 
        backgroundColor: 'white',
        marginTop: '5%',
        textAlign: 'center', 
    }
})