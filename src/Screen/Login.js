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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Api from '../Api';
import RepoUtil from '../Helper/RepoUtil';
import LoadingMessage from '../Loading/LoadingMessage';
import { colors } from '../Utils';

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
      navigation.replace('Home');
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
            console.log(res)
            if (metadata.status === 200 ) {
                RepoUtil.StoreAsObject('@session', res);
                navigation.replace('Home');
               
                setPesan(metadata.message);
            } else {
                setPesan(metadata.message);
              
            }
        })
        .catch((error) => {
            console.log(error);
            setPesan(metadata.message);
        });

};

  const ImgIcon = () =>{
    return(
        <View>
            <View style={{color:'gray', marginTop:21, marginLeft:24}}>
        <Image source = {require('../Gambar/logocektoko.png')} style = {{width:45, height:55, resizeMode:'stretch', alignItems:'center'}}></Image>  
        </View>
        </View>
    );
};


  return (
    <View style={styles.page}>
    <ImageBackground source={require('../Gambar/bgpattren.png')} style={{flex:1}}>
    <ScrollView>
    <View style={{marginTop:144, alignItems:'center'}}>
    <View style={{alignItems:'center', justifyContent:'center', width:244, height:208}}>
    <Image style={{width:244, height:208}} source = {require('../imgSvg/merchantpict.png')}/> 
    </View>
  
      <TextInput
        autoCapitalize="none"
        style={styles.form}
        placeholder="Username"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
  
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.textBox}
          placeholder="Password"
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

      <TouchableOpacity style={styles.btnLogin} onPress={() => loginAction()} disabled={isProcess ? true : false}>
        <Text style={{color:'white'}}> Login</Text>
      </TouchableOpacity>

      {/* <View style={styles.btnLogin}>
        <Button
        title="Login"
        onPress={() => loginAction()}
        disabled={isProcess ? true : false}
        />
      </View> */}

      </View>

      {/* Tambah Modal */}
      <LoadingMessage visible={isProcess} pesan={pesan} />
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    backgroundColor:colors.bglayout,
    flex:1
  },
  label: {
    marginBottom: 10,
  },
  form: {
    backgroundColor:'white',
            fontSize:14,
            color:'black',
            backgroundColor:'#FFFFFF',
            width:268, 
            height: 37, 
            borderColor:colors.bgPrimary,
            borderWidth: 1,
            borderRadius:8,
            paddingLeft:10 ,
            marginTop:45
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
        borderRadius:5,
        alignItems:'center',
        marginTop:29,
        width:133,
        height:33,
        backgroundColor:colors.btnredcolor,
  },

  textBox: {
    alignSelf: 'stretch',
    paddingRight: 45,
    borderWidth: 1,
    paddingVertical: 0,
    backgroundColor:'#FFFFFF',
    fontSize:14,
    color:'black',
    width:268, 
    height: 37, 
    borderColor:colors.bgPrimary,
    borderWidth: 1,
    borderRadius:8,
    paddingLeft:10 
  },
  touachableButton: {
    position: 'absolute',
    right: 10,
    height: 25,
    width: 25,
    padding: 2,
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

  },
});
