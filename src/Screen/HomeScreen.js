import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView, ScrollView, Modal,} from 'react-native'
import {colors} from '../Utils'
import { color } from 'react-native-reanimated';
import { DaftarPesanan, Hands, IconPanah, IconRatingToko, IconStatusBelanja, IconStatusToko, Notif, Notifikasi, ProdukPopuler, Profile, Rat, Shop, ShopHitam, Stars } from '../imgSvg';
import { IconExit, PesananBaru } from '../IconSvg';
import RepoUtil from '../Helper/RepoUtil';
import Api from '../Api';
import LoadingMessage from '../Loading/LoadingMessage';
import LoadingImage from '../Loading/LoadingImage';
import { Switch } from 'react-native-switch';
import SwitchButton from 'switch-button-react-native';
import SwitchSelector from "react-native-switch-selector";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';  
import LoadingSuksesTransaksi from '../Loading/LoadingSuksesTransaksi';


const HomeScreen = ({navigation}) => {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadImg, setLoadImg] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pesan, setPesan] = useState('');
    const [pesanStatus, setPesanStatus] = useState('');
    const [data, setData] = useState({
      nama_merchant:'',
      alamat_merchant:'',
      logo_merchant:'',
      status_merchant:'',
      is_sent:'',
      is_pickup:''
    })
    const [rating, setRating] = useState({
      rate_harga:"",
      rate_barang:"",
      rate_pelayanan:""
    });

    var radio_props = [
      {label: 'Buka', value: 1 },
      {label: 'Tutup', value: 0 }
    ];

    const [statusT, setStatusToko] = useState('');
    const [statusB, setStatusBelanja] = useState('');
    const [checkTerkirim, setCekTerkirim] = useState(false);
    const [checkPickUp, setPickUp] = useState(false); 
    const [valueKirim, setValueKirim] = useState('');
    const [statusMet, setStatusMet] = useState('');
    const [valueMetodBelanja, setValueMetodBelanja] = useState('');
    const [checkMetodBelanja, setMetodBelanja] = useState(false);
    const [statusMetodBelanja, setStatusMetodBelanja] = useState('');

    const [RToko, setRtoko] = useState(0);
    const [LoadingSukses, setSukses] = useState(false);

    const options = [
      { label: "Ambil Sendiri", value: "1" },
      { label: "Dikirim", value: "2" },
    ];

    const mockData = [
      {
          label: 'label1',
          value: 'one'
      },
      {
          label: 'label2',
          value: 'two'
      },
      {
          label: 'label3',
          value: 'three'
      },
  ];
    

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        setSession(dataRepo);
        if(dataRepo != null){
            // alert('Anda Sudah Login');
        }
      };

      const getData = () => {

        Api.get('profile/profile_merchant')
        .then(async (response) => {
            let res = response.data;
            let metadata = res.metadata;
            let resData = res.response;
            let resRating =resData.rating;
            console.log("res: ", res);

            if(metadata.status === 200){
                setData(resData);
                setLoadImg(false);
                setPesan(metadata.message);
                setRating(resRating);

                if(data.is_pickup === '1') {
                  setMetodBelanja(true);
                  setStatusMetodBelanja('Ambil Sendiri');
                } else {
                  setMetodBelanja(false);
                  setStatusMetodBelanja('');
                  
                }
 
                if(data.is_sent === '1'){
                  setValueKirim('Dikirim');
                  setCekTerkirim(true);
                } else{
                  setValueKirim('');
                  setCekTerkirim(false);
                } 

                if(data.status_merchant === '1'){
                  setStatusToko('Buka'); 
                } else {
                  setStatusToko('Tutup'); 
                }
                
            } else{
                setLoading(true);
                setLoadImg(false);
                setPesan(metadata.message);
            }
        })
        .catch(err => console.log('err: ', err))

      }

      const TerapkanStatus = (value) => {
        if(value == 1){
          getStatusToko();
        } else{
          getStatusToko();
        }
      }

      const getStatusToko = () => {
        Api.get('profile/status_merchant')
        .then(async(body) => {
          let res = body.data;
          let metadata = res.metadata;
          let response = res.response; 

          if(metadata.status === 200){
            setPesanStatus(metadata.message);
           //setSukses(true);
            getData();
          } else {
            setPesanStatus(metadata.message);
            //setSukses(true);
            getData();
          }
        })
      }

      const paramMetod = {
        is_sent:statusMet,
        is_pickup:valueMetodBelanja
      }

      console.log('met: ', paramMetod);

      const getMetodeBelanja = () => {
        Api.post('profile/metode_belanja', paramMetod)
        .then(async(body) => {
          let res = body.data;
          let metadata = res.metadata;
          
          if(metadata.status === 200){
            getData();
            alert(metadata.message);
            setVisible(false);
          }else {
            getData();
            alert(metadata.message);
          }
        })
      }

      const TerapkanMetodeBelanja = (value) => {

        if(value == true){
          setValueMetodBelanja('1');
          setMetodBelanja(true);
          
        } else {
          setValueMetodBelanja('0');
          setMetodBelanja(false);
        }
        
      }

      const TerapkanStatusKirim = (value) => {

        console.log('test: ', value);
        if(value == true){
          setStatusMet('1');
          setCekTerkirim(true);
        } else{
          setStatusMet('0');
          setCekTerkirim(false);
        }

      }

      const Terapkan = () => {
        getMetodeBelanja();
      }

      const showPopUp = () => {
        setVisible(!visible);
      }

      const showMessageSukses = () => {
        setSukses(!LoadingSukses);
      }

      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2500)
      })
    
      useEffect(() => {
        //loadSession();
        //setLoadImg(true);
        getData();
        
     }, []);


    return (
        <View style={{flex:1, backgroundColor:colors.bglayout}}>
        
            <ImageBackground source={require("../Gambar/bgprofilehome.png")} style={{flexDirection:'row', alignItems:'center', paddingTop:37, paddingBottom:24, paddingRight:42}}>
                
                <Image source={{uri: data.logo_merchant ? data.logo_merchant: null}} style={styles.borderProfile}/>
                
                <View style={{flex:1, marginLeft:15}}>
                    <Text style={{fontSize:19, color:'white', fontWeight:'bold', textTransform: 'uppercase' }} numberOfLines={1}>{data.nama_merchant}</Text>
                    <Text style={{fontSize:12, color:'white', marginTop:2}} numberOfLines={2}>{data.alamat_merchant}</Text>
                    <View style={{borderBottomColor: '#FFFFFF',borderBottomWidth: 1, marginVertical:10 }}>
                    </View>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{flex:1, fontSize:12, color:'white'}}>Rating kelengkapan produk</Text>
                        <Image source={require('../Gambar/starkuning.png')} style={{height:10, width:10, marginRight:2}}/>
                        <Text style={{justifyContent:'center', alignItems:'center', color:'white', fontSize:10}}>{rating.rate_barang}/5</Text>
                        
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:1, fontSize:12, color:'white'}}>Rating Harga</Text>
                        <Image source={require('../Gambar/starkuning.png')} style={{height:10, width:10, marginRight:2}}/>
                        <Text style={{justifyContent:'center', alignItems:'center', color:'white', fontSize:10}}>{rating.rate_harga}/5</Text>
                        
                    </View>
                    <View style={{flex:0.5, flexDirection:'row',}}>
                        <Text style={{flex:1, color:'white', fontSize:12}}>Rating Pelayanan</Text>
                        <Image source={require('../Gambar/starkuning.png')} style={{height:10, width:10, marginRight:2}}/>
                        <Text style={{justifyContent:'center', alignItems:'center', color:'white', fontSize:10}}>{rating.rate_pelayanan}/5</Text>
                    </View>

                    {/* <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                    <Text style={{flex:1, color:'white', fontSize:12}}>Status Toko</Text>
                       <Switch
                        value={status}
                        onValueChange={(val) => SwitchStatus(val)}
                        disabled={false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        activeTextStyle={{color:'black'}}
                        backgroundActive={'white'}
                        circleBorderActiveColor='black'
                        backgroundInactive={'gray'}
                        circleActiveColor={colors.btnActif}
                        circleInActiveColor={'gray'}/>
                    </View> */}
                </View>
            </ImageBackground>

            <View style={{backgroundColor:colors.btnActif, alignItems:'center', padding:12, justifyContent:'center'}}>
                
                <View style={{flexDirection:'row', alignItems:'flex-start'}}>

                  <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'center'}}>
                    <IconStatusToko/>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:12, color:'white'}}> Status Toko</Text>
                      <Text style={{fontWeight:'bold', fontSize:14, color:'white'}}> {statusT}</Text>
                    </View>
                  </View>

                  <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'center'}}>
                    <IconStatusBelanja/>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:12, color:'white'}}> Metode Belanja</Text>
                      <Text style={{fontWeight:'bold', fontSize:14, color:'white'}}>{valueKirim}/{statusMetodBelanja}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', flex:0.5, alignItems:'center', justifyContent:'center'}} onPress={showPopUp}>
                    <IconPanah style={{marginTop:12}}/>
                    
                  </TouchableOpacity>

                </View>

            </View>
            
            <ImageBackground style={{flex: 1, resizeMode: "cover", justifyContent: "center"}} source={require('../Gambar/bgpattren.png')}>
              <ScrollView>
            <View style={{flex:1, marginBottom:20}}>
                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Top')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <DaftarPesanan/> 
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}}>
                        Daftar Pesanan
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Ratingtoko')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <IconRatingToko/>
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Rating Toko
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Populer')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <ProdukPopuler/>
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Produk Populer
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Profile />
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Profile
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Notifikasi')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Notif/>
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Notifikasi
                    </Text> 
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Show Notif')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Notif/>
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Button Show Notifikasi 
                    </Text> 
                    </View>
                </TouchableOpacity> */}
            </View>
            </ScrollView>
            </ImageBackground>
            <LoadingMessage visible={loading} pesan={pesan} />
            <LoadingImage visible={loadImg} />

            <Modal
            animationType="slide" transparent={true}
            visible={visible}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 370,
                width:320,
                position:'absolute',
                backgroundColor: 'white',
                borderRadius:20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12, }}>

                  <View style={{flex:1}}>

                     <View style={{alignItems:'flex-end', justifyContent:'center', marginTop:10, marginRight:10}}>
                      <TouchableOpacity style={{width:38, height:38, backgroundColor:colors.btnActif, borderRadius:100, alignItems:'center', justifyContent:'center'}} onPress={showPopUp}>
                        <IconExit/>
                      </TouchableOpacity>
                    </View>

                    <Text style={{marginLeft:24, marginTop:12, fontSize:14, fontWeight:'bold'}}> Status Toko </Text>
                    <View style={{marginLeft:24, marginTop:12, }}>
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      animation={true}
                      formHorizontal={false}
                      buttonWrapStyle={{marginRight: 10}}
                      onPress={(value) => TerapkanStatus(value)}
                    />
                    </View>

                    <Text style={{marginLeft:24, marginTop:34, fontSize:14, fontWeight:'bold'}}> Metode Belanja </Text>
                    <View style={{marginLeft:24, marginTop:12, }}>

                    <View style={{marginBottom:10,}}>

                    <CircleCheckBox
                      checked={checkTerkirim}
                      onToggle={(checked) => TerapkanStatusKirim(checked)}
                      labelPosition={LABEL_POSITION.RIGHT}
                      label="Dikirim"/>
                    </View>


                    <CircleCheckBox
                      checked={checkMetodBelanja}
                      onToggle={(checked) => TerapkanMetodeBelanja(checked)}
                      labelPosition={LABEL_POSITION.RIGHT}
                      label="Ambil di Toko"/>
                    
                    </View>

                    <View style={{alignItems:'center', justifyContent:'center', marginTop:15}}>
                      <TouchableOpacity style={{width:120, height:38, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={Terapkan}>
                        <Text style={{fontSize:14, color:'white'}}> Terapkan </Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
                </View>    
        </Modal>

        <LoadingSuksesTransaksi visible={LoadingSukses} pesan={pesanStatus} onPress={showMessageSukses} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:colors.bglayout,
      },
    
      ContainerBody:{
        backgroundColor:'red'
      },
    
      Header:{
        height:60,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        backgroundColor:colors.bgPrimary
      },
      Body:{
        height:180,
      }, 
      bodyColom:{
        flexDirection:'column',
        height:140,
        backgroundColor:colors.bgPrimary
      }, 
      bodyRow:{
        flexDirection:'row',
        height:140
      },
      body1:{
        width:130,
      },
      body2:{
        width:180,
        
      },
      body3:{
        width:40,
      },
      bd:{
        width:20,
        alignItems:'center'
      },
      bd1:{
        width:20,
        alignItems:'center',
      },
      bodyRow2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor:colors.bgPrimary,
        paddingRight:24,
        height:40
      },
      rowBodyCard:{
        flexDirection:'row',
        alignItems:'center'
      },
      CrView:{
        shadowColor: "#000",
        backgroundColor:'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:55,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:24,
        marginLeft:24,
        marginTop:17,
        borderRadius:10
      },

      borderProfile:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        borderRadius:100,
        height:77, width:77, 
        alignItems:'center', 
        marginTop:40,
        marginLeft:30, 
        marginRight:15,
        marginBottom:60
      }

})
