import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, Alert, Animated } from 'react-native'
import Api from '../../Api'
import RepoUtil from '../../Helper/RepoUtil'
import { IconEdit, IconPin, Str } from '../../imgSvg'
import LoadingImage from '../../Loading/LoadingImage'
import { colors } from '../../Utils'
import HeaderHome from '../HeaderHome'
import moment from 'moment';
import SwipeablePanel from 'react-native-sheets-bottom';
import exampleImage from '../../imgSvg/Icon_place_Holder_Toko.jpeg';
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;


const ViewProfile = ({navigation}) => {

    const [valueSwitch1, setSwitch1] = useState(false);
    const [valueSwitch2, setSwitch2] = useState(false);
    const [valueSwitch3, setSwitch3] = useState(false);
    const [session, setSession] = useState(null);
    const [loadingImage, setImageLoading] = useState(true);
    const [pesan, setPesan] =useState('');
    const [loading, setLoading] = useState(false);
    const [JamBuka, setJambuka] = useState();
    const [JamTutup, setJamTutup] = useState();
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showPannel, setViewPannel] = useState(false);
    const [imgFoto, setFoto] = useState('');

    const [dataSesi1, setDataSesi1] = useState('');
    const [dataSesi2, setDataSesi2] = useState('');
    const [dataSesi3, setDataSesi3] = useState('');

    const [dataProfile, setProfile] = useState({
        id:'',
        nama_pic: '',
        no_hp_pic:'',
        nama_merchant:'',
        no_hp_merchant:'',
        alamat_merchant:'',
        kelurahan:'',
        kota:'',
        provinsi:'',
        kecamatan:'',
        jam_buka:'',
        jam_tutup:'',
        logo_merchant:'',
    });

    const SwitchValue1 = (value) => {
        if(value === true){
            setSwitch1(true);
        }
        else {
            setSwitch1(false);
        }
        console.log('switch: ',value)
    }

    const SwitchValue2 = (value) => {
        if(value === true){
            setSwitch2(true);
        }
        else {
            setSwitch2(false);
        }
        console.log('switch: ',value)
    }

    const SwitchValue3 = (value) => {
        if(value === true){
            setSwitch3(true);
        }
        else {
            setSwitch3(false);
        }
        console.log('switch: ',value)
    }

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        setSession(dataRepo);
        if(dataRepo != null){
            // alert('Anda Sudah Login');
        }
      };

      useEffect(() => {
        loadSession();
        getData();
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
            loadSession();
          })
          return()=>{
            unsubscribe
          }
     }, [navigation]);

      const confirmLogout = () => {
        RepoUtil.RemoveValue('@session');
        navigation.replace('Login');
      };

      const getData = () => {
        Api.get('profile/profile_merchant')
        .then(async (response) => {
            let res = response.data;
            let metadata = res.metadata;
            let resData = res.response;
            console.log("res: ", res);

            if(metadata.status === 200){
                setProfile(resData);
                setImageLoading(false);
                console.log("time: ",resData.jam_buka)
                //setPesan(metadata.message);
                setFoto(resData.logo_merchant);
                var dataSesi = [];
                dataSesi = resData.sesi_pengiriman;
                console.log('S',dataSesi);
                var timeBuka = moment(resData.jam_buka, "HH:mm:ss").format("HH:mm");
                var timeTutup = moment(resData.jam_tutup, "HH:mm:ss").format("HH:mm");
                setJambuka(timeBuka);
                setJamTutup(timeTutup);

                var i = 0;
                var s1 = 0;
                var s2 = 0;
                var s3 = 0;
                dataSesi.map((item) => {
                    if(i == 2){
                        s3 = item.jam;
                        var jm1 = s3.substring(0, 8);
                        var jm2 = s3.substring(s3.length - 8);
                        setDataSesi3(moment(jm1, 'HH:mm:ss').format('HH:mm') +' - '+ moment(jm2, 'HH:mm:ss').format('HH:mm'))
                    } else if(i == 3) {
                        s2 = item.jam;
                        var jm1 = s2.substring(0, 8);
                        var jm2 = s2.substring(s2.length - 8);
                        setDataSesi2(moment(jm1, 'HH:mm:ss').format('HH:mm') +' - '+ moment(jm2, 'HH:mm:ss').format('HH:mm'));
                    } else if(i == 4) {
                        s1 = item.jam;
                        var jm1 = s1.substring(0, 8);
                        var jm2 = s1.substring(s1.length - 8);
                        setDataSesi1(moment(jm1, 'HH:mm:ss').format('HH:mm') +' - '+ moment(jm2, 'HH:mm:ss').format('HH:mm'));
                    }
                    i++;
                })

                
            } else if (metadata.status === 401){
                RepoUtil.RemoveValue('@session');
                navigation.replace('Login');
                Toast.show({
                    text1: 'Terjadi Kesalahan 🙏🏻',
                    text2: metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
                  });
            } 
            else{
                //setLoading(false);
                setImageLoading(false);
                setPesan(metadata.message);
            }
        })
        .catch((err) => {
            console.log('err: ', err)
            setLoading(false);
            setImageLoading(false)
        } )
    }

    const SlidingUpPannel = () => {
        setViewPannel(true);
      };
    
    const CancleSlidingUp = () => {
        setViewPannel(false);
    }

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        showCloseButton: true,
        onClose: () => CancleSlidingUp(),
        onPressCloseButton: () => CancleSlidingUp(),
        // ...or any prop you want
      });


    return (
        <View style={styles.page}>
        <HeaderHome title="Profile"/>
        <ScrollView>
        <View style={{flex:1}}>
            <View style={{flexDirection:'row', marginTop:24, marginLeft:16, marginRight:16, alignItems:'center',}}>
                <View style={styles.styleImage}>
                <Image 
                source={imgFoto != '' ? {uri:imgFoto} : {uri:exampleImageUri}}
                style={{height:95, width:95, borderRadius:100}}/>
                </View>
                <View style={{flex:1, marginLeft:20, marginRight:16}}>
                <Text style={{fontSize:16, fontWeight:'bold', textTransform:'capitalize'}}>{dataProfile.nama_merchant}</Text>
                <View style={{flexDirection:'row', alignItems:"center", marginTop:8}}>
                <IconPin/>
                <Text style={{textTransform:'capitalize', width:'100%', fontSize:12, marginLeft:6, color:'gray'}}>{dataProfile.alamat_merchant}</Text>
                </View>
                <TouchableOpacity style={{flexDirection:'row', borderColor:'#7A7A7A', borderWidth:1, borderRadius:100, height:28, width:'44%', marginTop:12, alignItems:'center', justifyContent:'center', paddingLeft:6}} onPress={() => navigation.navigate('Profile')}>
                <IconEdit/> 
                <Text style={{fontSize:12, marginLeft:4, color:'#7A7A7A', fontWeight:'bold'}}>Edit Profil</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection:'row', marginLeft:16, marginRight:16, marginTop:25 , alignItems:'center', justifyContent:'space-around'}}>
                <View style={{height:72, width:'47%', borderRadius:16, backgroundColor:'#FAFAFA', elevation:3, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'gray'}}>Jam Buka</Text>
                <Text style={{fontSize:16, fontWeight:'bold', color:'black'}}>{JamBuka}</Text>
                </View>
                <View style={{height:72, width:'47%', borderRadius:16, backgroundColor:'#FAFAFA', elevation:3, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'gray'}}>Jam Tutup</Text>
                <Text style={{fontSize:16, fontWeight:'bold', color:'black'}}>{JamTutup}</Text>
                </View>
            </View>

            <View style={{marginLeft:16, marginRight:16}}>
                <View style={{flexDirection:'row', marginTop:32}}>
                    <Text style={{flex:1, fontSize:14, fontWeight:'bold', color:'#7A7A7A'}}>Waktu Pengiriman</Text> 
                    <Text style={{flex:1, textAlign:'right', fontSize:12, fontWeight:'bold', color:colors.btnActif}} onPress={() => navigation.navigate('Ubah Waktu Pengiriman')}>Ubah Waktu</Text>
                </View>

                <View style={{height:48, backgroundColor:'#FAFAFA', elevation:3, marginTop:24, borderRadius:16, flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1, paddingLeft:16,}}>
                        <Text style={{fontSize:16, fontWeight:'bold'}}>{dataSesi1.toString()}</Text>
                    </View>
                </View>

                <View style={{height:48, backgroundColor:'#FAFAFA', elevation:3, marginTop:24, borderRadius:16, flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1 ,paddingLeft:16,}}>
                        <Text style={{fontSize:16, fontWeight:'bold'}}>{dataSesi2.toString()}</Text>
                    </View>
                </View>

                <View style={{height:48, backgroundColor:'#FAFAFA', elevation:3, marginTop:24, borderRadius:16, flexDirection:'row', alignItems:'center', marginBottom:10}}>
                    <View style={{flex:1 ,paddingLeft:16,}}>
                        <Text style={{fontSize:16, fontWeight:'bold'}}>{dataSesi3.toString()}</Text>
                    </View>
                </View>
            </View>

            <View style={{marginLeft:16, marginRight:16, marginTop:32}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A'}} >Informasi Akun</Text>
                <View style={{flexDirection:'row', marginTop:24, alignItems:'center', paddingBottom:4, paddingTop:4}}>
                    <View style={{height:40, width:40, borderRadius:100, elevation:3, justifyContent:'center', alignItems:'center',}}>
                    <Image source={require('../../imgSvg/icontelp.png')} style={{height:40, width:40, borderRadius:100}}/>
                    </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16}}>Nomor HP</Text>
                    <View style={{flex:1}}> 
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16, textAlign:'right', color:'#7A7A7A'}}>{dataProfile.no_hp_merchant}</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', marginTop:24, alignItems:'center', paddingBottom:4, paddingTop:4}}>
                    <View style={{height:40, width:40, borderRadius:100, elevation:3, justifyContent:'center', alignItems:'center',}}>
                    <Image source={require('../../imgSvg/iconalamat.png')} style={{height:40, width:40, borderRadius:100}}/>
                    </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16, flex:0.8}}>Alamat</Text>
                    <View style={{flex:1}}> 
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16, textAlign:'right', color:'#7A7A7A'}}>{dataProfile.alamat_merchant}</Text>
                    </View>
                </View>
            </View>

            <View style={{marginLeft:16, marginRight:16, justifyContent:'center', alignItems:'center', marginTop:48, marginBottom:20}}>
                <TouchableOpacity style={{width:'80%', height:48, borderColor:colors.btnActif, borderWidth:1, borderRadius:100, alignItems:'center', justifyContent:'center' }} onPress={SlidingUpPannel}>
                    <Text style={{fontSize:14, color:colors.btnActif, fontWeight:'bold'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        <LoadingImage visible={loadingImage} />

        {/* <SwipeablePanel
          //fullWidth
          isActive={showPannel}
          onClose={CancleSlidingUp}
          onPressCloseButton={CancleSlidingUp}>
        </SwipeablePanel> */}

        <SwipeablePanel {...panelProps} isActive={showPannel}>
            <View style={{height:400, }}>
                <Text style={{marginLeft:16, marginTop:24, fontSize:14, fontWeight:'bold'}}>Apakah Anda Yakin?</Text>
                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16 }} onPress={CancleSlidingUp}>
                    <Text style={{fontSize:14, fontWeight:'bold'}} >Tidak</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16 }} onPress={confirmLogout}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnActif}} >Ya, keluar</Text>
                </TouchableOpacity>
            </View>
        </SwipeablePanel>

        </View>
    )
}

export default ViewProfile
const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white'
    },
    styleImage:{
        height:95,
        width:95,
        elevation:2,
        backgroundColor:'#FAFAFA',
        borderRadius:100,
        margin:2,
        alignItems:'center',
        justifyContent:'center'
    }

})
