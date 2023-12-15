import React, { useState } from 'react';
import { View, Text, Image} from 'react-native';
import {styles} from './style.js'
import { Button, Pressable } from "native-base";

export default function FormLogin({ navigation }) {
return (

<View style={styles.loginContainer}>
    <View style={styles.loginSection}>
        <Text style={styles.textLogin}>Log In</Text>
        <View style={styles.containerFb}>
            <Pressable  onPress={()=>{navigation.navigate("MyDrawer")}}>
                <Text style={styles.fbText}>Log In with Facebook</Text>
            </Pressable>
        </View>
        <View style={styles.containerGoogle}>
            <Pressable onPress={()=>{navigation.navigate("MyDrawer")}}>
                <Text style={styles.googleText} >Log In with Google</Text>
            </Pressable>
        </View>
        <View>
            <Pressable style={styles.overlapGroup}  onPress={()=>{navigation.navigate("Register")}}>
                <Text style={styles.textSignUp}>If you don't have account Sign Up here!</Text>
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