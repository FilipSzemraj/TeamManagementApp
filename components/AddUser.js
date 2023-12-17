import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { Dimensions } from 'react-native';
import {styles} from './style';
import axios from 'axios';
import {Pressable} from 'native-base';
const window = Dimensions.get('window');


export default function AddUser({ navigation }) {

  return (
    <View style={{ flex: 1 }}>
      <HeaderForDrawer navigation={navigation}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#F1F1F1' }}
      >
        <View style={styles.containerInputsAdd}>
            <Text style={styles.textAddFriend}>Add new friend</Text>
            <View style={styles.containerInputAddFriend}>
                <TextInput style={styles.textNameFriend} placeholder='Enter name of new friend'/>
            </View>        
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