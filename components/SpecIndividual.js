import React, { useState } from 'react';
import { View, Text, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import {styles} from './style';
import { Pressable, Image, TextArea} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const window = Dimensions.get('window');

export default function SpecIndividual({navigation}) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    Keyboard.dismiss();
    setShowMenu(!showMenu); 
    console.log(showMenu);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:'#F1F1F1'}}>
      <HeaderForDrawer navigation={navigation}/>
        <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#F1F1F1' }}
            >
            <View style={styles.wrapperChatPress}>
                <Pressable style={styles.containerXChat} onPress={()=> navigation.navigate('MainList')}><Image alt="exit_img"source={require('../assets/images/exitButton.png')}/></Pressable>
                <Pressable style={styles.containerPressChat} onPress={()=> navigation.navigate('IndividualChats')}><Text style={styles.textChatsLine}>Individual chats</Text></Pressable>
                <Pressable style={styles.containerPressChat} onPress={()=> navigation.navigate('GroupChats')}><Text style={styles.textChatsNoLine}>Group chats</Text></Pressable>
            </View>
            <View style={{backgroundColor:'white',height:window.height*0.06,flexDirection:'row', justifyContent:'center',alignItems:'center', marginBottom:5}}>
                <Text style={styles.textChats2}>Tupac Shakur</Text>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Image alt="arror_left_img" source={require('../assets/images/arrow_left.png')}/>
                </Pressable>           
            </View>
            <ScrollView style={{flexGrow:1}}>
              <View style={{flexDirection:'row',alignItems:'center',marginBottom:window.height*0.02,borderRadius:15,height:window.height*0.09}}>
                <Image alt="mess_img" style={styles.messImgSmall} source={require('../assets/images/profile.png')}/>
                  <View style={{backgroundColor:'white', borderRadius:10}}>
                  <Text style={{padding:5,width:window.width*0.67}}>Hola, como estas. Estamos terminando este proyecto. Y nos vamos al concierto</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row-reverse',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
              <View style={{backgroundColor:'white', borderRadius:10}}>
                  <Text style={{padding:5,width:window.width*0.67}}>Hola. Por supuesto. Este será un trabajo fácil.</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
                <Image alt="mess_img" style={styles.messImgSmall} source={require('../assets/images/profile.png')}/>
                  <View style={{backgroundColor:'white', borderRadius:10}}>
                  <Text style={{padding:5,width:window.width*0.67}}>haha, entonces nos vemos en la fiesta posterior</Text>
               </View>
              </View>
              <View style={{flexDirection:'row-reverse',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
              <View style={{backgroundColor:'white', borderRadius:10}}>
                  <Text style={{padding:5,width:window.width*0.67}}>Hola. Por supuesto. Este será un trabajo fácil.</Text>
              </View>
              </View>
        </ScrollView>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <TextArea
            h={window.height * 0.05}
            style={styles.textAreaTask}
            mx="auto"
            w="90%"
            />
            <TouchableOpacity onPress={toggleMenu}>
              <Image alt="square_icon_chat" source={require('../assets/images/darhboard.png')}/>
            </TouchableOpacity>
            {showMenu ? 
            <View style={styles.iconsContainer}>
              <Pressable onPress={() => navigation.navigate('Camera')}>
                <Image style={styles.icon} alt="camera_icon" source={require('../assets/images/camera.png')}/>
              </Pressable>
              <Pressable>
                <Image style={styles.icon} alt="upload_icon" source={require('../assets/images/load_file.png')}/> 
              </Pressable>
              <Pressable onPress={()=> navigation.navigate('Map')}>
                <Image style={styles.icon} alt="localization_icon" source={require('../assets/images/localization.png')}/> 
              </Pressable>
            </View>
            : null}
            <Icon name="paper-plane" size={20} color="black" />
        </View>
    </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}