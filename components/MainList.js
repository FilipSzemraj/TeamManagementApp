import { StyleSheet, Text, View, Image, Pressable, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { useUserContext } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const window = Dimensions.get("window");

export default function MainList({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [taskDate, setTaskDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [editableTask, setEditableTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://172.20.10.7:3004/task`);
        const filteredTasks = response.data
          .filter(task => task.date === taskDate)
          .sort((a, b) => a.priority - b.priority);
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error while getting tasks", error);
      }
    };
    fetchTasks();
  }, [taskDate]);

  const handleEdit = (task) => {
    setEditableTask({ ...task });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editableTask) {
        try {
            await axios.put(`http://172.20.10.7:3004/task/${editableTask.id}`, editableTask);
            const updatedTasks = tasks
                .map(task => task.id === editableTask.id ? { ...task, ...editableTask } : task)
                .sort((a, b) => a.priority - b.priority); 
            setTasks(updatedTasks);
            setIsEditing(false);
            setEditableTask(null);
        } catch (error) {
            console.error('Error while saving task', error);
        }
    } else {
        console.error('Editable task is null.');
    }
};


  
  const getData = async () => {
    const loggedInUserId = await AsyncStorage.getItem('loggedInUserId'); 
    try {
      const response = await axios.get(`http://172.20.10.7:3004/task?userId=${loggedInUserId}`);
      const filteredTasks = response.data
        .filter(task => task.date === taskDate)
        .sort((a, b) => a.priority - b.priority);
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

  const handleRadio = async (taskId) => {
    try {
      await axios.delete(`http://172.20.10.7:3004/task/${taskId}`);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error while deleting task', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={()=> setShowCalendar(!showCalendar)}>
        <Text style={{textAlign:'center',fontSize: 14, margin:5}}>{taskDate}</Text>
      </Pressable>
      {isEditing && (
      <View style={styles.editModal}>
        <Text style={styles.label}>Nazwa zadania:</Text>
        <TextInput
          value={editableTask.name}
          onChangeText={(text) => {
            setEditableTask((prevEditableTask) => ({
              ...prevEditableTask,
              name: text,
            }));
          }}
          style={styles.input}
        />
        <Text style={styles.label}>Priorytet (1 najwyższy, 3 najniższy):</Text>
        <TextInput
          value={editableTask.priority.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const priorityValue = text.trim() === '' ? '' : parseInt(text, 10);
            setEditableTask((prevEditableTask) => ({
              ...prevEditableTask,
              priority: !isNaN(priorityValue) ? priorityValue : prevEditableTask.priority,
            }));
          }}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setIsEditing(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    )}

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
          <Pressable key={singleTask.id} style={styles.row} onPress={() => handleEdit(singleTask)}>
            <Text style={styles.text}>{singleTask.name}</Text>
            <RadioButton
              value="checked"
              status={singleTask.completed ? 'checked' : 'unchecked'}
              onPress={() => handleRadio(singleTask.id)}
            />
          </Pressable>
        ))
      ) : (
        <Text style={styles.noTasks}>Brak zadań w tym dniu</Text>
      )}
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
  editSection: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  editModal: {
    position: 'absolute', 
    top: '20%', 
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: '#CDD016',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    minWidth: 64,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  label: {
    fontSize: 11,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});