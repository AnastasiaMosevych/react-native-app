import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";


export const MapScreen = () => {
    const navigation = useNavigation();
    const { params: { locationComponent } } = useRoute();
    
    const markerObject = {
        latitude: locationComponent.lat,
        longitude: locationComponent.lng
    }

    // use commented code for a feature later
    // const { params: { coords } } = useRoute();

    return (
        <View>
            <MapView style={{width: '100%', height: '100%'}}>
                <Marker coordinate={markerObject}
                        pinColor='#ff8800' >
                </Marker>
            </MapView>
        </View>
    )
}

export default MapScreen;