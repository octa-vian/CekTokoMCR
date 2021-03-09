import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, } from 'react-native'
import Api from '../../../Api'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListDetailPesanan1 from './ListDetailPesanan1'
import ListDetailPesanan2 from './ListDetailPesanan2'

const DetailMenungguPesanan = ({ route, navigation}) => {
    const{Id_order} = route.params;
    const param = {
        no_order:Id_order
    }
    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const [dataProduk, setProduk] = useState([]);
    const [dataRecomend, setRecomend] = useState([]);
    console.log('ID: ', Id_order);
    const [data, setData] = useState({
        no_order:'',
        nama:'',
        alamat:'',
        tgl_pengiriman:'',
        total:'',
        catatan:'',
        insert_at:'',
        jam_dari_pengiriman:'',
        jam_sampai_pengiriman:'',
        metode_belanja:'',
        nama_merchant:''

    })

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        Api.post('transaksi/detail_konfirmasi_order', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                setData(res.response);
                setProduk(res.response.produk_pesanan);
                setRecomend(res.response.rekomendasi);
            } else{
                alert(metadata.message);
            }
        })
    }

    const renderItem = ({item}) => {
        return(
            <ListDetailPesanan1 
            nama={item.nama_product} 
            satuan={item.qty + "" + item.satuan} 
            status={item.keterangan}>
            </ListDetailPesanan1>
        )
    }

    const renderItemRecomend = ({item}) => {
        return(
            <ListDetailPesanan2 
            nama={item.nama_product} 
            satuan={item.qty +" "+ item.satuan} 
            harga={item.harga}>
            </ListDetailPesanan2>
        )
    }

    return (
        <View style={styles.container}>
            <Header title=" Detail Pesanan "  onPress={() => navigation.goBack()}/>
            <ScrollView>
            <View>
                    <View style={{ marginTop:9, marginLeft:20, marginRight:20}}>
                    <Text style={{fontSize:11, color:'black', fontWeight:'bold'}}>No. Pesanan</Text>
                    <Text style={{fontSize:14, color:'#EB2843', fontWeight:'bold'}}>{data.no_order}</Text>
                    </View>
                    <View style={{borderBottomColor: '#00000029',borderBottomWidth: 1, marginVertical:10, marginTop:5, marginBottom:11 }}></View>
                    <View style={{flexDirection:'row', marginLeft:20, marginRight:20}}>
                    <View style={{flex:1}}>
                    <Text style={{fontSize:11, color:'black', marginTop:4, fontWeight:'bold'}}>Metode Belanja</Text>
                    <Text style={{fontSize:12, color:'black', marginTop:4, fontWeight:'bold', textTransform:'uppercase'}}>{data.metode_belanja}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{fontSize:11, color:'black', marginTop:4, fontWeight:'bold'}}>Waktu Transaksi</Text>
                    <Text style={{fontSize:12, color:'gray', marginTop:4, fontWeight:'normal'}} numberOfLines={3}>{data.tgl_pengiriman}</Text>
                    <Text style={{fontSize:12, color:'gray', marginTop:4, fontWeight:'normal'}} numberOfLines={3}>{data.jam_dari_pengiriman + " - " + data.jam_sampai_pengiriman}</Text>
                    </View>
                    </View>

                    <View style={{borderBottomColor: '#00000029',borderBottomWidth: 1, marginVertical:10, marginTop:5, marginBottom:11 }}></View>

                    <View style={{flexDirection:'row', marginLeft:20, marginRight:20}}>
                    <View style={{flex:1}}>
                    <Text style={{fontSize:11, color:'black', marginTop:4, fontWeight:'bold'}}>Penjual</Text>
                    <Text style={{fontSize:12, color:'black', marginTop:4, fontWeight:'bold', textTransform:'uppercase'}}>{data.nama_merchant}</Text>
                    {/* <Text style={{fontSize:11, color:'black', marginTop:4, fontWeight:'bold'}} numberOfLines={3}>{data.alamat}</Text> */}
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{fontSize:11, color:'black', marginTop:4, fontWeight:'bold'}}>Pembeli</Text>
                    <Text style={{fontSize:12, color:'black', marginTop:4, fontWeight:'bold', textTransform:'uppercase'}}>{data.nama}</Text>
                    <Text style={{fontSize:11, color:'gray', marginTop:4, textTransform:'capitalize'}} >{data.alamat}</Text>
                    </View>
                    </View>

            </View>

            <View style={{alignItems:'center'}}>
            <View style={{alignItems:'center'}}>
            <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:14, marginTop:14, marginLeft:24, fontWeight:'bold', color:'#EB2843'}}> 
            Pesanan Baru 
            </Text>
            <View style={{  width:307, marginLeft:13, marginRight:13, marginTop:20}}>
            <FlatList
                data={dataProduk}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>
            </View>
            <View style={{borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:8,
                    marginRight:22,
                    marginLeft:22}}>

            </View>
            
            <View style={styles.bodyFooter}>
                <View style={styles.txt1}>
                    <Text style={{fontSize:12, fontWeight:'bold'}}>
                        Total Harga
                    </Text>
                </View>
                <View style={styles.txt2}>
                <Text style={{fontSize:12, fontWeight:'bold'}}>
                    {formatRupiah(data.total, 'Rp')}
                    </Text>
                </View>
            </View>
            </View>
            </View>

            <View style={styles.CrView2} >
            <View>
            <Text style={{fontSize:14, marginTop:14, marginLeft:24, fontWeight:'bold', color:'white', fontWeight:'bold'}}> 
            Produk Rekomendasi Penjual 
            </Text>
            <View style={{  width:307, marginLeft:13, marginRight:13, marginTop:18, marginBottom:10}}>
            <FlatList
                data={dataRecomend}
                renderItem={renderItemRecomend}
                keyExtractor={item => item.id}
                />
            </View>
            </View>
            
            </View>
            </View>

            <Text style={{marginTop:26, marginLeft:43, fontSize:12, fontWeight:'bold'}}> Catatan Pembeli</Text>
            <Text style={{marginTop:10, marginLeft:43, marginRight:43, fontSize:12, }}>{data.catatan}</Text>
            <View
                style={{
                    borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:4,
                    marginRight:25,
                    marginLeft:25,
                    marginBottom:20
                }}
                />
            </ScrollView>
        </View>
    )
}

