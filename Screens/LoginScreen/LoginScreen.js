import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterButton from '../../Components/RegisterButton';
import { CustomisedInput } from '../../Components/CustomisedInput';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { login } from '../../redux/action';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';

const backgroundImage = require('../../Images/BackgroundPhoto.jpeg');

export const LoginScreen = ({ route }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigation = useNavigation();

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((re) => {
                console.log(re)
                setIsSignedIn(true);
            })
            .catch((err) => {
                console.log(err);
                if (
                    err.code === AuthErrorCodes.INVALID_PASSWORD ||
                    err.code === AuthErrorCodes.USER_DELETED ||
                    err.code === 'auth/invalid-login-credentials'
                ) {
                    alert("The email address or password is incorrect");
                    navigation.navigate('Login')
                } else {
                console.log(err.code);
                alert(err.code);
                }
            });
        console.log(`I'm in loginUser. Email: ${email}`)
        dispatch(login(email))
        navigation.navigate('Home',
           {}
        );
    } 

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} style={styles.keyContainer}>
                    <View style={{ ...styles.container }}>
                        <Text style={styles.title}>Log In</Text>
                        <CustomisedInput value={email} style={styles.input} placeholder="Email address" onChangeText={setEmail}></CustomisedInput>
                        <View>
                            <CustomisedInput
                                value={password}
                                secureTextEntry={passwordVisible}
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={setPassword}
                            /> 
                            <TouchableOpacity style={styles.eyeIcon} onPress={togglePassword}>
                                {passwordVisible ? (
                                    // Alternative with eye icon
                                    // <Entypo name='eye' size={20} color='black'/>  
                                    <Text style={styles.passwordToggle}>Show</Text>
                                    ) : (
                                    // <Entypo name='eye-with-line' size={20} color='black'/>
                                    <Text style={styles.passwordToggle}>Hide</Text>
                                )}
                            </TouchableOpacity>        
                        </View>
                        <RegisterButton title="Log in" style={styles.button} onPress={loginUser}></RegisterButton>
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
    backgroundImage: {
        position: 'absolute',
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        zIndex: 1,
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
    // eyeIcon: {
    //     color: '#1B4371',
    //     position: 'absolute',
    //     right: 16,
    //     top: 16,
    // },
    passwordToggle: {
        color: '#1B4371',
        fontSize: 16,
        position: 'absolute',
        top: -35,
        right: 16,
    }
})