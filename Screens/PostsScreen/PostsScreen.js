import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export const PostsScreen = () => {
    return (
        <View>
            <View>
                <Image source={null} />
            </View>
            <View>
                <Text>Here will be login</Text>
                <Text>Here will be email</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default PostsScreen;
