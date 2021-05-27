import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Api from '../Api';
import RepoUtil from '../Helper/RepoUtil';
import { IconAkun, IconLock } from '../imgSvg';
import LoadingBoomer from '../Loading/LoadingBoomer';
import LoadingImage from '../Loading/LoadingImage';
import LoadingMessage from '../Loading/LoadingMessage';
import { colors } from '../Utils';
import Toast from 'react-native-toast-message';

const win = Dimensions.get('window');
const {width, height} = win;

const Login = ({navigation}) => {
    //const [isSecure, setSecure] = useState(true);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [isSecure, setSecure] = useState(true);
   const [isProcess, setProcess] = useState(false);
   const [session, setSession] = useState(null);
   const [pesan, setPesan] = useState('');
   const [kondisi, setkondisi] = useState('');


  const loadSession = async () => {
    const dataRepo = await RepoUtil.GetAsObject('@session');
    console.log(dataRepo);
    setSession(dataRepo);
    if (dataRepo != null) {
      //alert('Anda Sudah Login');
      navigation.replace('Navigation Home');
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    setTimeout(() =>{
      setProcess(false);
    }, 3000)
  })

  const loginAction = async () => {
    setProcess(true);
    
    const param = {
        username: username,
        password: password,
    };

    await Api.post('authentication/login_merchant', param)

        .then(async (response) => {
            let res = response.data;
            let metadata = res.metadata;
            console.log(res);
            if (metadata.status === 200 ) {
                RepoUtil.StoreAsObject('@session', res);
                //setPesan(metadata.message);
                Toast.show({
                  text1: 'Succses👋',
                  text2: metadata.message,
                  position: 'bottom',
                  type: 'success',
                  visibilityTime:2000,
                });
                navigation.replace('Navigation Home');               
            } 
             else {
                //setPesan(metadata.message);
                Toast.show({
                  text1: 'Maaf 🙏🏻',
                  text2: metadata.message,
                  position: 'bottom',
                  type: 'error',
                  visibilityTime:2000,
                });
              
            }
        })
        .catch((error) => {
            console.log(error);
            setPesan(metadata.message);
        });

};


const Validation = (text) => {

  if(text === ''){
    alert('gagal');
  }

}

  if(Platform.OS === 'ios'){

    return (
      <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={{marginTop:80, alignItems:'center', backgroundColor:'#ffffff', paddingBottom:10}}>
      <View style={{alignItems:'center', justifyContent:'center',}}>
      <Image style={{width:225, height:210}} source = {require('../imgSvg/logologin.png')}/> 
      </View>
  
      <View style={{alignItems:'center', marginTop:40}}>
        <Text style={{fontWeight:'bold', fontSize:24, color:'#ED0A2A'}}> Hei, Cekfren! </Text>
        <Text style={{fontSize:16, fontWeight:'900',}}>Selamat Datang Di Aplikasi Cektoko</Text>
      </View>
  
        <View style={styles.form}>
        <Image source={require('../imgSvg/user.png')} style={{height:18, width:18}}/>
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          value={username}
          style={{flex:1, marginLeft:16}}
          onChangeText={(value) => setUsername(value)}        
        />
        </View>
        
        <View style={styles.textBox}>
          <Image source={require('../imgSvg/pass.png')} style={{height:19, width:18}}/>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Password"
            style={{flex:1, marginLeft:16, marginRight:8 }}
            value={password}
            secureTextEntry={isSecure}
            onChangeText={value => setPassword(value)}
          />
          {/* Tambah ToucableOpacity */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touachableButton}
            onPress={() => setSecure(!isSecure)}>
            <Image
              source={
                isSecure
                  ? require('../Gambar/invisible.png')
                  : require('../Gambar/view.png')
              }
              style={styles.buttonImage}
            />
          </TouchableOpacity> 
        </View>
  
        <TouchableOpacity style={styles.btnLogin} onPress={() =>{ loginAction()} } disabled={isProcess ? true : false}>
          <Text style={{color:'white', fontSize:14}}> Masuk </Text>
        </TouchableOpacity>
  
        </View>
        {/* <LoadingBoomer visible={isProcess}/> */}
        </KeyboardAvoidingView>
        </ScrollView>
        <Toast ref={(ref) => Toast.setRef(ref)}/>
      </View>
    );

  } else {

    return (
      <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={{marginTop:80, alignItems:'center', backgroundColor:'#ffffff', paddingBottom:10}}>
      <View style={{alignItems:'center', justifyContent:'center',}}>
      <Image style={{width:300, height:278}} source = {require('../imgSvg/logologin.png')}/> 
      </View>
  
      <View style={{alignItems:'center', marginTop:40}}>
        <Text style={{fontWeight:'bold', fontSize:24, color:'#ED0A2A'}}> Hei, Cekfren! </Text>
        <Text style={{fontSize:16, fontWeight:'900',}}>Selamat Datang Di Aplikasi Cektoko</Text>
      </View>
  
        <View style={styles.form}>
        <Image source={require('../imgSvg/user.png')} style={{height:18, width:18}}/>
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          value={username}
          style={{flex:1, marginLeft:16}}
          onChangeText={(value) => setUsername(value)}
          
        />
        </View>
        
        <View style={styles.textBox}>
          <Image source={require('../imgSvg/pass.png')} style={{height:19, width:18}}/>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Password"
            style={{flex:1, marginLeft:16, marginRight:8 }}
            value={password}
            secureTextEntry={isSecure}
            onChangeText={value => setPassword(value)}
          />
          {/* Tambah ToucableOpacity */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touachableButton}
            onPress={() => setSecure(!isSecure)}>
            <Image
              source={
                isSecure
                  ? require('../Gambar/invisible.png')
                  : require('../Gambar/view.png')
              }
              style={styles.buttonImage}
            />
          </TouchableOpacity> 
        </View>
  
        <TouchableOpacity style={styles.btnLogin} onPress={() =>{ loginAction()} } disabled={isProcess ? true : false}>
          <Text style={{color:'white', fontSize:14}}> Masuk </Text>
        </TouchableOpacity>
  
        </View>
        {/* <LoadingBoomer visible={isProcess}/> */}
        </KeyboardAvoidingView>
        </ScrollView>
        <Toast ref={(ref) => Toast.setRef(ref)}/>
      </View>
    );
  }

  
};

