import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, SafeAreaView, Dimensions } from 'react-native'
import Api from '../../Api'
import RepoUtil from '../../Helper/RepoUtil'
import { colors } from '../../Utils'
import Header from '../Header'
import ListPemesanan from './ListPemesanan'
import moment from 'moment';
import Toast, { BaseToast } from 'react-native-toast-message';
var uid = '';
var windows = Dimensions.get('window');

const Pemesanan = ({navigation}) => {
    const [produk, setProduk] = useState([]);
    const [session, setSession] = useState(null);
    const [dataKosong, setDataKosong ] = useState(false);
    const [pesan, setPesan] = useState('');


    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        setSession(dataRepo);
        if(dataRepo != null){
            uid = dataRepo.response.uid;
        }
        getData();
      };

    useEffect(() => {
        loadSession();
    },[]);

    const KirimData = (kode) => {
    RepoUtil.StoreAsString('@kode', kode);
    navigation.navigate('Top')
    console.log('da: ', kode)
    }

    const getData = () => {

        const param = {
            uid: uid
        }

        Api.post('transaksi/pemesanan', param)
        .then(async(body) => {
            let res = body.data
            let metadata = res.metadata

            if(metadata.status === 200) {
                setProduk(res.response);
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
            else {
                //loadSession();
                //alert(metadata.message);
                setPesan(metadata.message);
                setDataKosong(true);
            }
        })
    }

    const renderItem = ({item}) => {

        if(item.label === 'Express'){
            return(
                <ListPemesanan
                key={item.id}
                kode={item.kode_sesi_pengiriman}
                metode={item.label}
                total={item.pesanan_baru}
                image={require('../../imgSvg/icon_metod_belanja.png')}
                stylebg={{
                    alignItems:'center', 
                    justifyContent:'center', 
                    marginTop:10, 
                    marginBottom:6, 
                    height:26, 
                    width:85, 
                    marginRight:12, 
                    borderRadius:15, 
                    shadowOpacity: 0.25, 
                    flexDirection:'row',
                    shadowRadius: 3.20,  
                    elevation:3,
                    backgroundColor:'#31B057'}}
                onPress={() => KirimData(item.kode_sesi_pengiriman)}
                insertAt={item.pesanan_selesai}>
                </ListPemesanan>
            )
        } else if(item.label === 'Pickup') {
            return(
                <ListPemesanan
                key={item.id}
                kode={item.kode_sesi_pengiriman}
                metode={item.label}
                total={item.pesanan_baru}
                image={require('../../imgSvg/icon-pickup.png')}
                stylebg={{
                    alignItems:'center', 
                    justifyContent:'center', 
                    marginTop:10, 
                    marginBottom:6, 
                    height:26, 
                    width:85, 
                    marginRight:12, 
                    borderRadius:15, 
                    shadowOpacity: 0.25, 
                    flexDirection:'row',
                    shadowRadius: 3.20,  
                    elevation:3,
                    backgroundColor:'#FF8547'}}
                    onPress={() => KirimData(item.kode_sesi_pengiriman)}
                insertAt={item.pesanan_selesai}>
                </ListPemesanan>
            )
        } else {

            var label = moment(item.label, "HH:mm:ss").format("HH:mm");
            return(
                <ListPemesanan
                key={item.id}
                kode={item.kode_sesi_pengiriman}
                metode={label}
                total={item.pesanan_baru}
                image={require('../../imgSvg/clock1.png')}
                stylebg={{
                    alignItems:'center', 
                    justifyContent:'center', 
                    marginTop:10, 
                    marginBottom:6, 
                    height:26, 
                    width:85, 
                    marginRight:12, 
                    borderRadius:15, 
                    shadowOpacity: 0.25, 
                    flexDirection:'row',
                    shadowRadius: 3.20,  
                    elevation:3,
                    backgroundColor:'gray'
                    }}
                onPress={() => KirimData(item.kode_sesi_pengiriman)}
                insertAt={item.pesanan_selesai}>
                </ListPemesanan>
            )
        }
        console.log('item: ', item.label);
    }
    return (
        
        <View style={{flex:1, width:windows.width, height:'100%', backgroundColor:'white' }}>
            <Header title='Pemesanan' onPress={()=> navigation.goBack()}/>

            <View style={{alignItems:'center', flexDirection:'column', flex:1, justifyContent:'center'}}> 
            {dataKosong &&  (
            <View style={{flex:1, position:'absolute',  padding:10, alignItems:'center',}}>
            <Image source={require('../../imgSvg/icon_message_error.png')} style={{height:200, width:260}} />
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20, marginTop:24 }} >Maaf</Text>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', textTransform:'capitalize', fontSize:14 }} >{pesan}</Text>
            <Text style={{textAlign:'center', color:'#7A7A7A', fontWeight:'bold', textTransform:'capitalize', fontSize:14, marginTop:10, width:'90%',}}>Tetap semangat dan terus kembangkan tokomu.</Text>
            </View>
            )}

            
            <FlatList
                data={produk}
                renderItem={(item) => renderItem(item)}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.kode}
                style={{flex:1, width:'100%',}}
                />
            </View>

            
            
            <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
        
    )
}

export default Pemesanan
