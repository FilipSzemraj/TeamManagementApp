import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Cam({navigation}){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };
   
    useFocusEffect(
        useCallback(() => {
            setCameraKey(prevKey => prevKey+1);
            setType(CameraType.back);
            return () => {
            };
        }, [])
    );

    if(!permission){
        return <View><Text>Loading camera permission</Text></View>
    }
    
    if(!permission.granted){
        return (
            <View>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        );
    }

    async function takePicture() {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                const fileName = photo.uri.split('/').pop();
                const newPath = FileSystem.documentDirectory + fileName;
                await FileSystem.moveAsync({
                    from: photo.uri,
                    to: newPath
                })
                const photoId = new Date().getTime().toString();
                AsyncStorage.setItem(photoId, newPath);
            } catch (e) {
                console.error("Error taking picture:", e);
            }
           
            
        }
    }

    function toggleCameraType(){
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }
    return(
        <View style={styles.container}>
            <Camera key={cameraKey} style={styles.camera} type={type} ref={cameraRef} onCameraReady={onCameraReady}>
                <TouchableOpacity onPress={()=> navigation.navigate('SpecIndividual')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture} style={styles.buttonContainer2}>
                    <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },buttonContainer2: {
        flex: 1,
        justifyContent:'flex-end',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems:'center',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
  });
