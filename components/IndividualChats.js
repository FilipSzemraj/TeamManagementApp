import HeaderForDrawer from './headerForDrawer';
import {styles} from './style';
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { Pressable, Image } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../firebase';
import { Avatar } from 'react-native-elements';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const window = Dimensions.get('window');


export default function IndividualChats({navigation}) {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            )
        })

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        return () => {
            unsubscribe();
        };

    }, [navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'chats'), { _id, createdAt, text, user });
    }, []);

    const renderActions = () => {
        return (
            <TouchableOpacity
                style={{ padding: 5, marginBottom: 10 }}
                onPress={() => navigation.navigate('Camera', {
                    onPictureTaken: (photoUrl) => {
                        const message = {
                            _id: Date.now(),
                            text: '',
                            createdAt: new Date(),
                            user: {
                                _id: auth?.currentUser?.email,
                                name: auth?.currentUser?.displayName,
                                avatar: auth?.currentUser?.photoURL,
                            },
                            image: photoUrl,
                        };
                        onSend([message]);
                    }
                })}
            >
                <Icon name="camera" size={36} color="#000" />
            </TouchableOpacity>
        );
    };


    return (
    <View style={{ flex: 1 ,backgroundColor:'#F1F1F1'}}>
      <HeaderForDrawer navigation={navigation}/>
        <View style={{flex:1,justifyContent:'flex-start'}}>
            <View style={styles.wrapperChatPress}>
                <Pressable style={styles.containerXChat} onPress={()=> navigation.navigate('MainList')}><Image alt="exit_img"source={require('../assets/images/exitButton.png')}/></Pressable>
                <Pressable style={styles.containerPressChat} onPress={()=> navigation.navigate('IndividualChats')}><Text style={styles.textChatsLine}>Individual chats</Text></Pressable>
                <Pressable style={styles.containerPressChat} onPress={()=> navigation.navigate('GroupChats')}><Text style={styles.textChatsNoLine}>Group chats</Text></Pressable>
            </View>
            <Text style={{backgroundColor:'white',margin:2,fontSize:16,width:window.width*1, textAlign:'center'}}>Name of the current chat</Text>

            {/* CZATY */}

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

            {/* CZATY */}

        </View>
    </View>
  );
}