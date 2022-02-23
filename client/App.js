import React from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'; 

export default function App() {

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
                    // onPress={}
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
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: 'Optima', 
        fontSize: 65, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: '#7851a9',
        marginTop: '66%',
        // backgroundColor: '#AE87D0',
    },
    login: {
        fontFamily: 'Optima',
        backgroundColor: '#1f262a',
        color: '#3499ad',
        width: '75%',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '11%',
        padding: '2%',
        fontSize: 27,
        marginTop: '50%',
        overflow: 'hidden', 
    },
    signup: {
        fontFamily: 'Optima',
        backgroundColor: '#1f262a',
        color: '#3499ad',
        width: '75%',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '11%',
        padding: '2%',
        fontSize: 27,
        marginTop: '10%',
        overflow: 'hidden', 
    }
});