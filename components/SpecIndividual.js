import React, { useEffect, useCallback, useState, useLayoutEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import {Composer, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db, storage } from '../firebase'; // Załóż, że `storage` jest już zdefiniowane w pliku firebase.js
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderForDrawer from './headerForDrawer';
import {useFocusEffect} from "@react-navigation/native";
const window = Dimensions.get('window');



const SpecIndividual = ({ navigation, route }) => {
    const { chatId } = route.params;
    const [messages, setMessages] = useState([]);
    const [chatTitle, setChatTitle] = useState('');
    {/*const [pictureStyle, setPictureStyle] = useState(false);
    const [photoUri, setLastPhotoUri] = useState(null);*/}



    useFocusEffect(
        useCallback(() => {
            const fetchLastPhoto = async () => {
                const lastPhotoUri = String(await AsyncStorage.getItem('lastPhoto'));
                if (lastPhotoUri) {
                    console.log("last photo z onPictureTaken: ", lastPhotoUri);
                    {/*setLastPhotoUri(lastPhotoUri);
                    setPictureStyle(true);*/}
                }
            };

            fetchLastPhoto().catch(console.error);
        }, [])
    );


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                </View>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const q = query(collection(db, `chats/${chatId}/messages`), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const firebaseMessages = snapshot.docs.map(doc => ({
                _id: doc.id,
                text: doc.data().text,
                createdAt: doc.data().createdAt.toDate(),
                user: doc.data().user,
                image: doc.data().image,
                location: doc.data().location,
            }));
            setMessages(firebaseMessages);
        });
        return () => unsubscribe();

    }, [chatId]);


    useEffect(()=>{
        const fetchChatDetails = async () => {
            const chatRef = doc(db, 'chats', chatId);
            const chatSnap = await getDoc(chatRef);

            if (chatSnap.exists()) {
                const chatData = chatSnap.data();

                setChatTitle(chatData.name);

            }else {
                console.log("No such document!");
                setChatTitle("Nieznany Czat");
            }
        };

        fetchChatDetails().then(() => {
            console.log('Chat details fetched successfully');
        }).catch(error => {
            console.error('Error fetching chat details:', error);
        });
    }, [chatId, navigation]);

    const onSend = useCallback(async (messages = []) => {
        let { _id, createdAt, text, user, location } = messages[0];


        let messageData = { _id, createdAt, text, user };

        const photoUri = await AsyncStorage.getItem('lastPhoto');
        console.log("SPEC photo uri", photoUri);
        if (photoUri) {
            messageData.image = photoUri;
            await AsyncStorage.removeItem('lastPhoto');
            {/*setPictureStyle(false);
            setLastPhotoUri("");*/}

        }
        if (location) {
            messageData.location = location;
        }

        await addDoc(collection(db, `chats/${chatId}/messages`), messageData);

        const chatRef = doc(db, 'chats', chatId);
        await updateDoc(chatRef, {
            lastMessage: text,
            lastMessageCreatedAt: createdAt,
        });
    }, [chatId]);

    const renderActions = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
            <TouchableOpacity
                style={{ marginRight: 5, padding: 2.5 }}
                onPress={() => navigation.navigate('Camera')}>
                    <Icon name="camera" size={36} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginRight: 5, padding: 2.5 }}
                onPress={() => navigation.navigate('Map', { /* Logika wyboru lokalizacji */ })}>
                    <Icon name="map-marker-alt" size={36} color="#000" />
            </TouchableOpacity>
            {/* {pictureStyle && photoUri && (
                <Image
                    source={{ uri: photoUri }}
                    style={{ width: 40, height: 40, marginHorizontal: 4 }}
                />
            )} */}

        </View>
    );


    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
            <HeaderForDrawer navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={{ paddingTop: 5, paddingBottom: 5, backgroundColor: 'gray', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{chatTitle}</Text>
                </View>
                <GiftedChat
                    messages={messages}
                    //photoStyle={pictureStyle}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: auth?.currentUser?.email,
                        name: auth?.currentUser?.displayName,
                        avatar: auth?.currentUser?.photoURL,
                    }}
                    renderActions={renderActions}
                    renderComposer={(props) => {
                        return (
                            <Composer
                                {...props}
                                textInputStyle={{
                                    color: 'black',
                                    backgroundColor: '#F4F4F4',
                                    borderRadius: 15,
                                    padding: 10,
                                    margin:10,
                                    marginBottom:5,
                                    marginTop:5,
                                }}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default SpecIndividual;