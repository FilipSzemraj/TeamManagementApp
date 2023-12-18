import { Text, View, Image, Pressable} from 'react-native';
import { styles } from './style';

export default function HeaderForDrawer({navigation}){
    return(
        <View style={styles.containerHeader}>
            <View style={styles.container2}>
                <Image style={styles.headerLogo2} source={require('../assets/images/logo.png')}/>
                <Text style={styles.textHeader}>Whale Notes</Text>
                <Pressable onPress={()=> navigation.navigate('Profile')}>
                    <Image style={styles.avatar} source={require('../assets/images/profile.png')}/>
                </Pressable>
            </View>
        </View>
    );
}
