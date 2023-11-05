import React from 'react';
import useCamera from '../../Hooks/useCamera';
import usePhotos from '../../Hooks/usePhotos';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View, Text, Image, ImageBackground, TouchableWithoutFeedback, TouchableOpacity, Button, Keyboard, SafeAreaView } from "react-native";
import { CustomisedInput } from '../../Components/CustomisedInput';
import { PlusCircle } from 'react-native-feather';
import RegisterButton from '../../Components/RegisterButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, AuthErrorCodes, updateProfile } from 'firebase/auth';

const window = Dimensions.get('window');
const backgroundImage = require('../../Images/BackgroundPhoto.jpeg');

export const RegistrationScreen = ({ onCancel = () => { }, mode = 'both', navigation }) => {
    const camera = useCamera();
    const photos = usePhotos();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleAvatar = async () => {
        if (!avatar) {
            switch (mode) {
                case 'camera':
                    selectAvatar('camera')
                    break;
                case 'photos':
                    selectAvatar('photos');
                    break;
                case 'both':
                default:
                    Alert.alert(
                        'Please choose',
                        null,
                        [
                            { text: 'Photos', onPress: () => selectAvatar('photos') },
                            { text: 'Camera', onPress: () => selectAvatar('camera') },
                            { text: 'Cancel', style: 'cancel' }
                        ]
                    );
            }
        } else {
            Alert.alert('Remove', 'are you sure you want to remove this image?', [
                { text: 'Yes', onPress: () => setAvatar(null) },
                { text: 'No' },
            ]);
        }
    };

    const selectAvatar = async (pickerType) => {
        try {
            if (pickerType === 'camera') {
                const result = await camera.takePhoto({
                    allowEditing: true,
                    quality: 0.5
                })
                result.canceled ? onCancel() : setAvatar(result.assets[0].uri);
            } else {
                const result = await photos.selectAvatar({
                    quality: 0.5
                });
                result.canceled ? onCancel() : setAvatar(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Avatar error', 'Error reading image');
            console.log(error);
        }
    }

    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                if (userCredentials.user) {
                    updateProfile(auth.currentUser, {
                        displayName: login
                    }).then(() => {
                        navigation.navigate('Home', { login, avatar, email })
                        setLogin('');
                        setEmail('');
                        setPassword('');
                        setAvatar(null);
                    })
                }
            })
            .catch((error) => {
                console.log(error.message);
                if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
                    alert("The password is too weak");
                    navigation.navigate('Registration')
                }
                if (error.code === 'auth/email-already-in-use') {
                    alert("Email is already in use")
                    navigation.navigate('Registration')
                }
                if (error.code === 'auth/invalid-email') {
                    alert("Email invalid")
                    navigation.navigate('Registration')
                }
            });
        
    } 

    

    return (
        <SafeAreaView style={{ flex : 1 }}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAwareScrollView style={styles.keyContainer} resetScrollToCoords={{ x: 0, y: 0 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ ...styles.container}}>
                    <View style={styles.avatarWrapper}>
                        <Image source={avatar ? { uri: avatar } : null} style={styles.avatar}></Image>
                        <TouchableOpacity onPress={handleAvatar}>
                            {!avatar ?
                                <PlusCircle stroke='#FF6C00' fill='#FFFFFF' width={25} height={25} style={{ position: 'absolute', top: -40, right: -10 }} />
                                : 
                                <PlusCircle stroke='#E8E8E8' fill='#FFFFFF' width={25} height={25} style={{ border: 1, borderColor: '#BDBDBD', position: 'absolute', top: -40, right: -10, transform: [{ rotate: '-45deg' }] }} />      
                            }
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Registration</Text>
                    <CustomisedInput
                        value={login}
                        style={styles.input}
                        placeholder='Log in'
                        onChangeText={setLogin}
                     >
                    </CustomisedInput>
                    <CustomisedInput value={email} style={styles.input} placeholder='Email address' onChangeText={setEmail}></CustomisedInput>
                    <View>
                        <CustomisedInput
                            value={password}
                            secureTextEntry={passwordVisible}
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={setPassword}
                            
                        /> 
                        <TouchableOpacity onPress={togglePassword}>
                                    {passwordVisible ? (
                                        <Text style={styles.passwordToggle}>Show</Text>
                                    ) : (
                                        <Text style={styles.passwordToggle}>Hide</Text>
                                    )}
                        </TouchableOpacity>        
                    </View>
                    <RegisterButton  onPress={registerUser} />
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
        marginTop: 203,
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
    avatar: {
        width: 120, height: 120, borderRadius: 16,
    },
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
    passwordToggle: {
        color: '#1B4371',
        fontSize: 16,
        position: 'absolute',
        top: -55,
        right: 16,
    }
     
})

export default RegistrationScreen;