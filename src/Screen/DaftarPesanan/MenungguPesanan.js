import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl, Image } from 'react-native'
import Api from '../../Api'
import LoadingImage from '../../Loading/LoadingImage'
import { colors } from '../../Utils'
import ListPesananBaru from '../ListDaftarPesanan/ListPesananBaru'

const MenungguPesanan = ({navigation}) => {

    const [listProduk, setListProduk] = useState();
    const [pesan, setPesan] = useState('');
    const [dataKosong, setDataKosong ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(10);
    const [refreshing, setRefresh] = useState(false);
    const [isLast, setLast] = useState(false);

    const param = {
        start:offset,
        count:length
    }

    useEffect(() =>{
        getData();
    },[])

    const getData = () => {
        Api.post('transaksi/confirmation_order', param)
        .then(async(body) => {
            let res = body.data
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200){
                //setListProduk(response);
                await setListProduk(offset == 0 ? response : [...listProduk, ...response]);
                await setOffset(response.length != 0 ? (offset + response.length) : offset);
                await setLast(response.length != length ? true : false);
                setLoading(false);
            } else {
                setPesan(metadata.message);
                setDataKosong(true);
            }
        })
    }

    const loadMore = async() => {
        if(isLast === false){
            //await setOffset(offset + length);
            setLoading(true);
            await getData();
        }
      }

      const onRefresh = async () =>{
        await setOffset(0)
        await setListProduk([])
        // await setRefresh(true)
        getData();
        await setLast(false)
        await loadMore()
      }

    const renderItem = ({item}) => {
        return(
            <ListPesananBaru 
            kode={item.no_order} 
            tanggal={item.tgl_kirim} 
            jam={item.jam_dari_pengiriman + "-" +item.jam_sampai_pengiriman} 
            metode={item.metode_belanja}
            insertAt={item.insert_at}
            onPress={() => navigation.navigate("Detail Menunggu Pesanan", {Id_order:item.no_order})}>
            </ListPesananBaru>
        )
    }

    return (
        <View style={styles.page}>
            <Text style={styles.title}> Menunggu Pesanan</Text>

            {dataKosong? (
            <View style={{flex:1, position:'absolute',  padding:10}}>
            <Image source={require('../../imgSvg/statuserror.png')} style={{height:200, width:260}} />
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20 }} >Maaf</Text>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', textTransform:'capitalize' }} >{pesan}</Text>
            </View>
            ): null}

            <FlatList
            data={listProduk}
            renderItem={renderItem}
            keyExtractor={item => item.kode}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            />
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
          backgroundColor:colors.bglayout
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:12
      },
})