import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Text, Image, Dimensions, Button, TouchableOpacity, TextInput} from 'react-native';
import * as Location from 'expo-location';
import colors from '../assets/colors/colors'

const window = Dimensions.get('window');

const SearchBar = ({ onSearchPress }) => {
    return (
        <View style={styles.containerSearch}>
            <TextInput
                style={styles.input}
                placeholder="Search"
            />
            <TouchableOpacity onPress={onSearchPress}>
                <Image
                    style={styles.searchIcon}
                    source={require('../assets/images/searchLoop.png')} // Replace with the actual path to your search icon
                />
            </TouchableOpacity>
        </View>
    );
};

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Text style={styles.addText}>Continue</Text>
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

        <View style={styles.window}>
            <View style={styles.header}>

            </View>
            <View style={styles.container}>
                <SearchBar/>
                <MapView style={styles.container}
                         region={mapRegion}>
                    <Marker coordinate={mapRegion} title='Marker' />
                </MapView>
                <AddButton/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    window: {
        flex:1,
    },
    header: {
        flex:25,
        backgroundColor: colors.mainGreen,
    },
    container: {
        flex: 975,
    },
    map: {

    },
    containerSearch: {
        zIndex:2,
        position:'absolute',
        left:window.width*0.15,
        top:window.height*0.1,
        width:window.width*0.7,
        height:window.height*0.08,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        flex: 1,
        marginRight: 10,
        fontSize: window.height*0.02,
        color: '#000000',
    },
    searchIcon: {
        alignItems:'center',
        justifyContent:'center',
        resizeMode:'stretch',
        width: window.height*0.03,
        height: window.height*0.03,
    },
    addButton: {
        zIndex:2,
        position:'absolute',
        left:window.width*0.057692,
        bottom:window.height*0.106,
        backgroundColor: '#E12828',
        borderRadius: window.width*0.0512,
        width: window.width*0.8846,
        height: window.height*0.064,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    addText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});