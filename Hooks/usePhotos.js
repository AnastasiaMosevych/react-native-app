import {useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export default usePhotos = () => {

    const requestPermission = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
            Alert.alert(
                'Device settings alert',
                'You need to allow media library permissions for this to work'
            );
        }
    }

    const selectAvatar = async (options) => {
        options = { mediaTypes: ImagePicker.MediaTypeOptions.Images, ...options };
        return await ImagePicker.launchImageLibraryAsync(options);
    }

    const selectImage = async (options) => {
        options = {mediaTypes: ImagePicker.MediaTypeOptions.Images, ...options };
        return await ImagePicker.launchImageLibraryAsync(options);
    }

    useEffect(() => {
        requestPermission();
    }, []);

    return {selectImage, selectAvatar};
};