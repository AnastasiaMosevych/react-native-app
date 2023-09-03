import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import PostScreen from "./PostScreen";

export const PostsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { login, email } = route.params;
    
    return (
        <View style={{marginTop: 32, marginBottom: 32}}>
            <View>
                <Image source={null} style={{width: 60, height: 60, borderRadius: 16}} />
            </View>
            <View style={{marginLeft: 16}}>
                <Text style={styles.login}>{login}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <PostScreen/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 343,
        height: 240,
        borderRadius: 8,

    },
    login: {
        marginLeft: 8,
        color: '#212121',
        fontSize: 13,
        fontFamily: 'RobotoBold',
        fontWeight: 700,
    },
    email: {
        marginLeft: 8,
        color: 'rgba(33, 33, 33, 0.80)',
        fontSize: 11,
    },

    
})

export default PostsScreen;
