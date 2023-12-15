import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { Dimensions } from 'react-native';
import {styles} from './style';
import axios from 'axios';
import {Pressable} from 'native-base';
import { TextInput } from 'react-native';
import { Select, CheckIcon, Image } from "native-base";

const window = Dimensions.get('window');


export default function AddGroup({ navigation }) {
    const [service, setService] = React.useState("");

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
                    <TextInput style={styles.textNameFriend} placeholder='Enter name of new group'/>
                </View>
                <View style={styles.containerInputAddFriend}>
                    <TextInput style={styles.textNameFriend} placeholder='Enter name of group location'/>
                </View>
            <View style={{marginTop:window.height*0.02 ,borderRadius:10, backgroundColor:'white'}}>
                <Select selectedValue={service} minWidth="200" width={window.width*0.8} accessibilityLabel="Choose Members" placeholder="Choose Members" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon style={{backgroundColor:'white'}} size="5" />
                }} 
                    mt={1} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="Filip Szemraj" value="ux" />
                    <Select.Item label="Tupac Shakur" value="web" />
                    <Select.Item label="Jakub Kubanczyk" value="cross" />
                </Select>
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