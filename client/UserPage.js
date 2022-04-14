import React, { Component} from 'react'; 
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Audio } from 'expo-av'; 
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB, requestPermissionsAsync } from 'expo-av/build/Audio';

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
            exerciseSelection: [
                "Try practicing the following phrase: \"He had a sore throat so I gave him my bottle of water and told him to keep it.\"", 
                "Try practicing the following phrase: \"The church was white and brown and looked very old.\"", 
                "Try practicing the following phrase: \"The dinner is so delicious I can't stop eating.\"",
                "Try practicing the following phrase: \"I was so thirsty I couldn't wait to get a drink of water.\"",
                "Select a tile on the board to receive your first exercise!",
            ],
            exerciseID: 0, 
            gameBoard: ["1", "2", "3", "4", "5", "6", "7", "8"],
            curtains: [null, null, null, null, null, null, null, null], 
            newGame: true, 
        };
    }
    componentDidMount() {
        this.getData(); 
        this.initializeBoard(); 
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
            await Audio.setAudioModeAsync({ 
            allowsRecordingIOS: false, 
            });
            console.log("Recorded URI: " + this.state.uri); 
            
            let temp = this.state.gameBoard; 
            for(let i = 0; i < this.state.gameBoard.length; i++){
                if(this.state.gameBoard[i] == "REC"){
                    temp[i] = "?"; 
                    this.setState({
                        gameBoard: temp,
                    })
                }
            }
        }
        catch (e) {
            //
        }
    }
    playRecording = async () => {
        try {

            console.log("Loading sound..."); 
            const sound = new Audio.Sound();
            await sound.loadAsync({ uri: this.state.uri });

            console.log("Playing sound...");
            await sound.playAsync(); 
            console.log("Sound is playing..."); 
        }
        catch(e) {
            console.log("Error when playing sound");
            console.log(e); 
        }
    }
    gameButton = (button) => {
        if(this.state.newGame == true){
            this.setState({
                newGame: false, 
            });
        }

        if(this.state.gameBoard[button] == ":)" || this.state.gameBoard[button] == "?"){
            return; 
        }

        let count = 0; 
        for(let i = 0; i < this.state.gameBoard.length; i++){
            if(this.state.gameBoard[i] == "?"){
                if(this.state.curtains[i] == this.state.curtains[button]){
                    let count = 0; 
                    for(let j = 0; j < 8; j++){
                        if(this.state.gameBoard[j] == ":)"){
                            count++; 
                            if(count == 6){
                                let temp = this.state.gameBoard; 
                                for(let k = 0; k < 8; k++){
                                    temp[k] = "WIN"; 
                                }
                                this.setState({
                                    gameBoard: temp, 
                                });
                                return; 
                            }
                        }
                    }
                    let temp = this.state.gameBoard; 
                    temp[i] = ":)";
                    temp[button] = ":)";
                    this.setState({
                        gameBoard: temp, 
                    });
                    return; 
                }
                let temp = this.state.gameBoard; 
                temp[i] = i + 1;
                temp[button] = button + 1; 
                this.setState({
                    gameBoard: temp, 
                });
                return; 
            }
        }

        let temp = this.state.gameBoard; 
        temp[button] = "REC"; 
        this.setState({
            gameBoard: temp,  
            exerciseID: button, 
        });

    }
    initializeBoard = () => {
        let rand; 
        let used = new Set(); 
        let used2 = new Set(); 

        for(let i = 0; i < this.state.curtains.length; i){
            rand = Math.floor(Math.random() * 4); 

            if(used2.has(rand)){
                continue; 
            }

            if(used.has(rand)){
                let temp = this.state.curtains; 
                temp[i] = this.state.exerciseSelection[rand]; 
                this.setState({
                    curtains: temp, 
                });
                used2.add(rand); 
                i++; 
                continue; 
            }

            let temp = this.state.curtains; 
            temp[i] = this.state.exerciseSelection[rand]; 
            this.setState({
                curtains: temp, 
            });
            used.add(rand); 
            i++; 
            continue; 
        }
    }
    resetGame = () => {
        let temp = this.state.gameBoard; 
        for(let i = 0; i < this.state.gameBoard.length; i++){
            temp[i] = i + 1; 
        }
        this.setState({
            gameBoard: temp, 
            newGame: true, 
        });
    }
    

    render() { 

        if(this.state.loaded === false){
            return <Text>Loading...</Text>
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
                            <Text style = {styles.gameTitle}>Matching Game!</Text>
                            <View style = {styles.exerciseList}>
                                <View style = {styles.gameBoard}>
                                    <TouchableOpacity onPress={() => this.gameButton(0)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[0]}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gameButton(1)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[1]}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gameButton(2)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[2]}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gameButton(3)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[3]}</Text></TouchableOpacity>
                                </View>
                                <View style = {styles.gameBoard}>
                                    <TouchableOpacity onPress={() => this.gameButton(4)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[4]}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gameButton(5)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[5]}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gameButton(6)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[6]}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gameButton(7)} style={styles.gameButton}><Text style={styles.gameButtonText}>{this.state.gameBoard[7]}</Text></TouchableOpacity>
                                </View>
                                <Text>{this.state.newGame ? "Select a tile on the board to receive your first exercise!" : this.state.curtains[this.state.exerciseID]}</Text>
                            </View>
                            {/*<Text>Can record: {this.state.recordingStatus?.canRecord ? "Yes" : "No"}</Text>*/}
                            <Text>Is recording: {this.state.recordingStatus?.isRecording ? "Yes" : "No"}</Text>
                            <Text>Is done recording: {this.state.recordingStatus?.isDoneRecording ? "Yes" : "No"}</Text>
                            <Text>Recording time: {this.state.recordingStatus?.durationMillis / 1000} seconds</Text>
                            <TouchableOpacity onPress={this.startRecording} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Start Recording</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this.stopRecording} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Stop Recording</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this.playRecording} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Play Recording</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.resetGame()} style={styles.exerciseButton}><Text style={styles.exerciseButtonText}>Reset Game</Text></TouchableOpacity>
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
        width: '30%', 
        height: '15%',
        top: '10%',
        marginLeft: '35%',
        marginRight: '20%',
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
        marginRight: '5%',
    },
    gameTitle: {
        fontWeight: 'bold',
        fontSize: 25, 
        textAlign: 'center',
        overflow: 'hidden', 
        fontFamily: 'Optima',
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
    },
    gameBoard: {
        flexWrap: "wrap", 
        flexDirection: "row", 
        justifyContent: 'center',
    },
    gameButton: {
        width: '10%',
        height: '50%', 
        marginTop: '5%',
        marginBottom: '2%',
        marginLeft: '5%',
        marginRight: '5%',
        top: '0%',
        backgroundColor: '#1f262a',
        borderRadius: 10,
    },
    gameButtonText: {
        marginTop: '4%',
        color: '#3499ad',
        fontWeight: 'bold',
        fontSize: 15, 
        textAlign: 'center',
        overflow: 'hidden', 
        fontFamily: 'Optima',
    },
})