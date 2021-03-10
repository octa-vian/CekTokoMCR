import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity, ToastAndroid, Platform, Alert, Modal, ActivityIndicator, Dimensions, Animated, TextInput } from 'react-native'
import Api from '../../Api'
import { GambarKamera, Notif, RatingToko, ShopeNew, Stars, Str } from '../../imgSvg'
import { colors } from '../../Utils'
import Header from '../Header'
import ProgressDialog from 'react-native-progress-dialog';
import LoadingImage from '../../Loading/LoadingImage'
import ButtonList from '../../Button/ButtonPopup/ButtonList'
import RepoUtil from '../../Helper/RepoUtil'
import LoadingMessage from '../../Loading/LoadingMessage'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select'
import LoadingSukses from '../../Loading/LoadingSukses'
import LoadingSuksesTransaksi from '../../Loading/LoadingSuksesTransaksi'
import {launchImageLibrary} from 'react-native-image-picker';
import { IconExit } from '../../IconSvg'
import LoadingFaildProsses from '../../Loading/LoadingFaildProsses'
const { width, height } = Dimensions.get('window');

const UbahProfile = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [loadingImage, setImageLoading] = useState(false);
    const [pesan, setPesan] =useState('');
    const [getPopup, setPopup] = useState(false);
    const [session, setSession] = useState(null);
    const [show, setShow] = useState(false);
    const [UbahProfile, setUbahProfile] = useState();
    const [name, setNama] = useState('');
    const [noHp, setNohp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [provinsi, setProfinsi] = useState('');
    const [kota, setKota] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [jamBuka, setJambuka] = useState();
    const [jamTutup, setJamTutup] = useState();
    const [updateProduk, setProdukUpdate] = useState();
    const [idProvensi, setIdProvensi] = useState();
    const [idKota, setIdKota] = useState();
    const [idKecamatan, setIdKecamatan] = useState();
    const [idKelurahan, setIdKelurahan] = useState();

    const [date, setDate] = useState(new Date(1598051730000));
    const [dateLast, setDateLast] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [showTime, setShowTime] = useState(false);
    const [showTime1, setShowTime1] = useState(false);
    const [jBuka, setJbuka] = useState();
    const [jTutup, setJtutup] = useState();
    const [visible, setVisible] = useState(false);

    const [sukses, setSukses] = useState(false);
    const [jmBuka, setjmbuka] = useState();

    const [imgProfile, setImgProfile] = useState(null);
    const [showError, setError] = useState(false);


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

    const param = {
        nama_merchant:name,
        no_hp:noHp,
        alamat:alamat,
        provinsi:idProvensi,
        kota:idKota,
        kecamatan:idKecamatan,
        kelurahan:idKelurahan,
        jam_buka:jamBuka,
        jam_tutup:jamTutup,
    }

    var imageName = '', imageFile = '';

    console.log('set: ', param);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowTime(Platform.OS === 'ios');
        setDate(currentDate);
        setJambuka(moment(currentDate).format('HH:mm:ss'));
        setJbuka(moment(currentDate).format('HH:mm'));
      };

    const onChange1 = (event, selectedDate) => {
    const currentDate2 = selectedDate || dateLast;
    setShowTime1(Platform.OS === 'ios');
    setDateLast(currentDate2);
    setJamTutup(moment(currentDate2).format('HH:mm:ss'));
    setJtutup(moment(currentDate2).format('HH:mm'));
    };

      const showMode = (currentMode) => {
        setShowTime(true);    
        setMode(currentMode);
      };

      const showMode1 = (currentMode) => {
        setShowTime1(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

      const showTimepicker1 = () => {
        showMode1('time');
      };

      const setShowUploadImg = () => {
          setVisible(!visible);
      }

    const [animatePress, setAnimatePress] = useState(new Animated.Value(1))

    const animateIn = () => {
    Animated.timing(animatePress, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true // Add This line
    }).start();
    }

    console.log(dataProfile.nama_pic);

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
     }, []);

      const confirmLogout = () => {
        Alert.alert(
          'Perhatian',
          'Apakah Anda Yakin Akan Logout ?',
          [
            {
              text: 'Batal',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ya',
              onPress: async () => {
                await RepoUtil.RemoveValue('@session');
                navigation.replace('Login');
              },
            },
          ],
          {cancelable: false},
        );
      };

    
    const getKirim = () => {
        Api.post('profile/update_profile_merchant', param)
        .then(async(body) => {
        let res = body.data;
        let metadata = res.metadata;
        let response = res.response;

        if(metadata.status === 200){
            setPesan(metadata.message);
            setSukses(true);
            setShow(false);
            getData();
        } else{
            //alert(metadata.message);
        }
        })
    }

    const getProvinsi = () => {
        Api.get('master/provinsi')
        .then(async (body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                var dataArray = [];
                response.map((item) =>{
                    dataArray.push({
                        value: item.id,
                        label: item.provinsi,
                        
                    })
                })
                setProfinsi(dataArray);
                setIdProvensi('0');
                getKota();
            }
        })
    }

    

    

    const getKota = (value) => {
        
        const IdKota = {
            id_provinsi:value
        } 
        console.log('prov: ', IdKota);

        Api.post('master/kota', IdKota)
        .then(async (body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                var dataArray = [];
                response.map((item) => {
                    dataArray.push({
                        value: item.id,
                        label: item.kota
                    })
                })
                setKota(dataArray);
                getKecamatan();
            }
        })
    }


    

    const getKecamatan = (value) => {
        const IdKecamatan = {
            id_kota:value
        }
        console.log('idKot: ', IdKecamatan);

        Api.post('master/kecamatan', IdKecamatan)
        .then(async (body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                var dataArray = [];
                response.map((item) => {
                    dataArray.push({
                        value: item.id,
                        label: item.kecamatan
                    })
                })
                setKecamatan(dataArray);
                getKelurahan();
            }
        })
    }

    const getKelurahan = (value) => {
        const IdKelurahan = {
            id_kecamatan:value
        }
        console.log('idKec: ', IdKelurahan);

        Api.post('master/kelurahan', IdKelurahan)
        .then(async (body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                var dataArray = [];
                response.map((item) => {
                    dataArray.push({
                        value: item.id,
                        label: item.kelurahan
                    })
                })
                setKelurahan(dataArray);
            }
        })
    }

      

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
                setPesan(metadata.message);

                provinsi.map((item) => {
                    if(item.label == resData.provinsi){
                        setIdProvensi(item.value);
                    }
                })
                
            } else{
                setLoading(false);
                setImageLoading(false);
                setPesan(metadata.message);
            }
        })
        .catch((err) => {
            console.log('err: ', err)
            setLoading(false);
        } )
    }

    const toggleModal = () => {
        setPopup(!getPopup);
      };
    
    const showUpdateProfile = () => {
        setShow(!show);
        getProvinsi();
    }

      useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    },[])

    useEffect(() => {
        getData();
        //setPopup(true);
        setImageLoading(true);
      }, []);

    const viSibleError = () => {
        setError(!showError);
    }

    const visibleSukses = () => {
        setSukses(!sukses);
    }


      const getImage = () => {

        const options = {quality: 0.8, maxWidth: 720, maxHeight: 720}
        launchImageLibrary(options, (response) => {
            console.log('image data', response);
            if(response.didCancel || response.error){

                alert('Silahkan pilih gambar terlebih dahulu');
            } else {

                imageName = response.fileName
                imageFile = response; 
                setImgProfile(response);
                onContinueFile();

            }
        })
    }

    const onContinueFile = async () => {
        //const formData = createFormData(posterFile);
        const data = new FormData();
        data.append('files', {
            name: imageName,
            type:"image/jpeg",
            uri: Platform.OS === 'android' ? imageFile.uri : imageFile.uri.replace('file://', '') 
        });
        data.append('filename',imageName);
        data.append('name','files');

        console.log('data request', data);
        Api.post('profile/update_foto_merchant', data, 
        {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }

        })
        .then((response) => {
            const metadata = response.data.metadata;
            const respon = response.data.response;

            if(metadata.status == 200){
  
                //setUploadImgProfile(respon.nama_profil);
                //setUploadFolderProfile(respon.folder_profil);
                setPesan(metadata.message);
                setSukses(true);                    
    
            }else{
                setPesan(metadata.message);
                setError(true);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }



    return (
        <View style={{flex:1, backgroundColor:colors.bglayout}}>
            <Header title="Profile" onPress={() => navigation.goBack()} gambar={require('../../Gambar/setting.png')} drawer={toggleModal} />

            <ScrollView>
                <ImageBackground source={require('../../Gambar/bgprofilehome.png')} style={{ alignItems:'center', height:120, paddingTop:37, paddingBottom:24, paddingRight:42, zIndex:0}}>
                </ImageBackground>
                
                <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    position:'absolute',
                    top:50,
                    marginLeft:35,
                    backgroundColor: 'transparent',}} >

                <ImageBackground
                    source={{uri: dataProfile.logo_merchant ? dataProfile.logo_merchant: null}}
                    borderRadius={100}
                    style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 7,
                    overflow: 'visible',}}>

                    <TouchableOpacity style={styles.btnProfile} onPress={getImage}>
                       <GambarKamera height={30} width={30} />
                    </TouchableOpacity>
                    
                </ImageBackground>
                </View>

                <ImageBackground source={require('../../Gambar/bgpattren.png')} style={{paddingTop:60}}>
                    
                        <View style={{marginLeft:20, marginRight:20}}>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> Nama Merchant </Text>
                        <Text style={{marginTop:20, fontSize:14, textTransform:'uppercase', flex:1, }} numberOfLines={2}> {dataProfile.nama_merchant} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> No Hp Merchant </Text> 
                        <Text style={{marginTop:20, fontSize:14, flex:1, }} numberOfLines={2}> {dataProfile.no_hp_merchant} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> Alamat Merchant </Text>
                        <Text style={{marginTop:20, fontSize:14, textTransform:'capitalize', flex:1 }}>{dataProfile.alamat_merchant} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> Kelurahan </Text>
                        <Text style={{marginTop:20, fontSize:14, textTransform:'capitalize', flex:1}} numberOfLines={2}> {dataProfile.kelurahan} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> Kecamatan </Text>
                        <Text style={{marginTop:20, fontSize:14, textTransform:'capitalize', flex:1 }} numberOfLines={2} > {dataProfile.kecamatan} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> Kota </Text>
                        <Text style={{marginTop:20, fontSize:14, textTransform:'capitalize', flex:1 }} numberOfLines={2}> {dataProfile.kota} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold', flex:1}}> Provinsi </Text>
                        <Text style={{marginTop:20, fontSize:14, textTransform:'capitalize', flex:1}} numberOfLines={2} > {dataProfile.provinsi} </Text>
                        </View>

                        </View>

                    <View style={{borderBottomColor: '#D4DFE6',borderBottomWidth: 2, marginVertical:10, marginLeft:23, marginRight:23, marginTop:28, marginBottom:28 }}>
                    </View>

                    <Text style={{marginLeft:20, marginRight:20, fontSize:16, fontWeight:'bold'}}> Jam Oprasional </Text>
                    <View style={{flexDirection:'row', marginBottom:30}}>
                    <View style={{marginLeft:20, flex:1}}>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold'}}> Jam Buka </Text>
                        <Text style={{marginTop:20, fontSize:14, fontWeight:'bold'}}> Jam Tutup </Text>
                    </View>

                    <View style={{flex:1}}>
                        <Text style={{marginTop:20, fontSize:14, }}>{dataProfile.jam_buka}</Text>
                        <Text style={{marginTop:20, fontSize:14, }}>{dataProfile.jam_tutup}</Text>
                    </View>
                    </View>

                </ImageBackground>
                <LoadingImage visible ={loadingImage} />
                <LoadingMessage visible={loading} pesan={pesan} />
                <ButtonList onPress={() => confirmLogout()} visible={getPopup} back={toggleModal}/>
            </ScrollView>

        {/* <View style={styles.borderBtn}>
            <TouchableOpacity style={styles.BtnUbahProfile} onPress={showUpdateProfile}>
                <Text style={{fontSize:16, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Ubah Profile </Text>
            </TouchableOpacity>
        </View> */}
        
        {/* <SlidingPanel
            headerLayoutHeight = {48}
            headerLayout = { ()=>
            <View style={styles.headerLayoutStyle}>
                <Text style={styles.commonTextStyle}>Ubah Profil</Text>
            </View>
            }
            slidingPanelLayout = { () =>
            <View style={styles.slidingPanelLayoutStyle}>
                <Text style={styles.commonTextStyle}>The best thing about me is you</Text>
            </View>
            }
        /> */}

        <Modal animationType='slide' transparent={true}
            visible={show}>
            <View style={{flex:1,}}>
            <View style={{flex:1, marginTop:200, backgroundColor:'rgba(52, 52, 52, 0.6)', borderTopLeftRadius:15, borderTopRightRadius:15 }}>
            <View style={{flexDirection:'row'}}>
            </View>
            
            <View style={{alignItems:'center', justifyContent:'center', marginTop:50, marginBottom:10}}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:20, marginRight:20, color:'white', textTransform:'uppercase'}}> Ubah Profile </Text>
            </View>

            <ScrollView>
            <View style={{marginTop:44}}>
            <View style={{backgroundColor:'white', borderRadius:12, marginLeft:10, marginRight:10, paddingTop:12, paddingBottom:12}}>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Nama Merchant</Text>
            <TextInput 
            onChangeText={(text) => setNama(text)}
            value={name}  
            placeholder={dataProfile.nama_merchant}
            style={{height:37, backgroundColor:'#FFF3F5',  borderColor:'#FFF3F5', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontSize:14}}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>No. Hp</Text>
            <TextInput 
            onChangeText={(text) => setNohp(text)}
            value={noHp}
            placeholder={dataProfile.no_hp_merchant}
            style={{height:37, backgroundColor:'#FFF3F5', borderColor:'#FFF3F5', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontSize:14}} keyboardType={'number-pad'}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>ALamat</Text>
            <TextInput 
            onChangeText={(text) => setAlamat(text)}
            value={alamat}
            placeholder={dataProfile.alamat_merchant}
            style={{height:37, backgroundColor:'#FFF3F5', borderColor:'#FFF3F5', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontSize:14}}>
            </TextInput>
            </View>

            <View style={{backgroundColor:'white', borderRadius:12, marginLeft:10, marginRight:10, paddingTop:12, paddingBottom:12, marginTop:20}}>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Provinsi</Text>

            <RNPickerSelect
            onValueChange={(value) => {
                setIdProvensi(value);
                getKota(value);
            }}
            value={provinsi.length > 0 ? idProvensi: false}
            placeholder={{
                label:'',
                value:''
            }}
            style={{inputAndroid:{
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor:'#FFF3F5',
                marginTop:8,
                marginBottom:10,
                height:37,
                borderRadius:4,
                marginLeft:37, marginRight:37,
                paddingHorizontal: 10,
                paddingVertical: 8,
                placeholderColor: 'black',
                fontSize:12,
                borderWidth: 0.5,
                color: 'black',
                fontWeight:'bold'

              }, inputIOS:{
                justifyContent: 'center',
                textAlign:'left',
                fontSize:12,
                fontWeight:'bold',
                placeholderColor: 'black',
                height:37,
                width:299,
                paddingLeft:10,
                borderWidth: 1,
                borderRadius:4,
                color: 'black',
                fontWeight:'bold'
              }
            }}
            items={provinsi} />           

            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Kota</Text>
            <RNPickerSelect
            onValueChange={(value) => {
                setIdKota(value);
                getKecamatan(value);
            }}
            placeholder={{
                label:'',
                value:''
            }}
            style={{inputAndroid:{
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor:'#FFF3F5',
                marginTop:8,
                marginBottom:10,
                height:37,
                borderRadius:4,
                marginLeft:37, marginRight:37,
                paddingHorizontal: 10,
                paddingVertical: 8,
                placeholderColor: 'black',
                fontSize:12,
                borderWidth: 0.5,
                color: 'black',

              }, inputIOS:{
                justifyContent: 'center',
                textAlign:'left',
                fontSize:12,
                fontWeight:'bold',
                placeholderColor: 'black',
                height:37,
                width:299,
                paddingLeft:10,
                borderWidth: 1,
                borderRadius:4,
                color: 'black',
              }
            }}
            items={kota} /> 

            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Kecamatan</Text>
            <RNPickerSelect
            onValueChange={(value) => {
                setIdKecamatan(value);
                getKelurahan(value);
            }}
            placeholder={{
                label:'',
                value:''
            }}
            style={{inputAndroid:{
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor:'#FFF3F5',
                marginTop:8,
                marginBottom:10,
                height:37,
                borderRadius:4,
                marginLeft:37, marginRight:37,
                paddingHorizontal: 10,
                paddingVertical: 8,
                placeholderColor: 'black',
                fontSize:12,
                borderWidth: 0.5,
                color: 'black',

              }, inputIOS:{
                justifyContent: 'center',
                textAlign:'left',
                fontSize:12,
                fontWeight:'bold',
                placeholderColor: 'black',
                height:37,
                width:299,
                paddingLeft:10,
                borderWidth: 1,
                borderRadius:4,
                color: 'black',
              }
            }}
            items={kecamatan} /> 

            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Kelurahan</Text>
            <RNPickerSelect
            onValueChange={(value) => {
                setIdKelurahan(value);
            }}
            placeholder={{
                label:'',
                value:''
            }}
            style={{inputAndroid:{
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor:'#FFF3F5',
                marginTop:8,
                marginBottom:10,
                height:37,
                borderRadius:4,
                marginLeft:37, marginRight:37,
                paddingHorizontal: 10,
                paddingVertical: 8,
                placeholderColor: 'black',
                fontSize:12,
                borderWidth: 0.5,
                color: 'black',

              }, inputIOS:{
                justifyContent: 'center',
                textAlign:'left',
                fontSize:12,
                fontWeight:'bold',
                placeholderColor: 'black',
                height:37,
                width:299,
                paddingLeft:10,
                borderWidth: 1,
                borderRadius:4,
                color: 'black',
              }
            }}
            items={kelurahan} /> 
            </View>

            <View style={{backgroundColor:'white', borderRadius:12, marginLeft:10, marginRight:10, paddingTop:12, paddingBottom:12, marginTop:20}}>
            <View style={{flexDirection:'row', alignItems:'center',}}>

            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:'black'}}>Jam Buka</Text>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', height:42, width:130, backgroundColor:'#FFF3F5', borderRadius:4, marginTop:8, marginBottom:20,}} onPress={showTimepicker}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>{jBuka}</Text>
            </TouchableOpacity>
            </View>

            <View style={{alignItems:'center', flex:1}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:'black'}}>Jam Tutup</Text>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', height:42, width:130, backgroundColor:'#FFF3F5', borderRadius:4, marginTop:8, marginBottom:20,}} onPress={showTimepicker1}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>{jTutup}</Text>
            </TouchableOpacity>


            </View>
            </View>
            </View>

            </View>
            </ScrollView>

                <View style={{alignItems:'center', justifyContent:'center', marginTop:10, marginBottom:20, flexDirection:'row'}}>
                <TouchableOpacity style={{height:38, margin:10, backgroundColor:colors.btnBatal, borderRadius:8, alignItems:'center', justifyContent:'center', flex:1}} onPress={showUpdateProfile}>
                    <Text style={{fontSize:12, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Batal </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:38, margin:10, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center', flex:1}} onPress={getKirim}>
                    <Text style={{fontSize:12, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Simpan </Text>
                </TouchableOpacity>
                </View>

            </View>
            </View>
        </Modal>

        {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}  

      {showTime1 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateLast}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange1}
        />
      )}      

      <LoadingSuksesTransaksi visible={sukses} pesan={pesan} onPress={() => setSukses(false)}/>

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
                      <TouchableOpacity style={{width:38, height:38, backgroundColor:colors.btnActif, borderRadius:100, alignItems:'center', justifyContent:'center'}} onPress={setShowUploadImg}>
                        <IconExit/>
                      </TouchableOpacity>
                    </View>

                    <View style={{alignItems:'center', justifyContent:'center', marginTop:15}}>
                      <TouchableOpacity style={{width:120, height:38, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={setImageLoading}>
                        <Text style={{fontSize:14, color:'white'}}> Terapkan </Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
                </View>    
        </Modal>

        <LoadingFaildProsses visible={showError} pesan={pesan} onPress={viSibleError}/>
        <LoadingSuksesTransaksi visible={sukses} pesan={pesan} onPress={visibleSukses} />
        
        </View>
    )
}

export default UbahProfile

const styles = StyleSheet.create({

    pictureProf:{
        shadowColor: "#000",
        position:'absolute',
        zIndex:1,
        top:50,
        marginTop:10,
        marginLeft:35,
        backgroundColor:'white',
        height:100,
        width:100,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        borderRadius:100,
        elevation: 16,
        },
    btnProfile:
        {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 58,
            left:67,
            width: 35,
            height: 35,
            borderRadius: 50 / 2,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 7,},

    BtnUbahProfile:{
        shadowColor: '#000',
        backgroundColor:colors.bgPrimary,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        margin:20,
        height:41, width:332,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    borderBtn:{
        shadowColor: "#000",
        alignItems:'center',
        backgroundColor:'white',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    headerLayoutStyle: {
        width, 
        height: 48, 
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        backgroundColor:colors.btnActif, 
        justifyContent: 'center', 
        alignItems: 'center',
      },
      slidingPanelLayoutStyle: {
        width, 
        height, 
        backgroundColor:'white', 
        justifyContent: 'center', 
        alignItems: 'center',
      },
      commonTextStyle: {
        color: 'white', 
        textTransform:'uppercase',
        fontSize: 18,
      },
})
