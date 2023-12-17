import React from 'react';
import { View, Text, Dimensions} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import {styles} from './style';
import { Pressable, Image } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
const window = Dimensions.get('window');

export default function GroupChats({navigation}) {
  return (
    <View style={{ flex: 1 ,backgroundColor:'#F1F1F1'}}>
      <HeaderForDrawer navigation={navigation}/>
        <View style={{flex:1,justifyContent:'flex-start'}}>
            <View style={{height:window.height*0.05,justifyContent:'space-evenly',flexDirection:'row', backgroundColor:'#CDD016'}}>
                <Pressable style={{justifyContent:'center'}} onPress={()=> navigation.navigate('MainList')}><Image alt="exit_img"source={require('../assets/images/exitButton.png')}/></Pressable>
                <Pressable style={{borderLeftWidth:1,justifyContent:'center', borderColor:'white',alignItems:'center'}} onPress={()=> navigation.navigate('IndividualChats')}><Text style={styles.textChatsNoLine}>Individual chats</Text></Pressable>
                <Pressable style={{borderLeftWidth:1, borderColor:'white', justifyContent:'center'}} onPress={()=> navigation.navigate('GroupChats')}><Text style={styles.textChatsLine}>Group chats</Text></Pressable>
            </View>
            <Text style={styles.textChats2}>Name of the current chat</Text>
            <View style={{flex:1,justifyContent:'flex-start'}}>
            <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
                <Image alt="mess_img" style={styles.messImg} source={require('../assets/images/Team1.png')}/>
                  <Text style={{width:window.width*0.67}}>Yooo what's gooood</Text>
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>16.12.2023</Text>
                  <Icon name="envelope-open" size={20} color="black" />
                  </View>
              </View>
              <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
                <Image alt="mess_img" style={styles.messImg} source={require('../assets/images/Team2.png')}/>
                  <Text style={{width:window.width*0.67}}>Just hangin around...</Text>
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>17.12.2023</Text>
                  <Icon name="envelope-open" size={20} color="black" />
                  </View>
              </View>
              <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
                <Image alt="mess_img" style={styles.messImg} source={require('../assets/images/Team3.png')}/>
                  <Pressable onPress={()=> navigation.navigate('Login')}>
                    <Text style={{width:window.width*0.67}}>Hola, como estas</Text>
                  </Pressable>
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>17.12.2023</Text>
                  <Icon name="envelope" size={20} color="black" />
                  </View>
                  
              </View>
              <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',margin:1,borderRadius:15,height:window.height*0.09}}>
                <Image alt="mess_img" style={styles.messImg} source={require('../assets/images/Team4.png')}/>
                  <Text style={{width:window.width*0.67}}>Muchas gracias afficion</Text>
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>17.12.2023</Text>
                  <Icon name="envelope-open" size={20} color="black" />
                  </View>
              </View>
            </View>
        </View>
    </View>
  );
}