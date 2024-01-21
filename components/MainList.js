import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { useUserContext } from './UserContext';

const window = Dimensions.get("window");

export default function MainList({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [taskDate, setTaskDate] = React.useState(new Date().toISOString().split('T')[0]);
  const { userInfo } = useUserContext();


  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.1.30:3004/task");
      const filteredTasks = response.data.filter(task => task.date === taskDate)
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error while getting data", error);
    }
  };
  


  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [taskDate])
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
      <Pressable onPress={()=> setShowCalendar(!showCalendar)}>
        <Text style={{textAlign:'center',fontSize: 14, margin:5}}>{taskDate}</Text>
      </Pressable>
      { showCalendar ?
      <View>
        <Calendar
        onDayPress={(day)=>
          {setTaskDate(day.dateString);setShowCalendar(!showCalendar);
        }}
        style={{height: window.height*0.55,}}/>
      </View> : null
      }
      {tasks.length > 0 ? (
        tasks.map((singleTask) => (
          <View key={singleTask.id} style={styles.row}>
            <Text style={styles.text}>{singleTask.name}</Text>
            <RadioButton
              value="checked"
              status={singleTask.completed ? 'checked' : 'unchecked'}
              onPress={() => handleRadio(singleTask.id)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noTasks}>Brak zadań w tym dniu</Text>
      )}
      <Pressable style={styles.addCircle} onPress={()=> navigation.navigate("AddTask")}>
        <Image style={styles.imgAdd} source={require('../assets/images/circle_add.png')}/>
      </Pressable>
      <View>
        {userInfo ? (
            <>
              {/*<Text>{JSON.stringify(userInfo)}</Text>*/}
              <Text>Logged in as: {userInfo.user.givenName}</Text>
              <Text>Email: {userInfo.user.email}</Text>
            </>
        ) : (
            <Text>User is not logged in</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },
  addCircle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgAdd: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  noTasks: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666666',
  },
});