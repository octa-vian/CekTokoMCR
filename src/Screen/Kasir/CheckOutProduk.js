import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, TextInput, Image, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import Api from '../../Api';
import { colors } from '../../Utils';
import Header from '../Header';
import CustomBottomSheet from 'react-native-custom-bottom-sheet';
import RepoUtil from '../../Helper/RepoUtil';


var kodeBtn = '';
var nameMetod = '';
var nominal_Dibayar= '';
var pembeli = '';
var tanggalTransaksi = '';
var total = '';
var catatanMerchant = '';
var status = '';
var struk = '';
var dataStruk = '';
var cat = '';
var dataProduk = [];
const CheckOutProduk = ({navigation, route}) => {

    const [ListProduk, setListProduk] = useState([]);
    const [txt_catatan, setTxt_catatan] = useState('');
    const [txt_nama, setTxt_nama] = useState('');
    const [viewBtnMetod, setViewMetod] = useState(false);
    const [listMetod, setListMetod] = useState([]);
    const [changeColor, setChangeColor] = useState();
    const [btnAktif, setBtnAktif] = useState(false);
    const [btnNonactif, setBtnNonactif] = useState(false);
    const [dataKeranjang, setDataKeranjang] = useState({
        id:'',
        no_order:'',
        uid:'',
        pembeli:'',
        kode_sesi_pos:'',
        tgl_transaksi:'',
        total:'',
        diterima:'',
        catatan_merchant:'',
        jenis_pembayaran:'',
        status:'',
        struk:''
    })
    const [dataItem, setDataItem] = useState({
        qty:'',
        total:''
    })

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

      const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@nom');
        console.log('data Repo', dataRepo);
        if(dataRepo != null){
            nominal_Dibayar = dataRepo;
            //alert(dataRepo);
            console.log('kodeSesi: ', nominal_Dibayar);
        }
         getTotalProduk();
        
      };

    useEffect(() => {
        loadSession();
        //alert(nom_Dibayar);
        cat='';
        nameMetod='';
        const unsubscribe = navigation.addListener('focus', () => {
            //loadSession();
            getTotalProduk();
            if(nameMetod == ''){
                nameMetod = 'Pilih Metode Pembayaran';
                setBtnNonactif(true);
            } 
        })
        return()=>{
        unsubscribe
        }
    },[navigation]);

    const getTotalProduk = () => {
        Api.post('keranjang/index_pos')
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status == 200){
                setListProduk(res.response.item);
                setDataItem(res.response.total);
            } else {

            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getMetod = () => {
        Api.post('keranjang/list_jenis_pembayaran')
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status == 200){
                setListMetod(res.response.jenis_pembayaran);
                console.log(res.response.jenis_pembayaran);
            } else {
                if(Platform.OS == 'android'){
                    ToastAndroid.show(metadata.message, ToastAndroid.SHORT);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const OnSend = () => {
        const param = {
            pembeli:txt_nama,
            catatan_merchant:txt_catatan,
            metode_pembayaran:kodeBtn,
            diterima:nominal_Dibayar
        }
        console.log('send', param);
        Api.post('keranjang/process_keranjang_pos', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status == 200){
            setDataKeranjang(res.response);
            dataStruk = res.response;
            dataProduk = res.response.order_line;
            //alert(metadata.message + dataKeranjang.catatan_merchant);
            navigation.navigate('Transaksi Berhasil', {pembeli: dataStruk.pembeli, tanggal: dataStruk.tgl_transaksi, diterima: dataStruk.diterima, jenis_pembayaran: dataStruk.jenis_pembayaran, totalTagihan: dataStruk.total, status: dataStruk.status, kembalian: dataStruk.kembalian, dataListProduk: dataProduk})
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const BtnMetod = () => {
        getMetod();
        setViewMetod(true);
    }

    const seletedItem = (item, index) => {
        if(index == changeColor){
            return(
                <View style={{marginBottom:12, marginTop:12}}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:8, }} onPress={() => ItemList(index)}>
                <Image source={{uri:item.icon}} style={{height:25, width:25, marginRight:16}}/>
                <Text style={{fontSize:16, flex:1, color: colors.btnActif, fontWeight:'bold'}}>{item.status}</Text>
                <Image source={require('../../imgSvg/icon-chevron.png')} style={{height:25, width:25,}}/>
                </TouchableOpacity>
                </View>
            )
        } else {
            return(
                <View style={{marginBottom:12, marginTop:12}}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:8, }} onPress={() => ItemList(index)}>
                <Image source={{uri:item.icon}} style={{height:25, width:25, marginRight:16}}/>
                <Text style={{fontSize:16, flex:1, color:'gray'}}>{item.status}</Text>
                <Image source={require('../../imgSvg/icon-chevron.png')} style={{height:25, width:25,}}/>
                </TouchableOpacity>
                </View>
            )
        }
    }

    const ItemList = (select) => {
    setBtnAktif(true);
    setBtnNonactif(false);
    setChangeColor(select);
    setViewMetod(false);
    if(listMetod[select].status == 'Cash'){
        navigation.navigate('Pos Tunai', {tot: dataItem.total});
        kodeBtn = listMetod[select].kode;
        nameMetod = listMetod[select].status;
        cat = '1';
    } else {
        alert('coming soon');
        nameMetod = 'Pilih Metode Pembayaran';
    }
    }



    return (
        <View style={styles.page}>
        <Header title="Checkout" onPress={() => navigation.goBack()}/>
        <ScrollView>        
        <View style={{borderColor:'#EBEBEB', borderWidth:3}}/>
        <View style={{marginLeft:18, marginRight:18, marginTop:16}}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>Pesanan</Text>
            <View style={{borderColor:'#EBEBEB', borderWidth:1, marginTop:16, marginBottom:16}}/>
            <FlatList
            data={ListProduk}
            renderItem={({item}) => {
                return(
                    <View style={{marginBottom:20}}>
                    <Text style={{fontSize:14}}>{item.nama_product}</Text>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:8, }}>
                    <Text style={{fontWeight:'bold', fontSize:14, color:'black', flex:1}}>{item.harga}</Text>
                    <Text style={{fontWeight:'bold', fontSize:12, color:'black', flex:1, textAlign:'right'}}>x<Text style={{fontWeight:'bold', fontSize:14, color:'black'}}>{item.qty}</Text></Text>
                    </View>
                    </View>
                )
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            />
        <View style={{borderColor:'#EBEBEB', borderWidth:1, marginTop:16, marginBottom:16}}/>
        <View style={{flexDirection:'row', }}>
            <Text style={{flex:1, fontSize:16}}>Total Harga</Text>
            <Text style={{flex:1, textAlign:'right', fontWeight:'bold', fontSize:16}}>{formatRupiah(dataItem.total, 'Rp. ')}</Text>
        </View>
        </View>
        <View style={{borderColor:'#EBEBEB', borderWidth:3, marginTop:24}}/>

        <View style={{marginLeft:18, marginRight:18}}>
            <Text style={{fontSize:16, fontWeight:'bold', marginTop:16}}>Catatan Penjual</Text>
            <View style={{borderColor:'#EBEBEB', borderWidth:1, marginTop:16, marginBottom:16,}}/>
            <View style={{width:'100%', backgroundColor:colors.bglayout, borderRadius:100, flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../imgSvg/icon-edit.png')} style={{height:20, width:20, marginLeft:33}}/>
            <TextInput
            style={{flex:1, marginLeft:10, marginRight:15, fontSize:14, fontWeight:'bold'}}
            value={txt_catatan}
            placeholder={'Tulis Disini'}
            onChangeText={(txt) => setTxt_catatan(txt)}
            multiline/>
            </View>
        </View>

        <View style={{borderColor:'#EBEBEB', borderWidth:3, marginTop:24}}/>
        <View style={{marginLeft:18, marginRight:18}}>
            <View style={{width:'100%', backgroundColor:colors.bglayout, borderRadius:100, flexDirection:'row', alignItems:'center', marginTop:20}}>
            <Image source={require('../../imgSvg/icon_user.png')} style={{height:20, width:20, marginLeft:33}}/>
            <TextInput
            style={{flex:1, marginLeft:10, marginRight:15, fontSize:14, fontWeight:'bold'}}
            value={txt_nama}
            placeholder={'Masukan Nama Pembeli'}
            onChangeText={(txt) => setTxt_nama(txt)}
            multiline/>
            </View>
            <TouchableOpacity style={{width:'100%', backgroundColor:colors.bglayout, borderRadius:100, flexDirection:'row', alignItems:'center', marginTop:20, height:48}} onPress={BtnMetod}>
            <Image source={require('../../imgSvg/icon-payment-method.png')} style={{height:20, width:20, marginLeft:33}}/>
            <Text style={{flex:1, marginLeft:12, fontWeight:'bold', color:cat == '1' ? 'black' : 'gray'}}>{nameMetod}</Text>
            <Image source={require('../../imgSvg/icon-chevron.png')} style={{height:25, width:25, marginRight:20}}/>
            </TouchableOpacity>

            {btnAktif ? (
            <TouchableOpacity style={{width:'100%', backgroundColor:colors.btnActif, borderRadius:100, alignItems:'center', marginTop:20, height:48, justifyContent:'center'}} onPress={OnSend}>
            <Text style={{fontWeight:'bold', color:'white'}}>Proses</Text>
            </TouchableOpacity>
            ): null}

            {btnNonactif ? (
            <TouchableOpacity style={{width:'100%', backgroundColor:colors.btnTextGray, borderRadius:100, alignItems:'center', marginTop:20, height:48, justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', color:'white'}}>Proses</Text>
            </TouchableOpacity>
            ): null}

            <TouchableOpacity style={{width:'100%', backgroundColor:'white', borderRadius:100, alignItems:'center', marginTop:20, height:48, justifyContent:'center', borderColor:'gray', borderWidth:1}} onPress={() => navigation.goBack()}>
            <Text style={{fontWeight:'bold', color:'gray'}}>Batalkan</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>

        <CustomBottomSheet
            visible={viewBtnMetod}
            onVisibilityChange={() => setViewMetod()}
            height={420}>
            <View style={{alignItems:'center', justifyContent:'center', }}>
            <View style={{heigh:42, width:'20%', borderColor:colors.btnTextGray, borderWidth:3, borderRadius:100, backgroundColor:colors.btnTextGray}}/>
            </View>
            <View style={{marginLeft:18, marginRight:18}}>
            <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:16, marginBottom:16}}>Pilih Metode Pembayaran</Text>
            <FlatList
            data={listMetod}
            renderItem={({item, index}) => seletedItem(item, index)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            />
            </View>
        </CustomBottomSheet>

        </View>
    )
}

export default CheckOutProduk

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white'
    }
})
