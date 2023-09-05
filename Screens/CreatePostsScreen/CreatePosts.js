import React, {useState} from "react";
import { Alert, View, Text, Image, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import useCamera from '../../Hooks/useCamera';
import usePhotos from '../../Hooks/usePhotos';
// import * as Location from "expo-location";
import Geocoder from 'react-native-geocoding';
import { useNavigation } from "@react-navigation/native";
const { API_KEY } = process.env;

export const CreatePostsScreen = ({ onCancel = () => { }, mode = 'both', route }) => {
    const navigation = useNavigation();
    const camera = useCamera();
    const photos = usePhotos();
    const [image, setImage] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    
    const handlePress = async () => {
        if (!image) {
            switch (mode) {
                case 'camera':
                    selectImage('camera')
                    break;
                case 'photos':
                    selectImage('photos');
                    break;
                case 'both':
                default:
                    Alert.alert(
                        'Please choose',
                        null,
                        [
                            { text: 'Photos', onPress: () => selectImage('photos') },
                            { text: 'Camera', onPress: () => selectImage('camera') },
                            { text: 'Cancel', style: 'cancel' }
                        ]
                    );
            }

        } else {
            Alert.alert('Remove', 'are you sure you want to remove this image?', [
                { text: 'Yes', onPress: () => setImage(null)},
                { text: 'No'},
            ]);
        }
    };

    const selectImage = async (pickerType) => {
        try {
            if (pickerType === 'camera') {
                const result = await camera.takePhoto({
                    allowsEditing: true,
                    quality: 0.5
                })
                result.canceled ? onCancel() : setImage(result.assets[0].uri);

            } else {
                const result = await photos.selectImage({
                    quality: 0.5
                });
                result.canceled ? onCancel() : setImage(result.assets[0].uri);
            }

        } catch (error) {
            Alert.alert('Image error', 'Error reading image');
            console.log(error);
        }
    };

    const onPublish = () => {
         if (!textInput.trim()) {
             alert('Please Enter Name')
        }
        
        if (!locationInput.trim()) {
            alert('Please Enter Your Location');
        }
        
        if (locationInput && textInput) {
            // add API key
            Geocoder.init(API_KEY);
            Geocoder.from(locationInput)
                .then(json => {
                    const locationComponent = json.results[0].geometry.location;
                    alert('Successfully created post');
                    navigation.navigate('Posts',
                        { image: image, locationInput: locationInput, textInput: textInput, locationComponent: locationComponent }
                    );
                })
                .catch(error => console.log(error))
                
                // use commented code later for another feature
                // let { status } = await Location.requestForegroundPermissionsAsync();
                // if (status !== "granted") {
                //     alert("Permission to access location was denied");
                // }

                // let identifiedLocation = await Location.getCurrentPositionAsync({});
                // const coords = {
                //     latitude: identifiedLocation.coords.latitude,
                //     longitude: identifiedLocation.coords.longitude,
                // };
                // setLocation(coords);
        }
    }

    const onDelete = () => {
        setImage(null);
        setTextInput('');
        setLocationInput('');
    }

    return (
        <View style={{backgroundColor: "#FFFFFF"}}>
            <View style={styles.imageWrapper}>
                <View style={styles.iconWrapper}>
                    <TouchableWithoutFeedback onPress={handlePress}>
                    {!image ? (
                        <Feather name="camera" style={{ justifyContent: 'center'}} size={24} color={'#BDBDBD'} />
                        ) : (
                        <Image source={{ uri: image }} style={{width: 343, height: 240, borderRadius: 8}} />
                    )}
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {!image ? (
                <Text style={styles.photoText}>Upload a photo</Text>
            ) : (
                <Text style={styles.photoText}>Edit photo</Text>  
            )}
            <View>
                <TextInput placeholder="Name..." style={styles.nameInput}  onChangeText={
                (value) => setTextInput(value)}></TextInput>
                <View style={styles.locationInput}>
                    <Feather name="map-pin" size={24} style={{ color: "#BDBDBD", marginRight: 4 }} />
                    <TextInput placeholder="Location..." style={{fontSize: 16}} onChangeText={(value) => setLocationInput(value)}></TextInput>
                </View>
                {locationInput ? (
                    <TouchableOpacity style={{
                        width: 343,
                        height: 51,
                        backgroundColor: '#FF6C00',
                        borderRadius: 100,
                        marginTop: 32,
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }} onPress={onPublish}>
                        <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 16}}>Publish</Text>
                    </TouchableOpacity>): (
                        <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
                            <Text style={{color: '#BDBDBD', textAlign: 'center', fontSize: 16}}>Publish</Text>
                        </TouchableOpacity>
                    )}
                <TouchableOpacity style={styles.trashWrapper} onPress={onDelete}>
                    <Feather name="trash-2" size={24} style={styles.trashIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        marginTop: 32,
        width: 343,
        height: 230,
        backgroundColor: '#F6F6F6',
        alignSelf: "center",
        justifyItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    iconWrapper: {
        position: 'absolute',
        top: 90,
        width: 60,
        height: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
    },
    photoText: {
        color: '#BDBDBD',
        fontSize: 16,
        marginTop: 8,
        marginLeft: 20,
    },
    nameInput: {
        width: 343,
        height: 50,
        fontSize: 16,
        marginLeft: 20,
        marginTop: 48,
        borderBottomColor: '#E8E8E8',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        paddingBottom: 15, 
    },
    locationInput: {
        width: 343,
        height: 50,
        marginTop: 32,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E8E8E8',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        paddingBottom: 15,  
    },
    publishButton: {
        width: 343,
        height: 51,
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        marginTop: 32,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    trashWrapper: {
        width: 70,
        height: 40,
        marginTop: 120,
        marginBottom: 22,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    trashIcon: {
        color: '#BDBDBD',
        alignSelf: 'center',
    },
});

export default CreatePostsScreen;