import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterButton from '../../Components/Button';

const backgroundImage = require('../../Images/BackgroundPhoto.jpeg');

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        console.log(`${email}, ${password}`);
        setEmail('');
        setPassword('');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} style={styles.keyContainer}>
                    <View style={{ ...styles.container }}>
                        <Text style={styles.title}>Log In</Text>
                        <TextInput value={email} style={styles.input} placeholder="Email address" onChangeText={setEmail}></TextInput>
                        <TextInput value={password} style={styles.input} placeholder='Password' onChangeText={setPassword}></TextInput>
                        <RegisterButton title="Log in" style={styles.button} onPress={onLogin}></RegisterButton>
                        <Button title="Don't have an account? Register" style={styles.secondButton} onPress={() => navigation.navigate('Registration')}></Button>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 279,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 144,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'relative',
        display: 'flex',
        gap: 16,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'RobotoBold',
        marginBottom: 17,
        fontWeight: 500,
        fontSize: 30,
        textAlign: 'center',
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
    },
    button: {
        backgroundColor: '#FF6C00',
        color: '#FFFFFF',
        borderRadius: 100,
        padding: 16,
        fontSize: 16,
        height: 50,
        width: 343,
    },
    secondButton: {
        color: '#1B4371',
        fontSize: 16,
    },
    keyContainer: {
        flex: 1,
    },
})