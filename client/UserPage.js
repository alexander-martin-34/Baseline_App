import React, { Component} from 'react'; 
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Audio } from 'expo-av'; 
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default class UserPage extends Component {

    constructor(props){
        super(props); 
        this.state = {
            username: "",
            loaded: false, 
            recording: Audio.Recording, 
            player: Audio.Sound,
            isAllowedRecord: false,  
            recordingStatus: Audio.RecordingStatus, 
            uri: undefined, 
            isPlaying: false, 
        };
    }
    componentDidMount() {
        this.getData(); 
        this.askForPermissions(); 
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
    logOut = async () => {
        try {
            await AsyncStorage.removeItem("username"); 
            this.props.navigation.navigate('Home'); 
            return true; 
        }
        catch(e){
            console.log("Error when trying to log out.");
            console.log(e);
            return false; 
        }
    }
    askForPermissions = async () => {
        const response = await Audio.requestPermissionsAsync(); 
        this.setState({
            isAllowedRecord: response.status,
        })
    }
    startRecording = async () => {
        if(this.state.recordingStatus?.isRecording){
            return; 
        }
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true, 
            allowsRecordingIOS: true, 
        });

        const newRecording = new Audio.Recording(); 
        this.setState({
            recording: newRecording, 
        });
        await newRecording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY,
        );

        newRecording.setOnRecordingStatusUpdate((status: Audio.RecordingStatus) => 
            this.setState({
                recordingStatus: status,
            })
        );

        await newRecording.startAsync(); 
    }
    stopRecording = async () => {
        if(!this.state.recording){
            console.log("You are not recording"); 
            return; 
        } 

        try {
            await this.state.recording.stopAndUnloadAsync();
            this.setState({
                uri: this.state.recording.getURI(),
            })
            console.log("Recorded URI: " + this.state.uri); 
        }
        catch (e) {
            //
        }
    }
    playRecording = async () => {
        try {

            console.log("Loading sound..."); 
            const sound = new Audio.Sound();
            await sound.loadAsync(this.state.uri);

            console.log("Playing sound...");
            await sound.playAsync(); 
            console.log("Sound is playing..."); 
        }
        catch(e) {
            console.log("Error when playing sound");
            console.log(e); 
        }
        /*
        const sound = await Audio.Sound.createAsync(
            uri: this.state.uri, 
        );

        this.setState({
            player: sound, 
        });

        console.log("Playing sound"); 
        await sound.playAsync(); 
        */ 

    }
    /*
    playRecording = async() => {
        try {
            const sound = await Audio.Sound.createAsync({
                uri: this.state.uri
            }, {}, true);
            this.setState({
                player: sound, 
            });
            console.log("Playing sound..."); 
            await sound.playAsync(); 
        }
        catch(e) {
            console.log("Error when trying to play recording."); 
            console.log(e); 
        }
    }
    */
    

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
                            <Text style={styles.welcome}>Welcome back {this.state.username}!</Text>
                            <TouchableOpacity onPress={this.logOut} style={styles.logOutButton}><Text style={styles.logOutText}>Log out</Text></TouchableOpacity>
                        </View>
                        <View style = {styles.exercises}>
                            <Text>Some exercise information here.</Text>
                            <Text>Record Exercise</Text>
                            <Text>Can record: {this.state.recordingStatus?.canRecord ? "Yes" : "No"}</Text>
                            <Text>Is recording: {this.state.recordingStatus?.isRecording ? "Yes" : "No"}</Text>
                            <Text>Is done recording: {this.state.recordingStatus?.isDoneRecording ? "Yes" : "No"}</Text>
                            <Text>Recording time: {this.state.recordingStatus?.durationMillis / 1000} seconds</Text>
                            <TouchableOpacity onPress={this.startRecording} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Start Recording</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this.stopRecording} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Stop Recording</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this.playRecording} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Play Recording</Text></TouchableOpacity>
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
        backgroundColor: '#AE87D0',
    },
    info: {
        fontFamily: 'Optima',
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontFamily: 'Optima',
    },
    logOutButton: {
        width: '25%', 
        height: '15%',
        top: '10%',
        marginLeft: '5%',
        backgroundColor: '#1f262a',
        borderRadius: 10,
    },
    logOutText: {
        color: '#3499ad',
        fontWeight: 'bold',
        fontSize: 15, 
        textAlign: 'center',
        overflow: 'hidden', 
        fontFamily: 'Optima',
    },
    exercises: {
        marginTop: '0%', 
        marginLeft: '5%', 
    },
    exerciseButton: {
        width: '50%',
        height: '10%', 
        marginLeft: '25%',
        top: '0%',
        marginTop: '5%',
        backgroundColor: '#1f262a',
        borderRadius: 10,
    },
    exerciseButtonText: {
        marginTop: '4%',
        color: '#3499ad',
        fontWeight: 'bold',
        fontSize: 15, 
        textAlign: 'center',
        overflow: 'hidden', 
        fontFamily: 'Optima',
    }
})