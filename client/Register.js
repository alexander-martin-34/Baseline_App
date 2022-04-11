import React, { Component } from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native'; 
import { createStackNavigator, createAppContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default class RegisterScreen extends Component {

    state = {
        username: "", 
        password: "", 
    }

    handleUsername = (text) => {
        this.setState({ username: text }); 
    }
    handlePassword = (text) => {
        this.setState({ password: text }); 
    }
    // TO-DO: check backend database for username
    // if username does exist in database, 
    // display an alert and return false
    // if username doesn't exist, call storeUser with username and password 
    // and return true
    // below is temp code for testing. You can edit the whole function. 
    checkUsername = async (username) => {
        try {
            let answer = await AsyncStorage.getItem("username"); 
            if(answer != null){
                alert("Username already exists."); 
                return false; 
            }

            this.storeUser(username, this.state.password); 
            return true; 
        }
        catch(e){
            console.log("Error while checking if username already exists."); 
            console.log(e); 
            return false; 
        }
    }
    storeUser = async (username, password) => {
        try {
            // TO-DO: call backend function to save username/password into database
            // if storing data in backend fails, return false
            // if storing data in backend suceeds, then proceed



            // keep all code below
            await AsyncStorage.setItem("username", username);
            await AsyncStorage.setItem("password", password); 

            return true; 
        }
        catch(e) {
            console.log("Error in storing user info to backend."); 
            console.log(e); 
            return false; 
        }
    }
    register = (username, password) => {
        if(username.length > 30 || username.length < 6 || password.length > 30 || password.length < 6){
            alert("Error. Invalid password."); 
            return; 
        }

        let flag = this.checkUsername(username); 
        if(flag == false){
            return; 
        }
        flag = this.storeUser(username, password); 
        if(flag == false){
            return; 
        }

        this.props.navigation.navigate('UserPage'); 
    }
    loginRedirect = () => {
        this.props.navigation.navigate('LogIn'); 
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Register</Text>
                    <Text style={styles.headerText}>
                        Welcome! If you're a patient who is new to this service, please register below. 
                        If you've already registered in the past, please press the log in button to be 
                        redirected to our log in page. If you're a therapist, please register on our 
                        companion website to view your clients' exercise data. 
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
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress={() => {
                            this.register(this.state.username, this.state.password);   
                        }}
                    >
                        <Text style = {styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress={() => {
                            this.loginRedirect(); 
                        }}
                    >
                        <Text style = {styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
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
    headerTitle: {
        fontFamily: 'Optima',
        fontSize: 30,
        marginLeft: '5%',
        marginRight: '5%', 
        textAlign: 'center',
        overflow: 'hidden',
        fontWeight: 'bold', 
        color: '#3499ad',
        top: '20%',
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
        fontSize: 18, 
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
        marginTop: '10%',
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
        top: '10%',
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
    },
    loginButton: {
        height: '10%', 
        width: '75%', 
        top: '10%',
    },
    loginButtonText: {
        fontFamily: 'Optima',
        backgroundColor: 'green',
        color: '#3499ad',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35, 
        overflow: 'hidden', 
    },
})