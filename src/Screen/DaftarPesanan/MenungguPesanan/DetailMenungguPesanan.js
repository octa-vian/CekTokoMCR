import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, } from 'react-native'
import Api from '../../../Api'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListDetailPesanan1 from './ListDetailPesanan1'
import ListDetailPesanan2 from './ListDetailPesanan2'
var StatusSesi = '';
var TotalRecomend =0;
var Trecomend = 0;
var TRecomend = '';
const DetailMenungguPesanan = ({ route, navigation}) => {
    const{Id_order} = route.params;
    const param = {
        no_order:Id_order
    }
    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const [dataProduk, setProduk] = useState([]);
    const [dataRecomend, setRecomend] = useState([]);
    const [showWaktupengiriman, setShowWaktuPengiriman] = useState(false);
    const [TotalAll, setTotalAll] = useState('');
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
        nama_merchant:'',
        tips_aplikasi:'',
        grand_total:''
    })

    useEffect(() => {
        TotalRecomend=0;
        Trecomend=0;
        getData();
        
    }, [])

    const getData = () => {
        Api.post('transaksi/detail_konfirmasi_order', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                setData(res.response);
                var statuPengiriman = res.response.sesi_pengiriman;
                if(!statuPengiriman.includes('Express') && !statuPengiriman.includes('Pickup')){
                    statuPengiriman = 'Diantar,  '+ statuPengiriman;
                } 
                console.log(statuPengiriman);
                res.response.sesi_pengiriman = statuPengiriman;
                setProduk(res.response.produk_pesanan);
                setRecomend(res.response.produk_rekomendasi);

                var DataR = res.response.produk_rekomendasi;
                var SubTotal = res.response.grand_total;
                var tot = 0;
                //var total = 0;
                DataR.map((item) => {
                    tot = item.total;
                    Trecomend += tot * 1;
                })
                console.log('A', Trecomend);
                TotalRecomend = parseInt(SubTotal) + Trecomend;
                console.log('T', TotalRecomend);
                var result = formatRupiah(TotalRecomend, 'Rp. ');
                console.log('S'+result)
                setTotalAll(result);

            } else{
                alert(metadata.message);
            }
        })
    }

    const renderItem = ({item}) => {
        return(
            <ListDetailPesanan1 
            nama={item.nama_product} 
            satuan={"x"+item.qty} 
            hargaSatuan={item.harga}
            status={item.keterangan}>
            </ListDetailPesanan1>
        )
    }

    const renderItemRecomend = ({item}) => {
        return(
            <ListDetailPesanan2 
            nama={item.nama_product} 
            satuan={'x'+item.qty} 
            harga={item.harga}>
            </ListDetailPesanan2>
        )
    }
    

    return (
        <View style={styles.container}>
            <Header title=" Detail Pesanan "  onPress={() => navigation.goBack()}/>
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
            <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold', }}>Jenis Pengiriman</Text>
            <View style={{alignItems:'flex-end', flex:1, justifyContent:'center'}}>
            <View style={styles.styleStatus(data.sesi_pengiriman)}>
            <Text style={{fontSize:12, color:'white', paddingTop:2, paddingBottom:2, paddingLeft:8, paddingRight:8, fontWeight:'bold', textTransform:'uppercase'}}>{data.sesi_pengiriman}</Text>
            </View>
            </View>
            </View>

            <View style={{flexDirection:'row', marginTop:10}}>
            <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold'}}>Nama Pemesan</Text>
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
                <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold'}} numberOfLines={3}>{StatusSesi}</Text>
                </View>
                </View>
            ):null}
            

            <View style={{flexDirection:'row', marginTop:10}}>
            <Text style={{fontSize:14, color:colors.btnTextGray, marginTop:4, fontWeight:'bold', flex:1, }}>Alamat Pemesan</Text>
            <View style={{flex:1}}>
            <Text style={{fontSize:14, color:'black', marginTop:4, fontWeight:'bold', textAlign:'right'}} >{data.alamat}</Text>
            </View>
            </View>
            </View>
            </View>

            <View style={{borderBottomColor: '#00000029', borderBottomWidth: 6, }}></View>

            <View style={{alignItems:'center', elevation:3}}>
            <View style={{alignItems:'center', width:'100%'}}>
            <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:16, marginTop:14, marginLeft:16, fontWeight:'bold', color:'black'}}> 
            Pesanan 
            </Text>

            <View style={{marginTop:20}}>
                <FlatList
                data={dataProduk}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
                <FlatList
                data={dataRecomend}
                renderItem={renderItemRecomend}
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
            <Text style={{fontSize:14, fontWeight:'bold'}}>Total Barang Rekomendasi</Text>
            </View>
            <View style={{flex:1}}>
            <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(Trecomend, 'Rp.')}</Text>
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
                <Text style={{fontSize:14, fontWeight:'bold'}}>{TotalAll}</Text>
                </View>
            </View>
            </View>
            </View>

            </View>
            <View
                style={{
                    borderBottomColor: '#D9D9D9',
                    borderBottomWidth:6,
                    //marginTop:24,
                    marginBottom:16
                }}
                />
            <Text style={{marginLeft:16, fontSize:16, fontWeight:'bold'}}> Catatan Pembeli</Text>
            <View style={{height:49, borderRadius:16, backgroundColor:colors.bglayout, marginTop:16, marginBottom:24, marginLeft:16, marginRight:16, flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../imgSvg/icon-edit.png')} style={{height:20, width:20, marginLeft:33}}/>
            <Text style={{marginLeft:19, fontSize:14, flex:1, color:'gray', fontWeight:'bold' }}>{data.catatan}</Text>
            </View>

            <TouchableOpacity style={{height:49, borderRadius:100, borderColor:'gray', borderWidth:1, marginBottom:24, marginLeft:16, marginRight:16, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.goBack()}>
            <Text style={{fontSize:14, color:'gray', fontWeight:'bold' }}>Kembali</Text>
            </TouchableOpacity>
            
            </ScrollView>
        </View>
    )
}

export default DetailMenungguPesanan
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
        //paddingBottom:12
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
    },
    CrView2:{
        shadowColor: "#000",
        backgroundColor:'#222831',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:'88%',
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

    styleStatus:(colorStatus) => ({
        backgroundColor:colorStatus == 'Express' ? '#31B057':colorStatus == 'Pickup' ? '#FF8547':'gray', 
        borderRadius:100,
    }),

})
