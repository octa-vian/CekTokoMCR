import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, FlatList, Platform, ToastAndroid, ScrollView } from 'react-native'
import Api from '../../Api';
import { colors } from '../../Utils';
import Header from '../Header'
import exampleImage from '../../imgSvg/Icon_place_Holder_Toko.jpeg'
import RepoUtil from '../../Helper/RepoUtil';
import SwipeablePanel from 'react-native-sheets-bottom';
import ListKategoriBarang from './ListKategoriBarang';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ListUrutkan from './ListUrutkan';
import CheckBox from '@react-native-community/checkbox';
import LoadingImage from '../../Loading/LoadingImage';
import { IconArraw, IconKeranjang } from '../../imgSvg';

const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
var uid = '';
var offset = 0;
var SelectItem = [];
var onProsess = false;
var id_brg = '';
var img_produk='';
var namaProduk = '';
var hargaProduk = '';
var deskripsi = '';
var kategori = '';
var selectItem = false;
var SelectUrutan = '';
var jumlah = 0;
var qtyBtn = '';
const DaftarProdukKasir = ({navigation}) => {
    const [dataProduk, setProduk] = useState([]);
    const [dataKategori, setDataKategori] = useState([]);
    const [sortir, setSortir] = useState(false);
    const [loading, setLoading] = useState(false);
    const [BtnProduk, setShowBtnProduk] = useState(false);
    const [showBtn, setShowBtn] = useState(true);
    const [dataItem, setDataItem] = useState({
        qty:'',
        total:'0'
    })
    const Produk = [
        {
            id:1,
            nama:'Beras Pulen Biru',
            harga:'Rp. 5000',
            status:'baru',
            img:require('../../IconSvg/beras.png')
        },
        {
            id:2,
            nama:'Apel Busuk Warna Hitam Jangan Dibeli',
            harga:'Rp. 2000',
            status:'baru',
            img:require('../../IconSvg/pictureprofile2.png')
        },
        {
            id:3,
            nama:'Indomie Goreng',
            harga:'Rp. 2000',
            status:'baru',
            img:require('../../imgSvg/merchantpict.png')
        },
        {
            id:4,
            nama:'Telur Ayam',
            harga:'Rp. 2000',
            status:'baru',
            img:require('../../IconSvg/sembako.png')
        },
        {
            id:5,
            nama:'Chiki Ball',
            harga:'Rp. 2000',
            status:'baru',
            img:require('../../IconSvg/snack.png')
        },
        {
            id:6,
            nama:'Fanta 200 ML',
            harga:'Rp. 2000',
            status:'baru',
            img:require('../../IconSvg/softdrink.png')
        },
        {
            id:7,
            nama:'Beras Pullen',
            harga:'Rp. 2000',
            status:'baru',
            img:require('../../IconSvg/beras.png')
        }
    ]

    var radio_props = [
        {id:1, label: 'A-Z', value: 'a-z', select:false },
        {id:2, label: 'Z-A', value: 'z-a', select:false },
        {id:3, label: 'Termurah', value: 'termurah', select:false },
        {id:4, label: 'Termahal', value: 'termahal', select:false },
      ];

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        if(dataRepo != null){
            uid = dataRepo.response.uid;
        }
        getData();
      };

    const [visibleBtnTmbh, setVisibleBtnTmbh] = useState(true);
    const [visiblePlusMinus, setVisiblePLusMinus] = useState(false);
    
    const [isLast, setLast] = useState(false);
    const [length, setLength] = useState(10);
    const [showPannel, setViewPannel] = useState(false);
    const [showFilter, setViewFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [changeColor, setColor] = useState();
    const [selectKategori, setSelectKategori] = useState(false);
    const [checlist, setCheclist] = useState(false);

    const itemSelected = (checked, index) => {
        setCheclist(checked);
        if(checlist == true){    
            setCheclist(true);
        } 
        else{
            setCheclist(false);
        }
        //setCheclist(checked);
    }

    useEffect(() => {
        onProsess = false;
        offset = 0;
        loadSession();
        getTotalProduk();
    },[])
    

    const onPlus = (index) => {
        //var jum = jumlah + 1;
        //setJumlah(jumlah * 1 + 1);
        Api.post('keranjang/add_keranjang_pos', {id_product:dataProduk[index].id, aksi:'tambah', uid_merchant:uid})
        .then(async(res)=>{
        console.log(index)
        if(res.data.metadata.status == 200){
            onRefresh();
            getTotalProduk();
            let currentItems = parseInt(jumlah)
            currentItems += 1;
            jumlah=currentItems;
            console.log(currentItems);
            if(Platform.OS === 'android'){
                ToastAndroid.show(res.data.metadata.message, ToastAndroid.SHORT);
            }
            //getTotalKeranjang()
        }
        else{
            if(Platform.OS === 'android'){
                ToastAndroid.show(res.data.metadata.message, ToastAndroid.SHORT);
            }
        }
          })
    }

    const onMinus = (index) => {

        Api.post('keranjang/add_keranjang_pos', {id_product:dataProduk[index].id, aksi:'kurang', uid_merchant:uid})
        .then(async(res)=>{
        console.log(index)
        if(res.data.metadata.status == 200){

            onRefresh();
            getTotalProduk();
            let currentItems = parseInt(jumlah)
            currentItems -= 1;
            if(jumlah > 0){
                jumlah = jumlah * 1 - 1;
            } 
            if(jumlah < 1) {
                setVisiblePLusMinus(false);
                setVisibleBtnTmbh(true);
                //setShowBtn(false);
            } 
            jumlah = currentItems;
            console.log(currentItems);
            if(Platform.OS === 'android'){
                ToastAndroid.show(res.data.metadata.message, ToastAndroid.SHORT);
            }
            //getTotalKeranjang()
        }
        else{
            if(Platform.OS === 'android'){
                ToastAndroid.show(res.data.metadata.message, ToastAndroid.SHORT);
            }
        }
          })
    }

    const TambahBtn = (index) => {
        //alert(dataProduk[index].id);
        var i = 0;
        if(dataProduk[index].id){
            onPlus(index);
            id_brg = index;
            //CartProduk.push({id: dataProduk[index].id, nama: dataProduk[index].nama_product, qty: jumlah});
        }
    }

    const getTotalProduk = () => {
        Api.post('keranjang/index_pos')
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status == 200){
                setDataItem(res.response.total);
                qtyBtn = res.response.total.qty;
            } else {

            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getData = () => {
        if(!onProsess){
            onProsess = true;
            const Param = {
                keyword:search,
                kategori:[],
                sort:SelectUrutan,
                start:offset,
                count:length,
                is_stok_menipis:'0'
            }
            Api.post('product/list_product_merchant', Param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;
                onProsess = false;
                if(metadata.status === 200){
                    setLoading(false);
                    setProduk(response);
                    //setPesan(metadata.message);
                    setProduk(offset == 0 ? response : [...dataProduk, ...response]);
                    offset = response.length != 0 ? (offset + response.length) : offset;
                    setLast(response.length != length ? true : false);
                    console.log('produk',metadata.message);
                } else if (metadata.status === 401){
                    setLoading(false);
                } 
                else{
                    setLoading(false);
                    //setPesan(metadata.message);
                    // Toast.show({
                    //     text1: 'Maaf 🙏🏻',
                    //     text2: metadata.message,
                    //     position: 'bottom',
                    //     type: 'error',
                    //     visibilityTime:2000,
                    //   });
                }
    
            })
            .catch((err) => {
                console.log(err);
                onProsess = false;
                setLoading(false);
            })
        }
        
    }

    const loadMore = () => {
        if(isLast === false){
            offset = offset + length;
            getData();
            //setLoading(true);
            
        }
    }

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        onClose: () => CancleSlidingUp(),
        onPressCloseButton: () => CancleSlidingUp(),
        // ...or any prop you want
      });

      const [panelPropsFilter, setPanelPropsFilter] = useState({
        fullWidth: true,
        openLarge: true,
        onClose: () => CancleSlidingUpFilter(),
        onPressCloseButton: () => CancleSlidingUpFilter(),
        // ...or any prop you want
      });

      const CancleSlidingUpFilter = () => {
          setViewFilter(false);
      }

      const SlidingUpPannel = (index) => {
        setViewPannel(true);
        img_produk = dataProduk[index].image;
        namaProduk = dataProduk[index].nama_product;
        hargaProduk = dataProduk[index].harga;
        deskripsi = dataProduk[index].keterangan;
        kategori = dataProduk[index].kategori;
        console.log(img_produk);
      };
    
    const CancleSlidingUp = () => {
        setViewPannel(false);
    }

    const onRefresh = async () =>{
        offset=0;
        setProduk([])
        setLast(false)
        getData();
        console.log(offset);
      }

    const RenderItemFilter = (item, index) => {
        return(
            <ListKategoriBarang
            nama={item.kategori}
            selected={item.id}
            />
        )
    }

    const getDataFilter = () =>  {
        Api.get('product/kategori')
        .then( async (response) => {
            let res = response.data;
            let metadata = res.metadata;
            if(metadata.status === 200) {
                // alert(metadata.message);
                setDataKategori(res.response);
                console.log(res.response);
            } else{
                alert(metadata.message);
            }
        })
    }

    const Filter = () => {
        getDataFilter();
        setViewFilter(true);
    }
    
    const renderUrutkan = (item, index) => {

        if (index == changeColor){
            return(
                <ListUrutkan
                nama={item.label}
                styleBacground={{
                backgroundColor:colors.btnActif, 
                height:20, 
                width:20, 
                borderRadius:100, 
                }}

                styleBorder={{
                borderColor:colors.btnActif, 
                borderWidth:1, height:28, width:28, borderRadius:100, 
                alignItems:'center', justifyContent:'center'
                }}
                onPress={() => selected(index, item)}
                />
            )
        } else {
            return(
                <ListUrutkan
                nama={item.label}
                onPress={() => selected(index, item)}
                />
            )
        }
        
    }

    const selected = (index, item) => {
        radio_props[index].select = true;
        if(radio_props[index].select == true) {
            setColor(index);
            SelectUrutan = radio_props[index].value;
        } 
    }

    const BtnTerapkan = () => {
        CancleSlidingUpFilter(false);
        offset=0;
        setProduk([])
        setLast(false)
        // await setRefresh(true)
        getData();
    }

    const ResetRefresh = () => {
        CancleSlidingUpFilter(false);
        SelectUrutan = '';
        offset=0;
        setProduk([])
        setLast(false)
        // await setRefresh(true)
        getData();
    }


    return (
        <View style={styles.page}>
        <Header title="Daftar Produk" onPress={() => navigation.goBack()}/>
        <View style={{flexDirection:'row', paddingBottom:12, alignItems:'center', justifyContent:'center', }}>
        <View style={styles.CrView}>
            <Image source={require('../../imgSvg/icon-search.png')} style={{height:22, width:22, marginTop:11, marginLeft:11, marginBottom:11}}/>   
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginLeft:12, height:42, width:'100%', flex:1,}}>
            <TextInput
            autoCapitalize="none"
            style={{fontSize:14, fontWeight:'normal', width:'100%', paddingRight:10, color:'#7A7A7A'}}
            fontSize={16}
            onChangeText={(text) => setSearch(text)}
            value={search}
            onSubmitEditing={onRefresh}
            onKeyPress={onRefresh}
            placeholderTextColor={'#7A7A7A'}
            placeholder="Cari Barang"/>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.CrFilter} onPress={Filter}>
            <Image source={require('../../imgSvg/icon-sort.png')} style={{height:28, width:28}}/>
        </TouchableOpacity>
        </View>

        <FlatList
        data={dataProduk}
        style={{paddingLeft:16, paddingRight:16, paddingTop:16, backgroundColor:'white', flex:1, }}
        renderItem={({item, index}) => {
        jumlah = item.qty;
        return(
            <View style={{width:'100%'}}>
            <TouchableOpacity style={{flexDirection:'row', marginBottom:32, marginLeft:4, marginRight:4}} onPress={() => SlidingUpPannel(index)}>
            <View style={{width:80, height:80, 
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderRadius:8,
            elevation: 3,}}>
            <Image source={{uri: item.image ? item.image:exampleImageUri}} style={{height:80, width:80, borderRadius:8}}/>
            </View>

            <View style={{flex:1, marginLeft:16}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:'black', width:'80%'}}>{item.nama_product}</Text>
            <Text style={{fontWeight:'bold', fontSize:14, color:'black', marginTop:8}}>{formatRupiah(item.harga, 'Rp. ')}</Text>
            </View>

            {jumlah !=0 ? 
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', flex:1, }}>

            <TouchableOpacity style={{height:30, width:30, marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:10, marginRight:10, }} onPress={() => onMinus(index)}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'black'}} >-</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:24, marginTop:24, alignItems:'center', justifyContent:'center', flex:0.6, }}>
                {/* <TextInput 
                style={{fontSize:14, fontWeight:'bold', textAlign:'center'}}
                value={jumlah}
                keyboardType={'number-pad'}
                multiline={true}
                editable={true}
                showSoftInputOnFocus={false}
                ></TextInput> */}
                <Text style={{fontWeight:'bold', color:'black', fontSize:14, width:'100%', textAlign:'center'}}>{jumlah}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:30, width:30, marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:10, backgroundColor:colors.btnActif }} onPress={() => onPlus(index)}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'white'}} >+</Text>
            </TouchableOpacity>
            </View>
            :
            <View style={{justifyContent:'flex-end', paddingBottom:4}}>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:colors.btnActif, height:24, borderRadius:12,}} onPress={() => TambahBtn(index)}>
            <Text style={{marginLeft:10, marginRight:10, color:colors.btnActif, fontWeight:'bold', }}>Tambah</Text>
            </TouchableOpacity>
            </View>}

            </TouchableOpacity>
            </View>
        )
        }}
        onEndReached={loadMore}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        />

        {qtyBtn != 0 ? 
        <TouchableOpacity 
            activeOpacity={0.9} 
            // onPress={()=>alert()}
            onPress={()=>navigation.navigate('Checkout Pesanan')}
            style={{
            marginBottom:15,
            position:'absolute', 
            bottom:0, 
            width:'100%',
            padding:12
            }}>
            <View style={{backgroundColor:colors.btnActif, borderRadius:100, paddingVertical:10, paddingHorizontal:16,flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <IconKeranjang height={35} width={35}/>
              <View style={{flex:1,marginLeft:10}}>
                <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>{dataItem.qty} Produk Dipilih</Text>
                <Text style={{marginTop:2, color:'white', fontSize:14, fontWeight:'bold'}}>{formatRupiah(dataItem.total, 'Rp. ')}</Text>
              </View>
              <View style={{justifyContent:'center'}}>
                <IconArraw/>
              </View>
            </View>
          </TouchableOpacity>
          :
          null
        }
        


        <SwipeablePanel {...panelProps} isActive={showPannel}>
            <ScrollView>
                <View style={{flex:1, alignItems:'center', marginTop:24}}>
                <View style={{height:343, width:'90%',borderRadius:12, elevation:3, alignItems:'center', justifyContent:'center', marginTop:8, marginBottom:16}}>
                <Image source={{uri: img_produk ? img_produk:exampleImageUri}} style={{height:'100%', width:'100%', borderRadius:12}} />
                </View>
                </View>
                <View style={{marginLeft:18, marginRight:18, alignItems:'flex-start', justifyContent:'flex-start'}}>
                <Text style={{paddingRight:10, paddingLeft:10, paddingTop:4, paddingBottom:4, backgroundColor:colors.btnTextGray, borderRadius:100, color:'white', fontWeight:'bold'}}>{kategori}</Text>
                <Text style={{marginTop:16, fontSize:16, fontWeight:'bold', width:'80%'}}>{namaProduk}</Text>
                <Text style={{marginTop:10, fontSize:16, fontWeight:'bold', width:'80%', color:colors.btnActif}}>{formatRupiah(hargaProduk, 'Rp. ')}</Text>
                </View>
                <View style={{borderWidth:1, borderColor:'#EBEBEB', marginTop:16, marginLeft:18, marginRight:18, marginBottom:16}}/>
                <View style={{marginLeft:18, marginRight:18,}}>
                <Text style={{fontSize:16, fontWeight:'bold', }}>Deskripsi Produk</Text>
                <Text style={{fontSize:14, fontWeight:'normal', marginTop:10 }}>{deskripsi}</Text>
                </View>
            </ScrollView>
        </SwipeablePanel>

        <SwipeablePanel {...panelPropsFilter} isActive={showFilter}>
            <ScrollView
            showsVerticalScrollIndicator={false}
             style={{flex:1}}>
                <View style={{marginLeft:18, marginRight:18, alignItems:'center', flexDirection:'row', marginTop:24}}>
                <Text style={{paddingRight:10, paddingTop:4, paddingBottom:4, color:'black', fontWeight:'bold', flex:1, fontSize:16}}>Filter Berdasarkan</Text>
                <TouchableOpacity style={{flex:1,}} onPress={ResetRefresh}>
                <Text style={{textAlign:'right', fontSize:16, fontWeight:'bold', color:colors.btnActif,}}>Reset Filter</Text>
                </TouchableOpacity>
                </View>
                
                <View style={{marginLeft:18, marginRight:18, marginTop:18}}>
                <Text style={{fontSize:16, fontWeight:'bold', color:colors.btnTextGray}}>Kategori</Text>
                <FlatList 
                data={dataKategori}
                style={{paddingTop:16, backgroundColor:'white', flex:1}}
                renderItem={({item, index}) => {
                    return (
                    <View style={{flexDirection:'row', width:'100%', marginBottom:15}}>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'balck', flex:1}}>{item.kategori}</Text>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                        <CheckBox
                        disabled={false}
                        value={checlist}
                        tintColors={{ true: colors.btnActif, false: colors.btnTextGray}}
                        onValueChange={(item) => itemSelected(item, index)}
                        />
                        </View>
                    </View>
                    )
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                />
                </View>

                <View style={{marginLeft:18, marginRight:18, marginTop:18}}>
                <Text style={{fontSize:16, fontWeight:'bold', color:colors.btnTextGray,}}>Urutkan</Text>
                <FlatList 
                data={radio_props}
                style={{paddingTop:16, backgroundColor:'white', flex:1}}
                renderItem={({item, index}) => renderUrutkan(item, index)}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                />
                </View>

                <View style={{alignItems:'center', justifyContent:'center', marginTop:20}}>
                <TouchableOpacity style={{backgroundColor:colors.btnActif, borderRadius:100, height:43, width:'90%', alignItems:'center', justifyContent:'center'}} onPress={BtnTerapkan}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'white' }}>Terapkan</Text>
                </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SwipeablePanel>
        <LoadingImage visible={loading} />
        </View>
    )
}

export default DaftarProdukKasir

const styles = StyleSheet.create({
    page: {
        flex:1,
        backgroundColor:'white'
    },
    CrView:{
        backgroundColor:colors.bglayout,
        flexDirection:'row',
        marginTop:17,
        height:42,
        width:'100%',
        //elevation: 5,
        marginRight:18,
        marginLeft:18,
        marginBottom:2,
        marginTop:30,
        borderRadius:100,
        flex:1
    },
    CrFilter:{
        backgroundColor:colors.bglayout,
        marginTop:17,
        height:42,
        width:42,
        justifyContent:'center',
        marginRight:17,
        marginBottom:2,
        marginTop:30,
        borderRadius:100,
        alignItems:'center'
    }
})
