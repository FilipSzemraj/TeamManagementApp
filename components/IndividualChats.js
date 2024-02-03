import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Avatar } from 'react-native-elements';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderForDrawer from './headerForDrawer'; 
const window = Dimensions.get('window');

export default function IndividualChats({ navigation }) {
    const [messages, setMessages] = useState([]);

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
        const unsubscribe = onSnapshot(
            query(collection(db, 'chats'), orderBy('createdAt', 'desc')),
            (snapshot) => {
                const firebaseMessages = snapshot.docs.map(doc => ({
                    _id: doc.id,
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate(),
                    user: doc.data().user,
                    image: doc.data().image,
                }));
                setMessages(firebaseMessages);
            });
    
        return () => unsubscribe();
    }, []);
    
    const onSend = useCallback(async (messages = []) => {
        try {
            const { _id, createdAt, text, user } = messages[0];
    
            const photoUri = await AsyncStorage.getItem('lastPhoto');
            let messagePayload = {
                _id, createdAt, text, user,
            };
    
            if (photoUri) {
                messagePayload.image = photoUri;
                await AsyncStorage.removeItem('lastPhoto');
            }
    
            await addDoc(collection(db, 'chats'), messagePayload);
            console.log("Wiadomość została dodana do Firebase");
        } catch (error) {
            console.error("Błąd dodawania wiadomości do Firebase:", error);
        }
    }, []);

    const renderActions = () => {
        return (
            <TouchableOpacity style={{ padding: 5, marginBottom: 10 }} onPress={() => navigation.navigate('Camera')}>
                <Icon name="camera" size={36} color="#000" />
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
            <HeaderForDrawer navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
               <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL,
                }}
                renderActions={renderActions}
                />
            </View>
        </View>
    );
}