export default Login;

const styles = StyleSheet.create({
  page: {
    backgroundColor:'#E5E5E5',
    flex:1
  },
  label: {
    marginBottom: 10,
  },
  form: {
            fontSize:14,
            color:'#7A7A7A',
            fontWeight:'900',
            backgroundColor:'#FAFAFA',
            width:'90%', 
            height: 49, 
            //borderColor:colors.bgPrimary,
            borderWidth: 1,
            borderRadius:100,
            paddingLeft:28 ,
            marginTop:40,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
  },

  headerText: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },

  btnLogin:{
    justifyContent:'center',
        borderRadius:100,
        alignItems:'center',
        marginTop:29,
        width:'90%',
        height:49,
        backgroundColor:colors.btnredcolor,
  },

  textBox: {
    backgroundColor:'#FAFAFA',
    fontSize:14,
    color:'#7A7A7A',
    fontWeight:'900',
    width:'90%', 
    height: 49, 
    //borderColor:colors.bgPrimary,
    borderWidth: 1,
    borderRadius:100,
    paddingLeft:28,
    justifyContent:'center',
    marginTop:16,
    flexDirection:'row',
    alignItems:'center'
  },
  touachableButton: {
    //position: 'absolute',
    right: 10,
    height: 25,
    width: 25,
    padding: 2,
    flex:0.1
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:22,
    width:'90%',
    flexDirection:'row'

  },
});
