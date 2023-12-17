import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export default function HeaderForDrawer({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image style={styles.headerLogo} source={require('../assets/images/logo.png')}/>
                <Text style={styles.text}>Whale Notes</Text>
                <Pressable onPress={()=> navigation.navigate('Profile')}>
                    <Image style={styles.avatar} source={require('../assets/images/profile.png')}/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#CDD016',
        flex: 0.15,
        height: window.height*0.13,
        width: window.width*1,
        marginBottom: 2
    },
    container2:{
        flexDirection:'row',
        justifyContent: 'space-between',
        height: window.height*0.13,
        width: window.width*1,
        margin: window.height*0.01,
    }, 
    text:{
        marginTop: window.height*0.045,
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 20
    },
    headerLogo:{
        width: window.width*0.30, 
        height: window.height*0.1, 
        borderRadius: 20, 
        margin: window.height*0.01,
        resizeMode: 'contain'
     },
     avatar:{
        margin: window.height*0.02,
        resizeMode: 'contain',
     }
  });
