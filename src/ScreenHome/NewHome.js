import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Vibration, FlatList, Dimensions, Modal, Platform } from 'react-native'
import Api from '../Api';
import { IconMahKota } from '../imgSvg';
import { colors } from '../Utils'
import { fcmService } from '../FCMService';
import Toast from 'react-native-toast-message';
import RepoUtil from '../Helper/RepoUtil';
import {IconLaporanPenjualan, IconAdministrasi} from '../imgSvg';
import ListStatusSesi from './ListStatusSesi';
import moment from 'moment';
import ListMetodeBelanja from './ListMetodeBelanja';

import exampleImage from '../imgSvg/Icon_place_Holder_Toko.jpeg'
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

var indexMod =0;
var sound = new Sound('cektokonotif.mp3');
var fcm_id ='';
var Token = '';
var window = Dimensions.get('window');
var width = (window.width  * 70/100) / 3;
var width2 = (window.width  * 70/100) / 2;
var sesi1 = '';
var sesi2 = '';
var sesi3 = '';
var ItemSelect = null;
var ColorExpres = '';
var ColorPickup = '';
const rows = 3;
const cols = 3;
const marginHorizontal = 4;
const marginVertical = 4;
const widthGrid = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const heightGrid = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));
const NewHome = ({navigation}) => {

    const [valueSwitch, setSwitch] = useState(false);
    const [titleSwitch, setTitileSwitch] = useState('');
    const [statusToko, setStatusToko] = useState('');
    const [namaToko, setNamaToko] = useState('');
    const [imgFoto, setFoto] = useState('');
    const [expresValue, setExpresValue] = useState(false);
    const [ColorExpres, setChangeColor] = useState('');
    const [pickUpValue, setPickUpValue] = useState(false);
    const [session, setSession] = useState(null);
    const [changeColor, setColor] = useState();
    const [statusSesi, setStatusSesi] = useState([]);
    const [dataMetod, setDataMetod] = useState([]);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [showKonfrm, setKonfrm] = useState(false);
    //const [isSesi, setSesi] = useState([]);

    const [dataSesi, setDataSesi] = useState([]);

    const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS
  ];

  //var dataSesi = ;

  const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

    useEffect(() => {
    loadSession();
    UploadFCMID();
    if(titleSwitch === ''){
        setTitileSwitch('Tutup')
        setSwitch(false)
    } 
    
    },[])

    useEffect(() => {
    
    fcmService.register(onRegister, onOpenNotification,)
    function onRegister (token) {
        console.log("FCM Home ", token)
        fcm_id = token;
      }
      if(Platform.OS === 'android'){
        PushNotification.createChannel(
            {
                channelId: "myCekToko", // (required)
                channelName: "myCekToko", // (required)
                soundName: "cektokonotif.mp3",
                importance: 4,
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
            );
      }
      

    },[])

    const playSound = () => {
        sound.play();
    }

    function onOpenNotification(notify) {
        console.log("[App] onOpenNotification: ", notify)
        Toast.show({
        text1: '👋' +notify.title,
        text2: notify.body,
        position: 'top',
        type: 'success',
        visibilityTime:2500,
        });
        //alert("Open Notification: " + notify.body)
        playSound();
        navigation.navigate('Notifikasi');
        }

    const UploadFCMID = () => {
        const param = {
            fcm_id:fcm_id
        }
        Api.post('profile/fcm_id', param)
        .then(async(body) => {
            var res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                // Toast.show({
                //     text1: 'Succses👋',
                //     text2: metadata.message,
                //     position: 'bottom',
                //     type: 'success',
                //     visibilityTime:2000,
                //   });
            } else{
                //alert(metadata.message);
            }
        })
    }

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        
        if(dataRepo != null){
            console.log('dataRepo', dataRepo)
            setSession(dataRepo);
            getData();
        }
      };

      const ShowQuestion = (status) => {
        
      }


    const SwitchValue = (value) => {
        if(value === true){
            setVisible1(true)
            setSwitch(true);
            Vibration.vibrate()
            setTimeout(() => {
                Vibration.cancel
            }, 500)
        }
        else {
            setSwitch(false);
            setVisible2(true);
            Vibration.vibrate()
            setTimeout(() => {
                Vibration.cancel
            }, 500)
        }
        console.log('switch: ', value)
    }

    const ProsesAction = () => {
        setSwitch(true);
        setTitileSwitch('Buka')
        ChangeStatus('1');
        setVisible1(false);
    }

    const CancelAction = () => {
        setSwitch(false);
        setTitileSwitch('Tutup')
        ChangeStatus('0');
        setVisible1(false);
    }

    const ProsesActionTutup = () => {
        setSwitch(false);
        setTitileSwitch('Tutup')
        ChangeStatus('0');
        setVisible2(false);
    }

    const CancelActionTutup = () => {
        setSwitch(true);
        setTitileSwitch('Buka')
        ChangeStatus('1');
        setVisible2(false);
    }

    const ChangeStatus = (kondisi) => {
        const param = {
            status:kondisi
        }
        console.log('status: ', param);
        Api.post('profile/status_merchant', param)
        .then(async(body) => {
            let res = body.data
            let metadata = res.metadata

            if(metadata.status === 200){
                //alert(metadata.message);
                getData();
            } else {
                //alert(metadata.message);
            }
        })
    }

    const getData = () => {

        Api.get('profile/profile_merchant')
        .then(async (response) => {
            let res = response.data;
            let metadata = res.metadata;
            let resData = res.response;
            let resRating = resData.rating;
            console.log("res: ", res);

            var isSesi = resData.sesi_pengiriman;
            var metodeBelanja = resData.sesi_pengiriman;
            //setSesi(resData.sesi_pengiriman);

            if(metadata.status === 200){
                //setLoadImg(false);
                //setPesan(metadata.message);
                //setRating(resRating);
                setNamaToko(resData.nama_merchant);
                setStatusToko(resData.is_sent);
                setFoto(resData.logo_merchant);
                console.log("status", statusToko);
                var i=0;
                var sesi = [];
                
                isSesi.map((item) => {
                    if(i == 2){
                        sesi.push({id:3, label: item.jam_awal, isActive: item.status == '1' ? true:false, kode:item.kode_sesi_pengiriman});
                    } else if(i == 3){
                        sesi.push({id:2, label: item.jam_awal, isActive: item.status == '1' ? true:false, kode:item.kode_sesi_pengiriman});
                    } else if(i == 4){
                        sesi.push({id:1, label: item.jam_awal, isActive: item.status == '1' ? true:false, kode:item.kode_sesi_pengiriman});
                    }
                    i++;
                })
                setDataSesi(sesi);

                var s=0;
                var metod = [];
                metodeBelanja.map((item) => {
                    if(s == 0){
                        metod.push({id:2, label: item.label, isActive: item.status == '1' ? true:false, kode:item.kode_sesi_pengiriman});
                    } else if(s == 1){
                        metod.push({id:1, label: item.label, isActive: item.status == '1' ? true:false, kode:item.kode_sesi_pengiriman});
                    }
                    s++;
                })
                setDataMetod(metod);

                if(resData.status_merchant === '1'){
                    setSwitch(true);
                    setTitileSwitch('Buka');
                } else if(resData.status_merchant === '0') {
                    setSwitch(false);
                    setTitileSwitch('Tutup');
                }

                if(resData.is_pickup === '0'){
                    ColorPickup = 'Aktif';
                    setPickUpValue(true);
                }
                
            } else if (metadata.status === 401){
                RepoUtil.RemoveValue('@session');
                navigation.replace('Login');
                Toast.show({
                    text1: 'Terjadi Kesalahan',
                    text2: metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
                  });
            }
             else {
                //setLoading(true);
                //setLoadImg(false);
                //setPesan(metadata.message);
                Toast.show({
                    text1: 'Terjadi Kesalahan',
                    text2: metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
                  });
            }
        })
        .catch(err => console.log('err: ', err))

      }

    //   useEffect(() => {
    //     if(ColorExpres === ''){
    //         setChangeColor('Nonaktif');
    //     }
    //   }, [])

      const BtnExpres = (stat) => {
            //setExpresValue(!expresValue);
          //setChangeColor();
          if(!expresValue){
            setExpresValue(true);
            setChangeColor('Nonaktif');
            alert(ColorExpres);
          } else {
            setExpresValue(false);
            setChangeColor('Aktif');
            alert(ColorExpres);
          }
      }

      const BtnPickup = () => {
        setPickUpValue(!pickUpValue);
        //setChangeColorPickUp();
        if(pickUpValue === true){
          ColorPickup = 'Aktif'
          alert(ColorPickup);
        } else {
          ColorPickup = 'Nonaktif';
          alert(ColorPickup);
        }
    }

    const ChangeStatusSesi = (kode, value) => {
        const param = {
            kode_sesi:kode,
            aktif:value
        }
        Api.post('profile/update_status_sesi_pengiriman', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                getData();
            } else {
                
            }
        })
        .catch(
            err => console.log('err: ', err)
        )
    }

    const renderItem = ({item, index}) => {

        return (
            <ListStatusSesi
            key={item.id}
            jamSesi={moment(item.label, "HH:mm:ss").format("HH:mm")}
            customBorder={!item.isActive && {height:40, width:width, backgroundColor:'#FAFAFA', elevation:2, borderRadius:100, marginRight:8, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray}}
            customBackground={!item.isActive && {color:colors.btnTextGray, fontWeight:'bold'}}
            onPress={() => SelectedItem(index)}
            />
            );
        
    };

    const SelectedItem = (index) => {
        
        console.log(dataSesi[index].isActive);
        ChangeStatusSesi(dataSesi[index].kode, ! dataSesi[index].isActive);
        
    }


    const RenderItemMetod = ({item, index}) => {
        return(
            <ListMetodeBelanja
            key={item.id}
            label={item.label}
            ChangeBackground={!item.isActive && {color:colors.btnTextGray, fontWeight:'bold'}}
            ChangeBorder={!item.isActive && {height:40, width:width2, backgroundColor:'#FAFAFA', elevation:2, borderRadius:100, marginRight:8, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray}}
            onPress={() => SelectItemMetod(index)}
            />
        )
    }

    const SelectItemMetod = (index) => {
        //setKonfrm(true);
        //indexMod=index;
        ChangeStatusSesi(dataMetod[index].kode, !dataMetod[index].isActive);
    }

    const BtnYa = (index) => {

        if(dataMetod[index].isActive === 1){
            setKonfrm(true);
        } 
        //ChangeStatusSesi(dataMetod[index].kode, !dataMetod[index].isActive);
    }

    const Confrm = () => {
        setKonfrm(false);
    }

    const BtnCancel = () => {
        setKonfrm(false);
    }

    return (
        <View style={styles.Page}>
            
            <SafeAreaView>
            <View style={{flexDirection:'row', width:'94%', height:60, marginTop:25, alignItems:'center',}}>
            <View style={styles.borderProfile}>
            <Image style={{height:55, width:55, borderRadius:100}} source={imgFoto != '' ? {uri:imgFoto}: {uri:exampleImageUri}}/>
            </View>
            <View style={{marginLeft:10, flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Cek Toko</Text>
                <Text style={{fontSize:23, fontWeight:'bold', color:'black', textTransform:'capitalize',}}>{namaToko}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', flex:1,}}>
            <View style={styles.IconStars}>
                <Image source={require('../imgSvg/iconMahkota.png')} style={{height:18, width:24}}/>
                {/* <IconMahKota/> */}
            </View>
            <View style={{backgroundColor:'#FAFAFA', borderRadius:100, borderColor:colors.bglayout, elevation:2, borderWidth:1, height:32, paddingLeft:5, paddingRight:5, marginLeft:8, justifyContent:'center'}}>
                <Text style={{fontWeight:"bold", fontSize:14}}>100 Poin</Text>
            </View>
            </View>
            </View>
            </SafeAreaView>

            <View style={{flexDirection:'row', marginTop:28, paddingLeft:16, paddingRight:16}}>
            <View style={styles.styleBox}>
                <Text style={{fontSize:12, fontWeight:'bold', marginTop:12}}> Status </Text>
                <View style={{marginTop:12}}>
                <Switch
                onValueChange={(value) => SwitchValue(value)}
                trackColor={{true:'#31B057', false:'gray'}}
                thumbColor={'white'}
                //style={{backgroundColor:'red'}}
                value={valueSwitch}
                />
                </View>
                <Text style={{marginTop:4, fontWeight:'bold'}}>{titleSwitch}</Text>
            </View>

            <View style={{flex:1,}}>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingLeft:6}}>
                    {/* <TouchableOpacity style={styles.styleStatus(ColorExpres)} activeOpacity={expresValue} onPress={(value) => BtnExpres(value=true)}>
                        <Text style={styles.TxtExpres(ColorExpres)}> Ekspres </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.styleStatus(ColorPickup)} activeOpacity={pickUpValue} onPress={BtnPickup}>
                    <Text style={styles.TxtExpres(ColorPickup)}> Pickup </Text>
                    </TouchableOpacity> */}
                    <FlatList
                        data={dataMetod}
                        renderItem={(item, index) => RenderItemMetod(item, index)}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{width:'100%',}}
                    />
                </View>

                <FlatList
                    data={dataSesi}
                    renderItem={(item, index) => renderItem(item, index)}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{width:'100%', marginTop:12, marginLeft:6}}
                    />

                <View style={{alignItems:'center', justifyContent:'center', marginTop:16, width:'100%', backgroundColor:'blue'}}>
                    {/* <View style={{height:40, width:'30%', backgroundColor:'#FFF5F7', borderColor:'#ED0A2A', borderWidth:1, borderRadius:100, marginRight:8, alignItems:'center', justifyContent:'center',}}>
                    <Text style={{color:colors.btnActif, fontWeight:'bold'}}> 12:00 </Text>
                    </View>
                    <View style={{height:40, width:'30%', backgroundColor:'#FAFAFA', elevation:2, borderRadius:100, marginRight:8, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:colors.btnTextGray, fontWeight:'bold'}}> 14:00 </Text>
                    </View>
                    <View style={{height:40, width:'30%', backgroundColor:'#FFF5F7', borderColor:'#ED0A2A', borderWidth:1, borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:colors.btnActif, fontWeight:'bold'}}> 18:00 </Text>
                    </View> */}
                    
                </View>

            </View>
            </View>

            <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}>
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.boxContainer} onPress={() => navigation.navigate('Pemesanan Barang')}> 
                <Image source={require('../IconSvg/iconpemesanan.png')} style={{height:104, width:104}} />
                <Text style={{fontWeight:'bold', width:'75%', textAlign:'center', marginTop:12}}>Pemesanan Barang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer} onPress={() => navigation.navigate('Navigation Stok')}> 
                <Image source={require('../IconSvg/iconupdatestok.png')} style={{height:104, width:104}} />
                <Text style={{fontWeight:'bold', width:'75%', textAlign:'center', marginTop:12}}>Update Stok Produk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer}> 
                <IconLaporanPenjualan height={104} width={104}/>
                {/* <Image source={require('../IconSvg/iconlaporanpenjualan.png')} style={{height:104, width:104}} /> */}
                <Text style={{fontWeight:'bold', width:'75%', textAlign:'center', marginTop:12}}>Laporan Penjualan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer}> 
                <IconAdministrasi height={104} width={104}/>
                {/* <Image source={require('../IconSvg/iconadministrasipenjualan.png')} style={{height:104, width:104}} /> */}
                <Text style={{fontWeight:'bold', width:'75%', textAlign:'center', marginTop:12}}>Administrasi Keuangan</Text>
                </TouchableOpacity>
                <View style={styles.boxContainer}></View>
                <View style={styles.boxContainer}></View>
            </View>
            </ScrollView>

            <Modal 
            animationType="slide" transparent={true}
            visible={visible1}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0, 0.6)'}}>
                <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'white', height:200, width:'80%', borderRadius:15,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    elevation: 8,
                    }}>

                    <View style={{flexDirection:'column', width:'100%', height:'100%',}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}> 
                    <Text style={{fontSize:16, width:'75%', textAlign:'center', fontWeight:'bold'}}>Apakah Anda Yakin ingin Membuka Toko?</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'center', flex:1, alignItems:'center'}}>
                        <TouchableOpacity style={{flex:1, backgroundColor:colors.btnActif, height:35, borderRadius:100, width:'100%', marginLeft:15, marginRight:8, alignItems:'center', justifyContent:'center'}} onPress={ProsesAction}>
                            <Text style={{color:'white', fontSize:14, fontWeight:'bold', }}>Ya</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{flex:1, backgroundColor:colors.btnTextGray, height:35, borderRadius:100, width:'100%', marginLeft:8, marginRight:15, alignItems:'center', justifyContent:'center'}} onPress={CancelAction}>
                        <Text style={{color:'white', fontSize:14, fontWeight:'bold', }}>Tidak</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                </View>
            </Modal>

            <Modal 
            animationType="slide" transparent={true}
            visible={visible2}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0, 0.6)'}}>
                <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'white', height:200, width:'80%', borderRadius:15,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    
                    elevation: 8,
                    }}>

                    <View style={{flexDirection:'column', width:'100%', height:'100%',}}>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}> 
                    <Text style={{fontSize:16, width:'75%', textAlign:'center', fontWeight:'bold'}}>Apakah Anda Yakin ingin Menutup Toko?</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'center', flex:1, alignItems:'center'}}>
                        <TouchableOpacity style={{flex:1, backgroundColor:colors.btnActif, height:35, borderRadius:100, width:'100%', marginLeft:15, marginRight:8, alignItems:'center', justifyContent:'center'}} onPress={ProsesActionTutup}>
                            <Text style={{color:'white', fontSize:14, fontWeight:'bold', }}>Ya</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{flex:1, backgroundColor:colors.btnTextGray, height:35, borderRadius:100, width:'100%', marginLeft:8, marginRight:15, alignItems:'center', justifyContent:'center'}} onPress={CancelActionTutup}>
                        <Text style={{color:'white', fontSize:14, fontWeight:'bold', }}>Tidak</Text>
                        </TouchableOpacity>

                    </View>

                    </View>
                    
                </View>
                </View>
            </Modal>

            <Modal 
            animationType="slide" transparent={true}
            visible={showKonfrm}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0, 0.6)'}}>
                <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'white', height:200, width:'80%', borderRadius:15,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    
                    elevation: 8,
                    }}>

                    <View style={{flexDirection:'column', width:'100%', height:'100%',}}>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}> 
                    <Text style={{fontSize:16, width:'75%', textAlign:'center', fontWeight:'bold'}}>Apakah Anda Yakin ingin Membuka Toko?</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'center', flex:1, alignItems:'center'}}>
                        <TouchableOpacity style={{flex:1, backgroundColor:colors.btnActif, height:35, borderRadius:100, width:'100%', marginLeft:15, marginRight:8, alignItems:'center', justifyContent:'center'}} onPress={Confrm}>
                            <Text style={{color:'white', fontSize:14, fontWeight:'bold', }}>Ya</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{flex:1, backgroundColor:colors.btnTextGray, height:35, borderRadius:100, width:'100%', marginLeft:8, marginRight:15, alignItems:'center', justifyContent:'center'}} 
                        onPress={() => BtnCancel(false)}>
                        <Text style={{color:'white', fontSize:14, fontWeight:'bold', }}>Tidak</Text>
                        </TouchableOpacity>

                    </View>

                    </View>
                    
                </View>
                </View>
            </Modal>
            
            <Toast ref={(ref) => Toast.setRef(ref)}/>
            </View>
    )
}

