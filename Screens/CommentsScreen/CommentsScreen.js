import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { TextInput } from "react-native-gesture-handler";

export const CommentsScreen = () => {
    const navigation = useNavigation();
    const { params: { image } } = useRoute();
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    // const [showComment, setShowComment] = useState(false);

    const postComment = () => {
        if (commentInput === "") {
            alert('Please write a comment')
        }
        setCommentInput('')
    }

    return (
        <View style={{marginTop: 32, alignItems: 'center'}}>
            <Image source={{ uri: image }} style={{ width: 343, height: 240, borderRadius: 8 }} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!</Text>
            </View>
            {/* rewrite in order to be able to post real comments */}
            {/* {commentInput &&(
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{commentInput}</Text>
                </View>)
            } */}
            <TextInput placeholder="Leave a comment..." style={styles.comment} onChangeText={(value) => setCommentInput(value)}></TextInput>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.iconWrapper} onPress={postComment}>
                    <Feather name='arrow-up' style={{color: '#FFFFFF'}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        width: 299,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        marginTop: 32,
        marginLeft: 16,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    text: {
        fontSize: 13,
    },
    comment: {
        position: 'relative',
        height: 50,
        marginTop: 31,
        paddingLeft: 16,
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: '#E8E8E8',
        color: '#212121',
        minWidth: 343,
        fontSize: 16,
        fontWeight: '500',
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 100,
    }, 
    iconWrapper: {
        position: 'absolute',
        top: -40,
        left: 120,
        width: 34,
        height: 34,
        backgroundColor: '#FF6C00',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CommentsScreen;