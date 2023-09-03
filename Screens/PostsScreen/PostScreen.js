import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRoute, useNavigation } from "@react-navigation/native";

export const PostScreen = () => {
    const navigation = useNavigation();
    const { params: { image } } = useRoute();
    const { params: { locationInput } } = useRoute();
    const { params: { textInput } } = useRoute();
    const { params: { locationComponent } } = useRoute();
    
    const onCommentPress = () => {
        navigation.navigate('Comments', {
            image: image ,
        })
    }

    const onLocation = () => {
        navigation.navigate('Map', {
            locationComponent: locationComponent
        })
    }

    return (
        <View style={styles.container}>
            {image &&
                <Image source={{ uri: image }} style={{ width: 343, height: 240, borderRadius: 8 }} />
            }
            {textInput &&
                <Text style={styles.name}>{textInput}</Text>
            }   
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                {textInput && <TouchableOpacity style={{ marginTop: 8 }}>
                    <Feather name="message-circle" size={24} style={{ color: '#BDBDBD' }} onPress={onCommentPress} />
                </TouchableOpacity>
                }
                {image &&
                    <TouchableOpacity style={{ marginLeft: 49, flexDirection: 'row', alignItems: 'center' }} onPress={onLocation}>
                        <Feather name="map-pin" size={24} style={{ color: "#BDBDBD", marginRight: 4 }} />
                        <Text style={{ textDecorationLine: 'underline', fontSize: 16 }}>{locationInput}</Text>
                    </TouchableOpacity>
                }
                </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 32,
    },
    name: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 500,
    }
})

export default PostScreen;

