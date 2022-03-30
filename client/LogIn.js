import React, { Component} from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native'; 
import { createStackNavigator, createAppContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export default class LogInScreen extends Component {

    state = {
        username: "", 
        password: "", 
    }

    handleUsername = (text) => {
        this.setState({ username: text } ); 
    }
    handlePassword = (text) => {
        this.setState({ password: text } ); 
    }
    storeData = async (username, password) => {
        try {
            await AsyncStorage.setItem('username', username);
        } catch (e) {
            console.log("Error saving data locally."); 
            console.log(e); 
            return false; 
        }

        try {
            await AsyncStorage.setItem('password', password); 
        } catch (e) {
            console.log("Error saving data locally.");
            console.log(e); 
            return false; 
        }

        return true; 

    }
    login = (username, password) => {
        if(username.length > 30 || username.length < 6 || password.length > 30 || password.length < 6){
            alert("Error. Invalid password."); 
            return; 
        }

        let success = this.storeData(username, password); 
        if (success === false){
            alert("Error storing login information. Please try again."); 
            return; 
        }
        this.props.navigation.navigate('UserPage'); 
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Log In
                        {"\n"}{"\n"}
                        Login flavor text here.
                        {"\n"}{"\n"}
                        Usernames and passwords can be between 6 and 30 characters long. 
                    </Text>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.usernameInput}
                        onChangeText={this.handleUsername}
                        placeholder="username"
                    />
                    <TextInput 
                        style={styles.passwordInput}
                        onChangeText={this.handlePassword}
                        placeholder="password"
                        secureTextEntry="true"
                    />
                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress={() => {
                            this.login(this.state.username, this.state.password);   
                        }}
                    >
                        <Text style = {styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    {/* test what's saved in username and password */}
                    <Text>Username: {this.state.username} {"\n"}Password: {this.state.password}</Text>
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
    },
    submitButton: {
        height: '10%', 
        width: '75%', 
        top: 80,
    },
    submitText: {
        fontFamily: 'Optima',
        backgroundColor: 'green',
        color: '#3499ad',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35, 
        overflow: 'hidden', 
    }
})