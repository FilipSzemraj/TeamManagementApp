import React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Button} from 'react-native';
import { styles } from './style.js'
import { Pressable } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useEffect, useState } from "react";
import {
    GoogleSignin,
    GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useUserContext } from './UserContext';


export default function FormLogin({ navigation }) {
    const [error, setError] = useState();
    const { userInfo, setUserInfo } = useUserContext();

    useEffect(() => {

        GoogleSignin.configure({
            webClientId:
                "344521869948-7vg2lu2795i13qmp5p132nes4kc09d0h.apps.googleusercontent.com",
        });
    }, []);


    const signin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            setUserInfo(user);
            setError(null);
            navigation.navigate("MyDrawer");
        } catch (e) {
            setError(e);
        }
    };

    const logout = () => {
        setUserInfo();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    };


    return (

<View style={styles.loginContainer}>
    <View style={styles.loginSection}>
        <Text>{JSON.stringify(error)}</Text>
        {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
        {userInfo ? (
            <Button title="Logout" onPress={logout} />
        ) : (
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signin}
            />
        )}
        <StatusBar style="auto" />
        <View>
            <Pressable style={styles.overlapGroup}  onPress={()=>{navigation.navigate("Register")}}>
                <Text style={styles.textSignUp}>If you don't have account Sign Up here!</Text>
            </Pressable>
        </View>
        <Image
            source={require('../assets/images/logo.png')}
            style={styles.bigLogo}
        />

        {/*<Text style={styles.textLogin}>Log In</Text>
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
        />*/}
    </View>
  </View>
  );
}