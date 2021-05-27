import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl, Image } from 'react-native'
import Api from '../../Api'
import RepoUtil from '../../Helper/RepoUtil'
import LoadingImage from '../../Loading/LoadingImage'
import { colors } from '../../Utils'
import ListPesananBaru from '../ListDaftarPesanan/ListPesananBaru'
var kodeSesi = '';
//var offset = 0;
 var onProsess = false;
const MenungguPesanan = ({navigation}) => {

    const [listProduk, setListProduk] = useState();
    const [pesan, setPesan] = useState('');
    const [dataKosong, setDataKosong ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [length, setLength] = useState(10);
    const [refreshing, setRefresh] = useState(false);
    const [isLast, setLast] = useState(false);
    const [jumlahItem, setJumlahItem] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() =>{
        setListProduk([])
        loadSession();
        const unsubscribe = navigation.addListener('focus', () => {
            setListProduk([])
            loadSession();
          })
          return()=>{
            unsubscribe
          }
    },[navigation])

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@kode');
        console.log('data Repo', dataRepo);
        
        if(dataRepo != null){
            kodeSesi = dataRepo;
            //alert(dataRepo);
            console.log('kodeSesi: ', kodeSesi);
        }
         getData();
        
      };

    const getData = () => {
            const param = {
                kode_sesi_pengiriman:kodeSesi,
                start:offset,
                count:length
            }
            Api.post('transaksi/confirmation_order', param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status === 200){
                    //setListProduk(response);
                    setListProduk(offset == 0 ? response : [...listProduk, ...response]);
                    setOffset(response.length != 0 ? (offset + response.length) : offset);
                    setLast(response.length != length ? true : false);
                    setLoading(false);
                    setJumlahItem(response.length);
                    setDataKosong(false);
                } else {
                    setPesan(metadata.message);
                    setDataKosong(true);
                    setLoading(false);
                    if(offset == 0){
                        setDataKosong(false);
                    }
                }
            })
        
    }

    const loadMore = async() => {
        if(isLast === false){
            //offset = offset + length
            await getData();
            setLoading(true);
            //setDataKosong(false);
        }
      }

      const onRefresh = async () =>{
        offset = 0;
        setListProduk([])
        setLast(false);
        // await setRefresh(true)
        getData();
        loadMore()
      }

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
                total={item.total}
                metodPembayaran={item.ket_metode_pembayaran}
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
                onPress={() => navigation.navigate("Detail Menunggu Pesanan", {Id_order:item.no_order})}>
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
                metodPembayaran={item.ket_metode_pembayaran}
                jumlah={item.jumlah}
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
                onPress={() => navigation.navigate("Detail Menunggu Pesanan", {Id_order:item.no_order})}>
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
                    padding:10,
                    //width:'42%', 
                    marginRight:12, 
                    borderRadius:15, 
                    shadowOpacity: 0.25, 
                    flexDirection:'row',
                    shadowRadius: 3.20,  
                    elevation:3,
                    backgroundColor:'gray'
                    
                }}
                onPress={() => navigation.navigate("Detail Menunggu Pesanan", {Id_order:item.no_order})}>
                </ListPesananBaru>
            )
        }
        
    }

    return (
        <View style={{flex:1, justifyContent:'center', backgroundColor:'white', paddingTop:20}}>
            <Text style={styles.title}> Menunggu Konfirmasi ({jumlahItem})</Text>

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
            data={listProduk}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            style={{flex:1, width:'100%', backgroundColor:'white'}}
            />
            </View>
            <LoadingImage visible={loading} />
        </View>
    )
}

export default MenungguPesanan
const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        backgroundColor:'white',
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:28
      },
})