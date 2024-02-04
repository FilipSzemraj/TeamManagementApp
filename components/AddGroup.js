import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { Dimensions } from 'react-native';
import {styles} from './style';
import {Pressable} from 'native-base';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Keyboard } from 'react-native';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { Checkbox } from 'native-base';
const window = Dimensions.get('window');


export default function AddGroup({ navigation }) {
    const [service, setService] = React.useState("");
    const [showUpload, setShowUpload] = React.useState(false);
    const [friends, setFriends] = React.useState([]);
    const [groupName, setGroupName] = React.useState("");
    const [selectedFriends, setSelectedFriends] = React.useState([]);
    
    const fetchFriendDetails = async (friendUid) => {
    const friendRef = doc(db, 'users', friendUid);
    const friendSnap = await getDoc(friendRef);
    
    if (friendSnap.exists()) {
        return { uid: friendUid, displayName: friendSnap.data().displayName };
      } else {
        console.error("No such friend!");
        return { uid: friendUid, displayName: "Unknown" }; 
      }
    };
    
    const fetchAllFriends = async (friendUids) => {
      const friendDetailsPromises = friendUids.map(friendUid => fetchFriendDetails(friendUid));
      const friendDetails = await Promise.all(friendDetailsPromises);
      setFriends(friendDetails);
    };
    
    React.useEffect(() => {
      const userAuth = getAuth();
      const userId = userAuth.currentUser ? userAuth.currentUser.uid : null;
    
      if (userId) {
        const userRef = doc(db, 'users', userId);
        getDoc(userRef).then(userSnap => {
          if (userSnap.exists()) {
            const userData = userSnap.data();
            const friendUids = userData.friendList || [];
            fetchAllFriends(friendUids);
          } else {
            console.log("No such user document!");
          }
        });
      }
    }, []);

  const handleSelectFriend = (uid) => {
    setSelectedFriends(prevSelected => {
      if (prevSelected.includes(uid)) {
        return prevSelected.filter(id => id !== uid);
      } else {
        return [...prevSelected, uid];
      }
    });
  };
 
  const createGroup = async () => {
    if (selectedFriends.length === 0) {
      Alert.alert("Please select friends to add to the group");
      return;
    }
  
    try {
    const userAuth = getAuth();
    const userId = userAuth.currentUser ? userAuth.currentUser.uid : null;

    if (!userId) {
      console.error("No authenticated user found");
      return;
    }

    selectedFriends.push(userId);
    
      const groupRef = collection(db, 'groups');
      await addDoc(groupRef, {
        name: groupName,
        members: selectedFriends.reduce((acc, uid) => ({ ...acc, [uid]: true }), {}),
        photoUri: userAuth.currentUser.photoURL
      });
  
      Alert.alert("Group created successfully!");
      navigation.goBack();
    } catch (error) {
      console.error('Error creating group', error);
      Alert.alert("Error creating group");
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <HeaderForDrawer navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#F1F1F1' }}
      >
        <View style={styles.containerInputsAdd}>
          <Text style={styles.textAddFriend}>Add new group</Text>
          <View style={styles.containerInputAddFriend}>
            <TextInput
              style={styles.textNameFriend}
              placeholder='Enter group name'
              onChangeText={setGroupName}
              value={groupName}
            />
          </View>
          <View style={{marginTop:window.height*0.02,width: window.width*0.8,padding:10, borderRadius:10, backgroundColor:'white'}}>
            {friends.map((friend, index) => (
              <Checkbox
                key={index}
                isChecked={selectedFriends.includes(friend.uid)}
                onChange={() => handleSelectFriend(friend.uid)}
                value={friend.uid}>
                <Text style={{padding: 5}}>{friend.displayName}</Text>
              </Checkbox>
            ))}
          </View>
        </View>
        <View style={styles.containerAddButtons}>
          <Pressable style={styles.buttonsAddUser} onPress={() => navigation.goBack()}>
            <Text style={styles.textButtonsAdd}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.buttonsAddUser} onPress={createGroup}>
            <Text style={styles.textButtonsAdd}>Enter</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}