import React from 'react';
import { View, Text, Image} from 'react-native';
import { styles } from './style.js'
import { Pressable } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function FormLogin({ navigation }) {
return (

<View style={styles.loginContainer}>
    <View style={styles.loginSection}>
        <Text style={styles.textLogin}>Log In</Text>
        <View style={styles.containerFb}>
            <Pressable style={{flexDirection:'row'}} onPress={()=>{navigation.navigate("MyDrawer")}}>
                <Icon name="facebook" size={20} color="white" />
                <Text style={styles.fbText}>Log In with Facebook</Text>
            </Pressable>
        </View>
        <View style={styles.containerGoogle}>
            <Pressable style={{flexDirection:'row'}} onPress={()=>{navigation.navigate("MyDrawer")}}>
                <Image alt="google_img" source={require('../assets/images/google.png')}/>
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