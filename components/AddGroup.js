import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { Dimensions } from 'react-native';
import {styles} from './style';
import {Pressable} from 'native-base';
import { TextInput } from 'react-native';
import { Select, CheckIcon, Image } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const window = Dimensions.get('window');


export default function AddGroup({ navigation }) {
    const [service, setService] = React.useState("");
    const [showUpload, setShowUpload] = React.useState(false);
    const [friends, setFriends] = React.useState([]);

    const fetchFriends = async () => {
        try {
          const friendsJson = await AsyncStorage.getItem('friends');
          const friends = friendsJson != null ? JSON.parse(friendsJson) : [];
          console.log(friends);
          return friends;
        } catch (error) {
          console.error('Error fetching friends from AsyncStorage', error);
          return [];
        }
    };
    
    
    React.useEffect(() => {
        const loadFriends = async () => {
          const fetchedFriends = await fetchFriends();
          setFriends(fetchedFriends);
        };
      
        loadFriends();
    }, []);
      

    const toggleUpload = () => {
        Keyboard.dismiss();
        setShowUpload(!showUpload); 
      };
  return (
    <View style={{ flex: 1 }}>
      <HeaderForDrawer navigation={navigation}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#F1F1F1' }}
      >
            <View style={styles.containerInputsAdd}>
            <Text style={styles.textAddFriend}>Add new group</Text>
                <View style={styles.containerInputAddFriend}>
                    <TextInput style={styles.textNameFriend} placeholder='Enter group name'/>
                </View>
                <View style={styles.containerInputAddFriend}>
                    <TextInput style={styles.textNameFriend} placeholder='Enter group location'/>
                </View>
                <View style={{marginTop:window.height*0.02 ,borderRadius:10, backgroundColor:'white'}}>
                <Select
                    selectedValue={service}
                    minWidth="200"
                    width={window.width*0.8}
                    accessibilityLabel="Choose Members"
                    placeholder="Choose Members"
                    _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon style={{backgroundColor:'white'}} size="5" />
                    }}
                    mt={1}
                    onValueChange={itemValue => setService(itemValue)}
                >
                    {friends.map((friend, index) => (
                    <Select.Item style={{color:"black", backgroundColor:'white'}} key={index} label={friend.name} value={friend.name} />
                    ))}
                </Select>
                </View>

            </View>
            <View style={styles.uploadContainer}>
                <Pressable onPress={toggleUpload}>
                    <Icon name="file-upload" size={40} color="black" />
                </Pressable>
                <Text style={styles.text}>Choose image for your team</Text>
            </View>
            <View style={styles.containerAddButtons}>
                <Pressable style={styles.buttonsAddUser} onPress={()=> navigation.navigate('MainList')}>
                    <Text style={styles.textButtonsAdd}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.buttonsAddUser} onPress={()=> navigation.navigate('MainList')}>
                    <Text style={styles.textButtonsAdd}>Enter</Text>
                </Pressable>
            </View>
      </KeyboardAvoidingView>
    </View>
  );
}