export default DetailMenungguPesanan
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.bglayout
    },
    body1:{
        flexDirection:'row',
        height:104,
    },
    bodyFooter:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:21
    },
    bodyBtn:{
        marginTop:76,
        marginLeft:41,
        marginRight:41,
        marginBottom:40,
        flexDirection:'row'
    
    },
    bd1:{
        height:82,
        width:101,
        marginTop:24,
        marginLeft:41,
        marginRight:27,
    },
    bd2:{
        height:104,
        width:179,
        marginRight:27,
        marginTop:24,
    },
    txt1:{
        marginLeft:24,
        flex:1
        
    },
    txt2:{
        marginLeft:24,
        flex:1,
        alignItems:'center'
    },
    btn1:{
        alignItems:'center',
        justifyContent:'center',
        marginRight:22
    },btn2:{
        alignItems:'center',
        justifyContent:'center'
    },
    CrView:{
        shadowColor: "#000",
        backgroundColor:'#ffffff',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:329,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom:2,
        marginRight:24,
        marginLeft:24,
        marginTop:24,
        borderRadius:10
    },
    CrView2:{
        shadowColor: "#000",
        backgroundColor:'#222831',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:329,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom:2,
        marginRight:24,
        marginLeft:24,
        marginTop:24,
        borderRadius:10
    },
    CrBtn:{
        shadowColor: "#000",
        backgroundColor:'#CECECE',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },

        height:33, width:133, 
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:5
    },
    CrBtn2:{
        shadowColor: "#000",
        backgroundColor:colors.btnredcolor,
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },

        height:33, width:133, 
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:5
    },

})
