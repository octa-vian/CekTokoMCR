import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Modal, RefreshControl, Image } from 'react-native'
import Api from '../../Api'
import ButtonFilter from '../../Button/ButtonFilterList/ButtonFilter'
import PopupFilter from '../../ComponentPopup/PopupFilter'
import { IconExit, IconFilter, IconSearch } from '../../IconSvg'
import LoadingImage from '../../Loading/LoadingImage'
import LoadingMessage from '../../Loading/LoadingMessage'
import { colors } from '../../Utils'
import Header from '../Header'
import ListProduk from './ListProduk'
import Toast from 'react-native-toast-message';
import SwipeablePanel from 'react-native-sheets-bottom';
import Keyboard from 'react-native-keyboard';
import CustomBottomSheet from 'react-native-custom-bottom-sheet'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from '@react-native-community/checkbox';
import VirtualKeyboard from 'react-native-virtual-keyboard';

var jumlahBtn = '';
var txt_kategori, txt_sortir = '';

var loadDefault = [{image:'../../imgSvg/belumadaa.png'}];
var offset = 0;
var onProsess = false;
var sortirBrg = '';
var JmlProduk = 0;

const ProdukPopuler = ({navigation}) => {

    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [getPopup, setPopup] = useState(false);
    const [btn, setBtn] = useState([]);
    const [changeColor, setColor] = useState();
    const [changeColorUrutan, setColorUrutan] = useState();
    const [search, setSearch] = useState("");
    const [loadingMes, setLoadingMes] = useState(false);
    const [pesan, setPesan] = useState('');

    const [getId, setId] = useState("");
    const [getUrut, setUrut] = useState("");
    const [length, setLength] = useState(20);
    const [refreshing, setRefresh] = useState(false);
    const [isLast, setLast] = useState(false);
    const [showPannel, setViewPannel] = useState(false);
    const [jumlah,  setJumlah] = useState(0);
    const [addKey, setKey] = useState('');
    const [addKategori, setValueKategori] = useState('');
    const [kategori, setKategori] = useState(false);
    const [sortir, setSortir] = useState(false);
    const [produkFilter, setProdukFilter] = useState([]);
    const [showProduk, setShowProduk] = useState(false);
    const [showProdukFilter, setShowProdukFilter] = useState(false);
    const [showUbahHarga, setShowUbahHarga] = useState(false);
    const [harga, setHarga] = useState('');

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
        
    const data = [
        {id: '1', name:'Termurah', nilai:'termurah'},
        {id: '2', name:'Termahal', nilai:'termahal'},
        {id:'3', name:'A-Z', nilai:'a-z'},
        {id:'4', name:'Z-A', nilai:'z-a'}
    ];

    var radio_props = [
        {label: 'A-Z', value: 0 },
        {label: 'Z-A', value: 1 },
        {label: 'Termurah', value: 2 },
        {label: 'Termahal', value: 3 },
        {label: 'Refresh', value: 4 }
      ];

    var radio_Kategori = [
    {label: 'Stok Tesedikit', value: 0 },
    {label: 'Stok Terbanyak', value: 1 }
    ];


    const imgEmpety = '../../imgSvg/belumadaa.png';

    // useEffect(() => {
    //     setLoading(true)
    //     //getData();
    //     getDataFilter();
    //   }, []); 

      useEffect(() => {
        onProsess = false;
        offset = 0;
        setLoading(true)
        getData();
        if(harga === ''){
            setHarga('0')
        }
      }, []);


    const toggleModal = () => {
    setPopup(!getPopup);
    };

    const SelectedItem = (select) => {
        btn.map((value) => {
            value.id;
            value.posisi=false;
        })
        btn[select].posisi=true;

        if(btn[select].posisi === true){
           // alert('berhasil');
            setColor(select);
            //pushId = btn[select].id;
            setId(select);
        }
        console.log('id: ', getId);
        console.log('btn: ', btn);
    }

    const SelectedItemUrutan = (select) => {
      data.map((value) => {
          value.id;
          value.posisi=false;
      })
      data[select].posisi=true;

      if(data[select].posisi === true){
         // alert('berhasil');
          setColorUrutan(select);
          setUrut(data[select].nilai);
      }

      console.log('btn: ', data);
  }

  const renderUrutkan = ({item, index}) => {
        
    if(index === changeColorUrutan){
        return(
            <ButtonFilter 
            key={item.id}
            style={{borderColor:colors.btnActif,
            borderWidth: 1, backgroundColor:'#FFF3F5'}}
            textStyle={{color:'#EB2843'}}
            tittle={item.name}
            nilai={item.nilai}
            onPress={() => SelectedItemUrutan(index)}>
            </ButtonFilter> 
            )
    } else {
        return(
            <ButtonFilter 
            key={item.id}
            tittle={item.name}
            nilai={item.nilai}
            onPress={() => SelectedItemUrutan(index)}>
            </ButtonFilter> 
            )
    }
}

const renderKategori = ({item, index}) => {

    if (index === changeColor){

        return (
            <ButtonFilter 
            style={{borderColor:colors.btnActif,
            borderWidth: 1, backgroundColor:'#FFF3F5'}}
            textStyle={{color:'#EB2843'}}
            key={item.id}
            tittle={item.kategori}
            onPress={() => SelectedItem(index)}>
            </ButtonFilter> 
            );
    } else{
        return (
            <ButtonFilter 
            key={item.id}
            tittle={item.kategori}
            onPress={() => SelectedItem(index)}>
            </ButtonFilter> 
            );
    }
    };

const getDataFilter = () =>  {
    Api.get('product/kategori')
    .then( async (response) => {
        let res = response.data;
        let metadata = res.metadata;

        if(metadata.status === 200) {
            // alert(metadata.message);
            setBtn(res.response);
            setLoading(false)
        } else{
            alert(metadata.message);
            setLoading(false)
        }
    })
}

const postProdukFilter = (text) => {
   setShowProduk(false);
   getFilter();
   setShowProdukFilter(true);
}



const getData = () => {
    if (!onProsess){
        onProsess = true;
        const param = {
            keyword:search,
            kategori:[],
            sort:sortirBrg,
            start:offset,
            count:length,
            is_stok_menipis:'0'
        };
         Api.post('product/list_product_merchant', param)
        .then( async (body) => {
            let res = body.data;
            let metadata = res.metadata;
            let response = res.response;
            onProsess = false;
            if(metadata.status === 200){
                setShowProduk(true);
                setLoading(false);
                setProduk(response);
                setPesan(metadata.message);
                setProduk(offset == 0 ? response : [...produk, ...response]);
                offset = response.length != 0 ? (offset + response.length) : offset;
                setLast(response.length != length ? true : false);
            } else if (metadata.status === 401){
                setLoading(false);
                Toast.show({
                    text1: 'Maaf 🙏🏻',
                    text2: metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
                  });
            } 
            else{
                setLoadingMes(true);
                setLoading(false);
                setPesan(metadata.message);
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
            setLoading(false);
            setLoadingMes(true);
            onProsess = false;
        })
    }
    }

    const loadMore = async() => {
        if(isLast === false){
            offset = offset + length
            setLoading(true);
            getData();
        }
      }

      const onRefresh = async () =>{
        offset=0;
        setProduk([])
        setLast(false)
        // await setRefresh(true)
        getData();
        console.log(offset);
      }

    const renderItem = ({item}) => {
            return (
              <ListProduk 
              key={item.id}
              gambar={item.image} 
              nama={item.nama_product} 
              harga={item.harga} 
              stok={item.stok}
              btnHarga={() => SlidingUpHarga(item.kode_product)}
              btnStok={() => SlidingUpPannel(item.kode_product, item.stok)}
              onPress={ () => navigation.navigate('Detail ProdukNew', { itemId:item.id, gambar:item.image, harga:item.harga, stok:item.stok, nama:item.nama_product, stokMinimal:item.stok_minimal, kode_produk:item.kode_product })}
              onEndReached={loadMore}>
              </ListProduk>
          )
    }

    const SlidingUpHarga = (kode) => {
        setKey(kode);
        setShowUbahHarga(true);
    }
    const SlidingUpPannel = (kode, jml) => {
        setJumlah(jml)
        setKey(kode);
        setViewPannel(true);
      };
    
    const CancleSlidingUp = () => {
        setViewPannel(false);
    }

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        showCloseButton: true,
        onClose: () => CancleSlidingUp(),
        onPressCloseButton: () => CancleSlidingUp(),
        // ...or any prop you want
      });

      useEffect(() => {
          if(jumlah === 0){
              setJumlah(0);
          } 
      },[])


      const setKeyPad = (key) => {
        if(key === 0) {
            setJumlah(0)
        }
        setJumlah(key);
      }

      const setKeyHarga = (key) => {
          if(key === 0){
              setHarga('0')
          }
          setHarga(key);
      }

      const CheckListItem = (value) => {
          if(sortir === 0){
            sortirBrg = 'a-z';
          } else if(sortir === 1) {
            sortirBrg = 'z-a';
          } else if(sortir === 2) {
            sortirBrg = 'termurah';
          } else if (sortir === 3) {
            sortirBrg = 'termahal';
          } else if (sortir === 4){
              sortirBrg = '';
          }
          onRefresh();
        //alert(sortirBrg);
          setLoading(true);
          setShowProduk(false);
          toggleModal();
      }

        const onPlus = () => {
            //var jum = jumlah + 1;
            setJumlah(jumlah * 1 + 1);
        }

        const onMinus = () => {
            if(jumlah > 0){
                setJumlah(jumlah * 1 - 1);
            } 
            
        }


        const UpdateStok = () => {
            const param = {
                kode_product:addKey,
                stok:jumlah,
                stok_minimal:""
            }
            console.log('stok: ', param)
            Api.post('product/update_stok_produk', param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status) {
                    await onRefresh();
                    Toast.show({
                    text1: 'Success 🙌🏻',
                    text2: metadata.message,
                    position:'bottom',
                    type:'success',
                    visibilityTime:2000,
                  });
                  CancleSlidingUp();
                } else {
                    Toast.show({
                        text1: 'Maaf 🙏🏻',
                        text2: metadata.message,
                        position: 'bottom',
                        type: 'error',
                        visibilityTime:2000,
                      });
                      CancleSlidingUp();
                }
            }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
        }

        const UpdateHarga = () => {
            const param = {
                kode_product:addKey,
                harga:harga
            }
            Api.post('product/update_harga_produk', param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status === 200){
                    await onRefresh();
                    //getData();
                    Toast.show({
                        text1: 'Success 🙌🏻',
                        text2: metadata.message,
                        position:'bottom',
                        type:'success',
                        visibilityTime:2000,
                      });
                      setShowUbahHarga(false);
                } else {
                    Toast.show({
                        text1: 'Maaf 🙏🏻',
                        text2: metadata.message,
                        position: 'bottom',
                        type: 'error',
                        visibilityTime:2000,
                      });
                      setShowUbahHarga(false);
                }
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }


    return (
        <View style={styles.page}> 
            <View>
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
                    <TouchableOpacity style={styles.CrFilter} onPress={setPopup}>
                        <Image source={require('../../imgSvg/icon-sort.png')} style={{height:28, width:28}}/>
                    </TouchableOpacity>
                </View>
                </View>

            {showProduk ? (
                <View style={{flex:1, marginTop:24,}}>
                <FlatList
                    data={produk}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item) => item.id}
                    onEndReached={loadMore}
                    showsVerticalScrollIndicator={false}/>
                </View>
            ):null}

           <LoadingImage visible={loading}/>
           

        {/* <Modal
        animationType='slide' transparent={true}
        visible={getPopup}>
        <View style={styles.page2}>

            <View style={styles.filter}>
            <TouchableOpacity style={{alignItems:'flex-end', marginTop:15, marginRight:20,}} onPress={toggleModal} >
                <IconExit height={18} width={18} />
            </TouchableOpacity>

            <ScrollView>
                <View style={{flex:1,}}>
                <Text style={{marginTop:15, marginLeft:15, fontWeight:'bold', fontSize:14}}> Kategori </Text>

                <View style={{justifyContent:'center', alignItems:"center", marginTop:15}}>
                <FlatList
                data={btn}
                renderItem={(item, index) => renderKategori(item, index)}
                keyExtractor={item => item.id}
                numColumns={3}/>
                </View>

                <Text style={{marginTop:45, marginLeft:15, fontWeight:'bold', fontSize:14}}> Urutkan </Text>

                <View style={{justifyContent:'center', alignItems:'center', marginTop:15}} >
                <FlatList
                data={data}
                renderItem={ (item, index) => renderUrutkan(item, index)}
                keyExtractor={item => item.id}
                numColumns={3}/>
                </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.btnFilter} onPress={postId} >
            <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}> Terapkan </Text> 
            </TouchableOpacity>
            </View>
        </View>
        </Modal> */}


        <CustomBottomSheet
                visible={showPannel}
                onVisibilityChange={() => setViewPannel()}
                height={500}>
            <View>
                <View style={{alignItems:'center'}}>
                <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                </View>
                <Text style={{marginLeft:16, marginTop:24, fontSize:14, fontWeight:'bold'}}>Ubah Jumlah Stok Barang</Text>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                <TouchableOpacity style={{height:48, width:48, marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, }} onPress={onMinus}>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >-</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, flex:0.4, backgroundColor:colors.bglayout }}>
                    {/* <TextInput 
                    style={{fontSize:14, fontWeight:'bold', textAlign:'center'}}
                    value={jumlah}
                    keyboardType={'number-pad'}
                    multiline={true}
                    editable={true}
                    showSoftInputOnFocus={false}
                    ></TextInput> */}
                    <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>{jumlah}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:48, width:48, marginTop:24, alignItems:'center', justifyContent:'center', borderColor:'#31B057', borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, }} onPress={onPlus}>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >+</Text>
                </TouchableOpacity>

                </View>
                
                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, backgroundColor:colors.btnActif }} onPress={UpdateStok}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'white'}} >Simpan</Text>
                </TouchableOpacity>

                <View style={{marginTop:24, alignItems:'center', }}>
                {/* <Keyboard 
                    keyboardType="decimal-pad"
                    onClear={(num) => onClear(num)}
                    // onDelete={this._handleDelete.bind(this)}
                     onKeyPress={(key) => setKeyPad(key)}
                /> */}
                <VirtualKeyboard 
                color='black' 
                pressMode='string' 
                onPress={(val) => setKeyPad(val)} 
                />
                </View>
                
            </View>
        </CustomBottomSheet>


        <CustomBottomSheet
                visible={showUbahHarga}
                onVisibilityChange={() => setShowUbahHarga()}
                height={500}>
            <View>
                <View style={{alignItems:'center'}}>
                <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                </View>
                <Text style={{marginLeft:16, marginTop:24, fontSize:14, fontWeight:'bold'}}>Ubah Harga</Text>

                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16,backgroundColor:colors.bglayout, flexDirection:'row' }}>
                    {/* <TextInput 
                    style={{fontSize:14, fontWeight:'bold', textAlign:'center'}}
                    value={jumlah}
                    keyboardType={'number-pad'}
                    multiline={true}
                    editable={true}
                    showSoftInputOnFocus={false}
                    ></TextInput> */}
                    <View style={{marginLeft:40, marginRight:12}}>
                        <Image source={require('../../imgSvg/icon-coin.png')} style={{height:20, width:20}} />
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{fontWeight:'bold', color:'#7A7A7A', fontSize:12}}>Masukan Harga</Text>
                    <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>{formatRupiah(harga, 'Rp. ')}</Text>
                    </View>
                    
                </TouchableOpacity>

                
                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, backgroundColor:colors.btnActif }} onPress={UpdateHarga}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'white'}} >Simpan</Text>
                </TouchableOpacity>

                <View style={{marginTop:24, alignItems:'center', }}>
                {/* <Keyboard 
                    keyboardType="decimal-pad"
                    onClear={(num) => onClear(num)}
                    // onDelete={this._handleDelete.bind(this)}
                     onKeyPress={(key) => setKeyPad(key)}
                /> */}
                <VirtualKeyboard 
                color='black' 
                pressMode='string' 
                onPress={(val) => setKeyHarga(val)} 
                />
                </View>
                
            </View>
        </CustomBottomSheet>

        <CustomBottomSheet
            visible={getPopup}
            onVisibilityChange={() => setPopup()}
            height={400}>
            <View>
                <View style={{alignItems:'center'}}>
                <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                </View>
                <Text style={{marginLeft:16, marginTop:24, fontSize:16, fontWeight:'bold'}}>Urutkan Berdasarkan</Text>

                <View style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:16, paddingRight:16, marginTop:24, backgroundColor:'white'}}>

                <View style={{flexDirection:'row', alignItems:'center', marginTop:12}}>
                <RadioForm
                formHorizontal={false}
                animation={true}>
                    {radio_props.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i} >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={sortir === i}
                        onPress={(value) => setSortir(value)}
                        borderWidth={3}
                        buttonInnerColor={'#e74c3c'}
                        buttonOuterColor={sortir === i ? colors.btnActif : 'white'}
                        buttonSize={20}
                        buttonOuterSize={30}
                        buttonWrapStyle={{marginTop:8, backgroundColor:colors.bglayout, borderRadius:100}}
                        />
                        <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(value) => setSortir(value)}
                        labelStyle={{fontSize:14, color:'black', fontWeight:'bold'}}
                        labelWrapStyle={{marginTop:11}}
                        />
                    </RadioButton>
                    ))}
                </RadioForm>
                </View>

                </View>
                
                <TouchableOpacity style={{height:48,marginTop:24, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, backgroundColor:colors.btnActif }} onPress={CheckListItem}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'white'}} >Simpan</Text>
                </TouchableOpacity>
                
            </View>
        </CustomBottomSheet>

        <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
    )
}

export default ProdukPopuler

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white',

    },
    CrView:{
        shadowColor: "#000",
        backgroundColor:'#FAFAFA',
        flexDirection:'row',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:42,
        width:'100%',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:18,
        marginLeft:18,
        marginBottom:2,
        marginTop:30,
        borderRadius:100,
        flex:1
    },
    CrFilter:{
        shadowColor: "#000",
        backgroundColor:'#FAFAFA',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:42,
        width:42,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:17,
        marginBottom:2,
        marginTop:30,
        borderRadius:100,
        alignItems:'center'
    },

    page2:{
        flex:1,
        backgroundColor:'rgba(52, 52, 52, 0.9)',
        justifyContent:'center',
        
    },
    filter:{
        flex:1,
        justifyContent:'center',
        marginTop:200,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        },
    btnFilter:{
        height:35, 
        borderRadius:6,
        marginLeft:100,
        marginRight:100,
        marginBottom:30,
        marginTop:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.btnActif,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
            }
})
