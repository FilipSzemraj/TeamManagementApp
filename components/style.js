import { StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    position:'relative'
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cdd016',
    borderRadius: 15,
    flexDirection: 'column',
    height: window.height,
    overflow: 'hidden',
    paddingVertical: window.height * 0.04,
    paddingHorizontal: window.width * 0.01,
    position: 'relative',
    width: window.width,
    justifyContent: 'flex-start',
  },
  loginSection: {
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: window.height * 0.02,
    position: 'relative',
  },
  textLogin: {
    color: '#000000',
    fontSize: window.height * 0.03,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: window.height * 0.0325,
    marginTop: -1,
    marginBottom: window.height * 0.01,
    position: 'relative',
    overflow: 'hidden',
  },
  registerButton: {
    height: window.height * 0.06,
    marginRight: -2,
    position: 'relative',
    width: window.width * 0.9,
  },
  overlapGroup: {
    backgroundColor: '#00ff00',
    borderRadius: 15,
    height: window.height * 0.06,
    marginTop: window.height * 0.01,
    position: 'relative',
    width: window.width * 0.89,
  },
  textSignUp: {
    color: '#000000',
    fontSize: window.height * 0.018,
    fontWeight: '700',
    left: window.width * 0.075,
    letterSpacing: 0,
    lineHeight: window.height * 0.0225,
    position: 'absolute',
    textAlign: 'center',
    top: window.height * 0.0210,
    overflow: 'hidden',
  },
  containerGoogle: {
    margin:10,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: window.width * 0.025,
    shadowColor: '#000',
    height: window.height *0.07,
    shadowOffset: {
      width: 0,
      height: window.height * 0.01,
    },
    shadowOpacity: 0.3,
    shadowRadius: window.width * 0.015,
    elevation: 3,
    padding: window.height * 0.015,
    position: 'relative',
    width: window.width * 0.89,
  },
  containerFb: {
    margin:10,
    alignItems: 'flex-start',
    backgroundColor: '#1877f2',
    height: window.height *0.07,
    borderRadius: window.width * 0.025,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: window.height * 0.01,
    },
    shadowOpacity: 0.3,
    shadowRadius: window.width * 0.015,
    elevation: 3,
    justifyContent: 'flex-start',
    padding: window.height * 0.015,
    position: 'relative',
    width: window.width * 0.89,
  },
  googleText: {
    color: '#0000008a',
    fontSize: window.height * 0.03,
    paddingLeft: window.width * 0.05,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: window.height * 0.0325,
    marginTop: -1,
    position: 'relative',
    overflow: 'hidden',
  },
  fbText: {
    color: '#ffffff',
    fontSize: window.height * 0.03,
    paddingLeft: window.width * 0.05,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: window.height * 0.0325,
    marginTop: -1,
    position: 'relative',
    overflow: 'hidden',
  },
  bigLogo:{
     marginTop: window.height*0.35,
     width: window.width*0.98, 
     height: window.height*0.23, 
     borderRadius: 20, 
     margin: 5 
  },
  wrapperSelectAndImg:{
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor:'white'
  },
  arrowImg:{
    width: window.width*0.135, 
    height: window.height*0.068, 
    marginTop: window.height*0.005,
    marginRight: window.height*0.02,
    marginBottom: window.height*0.005
 },
  textAreaTask:{
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    fontSize: 15 
  },
  containerAddUser:{
    flex: 1, 
    justifyContent: 'flex-end', 
    backgroundColor: '#F1F1F1'
  },
  wrapperAdd: {
    flexDirection: 'column',
    backgroundColor: '#F1F1F1',
    flex: 0.15,
    justifyContent:'flex-end',
    alignItems: 'center',
    paddingBottom: window.height * 0.1, 
  },
  textButtonsAdd:{
    color: 'white',
    fontWeight:'bold',
    fontSize: 20,
  },
  textAddFriend: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: window.height * 0.02,
  },

  containerInputAddFriend: {
    backgroundColor: 'white',
    padding:10,
    borderRadius: 10,
    height: window.height * 0.08,
    width: window.width * 0.8,
    marginTop:window.height*0.02,
    marginBottom:window.height*0.02
  },
  buttonsAddUser:{
    justifyContent:'center',
    alignItems:'center',
    height: window.height * 0.06,
    width: window.width * 0.35,
    backgroundColor:'#E12828',
    borderRadius: 10
  },
  containerAddButtons: {
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  textNameFriend:{
    fontSize: 18
  },
  containerInputsAdd:{
    height:window.height*0.3,
    marginTop:window.height*0.02,
    marginBottom:window.height*0.02,
    justifyContent:'space-around',
    alignItems:'center'
  },
  infoTextProfile:{
    fontSize:20,
    fontWeight:'bold'
  },
  infoTextProfileSpecified:{
    fontSize:20,
    fontWeight:'regular',
    marginLeft: window.width*0.1
  },
  textChats:{
    color: 'white',
    fontSize: 14
  }
});