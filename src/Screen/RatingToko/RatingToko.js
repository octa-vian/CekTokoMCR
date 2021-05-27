import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, ScrollView, SafeAreaView, Dimensions, Modal } from 'react-native'
import Api from '../../Api'
import { IconPin, RatingKosong } from '../../imgSvg'
import LoadingImage from '../../Loading/LoadingImage'
import LoadingImageMessage from '../../Loading/LoadingImageMessage'
import LoadingMessage from '../../Loading/LoadingMessage'
import { colors } from '../../Utils'
import Header from '../Header'
import ListRatingToko from './ListRatingToko'
//import ProgressBar from 'react-native-progress/Bar';
import { ProgressBar, Colors} from 'react-native-paper';
import HeaderHome from '../HeaderHome'
import Toast from 'react-native-toast-message';
import RepoUtil from '../../Helper/RepoUtil';
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

import exampleImage from '../../imgSvg/Icon_place_Holder_Toko.jpeg'
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

var Rharga=0;
var Rbarang=0;
var Rpelayanan=0;

var Nharga =0;
var Nproduk =0;
var Npelayanan =0;

var windows = Dimensions.get('window');

const RatingToko = ({navigation}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pesan, setPesan] = useState('')
    const [loadImg, setLoadImg] = useState(false); 
    const [session, setSession] = useState(null);
    const [dataRating, setDataRating] = useState(0);
    const [ratingHarga, setRatingHarga] = useState(0);
    const [ratingBarang, setRatingBarang] = useState(0);
    const [rating_pelayanan, setRatingPelayanan] = useState(0);
    const [dataKosong, setDataKosong ] = useState(false);
    const [emptyData, setEmptyData] = useState(false);
    const [imgFoto, setFoto] = useState('');
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

    useEffect(() =>{
        loadSession();
        setLoadImg(true);
    },[])

    useEffect(() =>{
        setTimeout(() =>{
            setLoadImg(false);
        }, 2500)
    },[])

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        
        if(dataRepo != null){
            console.log('dataRepo', dataRepo)
            setSession(dataRepo);
            getData();
            getDataProfile();
        }
      };

    const getData = () => {
        Api.get('rating')
        .then( async (response) =>{
            let res = response.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                setPesan(metadata.message);
                setData(res.response);
                setLoadImg(false);
                setDataKosong(false);
                setEmptyData(true);
                
            } else if (metadata.status === 401){
                RepoUtil.RemoveValue('@session');
                navigation.replace('Login');
                setLoadImg(false);
                Toast.show({
                    text1: 'Terjadi Kesalahan 🙏🏻',
                    text2: metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
                  });
            }
            else{
                setPesan(metadata.message);
                //setLoading(true);
                setDataKosong(true)
                setEmptyData(false);
                setLoadImg(false);
                // Toast.show({
                //     text1: 'Maaf 🙏🏻',
                //     text2: metadata.message,
                //     position: 'bottom',
                //     type: 'error',
                //     visibilityTime:2000,
                //   });
            }
        })
        .catch(err => console.log('err: ', err))
    }


    const getDataProfile = () => {
        Api.get('profile/profile_merchant')
        .then(async (response) => {
            var rating = [];
            let res = response.data;
            let metadata = res.metadata;
            let resData = res.response;
            console.log("res: ", res);

            if(metadata.status === 200){
                setProfile(resData);
                //setDataRating(resData.rating);
                setFoto(resData.logo_merchant);
                rating = resData.rating;
                var harga = parseInt(rating.rate_harga) * 2;
                var Barang = parseInt(rating.rate_barang) * 2;
                var pelayanan = parseInt(rating.rate_pelayanan) * 2;
                Nharga = rating.rate_harga;
                Nproduk = rating.rate_barang;
                Npelayanan = rating.rate_pelayanan;
                Rharga = harga * 0.1;
                Rbarang = Barang * 0.1;
                Rpelayanan = pelayanan * 0.1;
                setRatingBarang(Rbarang);
                setRatingHarga(Rharga);
                setRatingPelayanan(Rpelayanan);
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
                setLoading(false);
                setPesan(metadata.message);
            }
        })
        .catch((err) => {
            console.log('err: ', err)
            setLoading(false);
        } )
    }

    const renderItem = ({item}) => {

            return (
            <ListRatingToko 
            key={item.id}
            kode={item.no_order} 
            nama={item.nama}
            Kkelengkapan={item.review_pelayanan}
            Kharga={item.review_harga}
            Kpelayanan={item.review_pelayanan}
            Rkelengkapan={item.rating_barang}
            Rharga={item.rating_harga}
            Rpelayanan={item.rating_pelayanan}
            tanggal={item.insert_at}>
            </ListRatingToko>
            );

    };

    return (
        <View style={{flex:1,}}>
            <View style={{flex:1, backgroundColor:'white', 
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            
            elevation: 3,}}>
            <HeaderHome title="Rating Toko" />
            <ScrollView>
            <View style={{flexDirection:'row', marginLeft:16, marginTop:30, marginRight:16, alignItems:'center'}}>
            <View style={{height:55, width:55, justifyContent:'center', alignItems:'center', borderRadius:100}}>
                <Image source={imgFoto != '' ? {uri:imgFoto}: {uri:exampleImageUri}} style={{height:55, width:55, borderRadius:100}}/>
            </View>
            <View style={{flex:1, justifyContent:'center', marginLeft:16}}>
            <Text style={{fontWeight:'bold', fontSize:16, marginBottom:4, width:'80%'}}>{dataProfile.nama_merchant}</Text>
            <View style={{flexDirection:'row', alignItems:"center"}}>
            <IconPin/>
            <Text style={{textTransform:'capitalize', width:'80%', fontSize:12, marginLeft:2, color:'gray'}}>{dataProfile.alamat_merchant}</Text>
            </View>
            </View>
            </View>

            <View style={{alignItems:'center', marginLeft:16, marginRight:16, }}>
            <View style={{marginTop:32, backgroundColor:'#FAFAFA', elevation:3, width:'100%', borderRadius:20}}>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:16, marginRight:16, marginTop:16}}>
                    <Image source={require('../../imgSvg/icon-produk.png')} style={{height:56, width:56}}/>
                    <View style={{flex:1, marginLeft:20}}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}> Kelengkapan Produk </Text>
                        <View style={{marginTop:12, justifyContent:'center', paddingLeft:4}}>
                        <ProgressBar progress={ratingBarang} color={'#31B057'} style={{borderRadius:10, height:6, backgroundColor:colors.bglayout, elevation:1}} />
                        </View>
                        <View style={{marginTop:12, paddingLeft:4, flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../imgSvg/icon_heart.png')} style={{height:20, width:20}}/>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:8}}>{Nproduk}.0</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:2}}>/</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:2}}>5.0</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:16, marginRight:16, marginTop:34}}>
                    <Image source={require('../../imgSvg/icon-harga.png')} style={{height:56, width:56}}/>
                    <View style={{flex:1, marginLeft:20}}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}> Harga </Text>
                        <View style={{marginTop:12, justifyContent:'center', paddingLeft:4}}>
                        <ProgressBar progress={ratingHarga} color={'#31B057'} style={{borderRadius:10, height:6, backgroundColor:colors.bglayout, elevation:1}} />
                        </View>
                        <View style={{marginTop:12, paddingLeft:4, flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../imgSvg/icon_heart.png')} style={{height:20, width:20}}/>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:8}}>{Nharga}.0</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:2}}>/</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:2}}>5.0</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:16, marginRight:16, marginTop:34, marginBottom:16}}>
                    <Image source={require('../../imgSvg/icon-pelayanan.png')} style={{height:56, width:56}}/>
                    <View style={{flex:1, marginLeft:20}}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}> Pelayanan </Text>
                        <View style={{marginTop:12, justifyContent:'center', paddingLeft:4}}>
                        <ProgressBar progress={rating_pelayanan} color={'#31B057'} style={{borderRadius:10, height:6, backgroundColor:colors.bglayout, elevation:1}} />
                        </View>
                        <View style={{marginTop:12, paddingLeft:4, flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../imgSvg/icon_heart.png')} style={{height:20, width:20}}/>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:8}}>{Npelayanan}.0</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:2}}>/</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#7A7A7A', marginLeft:2}}>5.0</Text>
                        </View>
                    </View>
                </View>
            </View>
            </View>

            <View style={{marginLeft:16, marginTop:24,}}>
            <Text style={{fontSize:16, fontWeight:'bold' }}>Detail Rating</Text>
            </View>

            {dataKosong? (
            <View style={{padding:10, alignItems:'center', width:windows.width, height:'100%'}}>
            <RatingKosong/>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20, marginTop:24 }} >Maaf</Text>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', textTransform:'capitalize', fontSize:14 }} >Belum Ada Rating</Text>
            <Text style={{textAlign:'center', color:'#7A7A7A', fontWeight:'bold', textTransform:'capitalize', fontSize:14, marginTop:10, width:'90%',}}>Rating toko masih belum ada nih, yuk minta customer buat isi ratingnya</Text>
            </View>
            ):null}
            
            {emptyData? (
            <View style={{marginTop:16, marginLeft:16, marginRight:16, marginBottom:16}}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.kode}
            showsVerticalScrollIndicator={false}
            />
            </View>
            ): null}
            
            <LoadingMessage visible={loading} pesan={pesan} />
            {/* <LoadingImage visible={loadImg} /> */}

            <Modal
            animationType='fade' transparent={true}
            visible={loadImg}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 100,
                width:100,
                position:'absolute',
                alignItems: 'center',
                justifyContent:'center', 
                elevation: 12, }}>
                {/* <Image source={require('../imgSvg/maskot.png')} style={{height:55, width:55, marginTop:8}} /> */}
                {/* <ActivityIndicator size='large' color={colors.btnActif} /> */}
                <BarIndicator color={colors.btnActif} size={60} />
                {/* <Text style={{marginTop:6}}>Loading...</Text> */}
                </View>
                </View>
                    
            </Modal>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)}/>
            </View>
            
        </View>
    )
}

export default RatingToko
