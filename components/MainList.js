import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

const window = Dimensions.get("window");

export default function MainList({ navigation, route }) {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.1.30:3004/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error while getting data", error);
    }
  };
  


  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const handleRadio = async (taskId)=>{
    try {
      await axios.delete(`http://192.168.1.30:3004/task/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('error while deleting task', error);
    }
  }

  return (
    <View style={styles.container}>
      {tasks.map((singleTask) => (
        <View key={singleTask.id} style={styles.row}>
          <Text style={styles.text}>{singleTask.name}</Text>
          <RadioButton value={singleTask.completed} status={singleTask.completed ? 'checked' : 'unchecked'}
          onPress={()=> handleRadio(singleTask.id)}/>
        </View>
      ))}
      <Pressable style={styles.addCircle} onPress={()=> navigation.navigate("AddTask")}>
        <Image style={styles.imgAdd} source={require('../assets/images/circle_add.png')}/>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  row: {
    margin: window.height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: window.width * 0.2,
    color: '#000000',
    fontSize: 20,
    width: window.width*0.68
  },
  addCircle: {
    position: 'absolute',
    bottom: 0,  
    right: 0,   
    height: window.height * 0.15,
    width: window.width * 0.3,    
  },
  imgAdd: {
    height: window.height * 0.15,
    width: window.width * 0.3,
  }
});