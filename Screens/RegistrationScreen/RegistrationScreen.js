import React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View, Text, Image, ImageBackground, TouchableWithoutFeedback, TextInput, Button, Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { PlusCircle } from 'react-native-feather';
import RegisterButton from '../../Components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const window = Dimensions.get('window');
const backgroundImage = require('../../Images/BackgroundPhoto.jpeg');

export const RegistrationScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const onRegister = () => {
        console.log(`${login}, ${email}, ${password}`);
        setLogin('');
        setEmail('');
        setPassword('');
    } 

    return (
        <SafeAreaView style={{ flex : 1 }}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAwareScrollView style={styles.keyContainer} resetScrollToCoords={{ x: 0, y: 0 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ ...styles.container}}>
                    <View style={styles.avatarWrapper}>
                        <Image source={avatar ? { uri: avatar } : null} style={styles.avatar}></Image>
                        <View>
                        <PlusCircle stroke='#FF6C00' fill='#FFFFFF' width={25} height={25} style={{position: 'absolute', top: -40, right: -10}} />
                        </View>
                    </View>
                    <Text style={styles.title}>Registration</Text>
                    <TextInput value={login} style={styles.input} placeholder='Log in' onChangeText={setLogin}></TextInput>
                    <TextInput value={email} style={styles.input} placeholder='Email address' onChangeText={setEmail}></TextInput>
                    <TextInput value={password} secureTextEntry={true} style={styles.input}
                    placeholder="Password" onChangeText={setPassword}
                    />
                        <RegisterButton  onPress={onRegister} />
                        <Button title="Already have an account? Log in" style={styles.secondButton} onPress={() => navigation.navigate('Login')}></Button>
                    </View>
                    </TouchableWithoutFeedback>
                <View style={{ height: 80 }} />
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
            
    )
}

const styles = StyleSheet.create({
    keyContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 165,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 78,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'relative',
        display: 'flex',
    },
    avatarWrapper: {
        position: 'absolute',
        top: -60,
        left: window.width / 2 - 60,
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
  },
    avatar: { width: 120, height: 120 },
    title: {
        fontFamily: 'RobotoBold',
        marginTop: 92,
        marginBottom: 33,
        fontWeight: 500,
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: 0.3,
        textAlign: 'center',
        color: '#212121',
    },
    input: {
        width: 343,
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 16,
        marginBottom: 16,
    },
    
    secondButton: {
        color: '#1B4371',
        fontSize: 16,
    },
    backgroundImage: {
        position: 'absolute',
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
     button: {
        marginTop: 27,
        marginBottom: 16,
         backgroundColor: '#FF6C00',
        color: 'white',
        borderRadius: 50,
        padding: 16,
        fontSize: 16,
        height: 51,
        width: 343,
    },
    
})

export default RegistrationScreen;