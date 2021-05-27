import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { colors } from '../../../Utils'
import Header from '../../Header'
import RNPickerSelect from 'react-native-picker-select'
import SwipeablePanel from 'react-native-sheets-bottom';
import { IconSearch } from '../../../IconSvg'
import ListPreviewStruk from './ListPreviewStruk'
import ListViewProdukRec from './ListViewProdukRec'
import Api from '../../../Api'
import Toast, { BaseToast } from 'react-native-toast-message';
import RepoUtil from '../../../Helper/RepoUtil'
import LoadingImage from '../../../Loading/LoadingImage'

var offset = 0;
var onProsess = false;

const RekomendasiBarang = ({route, navigation}) => {

    const {Tips} = route.params;
    const {Biaya_apl} = route.params;
    const [length, setLength] = useState(10);
    const [isLast, setLast] = useState(false);
    const [satuan, setSatuan] = useState('');
    const [idProduk, setIdProduk] = useState();
    const [showBtn, setShowBtn] = useState(true);
    const [subTotal, setSubTotal] = useState(0);
    const [showPannel, setViewPannel] = useState(false);
    const [namaProduk, setNamaProduk] = useState('');
    const [dataProduk, setDataProduk] = useState([]);
    const [harga, setHarga] = useState(0);
    const [jumlah, setJumlah] = useState(0);
    const {IdOrder} = route.params;
    const {Token} = route.params;
    const [search, setSearch] = useState('');

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

    const data = [
        { label: 'PCS', value: 'football' },
        { label: 'BOX', value: 'baseball' },
        { label: 'ROLL', value: 'hockey' },
    ]

    const Produk = [
        {id: '0', nama:'Minyak Angin', satuan:'Box', harga:'3000', status:'Buka'},
        {id: '1', nama:'Beras Pulen Blue', satuan:'PCS', harga:'3000', status:'Buka'},
        {id: '2', nama:'Kopi', satuan:'PCS', harga:'1200', status:'Buka'},
        {id: '3', nama:'Kopi Good Day', satuan:'PCS', harga:'3000', status:'Buka'},
        {id: '4', nama:'Susu Edeal', satuan:'BOX', harga:'3000', status:'Buka'},
        {id: '5', nama:'Beras Pulen Blue', satuan:'PCS', harga:'3000', status:'Buka'}
    ]

    const toastConfig = {
        /* 
          overwrite 'success' type, 
          modifying the existing `BaseToast` component
        */
        success: ({ text1, props, ...rest }) => (
          <BaseToast
            {...rest}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontSize: 15,
              fontWeight: '400'
            }}
            text1={text1}
            text2={props.uuid}
          />
        ),
        
        /* 
          or create a completely new type - `my_custom_type`,
          building the layout from scratch
        */
        my_custom_type: ({ text1, props, ...rest }) => (
          <View style={{ height: 60, width: '98%', backgroundColor: 'white', borderRadius:12, margin:12, 
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            justifyContent:'center' }}>
            <Text>Maaf</Text>
            <Text>{text1}</Text>
          </View>
        )
        
      };

    const hitungSubtotal = (jum) => {
        var currentSubtotal = 0;
        var totalRec = 0;
        dataProduk.map((items) => {
            totalRec = harga * jum;
        })
        setJumlah(jum);
        setSubTotal(formatRupiah(totalRec, 'Rp. '));
        console.log('sub:', totalRec);
    }
     
    const SlidingUpPannel = () => {
        setViewPannel(true);
      };
    
    const CancleSlidingUp = () => {
        setViewPannel(false);
        setShowBtn(true);
    }

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: false,
        onClose: () => CancleSlidingUp(),
        onPressCloseButton: () => CancleSlidingUp(),
        // ...or any prop you want
      });

    const ConfirmasiOpen = () => {
        setShowBtn(false);
        SlidingUpPannel();
    }

    const ItemSlected = (index) => {
        console.log('selected: ', index);
        if(dataProduk[index].id){
            setNamaProduk(dataProduk[index].nama_product);
            setSatuan(dataProduk[index].satuan);
            setHarga(dataProduk[index].harga);
            setIdProduk(dataProduk[index].id);
            CancleSlidingUp();
            hitungSubtotal();
        }

        if(subTotal === 0){
            setSubTotal('Rp. '+0);
        }
    }

    const renderItem = ({item, index}) => {
        return(
            <ListViewProdukRec 
            key={item.id}
            nama={item.nama_product}
            satuan={item.satuan}
            harga={item.harga}
            terjual={item.stok}
            image={item.image}
            onEndReached={loadMore}
            onPress={() => ItemSlected(index)}>

            </ListViewProdukRec>
        )
        
    }
    useEffect(() => {
        onProsess=false;
        offset=0;
        getData();
        if(namaProduk === ''){
            setNamaProduk('Pilih Produk');
        }
    },[])

    const getData = () => {
        if(!onProsess){
            onProsess=true;
            const param = {
                keyword:search,
                kategori:"",
                sort:"",
                start:offset,
                count:length,
                is_stok_menipis:"0"
            }
            console.log('param: ', param);
            Api.post('product/list_product_merchant', param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;
                onProsess=false;
                if(metadata.status === 200) {
                    setDataProduk(response);
                    setDataProduk(offset == 0 ? response : [...dataProduk, ...response]);
                    offset = response.length != 0 ? (offset + response.length) : offset;
                    setLast(response.length != length ? true : false);
                    //alert(metadata.message);
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
                    onProsess = false;
                }
            })
        }
        
    }

    const loadMore = async() => {
        if(isLast === false){
            offset = offset + length
            //setLoading(true);
            getData();
        }
      }

      const onRefresh = async () =>{
        offset=0;
        setDataProduk([]);
        setLast(false);
        // await setRefresh(true)
        getData();
        console.log(offset);

      }

    const kirimRec = () => {
        const paramKirim = {
            no_order:IdOrder,
            id_product:idProduk,
            qty:jumlah,
            token:Token
        }
        console.log('rec'+paramKirim)
        Api.post('transaksi/add_rekomendasi_product_transaksi', paramKirim)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;

            if(metadata.status === 200) {
                //setDataProduk(response);
                navigation.replace('Buat Struk', {IdOrder:IdOrder, Token:Token, Kunai:'1', Tips:Tips, Biaya_apl:Biaya_apl})
                //alert(metadata.message);
            } else{
                alert(metadata.message);
            }

        })
    };

    const FalidasiKirim = () => {
        if(!jumlah > ''){
            Toast.show({
                text1: 'Maaf 🙏🏻',
                text2:'Jumlah Produk Tidak Boleh Kosong!',
                position: 'bottom',
                type: 'error',
                visibilityTime:2000,
                bottomOffset: 150,
                //props: {uuid:'qqqq'},
              });
        } else {
            kirimRec();
        }
    }

    return (
        <View style={styles.page}>
            <Header title="Rekomendasi Produk" onPress={() => navigation.goBack()}/>
            
            <ScrollView>
            <View>
                <Text style={{fontSize:16, fontWeight:'bold', marginLeft:16, marginTop:16}}>Pilih Produk Rekomendasi</Text>
                <TouchableOpacity style={{flexDirection:'row', paddingLeft:24, paddingRight:24, marginTop:24, height:48, backgroundColor:colors.bglayout, marginLeft:16, marginRight:16, borderRadius:100, alignItems:'center'}} onPress={ConfirmasiOpen}>
                    <Text style={{fontSize:14, fontWeight:'bold', flex:1, paddingRight:12, color:'black'}}>{namaProduk}</Text>
                    <Image source={require('../../../imgSvg/icon-down.png')} style={{height:20, width:20,}}/>
                </TouchableOpacity>

                <View style={{paddingLeft:24, paddingRight:24, marginTop:24, height:48, backgroundColor:colors.bglayout, marginLeft:16, marginRight:16, borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                    <TextInput 
                    value={jumlah}
                    placeholder="Jumlah"
                    keyboardType="numeric"
                    onChangeText={(text) => hitungSubtotal(text)}
                    style={{width:'100%', fontSize:14, fontWeight:'bold'}}>
                    </TextInput>
                </View>

                <View style={{flexDirection:'row', paddingLeft:24, paddingRight:24, marginTop:24, height:48, backgroundColor:colors.bglayout, marginLeft:16, marginRight:16, borderRadius:100, alignItems:'center'}}>
                    <Text style={{fontSize:14, fontWeight:'bold', flex:1, paddingRight:12, color:'black'}}>{formatRupiah(harga, 'Rp. ')}</Text>
                    {/* <Image source={require('../../../imgSvg/icon-down.png')} style={{height:20, width:20,}}/> */}
                </View>
            </View>
            </ScrollView>

            <Toast ref={(ref) => Toast.setRef(ref)}/>

            {showBtn ? (
            <View style={styles.CrView2}>
            <View style={styles.txtHarga}>
            <Text style={{fontWeight:'bold', flex:1}}> Total Harga</Text>
            <Text style={{fontWeight:'bold', flex:1, textAlign:'right'}} >{subTotal}</Text>
            </View>

            <View style={{alignItems:'center', marginBottom:32, justifyContent:'center',}}>
            <TouchableOpacity style={styles.CrViewBtn} onPress={() => FalidasiKirim()}>
            <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}> Tambah </Text>
            </TouchableOpacity>
            </View>
            </View>
            ): null}

            

        <SwipeablePanel {...panelProps} isActive={showPannel}>
            <View style={{alignItems:'center', justifyContent:'center'}}>

                {/* <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16 }}>
                    <Text style={{fontSize:14, fontWeight:'bold'}} >Tidak</Text>
                </TouchableOpacity> */}

                <View style={{paddingLeft:20, paddingRight:20, marginLeft:16, marginRight:16, marginTop:24, flexDirection:'row', backgroundColor:colors.bglayout, height:48, alignItems:'center', borderRadius:100}}>
                    <IconSearch/>
                    <TextInput 
                    placeholder="Cari Produk"
                    //keyboardType="numeric"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    onSubmitEditing={onRefresh}
                    onKeyPress={onRefresh}
                    style={{width:'100%', fontSize:16, flex:1, paddingLeft:15}}>
                    </TextInput>
                </View>
                <View style={{flex:1, marginTop:42, padding:4, width:'90%'}}>
                    <FlatList
                    data={dataProduk}
                    renderItem={(item, index) => renderItem(item, index)}
                    keyExtractor={(item) => item.id}
                    onEndReached={loadMore}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

        </SwipeablePanel>
        <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
    )
}

export default RekomendasiBarang
const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white'
    },
    CrView2:{
        shadowColor: "#000",
        backgroundColor:'#ffffff',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:5,
    },
    txtHarga:{
        height:21,
        marginTop:11,
        marginLeft:16,
        marginRight:16,
        marginBottom:13,
        flexDirection:'row'
    },
    CrViewBtn:{
        shadowColor: "#000",
        backgroundColor:colors.btnredcolor,
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:48,
        width:'92%',
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:100,
        alignItems:'center',
        
    },
})
