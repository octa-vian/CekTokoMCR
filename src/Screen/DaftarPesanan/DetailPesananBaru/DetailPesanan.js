import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, TextInput, Dimensions, Image } from 'react-native'
import Api from '../../../Api'
import { IconBerhasil } from '../../../imgSvg'
import LoadingSuksesTransaksi from '../../../Loading/LoadingSuksesTransaksi'
import LoadingTolakProduk from '../../../Loading/LoadingTolakProduk'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListDetailPesanan from './ListDetailPesanan'
const { width, height } = Dimensions.get('screen');

const DetailPesanan = ({route, navigation}) => {

    const [dataProduk, setProduk] = useState([]);
    const [visible, setVisible] = useState(false);
    const [showCatatan, setCatatan] = useState(false);
    const [komentar, setKomentar] = useState('');
    const [sukses, setSukses] = useState(false);
    const [pesan, setPesan] = useState('');
    const [showWaktupengiriman, setShowWaktuPengiriman] = useState(false);
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
        nama_merchant:'',
        sesi_pengiriman:'',
        tips_operasional:'',
        tips_aplikasi:'',
        grand_total:''
    })

    if(data.total === ''){
        data.total = '0'
    }

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    useEffect(() => {
        getData();
    },[])

    const {Id_order} = route.params;
    const param = {
        no_order: Id_order
    };
    console.log('idK: ', param);

    const paramKirim = {
        no_order: Id_order,
        keterangan: komentar
    };

    

    const getData = () => {
        Api.post('transaksi/detail_pesanan_baru', param)
        .then((respon) => {
            var response = respon.data
            let metadata = response.metadata
            let dataProduk = response.response.produk_pesanan

            if(metadata.status === 200){
                var statuPengiriman = response.response.sesi_pengiriman;
                if(!statuPengiriman.includes('Express') && !statuPengiriman.includes('Pickup')){
                    statuPengiriman = 'Diantar,  '+ statuPengiriman;
                } 
                console.log(statuPengiriman);
                response.response.sesi_pengiriman = statuPengiriman;
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
            satuan={'x' + item.qty } 
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

    const dataProd = [
        {id:'001', nama_produk:'Tepung Bumbu Sasa', qty:'4', satuan:'BOX', harga:'4000' },
        {id:'002', nama_produk:'Tepung Bumbu Sasa', qty:'4', satuan:'BOX', harga:'4000' },
        {id:'003', nama_produk:'Tepung Bumbu Sasa', qty:'4', satuan:'BOX', harga:'4000' }
    ]

    return (
        <View style={styles.container}>
            <Header title="Detail Pesanan"  onPress={() => navigation.goBack()}/>
            <ScrollView>
            <View style={{ paddingTop:10, paddingBottom:10, flexDirection:'row', backgroundColor:'#FAFAFA', elevation:2}}>
            <Text style={{fontSize:16, color:'black', fontWeight:'bold', marginLeft:16}}>No. Pesanan</Text>
            <Text style={{fontSize:14, color:colors.btnTextGray, fontWeight:'bold', flex:1, textAlign:'right', marginRight:16}}>{data.no_order}</Text>
            </View>
            <View style={{backgroundColor:'white', elevation:3, paddingBottom:12}}>
                <View style={{marginTop:16, marginLeft:16, marginBottom:16}}>
                    <Text style={{fontSize:16, color:'black', fontWeight:'bold'}}>Informasi Umum</Text>
                </View>

                <View style={{borderBottomColor:'#00000029', borderBottomWidth:1, marginLeft:16, marginRight:16}}></View>

                <View style={{marginLeft:16, marginRight:16, marginTop:16}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold'}}>Jenis Pengiriman</Text>
                <View style={{alignItems:'flex-end', flex:1, justifyContent:'center'}}>
                <View style={styles.styleStatus(data.sesi_pengiriman)}>
                <Text style={{fontSize:12, color:'white', paddingTop:2, paddingBottom:2, paddingLeft:8, paddingRight:8, fontWeight:'bold', textTransform:'uppercase'}}>{data.sesi_pengiriman}</Text>
                </View>
                </View>
                
                </View>

                <View style={{flexDirection:'row', marginTop:10}}>
                <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold'}}>Nama Penerima</Text>
                <View style={{flex:1, alignItems:'flex-end'}}>
                <Text style={{fontSize:12, color:'black', marginTop:4, fontWeight:'bold', textTransform:'uppercase'}}>{data.nama}</Text> 
                </View>
                </View>

                <View style={{flexDirection:'row', marginTop:10}}>
                <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold'}}>Tanggal</Text>
                <View style={{flex:1, alignItems:'flex-end'}}>
                <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold'}} numberOfLines={3}>{data.insert_at}</Text>
                </View>
                </View>

                {showWaktupengiriman ? (
                <View style={{flexDirection:'row', marginTop:10}}>
                <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold'}}>Waktu Pengiriman</Text>
                <View style={{flex:1, alignItems:'flex-end'}}>
                <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold'}} numberOfLines={3}>{data.sesi_pengiriman}</Text>
                </View>
                </View>
                ):null}
                

                <View style={{flexDirection:'row', marginTop:10}}>
                <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold', flex:1, }}>Alamat Penerima</Text>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold', textAlign:'right'}} >{data.alamat}</Text>
                </View>
                </View>
                </View>
            </View>

            <View style={{borderBottomColor: '#00000029',borderBottomWidth:6,}}></View>

            <View style={{alignItems:'center', width:'100%', backgroundColor:'white', elevation:3,}}>
            <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:16, marginTop:16, marginLeft:16, fontWeight:'bold', color:'black'}}> 
            Pesanan 
            </Text>
            {/* <View style={{borderBottomColor:'#00000029', borderBottomWidth:1, marginLeft:20, marginRight:16, marginTop:16}}></View> */}

            <View style={{marginTop:20}}>
            <FlatList
                data={dataProduk}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>
            </View>

            <View style={{marginLeft:16, marginRight:16}}>

                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Subtotal</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(data.total, 'Rp.')}</Text>
                </View>
                </View>

            </View>


            <View style={{marginLeft:16, marginRight:16}}>

                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Tips</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(data.tips_operasional, 'Rp.')}</Text>
                </View>
                </View>

            </View>

            <View style={{marginLeft:16, marginRight:16}}>

                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Biaya Aplikasi</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(data.tips_aplikasi, 'Rp.')}</Text>
                </View>
                </View>

            </View>

            

            <View style={{borderBottomColor:'#00000029', borderBottomWidth:1, marginLeft:16, marginRight:16, marginTop:20}}></View>
            
            <View style={styles.bodyFooter}>
                <View style={styles.txt1}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Total Harga
                    </Text>
                </View>
                <View style={styles.txt2}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>
                    {formatRupiah(data.grand_total, 'Rp')}
                    </Text>
                </View>
            </View>
            </View>
            </View>

            <View
                style={{
                    borderBottomColor: '#D9D9D9',
                    borderBottomWidth:6,
                    //marginTop:10,
                    marginBottom:16
                }}
                />

            <Text style={{marginLeft:16, fontSize:16, fontWeight:'bold'}}> Catatan Pembeli</Text>
            <View style={{height:49, borderRadius:16, backgroundColor:colors.bglayout, marginTop:16, marginBottom:24, marginLeft:16, marginRight:16, flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../imgSvg/icon-edit.png')} style={{height:20, width:20, marginLeft:33}}/>
            <Text style={{marginLeft:19, fontSize:14, flex:1, color:'gray', fontWeight:'bold' }}>{data.catatan}</Text>
            </View>

            <TouchableOpacity style={{height:49, borderRadius:100, backgroundColor:colors.btnActif, elevation:2, marginBottom:16, marginLeft:16, marginRight:16, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate("Buat Struk", {IdOrder: data.no_order, Tips:data.tips_operasional, Biaya_apl:data.tips_aplikasi})}>
            <Text style={{fontSize:14, color:'white', fontWeight:'bold' }}>Proses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:49, borderRadius:100, borderColor:'gray', borderWidth:1, marginBottom:24, marginLeft:16, marginRight:16, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.goBack()}>
            <Text style={{fontSize:14, color:'gray', fontWeight:'bold' }}>Batalkan</Text>
            </TouchableOpacity>

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
        backgroundColor:'white'
    },
    body1:{
        flexDirection:'row',
        height:104,
    },
    bodyFooter:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
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
        marginLeft:16,
        flex:1
        
    },
    txt2:{
        marginRight:16,
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
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:"100%",
        justifyContent:'center',
        marginBottom:2,
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
    styleStatus:(colorStatus) => ({
        backgroundColor:colorStatus == 'Express' ? '#31B057':colorStatus == 'Pickup' ? '#FF8547':'gray', 
        borderRadius:100,
    }),

    styleSesi:(colorStatus) => ({
        backgroundColor:colorStatus == 'PickUp' ? '#FF8547':'gray', 
        borderRadius:100,
    })

})
