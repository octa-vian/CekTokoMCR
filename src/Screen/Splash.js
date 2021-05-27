import React, { useEffect, useState } from 'react'
import { View, Text, Image, ImageBackground, ActivityIndicator } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../Utils';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import RepoUtil from '../Helper/RepoUtil';

const Splash = ({navigation}) => {
    const [showIndicator, setShow] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
    loadSession();
    },[]);

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log(dataRepo);
        setSession(dataRepo);
        // if (dataRepo != null) {
        //     //alert('Anda Sudah Login');
        //   navigation.replace('Navigation Home');
        //   } else {
        //   navigation.replace('Login');
        //   }
      };

    useEffect(() => {
        
        if(showIndicator === false) {
            setTimeout(() => {
                setShow(true);
            }, 1500)
        } else{
            setTimeout(() => {

                if(session != null){
                navigation.replace('Navigation Home');
                } else {
                navigation.replace('Login');
                }
                
            }, 2500);
        }
       
    });
    return (
        <View style={{flex:1, backgroundColor:'white', alignItems:'center', justifyContent:'center', elevation:3}}> 
            <Image source={require('../imgSvg/logo_with_tabel.png')} style={{height:100, width:100}} />
            {/* <Image source={require('../imgSvg/banggaBelanja.png')} style={{marginTop:40, marginBottom:35, height:18, width:'100%',}}/> */}
            <Text style={{fontSize:20, fontWeight:'bold', color:'black', marginTop:40}}>BANGGA <Text style={{color:colors.btnActif}}>belanja</Text> DI TETANGGA</Text>
            {showIndicator ? (
                <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
                <BarIndicator color='red' size={50} />
                </View>
            ) :null}
            
            
        </View>
    )
}

export default Splash
