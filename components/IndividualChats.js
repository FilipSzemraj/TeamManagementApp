import React from 'react';
import { View, Text} from 'react-native';
import HeaderForDrawer from './headerForDrawer';
import { Dimensions } from 'react-native';
import {styles} from './style';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Image } from 'native-base';
const window = Dimensions.get('window');
////Ekran z czatem według mnie lepiej wrzucić w Stack nav jak teraz a nie tak jak na figmie w drawer, 
////bo to srednio wyglada i słabo bedzie z funkcjonalnoscia
////tu jest juz szkic zrobiony z indywidualnym. A no i proponuje wyrzucić ten ekran gdzie nic
//// sie nie wyswietla oprocz individual chats i group chats, tylko zrobic juz domyślnie przejście
//// do individual chat po kliknieciu w tą ikonkę comment-dots w Drawer.js (teraz to dziala juz na tej podstawie)

export default function IndividualChats({navigation}) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderForDrawer navigation={navigation}/>
      <View style={{flex:1}}>
        <View style={{flex:1,justifyContent:'flex-start'}}>
            <View style={{justifyContent:'space-between',flexDirection:'row', backgroundColor:'#CDD016'}}>
                <Pressable style={{borderRadius:15}} onPress={()=> navigation.navigate('MainList')}><Image alt="exit_img"source={require('../assets/images/exitButton.png')}/></Pressable>
                <Pressable onPress={()=> navigation.navigate('IndividualChats')}><Text style={styles.textChats}>Individual chats</Text></Pressable>
                <Pressable onPress={()=> navigation.navigate('IndividualChats')}><Text style={styles.textChats}>Group chats</Text></Pressable>
            </View>
        </View>
      </View>
    </View>
  );
}