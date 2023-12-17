import React from 'react';
import { View, Text, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import {styles} from './style';
import { Pressable, Image, TextArea} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
const window = Dimensions.get('window');

export default function SpecGroup({navigation}) {
  return (
    <View style={{ flex: 1 ,backgroundColor:'#F1F1F1'}}>
      <HeaderForDrawer navigation={navigation}/>
        <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#F1F1F1' }}
            >
            <View style={{height:window.height*0.05,justifyContent:'space-evenly',flexDirection:'row', backgroundColor:'#CDD016'}}>
                <Pressable style={{justifyContent:'center'}} onPress={()=> navigation.navigate('MainList')}><Image alt="exit_img"source={require('../assets/images/exitButton.png')}/></Pressable>
                <Pressable style={{borderLeftWidth:1,justifyContent:'center', borderColor:'white',alignItems:'center'}} onPress={()=> navigation.navigate('IndividualChats')}><Text style={styles.textChatsNoLine}>Individual chats</Text></Pressable>
                <Pressable style={{borderLeftWidth:1, borderColor:'white', justifyContent:'center'}} onPress={()=> navigation.navigate('GroupChats')}><Text style={styles.textChatsLine}>Group chats</Text></Pressable>
            </View>
            <View style={{backgroundColor:'white',height:window.height*0.06,flexDirection:'row', justifyContent:'center',alignItems:'center', marginBottom:5}}>
                <Text style={styles.textChats2}>Logistic</Text>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Image alt="arrow_left_img" source={require('../assets/images/arrow_left.png')}/>
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
            <Image alt="square_icon_chat" source={require('../assets/images/darhboard.png')}/>
            <Icon name="paper-plane" size={20} color="black" />
        </View>
    </KeyboardAvoidingView>
    </View>
  );
}