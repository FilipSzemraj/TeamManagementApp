import React from 'react';
import { View, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { TextArea } from 'native-base';
import { Dimensions } from 'react-native';
import { Select, CheckIcon, Image } from "native-base";
import {styles} from './style';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';
import { Keyboard } from 'react-native';
const window = Dimensions.get('window');

export default function AddTask({ navigation }) {
const [service, setService] = React.useState("");
const [showCalendar, setShowCalendar] = React.useState(false);
const [showMenu, setShowMenu] = React.useState(false);
const [showPriority, setShowPriority] = React.useState(false);
const [newTaskName, setNewTaskName] = React.useState("");

const toggleMenu = () => {
  Keyboard.dismiss();
  setShowMenu(!showMenu); 
};
const toggleCalendar = () => {
  Keyboard.dismiss();
  setShowCalendar(!showCalendar); 
};
const togglePriority = () => {
  Keyboard.dismiss();
  setShowPriority(!showPriority); 
};

const addTask = async ()=>{
    try{
    const response = await axios('http://192.168.0.21:3004/task');
    const existingTasks = response.data;
    const newTask = {
        id: existingTasks.length === 0 ? 1 : existingTasks[existingTasks.length-1].id+1,
        name:newTaskName,
        completed:false,
    }
    if(newTaskName.length < 5){
      Alert.alert("Task name is too short")
      return;
    }
    await axios.post('http://192.168.0.21:3004/task', newTask)
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
      { showCalendar ?
      <View>
        <Calendar style={{height: window.height*0.55,}}/>
      </View> : null
      }
        <TextArea
          h={window.height * 0.2}
          style={styles.textAreaTask}
          mx="auto"
          placeholder="Enter your new task"
          w="100%"
          onChangeText={(text) => setNewTaskName(text)}
        />
        { showMenu ? 
            <Image style={styles.dotsMenu} alt="menu_img" source={require('../assets/images/alert_gps_task.png')}/>
        : null
        }
        { showPriority ? 
            <Image style={styles.priorityMenu} alt="priority_menu_img" source={require('../assets/images/select_priority.png')}/>
        : null
        }
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:window.width*1,backgroundColor:'white'}}>
          <Pressable onPress={toggleCalendar}>
            <Image alt="calendar_img" source={require('../assets/images/calendar.png')}/>
          </Pressable>
          <Pressable onPress={togglePriority}>
            <Image alt="priority_img" source={require('../assets/images/priority_menu.png')}/>
          </Pressable>
          <Pressable onPress={toggleMenu}>
            <Image alt="dots_img" source={require('../assets/images/dots_menu.png')}/>
          </Pressable>
        </View>
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