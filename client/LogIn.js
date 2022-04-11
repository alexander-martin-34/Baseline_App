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
    storeData = async (username) => {
        try {
            await AsyncStorage.setItem('username', username);
        } catch (e) {
            console.log("Error saving data locally."); 
            console.log(e); 
            return false; 
        }

        return true; 

    }
    login = (username, password) => {
        // keep this code. We want to check any obvious reason the password would be invalid before querying the backend. 
        // Don't want to make the user wait unnecessarily. 
        if(username.length > 30 || username.length < 6 || password.length > 30 || password.length < 6){
            alert("Error. Invalid username or password."); 
            return; 
        }

        // TO-DO: check backend database for user with matching username, confirm that inputted password matches user's password stored
        // in the database. If it does not match, alert the user with an error and return out of this function. 
        // If the password does match, continue on in this function. 



        // Keep code below. This is for easy accesss to username. 
        let success = this.storeData(username); 
        if (success === false){
            alert("Error storing username while logging in. Please try again."); 
            return; 
        }
        this.props.navigation.navigate('UserPage'); 
    }
    registerRedirect = () => {
        this.props.navigation.navigate('Register'); 
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Log In</Text>
                    <Text style={styles.headerText}>
                        Welcome! If you're a patient and you're already registered, sign in below. 
                        If you're new to the platform, hit the register button and follow the instructions there. 
                        If you're a therapist, please log in on our companion website to view your clients'
                        exercise data. 
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
                            this.login(this.state.username, this.state.password);   
                        }}
                    >
                        <Text style = {styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.registerButton}
                        onPress={() => {
                            this.registerRedirect();
                        }}
                    >
                        <Text style = {styles.registerButtonText}>Register</Text>
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
    registerButton: {
        height: '10%', 
        width: '75%', 
        top: '10%',
    },
    registerButtonText: {
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