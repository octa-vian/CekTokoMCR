import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, RefreshControl, Dimensions } from 'react-native'
import Api from '../../Api'
import RepoUtil from '../../Helper/RepoUtil'
import { IconStatusError } from '../../imgSvg'
import LoadingImage from '../../Loading/LoadingImage'
import { colors } from '../../Utils'
import ListPesananBaru from '../ListDaftarPesanan/ListPesananBaru'
import Toast, { BaseToast } from 'react-native-toast-message';

var kodeSesi = '';
var windows = Dimensions.get('window');

const PesananBaru = ({navigation}) => {

    const [data, setData] = useState([]);
    const [dataKosong, setDataKosong ] = useState(false);
    const [pesan, setPesan] = useState('');
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(10);
    const [refreshing, setRefresh] = useState(false);
    const [isLast, setLast] = useState(false);
    const [session, setSession] = useState(null);
    const [jumlahItem, setJumlahItem] = useState(0);

    

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@kode');
        console.log('data Repo', dataRepo);
        setSession(dataRepo);
        if(dataRepo != null){
            kodeSesi = dataRepo;
            //alert(dataRepo);
            console.log('kodeSesi: ', kodeSesi);
            setLoading(false);
        }
         getData();
        
      };

    //const {kodeSesi} = route.params;

    useEffect(() => {
        loadSession();
        //getData();
    },[])

    

    const getData = () => {
        const param = {
            kode_sesi_pengiriman:kodeSesi,
            start:offset,
            count:length
        }
        console.log(param)

        Api.post('transaksi/new_order', param)
        .then(async (respon) => {
            let body = respon.data;
            let metadata = body.metadata;
            let response = body.response;

            if(metadata.status === 200){
                setData(body.response);
                //alert(metadata.message);
                await setData(offset == 0 ? response : [...data, ...response]);
                await setOffset(response.length != 0 ? (offset + response.length) : offset);
                await setLast(response.length != length ? true : false);
                setLoading(false);
                setDataKosong(false);
                setJumlahItem(response.length);
                
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
                //alert(metadata.message);
                setPesan(metadata.message);
                setDataKosong(true);
                setLoading(false);
            }
        })
        .catch((error) => {
            //console.log(error);
            //setLoading(false);
            setLoading(false);
        })
    }

    const loadMore = async() => {
        if(isLast === false){
            //await setOffset(offset + length);
            //setLoading(true);
            await getData();
        }
      }

      const onRefresh = async () =>{
        await setOffset(0)
        await setData([])
        // await setRefresh(true)
        getData();
        await setLast(false)
        await loadMore()
      }

      const dataProd =[
        {
            no_order:'001', tgl_pengiriman:'september 2021', jam_dari_pengiriman:'09:00', jam_sampai_pengiriman:'12:00', insert_at:'09 feb 2021', metode_belanja:'Express', total:''
        }, 
        {
            no_order:'001', tgl_pengiriman:'september 2021', jam_dari_pengiriman:'09:00', jam_sampai_pengiriman:'12:00', insert_at:'09 feb 2021', metode_belanja:'Pick-Up', total:''
        }
      ] 

    const renderItem = ({item}) => {

        if(item.total === ''){
            item.total = '0'
        } else if(item.jumlah  === ''){
            item.jumlah = 0
        }
        
        if(item.sesi_pengiriman === 'Express'){

            return(
                <ListPesananBaru 
                key={item.id}
                kode={item.no_order} 
                tanggal={item.tgl_kirim} 
                jam={item.jam_dari_pengiriman + "-" +item.jam_sampai_pengiriman} 
                metode={item.sesi_pengiriman}
                insertAt={item.insert_at}
                jumlah={item.jumlah}
                metodPembayaran={item.ket_metode_pembayaran}
                total={item.total}
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
                    backgroundColor:'#31B057'
                    
                }}
                onPress={() => navigation.navigate("Detail Pesanan", {Id_order:item.no_order})}>
                </ListPesananBaru>
            )

        } else if(item.sesi_pengiriman === 'Pickup'){
            return(
                <ListPesananBaru 
                key={item.id}
                kode={item.no_order} 
                tanggal={item.tgl_kirim} 
                jam={item.jam_dari_pengiriman + "-" +item.jam_sampai_pengiriman} 
                metode={item.sesi_pengiriman}
                insertAt={item.insert_at}
                total={item.total}
                jumlah={item.jumlah}
                metodPembayaran={item.ket_metode_pembayaran}
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
                    backgroundColor:'#FF8547'
                    
                }}
                onPress={() => navigation.navigate("Detail Pesanan", {Id_order:item.no_order})}>
                </ListPesananBaru>
            )
        } else {
            return(
                <ListPesananBaru 
                key={item.id}
                kode={item.no_order} 
                tanggal={item.tgl_kirim} 
                jam={item.jam_dari_pengiriman + "-" +item.jam_sampai_pengiriman} 
                metode={item.sesi_pengiriman}
                insertAt={item.insert_at}
                total={item.total}
                metodPembayaran={item.ket_metode_pembayaran}
                jumlah={item.jumlah}
                image={require('../../imgSvg/clock1.png')}
                stylebg={{
                    alignItems:'center', 
                    justifyContent:'center', 
                    marginTop:10, 
                    marginBottom:6, 
                    height:26, 
                    paddingLeft:10,
                    paddingRight:10,
                    //width:'64%', 
                    //marginRight:12, 
                    borderRadius:15, 
                    shadowOpacity: 0.25, 
                    flexDirection:'row',
                    shadowRadius: 3.20,  
                    elevation:3,
                    backgroundColor:'gray'
                    
                }}
                onPress={() => navigation.navigate("Detail Pesanan", {Id_order:item.no_order})}>
                </ListPesananBaru>
            )
        }
      
 };

    return (
        <View style={{flex:1, backgroundColor:'white', paddingTop:20, height:'100%', width:windows.width}}> 
        
            <Text style={styles.title}> Pesanan Baru ({jumlahItem})</Text>

            <View style={styles.page}>

            {dataKosong? (
            <View style={{flex:1, position:'absolute',  padding:10, alignItems:'center'}}>
            <Image source={require('../../imgSvg/icon_message_error.png')} style={{height:200, width:260}} />
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20, marginTop:24 }} >Maaf</Text>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', textTransform:'capitalize', fontSize:14 }} >{pesan}</Text>
            <Text style={{textAlign:'center', color:'#7A7A7A', fontWeight:'bold', textTransform:'capitalize', fontSize:14, marginTop:10, width:'90%',}}>Tetap semangat dan terus kembangkan tokomu.</Text>
            </View>
            ): null}

            <FlatList
            data={data}
            renderItem={(item) => renderItem(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            style={{flex:1, width:'100%',}}
            />
            </View>
            

            <LoadingImage visible={loading} />
            <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
    )
}

export default PesananBaru

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems:'center',
        paddingTop:20,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'center'
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:28
      },
})