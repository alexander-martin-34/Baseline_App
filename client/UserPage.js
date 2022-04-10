import React, { Component} from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; 
import { createStackNavigator, createAppContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// right now I'm trying to get the user page to load in the username from AsyncStorage.

export default class UserPage extends Component {

    constructor(props){
        super(props); 
        this.state = {
            username: "",
            loaded: false, 
        };
    }
    componentDidMount() {
        this.getData(); 
        this.setState({
            loaded: true, 
        });
    }
    getData = async () => {
        try {
            this.setState({
                username: await AsyncStorage.getItem("username"),
            });
            if(this.state.username == null || this.state.username == ""){
                alert("Error. User data not saved correctly in user dashboard."); 
                return false; 
            }
            return true; 
        }
        catch(e){
            alert("Error when trying to access user data."); 
            console.log("Error when trying to access user data in user dashboard."); 
            console.log(e); 
            return false; 
        }
    }


    render() { 

        if(this.state.loaded === false){
            return <Text>'Loading...';</Text>
        }
        else {
            return (
                <View style = {styles.container}>
                    <View style = {styles.header}>
                        <Text style = {styles.headerText}>User Dashboard</Text>
                    </View>
                    <View style = {styles.footer}>
                        <View style = {styles.info}>
                            <Text>Welcome back {this.state.username}!</Text>
                        </View>
                        <View style = {styles.exercises}>
                            <Text>Some exercise information here.</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: { 
        height: '100%', 
        width: '100%',
    },
    header: {
        height: '20%', 
        width: '100%', 
        top: '0%', 
        backgroundColor: '#1f262a',
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
        fontSize: 30, 
        overflow: 'hidden', 
    },
    footer: {
        height: '80%',
        width: '100%', 
        top: '0%',  
    },
    info: {
        fontFamily: 'Optima',
        color: '#3499ad',
    }
})