export default NewHome

const styles = StyleSheet.create({
    borderProfile:{
        height:55, width:55, 
        alignItems:'center', 
        elevation:4,
        backgroundColor:'#FAFAFA',
        borderRadius:100,

      },
      Page:{
      flex:1, 
      alignItems:'center',
      backgroundColor:'#FFFFFF',
      shadowColor: "#000",
      shadowOffset: {
            width: 0,
            height: 6,
        },
      shadowOpacity: 0.39,
      shadowRadius: 1.10,

elevation: 13,
    },
    IconStars:{
        height:30, 
        width:30, 
        borderRadius:100, 
        backgroundColor:'#FAFAFA',
        justifyContent:'center',
        alignItems:'center',
        elevation:2
    },
    styleBox:{
        height:96,
        width:'16%',
        backgroundColor:'#FAFAFA',
        borderRadius:10,
        elevation:2 ,
        alignItems:'center',

    },
    styleStatus:(colorStatus) => ({
        backgroundColor:colorStatus == 'Aktif' ? '#FFF5F7':'#FAFAFA', 
        borderRadius:100,
        height:40, width:'45%', 
        //backgroundColor:'#FFF5F7', 
        borderColor:colorStatus == 'Aktif' ? '#ED0A2A':'#FFFFFF', 
        borderWidth:1, 
        borderRadius:100, 
        marginRight:15, 
        alignItems:'center', 
        justifyContent:'center',
        elevation:2
    }),
    TxtExpres:(colorStatus) => ({
    color:colorStatus == 'Aktif' ?  colors.btnActif:colors.btnTextGray,
    fontWeight:'bold'
    }),
    scrollContainer: {
        flex: 1,
        marginTop:32
      },
      sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },
      boxContainer: {
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: marginHorizontal,
        marginRight: marginHorizontal,
        width: widthGrid,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'gold',
      },

})
