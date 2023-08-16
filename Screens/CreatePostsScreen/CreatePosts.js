import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Feather from '@expo/vector-icons/Feather';
import { TextInput } from "react-native-gesture-handler";

export const CreatePostsScreen = () => {
    const onPress = () => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    };

    return (
        <View style={{backgroundColor: "#FFFFFF", height: 724}}>
            <View style={styles.imageWrapper}>
                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={onPress}>
                        <Feather name="camera" style={{color: "#BDBDBD", justifyContent: 'center',}} size={24}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.photoText}>Upload a photo</Text>
            <View>
                <TextInput placeholder="Name..." style={styles.nameInput}></TextInput>
                <View style={styles.locationInput}>
                    <Feather name="map-pin" size={24} style={{color: "#BDBDBD", marginRight: 4}}/>
                    <TextInput placeholder="Location..." style={{fontSize: 16}}></TextInput>
                </View>
                <TouchableOpacity style={styles.publishButton}>
                     <Text style={{color: '#BDBDBD', textAlign: 'center', fontSize: 16}}>Publish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.trashWrapper}>
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
    },
    iconWrapper: {
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