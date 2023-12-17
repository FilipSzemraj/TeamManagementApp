import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, Button, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';

const ContinueButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.continueButton} onPress={onPress}>
            <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>


    );
};

export default function Map({ navigation }) {

    const [mapRegion, setMapRegion] = useState({
        latitude: 50.871731508006015,
        longitude: 20.631308086522893,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const userLocation = async() => {
        let{status} = await Location.requestForegroundPermissionsAsync();
        if(status != 'granted'){
            console.error('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync();
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log(location.coords.latitude, location.coords.longitude);
    }

    useEffect(() => {
        userLocation();
    }, [])

    return (
        <View style={styles.container}>
            <MapView style={styles.container}
                     region={mapRegion}>
                <Marker coordinate={mapRegion} title='Marker' />
            </MapView>
            <Button title='Get location' onPress={userLocation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});