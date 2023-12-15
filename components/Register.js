import React, { useState } from 'react';
import { View, Text, Image} from 'react-native';
import {styles} from './style.js'
import { Button, Pressable } from "native-base";

export default function Register({ navigation }) {
return (

<View style={styles.loginContainer}>
    <View style={styles.loginSection}>
        <Text style={styles.textLogin}>Sign Up</Text>
        <View style={styles.containerFb}>
            <Pressable  onPress={()=>{navigation.navigate("MyDrawer")}}>
                <Text style={styles.fbText}>Sign Up with Facebook</Text>
            </Pressable>
        </View>
        <View style={styles.containerGoogle}>
            <Pressable onPress={()=>{navigation.navigate("MyDrawer")}}>
                <Text style={styles.googleText} >Sign Up with Google</Text>
            </Pressable>
        </View>
        <Image
          source={require('../assets/images/logo.png')} 
          style={styles.bigLogo}
        />
    </View>
  </View>
  );
}