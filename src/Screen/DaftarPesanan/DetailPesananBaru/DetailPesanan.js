import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native'
import Api from '../../../Api'
import { IconBerhasil } from '../../../imgSvg'
import LoadingSuksesTransaksi from '../../../Loading/LoadingSuksesTransaksi'
import LoadingTolakProduk from '../../../Loading/LoadingTolakProduk'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListDetailPesanan from './ListDetailPesanan'

const DetailPesanan = ({route, navigation}) => {

    const [dataProduk, setProduk] = useState([]);
    const [visible, setVisible] = useState(false);
    const [showCatatan, setCatatan] = useState(false);
    const [komentar, setKomentar] = useState('');
    const [sukses, setSukses] = useState(false);
    const [pesan, setPesan] = useState('');
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

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    useEffect(() => {
        getData();
    },[])

    const {itemId} = route.params;
    const param = {
        no_order: itemId
    };

    const paramKirim = {
        no_order: itemId,
        keterangan: komentar
    };

    console.log('idK: ', param);

    const getData = () => {
        Api.post('transaksi/detail_pesanan_baru', param)
        .then((respon) => {
            let response = respon.data
            let metadata = response.metadata
            let dataProduk = response.response.produk_pesanan

            if(metadata.status === 200){
                setData(response.response);
                setProduk(dataProduk);
            } else {
                //alert(metadata.message);
            }
        })
    }

    const renderItem = ({item}) => {
        
        return (
            <ListDetailPesanan 
            key={item.id}
            nama={item.nama_produk} 
            satuan={item.qty + ' '+item.satuan} 
            hargaSatuan={item.harga}
            harga={item.harga}>
            </ListDetailPesanan>
        );
    };

    const kondisi = (index) => {

        if(index === '2'){
            setCatatan(!showCatatan);
            setVisible(false);
        } else if(index === '3'){
            setSukses(!sukses);
        } else {
            setVisible(!visible);
        }
        
    }

    const TolakTransaksi = () =>{
        Api.post('transaksi/tolak_transaksi', paramKirim)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                setSukses(true);
                setPesan(metadata.message);
                setCatatan(false);
                navigation.navigate('Pesanan Selesai', {flag:1});

            } else {

            }
        })
    }

    return (
        <View style={styles.container}>
            <Header title="Detail Pesanan"  onPress={() => navigation.goBack()}/>
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
            <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:14, marginTop:14, marginLeft:24, fontWeight:'bold', color:'#EB2843'}}> 
            Pesanan Baru 
            </Text>
            <View style={{  marginLeft:13, marginRight:13, marginTop:20}}>
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
                    {formatRupiah(data.total, "Rp")}
                    </Text>
                </View>
            </View>
            </View>
            </View>

            <Text style={{marginTop:26, marginLeft:43, fontSize:12, fontWeight:'bold'}}> Catatan Pembeli</Text>

            <Text style={{marginTop:10, marginLeft:43, marginRight:43, fontSize:12, }}> {data.catatan} </Text>
            <View
                style={{
                    borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:4,
                    marginRight:25,
                    marginLeft:25
                }}
                />

            <View style={styles.bodyBtn}>
            <View style={styles.btn1}>
            
            <TouchableOpacity style={styles.CrBtn} onPress={kondisi}>
                <Text style={{fontWeight:'bold', color:'black', fontSize:12}}> TOLAK </Text>
            </TouchableOpacity>
            
            </View>
            <View style={styles.btn2}>
            <TouchableOpacity style={styles.CrBtn2} onPress={() => navigation.navigate("Buat Struk", {IdOrder: data.no_order})}>
                <Text style={{fontWeight:'bold', color:'white', fontSize:12}}> PROSES </Text>
            </TouchableOpacity>

            </View>
            </View>
            </ScrollView>
            <LoadingTolakProduk visible={visible} onPress={kondisi} onKirim={() => kondisi('2')} pesan={"Apakah Anda Yakin Ingin Menolak?"}/>

            <Modal
            animationType="slide" transparent={true}
            visible={showCatatan}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(52, 52, 52, 0.6)'}}>
                <View
                style={{
                height: 255,
                width:257,
                position:'absolute',
                borderRadius:10,
                alignItems: 'center',
                justifyContent:'center',}}>
                <View style={{height:120, width:265, backgroundColor:'white', borderRadius:10, elevation:12}}>
                <TextInput style={{ margin:10, textTransform:'capitalize', fontWeight:'900'}} multiline={true} placeholder={'*Alasan Menolak..'} onChangeText={(text) => setKomentar(text)}
                value={komentar} ></TextInput>
                </View>
                <Text style={{marginTop:2, marginBottom:20, fontSize:14, fontWeight:'bold', textAlign:'center', width:180, textTransform:'capitalize'}} ></Text>
                <TouchableOpacity style={{height:28, width:100, backgroundColor:colors.btnActif, borderRadius:6, alignItems:'center', justifyContent:'center'}} onPress={TolakTransaksi}> 
                <Text style={{fontSize:12, fontWeight:'bold', textTransform:'uppercase', color:'white'}} > Kirim </Text>
                </TouchableOpacity>
                
                </View>
                </View>    
            </Modal>

            <LoadingSuksesTransaksi visible={sukses} pesan={pesan} onPress={() => kondisi('3')} />

            </View>
    )
}

export default DetailPesanan

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
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    
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
        marginRight:24,
        flex:1,
        alignItems:'flex-end'
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
        width:400,
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
