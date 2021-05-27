import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Image, Platform, ToastAndroid, Alert } from 'react-native'
import Api from '../../../Api'
import LoadingSuksesTransaksi from '../../../Loading/LoadingSuksesTransaksi'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListDetailPesanan from './ListDetailPesanan'
import SwipeablePanel from 'react-native-sheets-bottom';
import CustomBottomSheet from 'react-native-custom-bottom-sheet';

var StatusPembayaran = '';

const DetailPesananDikirim = ({ route, navigation}) => {

    const {Id_order} = route.params;
    console.log('ID: ', Id_order);
    
    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const [Produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pesan, setPesan] = useState('');
    const [showPannel, setViewPannel] = useState(false);
    const [btnActif, setBntActif] = useState(false);
    const [btnOff, setBtnOff] = useState(false);
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
        status_pembayaran:''
    })

    useEffect(() => {
        getData();
    },[]);

    const Kondisi = () => {
        setViewPannel(!showPannel);
    }

    const getData = () => {
        const param = {
            no_order:Id_order
        }
        Api.post('transaksi/detail_pengiriman', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                var statuPengiriman = res.response.sesi_pengiriman;
                if(!statuPengiriman.includes('Express') && !statuPengiriman.includes('Pickup')){
                    statuPengiriman = 'Diantar,  '+ statuPengiriman;
                } 
                console.log(statuPengiriman);
                res.response.sesi_pengiriman = statuPengiriman;
                setData(res.response);
                statuPengiriman = res.response.status_pembayaran;
                setProduk(res.response.produk_pesanan);
                if(statuPengiriman === 'sudah dibayar'){
                    setBntActif(true)
                }else {
                    setBtnOff(true);
                    setBntActif(false);
                }
            } else {
                alert(metadata.message);
            }
        })
    }

    const kirimPesanan = () => {
        const param = {
            no_order:Id_order
        }
        Api.post('transaksi/send_order', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                SlidingUpPannel();
                setPesan(metadata.message);
                //getData();
                //navigation.navigate("Dalam Pengiriman");
                navigation.navigate('Sedang Diantar')
            } else{
                //alert(metadata.message);
            }
        })
    }

    const renderItem = ({item}) => {
        return(
            <ListDetailPesanan 
            nama={item.nama_product} 
            satuan={'x'+item.qty} 
            hargaSatuan={item.harga}
            harga={item.harga}>
            </ListDetailPesanan>
        )
    }

    const SlidingUpPannel = () => {
        setViewPannel(true);
      };
    
    const CancleSlidingUp = () => {
        setViewPannel(false);
    }

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        showCloseButton: false,
        onClose: () => CancleSlidingUp(),
        onPressCloseButton: () => CancleSlidingUp(),
        // ...or any prop you want
      });

    
    const MessagePembayaran = () => {
        if(Platform.OS == "android"){
            ToastAndroid.show('Pembayaran Belum Di Selesaikan', ToastAndroid.LONG)
        }else {
            Alert.alert('Maaf','Pembayaran Belum Di Selesaikan');
        }
    }



    return (
        <View style={styles.container}>
            <Header title=" Detail Pesanan "  onPress={() => navigation.goBack()}/>
            <ScrollView>
            <View>
                    <View style={{ paddingTop:10, paddingBottom:10, flexDirection:'row', backgroundColor:'#FAFAFA', elevation:2}}>
                    <Text style={{fontSize:16, color:'black', fontWeight:'bold', marginLeft:16}}>No. Pesanan</Text>
                    <Text style={{fontSize:14, color:colors.btnTextGray, fontWeight:'bold', flex:1, textAlign:'right', marginRight:16}}>{data.no_order}</Text>
                    </View>

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

                    {/* <View style={{flexDirection:'row', marginTop:10}}>
                    <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold'}}>Waktu Pengiriman</Text>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold'}} numberOfLines={3}>{data.jam_dari_pengiriman + " - " + data.jam_sampai_pengiriman}</Text>
                    </View>
                    </View> */}

                    <View style={{flexDirection:'row', marginTop:10}}>
                    <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold', flex:1, }}>Alamat Penerima</Text>
                    <View style={{flex:1}}>
                    <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold', textAlign:'right'}} >{data.alamat}</Text>
                    </View>
                    </View>

                    </View>

                    <View style={{borderBottomColor: '#00000029',borderBottomWidth:6, marginVertical:10, marginTop:24, marginBottom:11 }}></View>

            </View>

            <View style={{alignItems:'center', width:'100%'}}>
            <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:16, marginTop:14, marginLeft:16, fontWeight:'bold', color:'black'}}> 
            Pesanan 
            </Text>

            <View style={{marginTop:20}}>
            <FlatList
                data={Produk}
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
                //marginTop:12,
                marginBottom:16
            }}
            />

            <Text style={{marginLeft:16, fontSize:16, fontWeight:'bold'}}> Catatan Pembeli</Text>
            <View style={{height:49, borderRadius:16, backgroundColor:colors.bglayout, marginTop:16, marginBottom:24, marginLeft:16, marginRight:16, flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../imgSvg/icon-edit.png')} style={{height:20, width:20, marginLeft:33}}/>
            <Text style={{marginLeft:19, fontSize:14, flex:1, color:'gray', fontWeight:'bold' }}>{data.catatan}</Text>
            </View>

            {btnActif ? (
            <TouchableOpacity style={{height:49, borderRadius:100, backgroundColor:colors.btnActif, elevation:2, marginBottom:16, marginLeft:16, marginRight:24, alignItems:'center', justifyContent:'center'}} onPress={SlidingUpPannel}>
            <Text style={{fontSize:14, color:'white', fontWeight:'bold' }}>Kirim Pesanan</Text>
            </TouchableOpacity>
            ):null}

            {btnOff ? (
            <TouchableOpacity style={{height:49, borderRadius:100, backgroundColor:colors.btnTextGray, elevation:2, marginBottom:16, marginLeft:16, marginRight:24, alignItems:'center', justifyContent:'center'}} onPress={MessagePembayaran}>
            <Text style={{fontSize:14, color:'white', fontWeight:'bold' }}>Kirim Pesanan</Text>
            </TouchableOpacity>
            ):null}

            </ScrollView>

            <CustomBottomSheet
                visible={showPannel}
                onVisibilityChange={() => setViewPannel()}
                height={400}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
            <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
            <Image source={require('../../../imgSvg/icon-sukses-kirim-pesanan.png')} style={{height:150, width:150, marginTop:32}} />
            <Text style={{ marginTop:24, fontSize:14, fontWeight:'bold', width:'80%', textAlign:'center'}}>Pesanan akan segera dikirim, klik "OK" untuk mengirim</Text>
            {/* <Text style={{fontWeight:'bold', textTransform:'capitalize', marginTop:2, textAlign:'center'}}>{pesan}</Text> */}

            <TouchableOpacity style={{height:48, marginTop:24, alignItems:'center', width:'90%', justifyContent:'center', backgroundColor:colors.btnActif, borderRadius:100,}} onPress={kirimPesanan}>
                <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>Ok</Text>
            </TouchableOpacity>

            </View>
            </CustomBottomSheet>

        </View>
    )
}

export default DetailPesananDikirim

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

        height:33, width:200, 
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
    })

})
