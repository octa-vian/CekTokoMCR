import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, RefreshControl } from 'react-native'
import Api from '../../Api'
import { IconStatusError } from '../../imgSvg'
import LoadingImage from '../../Loading/LoadingImage'
import { colors } from '../../Utils'
import ListPesananBaru from '../ListDaftarPesanan/ListPesananBaru'

const PesananBaru = ({navigation}) => {

    const [data, setData] = useState([]);
    const [dataKosong, setDataKosong ] = useState(false);
    const [pesan, setPesan] = useState('');
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(10);
    const [refreshing, setRefresh] = useState(false);
    const [isLast, setLast] = useState(false);

    const param = {
        start:offset,
        count:length
    }

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
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
            }else{
                //alert(metadata.message);
                setPesan(metadata.message);
                setDataKosong(true);
                setLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
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
        await setData([])
        // await setRefresh(true)
        getData();
        await setLast(false)
        await loadMore()
      }

    const renderItem = ({item}) => {
        
        return (
            <ListPesananBaru 
            kode={item.no_order} 
            tanggal={item.tgl_pengiriman} 
            jam={item.jam_dari_pengiriman + "-" + item.jam_sampai_pengiriman} 
            insertAt={item.insert_at}
            metode={item.metode_belanja}
            onPress={ () => navigation.navigate("Detail Pesanan", {itemId: item.no_order})}>
            </ListPesananBaru>
        );
      
 };

    return (
        <View style={styles.page}> 
            <Text style={styles.title}> Pesanan Baru</Text>

            {dataKosong? (
            <View style={{flex:1, position:'absolute',  padding:10}}>
            <Image source={require('../../imgSvg/statuserror.png')} style={{height:200, width:260}} />
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20 }} >Maaf</Text>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', textTransform:'capitalize' }} >{pesan}</Text>
            </View>
            ): null}

            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.kode}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            />

            <LoadingImage visible={loading} />
        </View>
    )
}

export default PesananBaru

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
          paddingTop:20,
          backgroundColor:colors.bglayout,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:12
      },
})