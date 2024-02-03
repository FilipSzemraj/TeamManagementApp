import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import HeaderForDrawer from './headerForDrawer'; // Załóżmy, że masz taki komponent

export default function IndividualChats({ navigation }) {
    const [chats, setChats] = useState([]); // Stan na listę czatów

    useEffect(() => {
        const loadUserChats = async () => {
            const userRef = doc(db, 'users', auth.currentUser.uid); // Referencja do dokumentu użytkownika
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const chatIds = userData.chatList || []; // Pobieramy listę ID czatów z dokumentu użytkownika

                // Pobieranie szczegółów dla każdego czatu
                const chatDetailsPromises = chatIds.map(async (chatId) => {
                    const chatRef = doc(db, 'chats', chatId);
                    const chatSnap = await getDoc(chatRef);
                    if (chatSnap.exists()) {
                        return { id: chatSnap.id, ...chatSnap.data() };
                    } else {
                        return null; // W przypadku braku czatu, zwracamy null
                    }
                });

                const chatDetails = await Promise.all(chatDetailsPromises);
                setChats(chatDetails.filter(chat => chat !== null)); // Aktualizacja stanu, filtrowanie null
            } else {
                console.log("No such document!");
            }
        };

        loadUserChats();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
            <HeaderForDrawer navigation={navigation} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={chats}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                            onPress={() => navigation.navigate('SpecIndividual', { chatId: item.id, chatName: item.name })}
                        >
                            <Text style={{ fontWeight: 'bold' }}>{item.name || "Unnamed Chat"}</Text>
                            <Text style={{ marginLeft: 20 }}>{item.lastMessage || ""}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}
