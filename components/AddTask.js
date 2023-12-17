import React from 'react';
import { View, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { TextArea } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { Select, CheckIcon, Image } from "native-base";
import {styles} from './style';
import axios from 'axios';
const window = Dimensions.get('window');

export default function AddTask({ navigation }) {
const [service, setService] = React.useState("");
const [newTaskName, setNewTaskName] = React.useState("");

const addTask = async ()=>{
    try{
    const response = await axios('http://192.168.42.168:3004/task');
    const existingTasks = response.data;
    const newTask = {
        id: existingTasks.length === 0 ? 1 : existingTasks[existingTasks.length-1].id+1,
        name:newTaskName,
        completed:false,
    }
    if(newTaskName.length < 5){
      console.error('Task name is too short');
      return;
    }
    await axios.post('http://192.168.42.168:3004/task', newTask)
    navigation.navigate('MainList');
    }catch(error){
        console.error('Erorr during post new task',error)
    }
}

  return (
    <View style={{ flex: 1 }}>
      <HeaderForDrawer navigation={navigation}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#F1F1F1' }}
      >
        <TextArea
          h={window.height * 0.25}
          style={styles.textAreaTask}
          mx="auto"
          placeholder="Enter your new task"
          w="100%"
          onChangeText={(text) => setNewTaskName(text)}
        />
        <View style={styles.wrapperSelectAndImg}>
            <Select selectedValue={service} minWidth="200" width={window.width*0.75} accessibilityLabel="Choose Member" placeholder="Choose Member" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon style={{backgroundColor:'white'}} size="5" />
            }} 
                mt={1} onValueChange={itemValue => setService(itemValue)}>
                <Select.Item label="Filip Szemraj" value="ux" />
                <Select.Item label="Tupac Shakur" value="web" />
                <Select.Item label="Jakub Kubanczyk" value="cross" />
            </Select>
            <Pressable onPress={addTask}>
                <Image alt="arrow-img" style={styles.arrowImg} source={require('../assets/images/arrow_top.png')}/>
            </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}