import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import Api from '../../Api';
import { colors } from '../../Utils'
import Header from '../Header';
import ListRincianStokProduk from './ListRincianStokProduk';
import Toast from 'react-native-toast-message';
import CustomBottomSheet from 'react-native-custom-bottom-sheet'
import VirtualKeyboard from 'react-native-virtual-keyboard';
import RepoUtil from '../../Helper/RepoUtil';
var uid = '';

const DetailProdukNew = ({route, navigation}) => {

    const {itemId} = route.params;
    const {gambar} = route.params;
    const {stok} = route.params;
    const {nama} = route.params;
    const {harga} = route.params;
    const {stokMinimal} = route.params;
    const {kode_produk} = route.params;

    const [showEditItem, setShowEditItem] = useState(false);
    const [showPopUpHapus, setShowPopUpHapus] = useState(false);
    const [jumlah, setJumlah] = useState(0);
    const [Mstok, setStok] = useState(0);
    const [getProduk, setDataProduk] = useState({
        stok:'',
        stok_minimal:'',
        harga:''
    });


    const [produk, setProduk] = useState();

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        const loadSession = async () => {
            const dataRepo = await RepoUtil.GetAsObject('@session');
            console.log('data Repo', dataRepo);
            if(dataRepo != null){
                uid = dataRepo.response.uid;
            }
            getData();
            getDataProduk();
          };


        useEffect(() => {
            loadSession();
        },[]);

        const SlidingUpEdit = () => {
            var stok = getProduk.stok_minimal;
            var jml = getProduk.stok;
            setJumlah(jml.toString());
            setStok(stok.toString());
            setShowEditItem(true);
        }

        const onPlus = () => {
            var jum = Mstok * 1 + 1;
            setStok(jum.toString());
            console.log(Mstok);
        }

        const onPlusJumlah = () => {
            var jum = jumlah * 1 + 1;
            setJumlah(jum.toString());
            console.log(jumlah);
        }

        const onMinusJumlah = () => {
            var jum = jumlah * 1 - 1;
            setJumlah(jum.toString());
        }

        const onMinus = () => {
            var jum = Mstok * 1 - 1;
            setStok(jum.toString());
            
        }

        const UpdateStok = () => {
            const param = {
                kode_product:kode_produk,
                stok:jumlah,
                stok_minimal:Mstok
            }
            console.log('stok: ', param)
            Api.post('product/update_stok_produk', param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status) {
                    getData();
                    getDataProduk();
                    Toast.show({
                    text1: 'Success 🙌🏻',
                    text2: metadata.message,
                    position:'bottom',
                    type:'success',
                    visibilityTime:2000,
                  });
                  setShowEditItem(false);
                } else {
                    Toast.show({
                        text1: 'Maaf 🙏🏻',
                        text2: metadata.message,
                        position: 'bottom',
                        type: 'error',
                        visibilityTime:2000,
                      });
                      setShowEditItem(false);
                }
            }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
        }


        const getData = () => {
            const param = {
                id_produk:itemId
            }
            console.log('idItem: ', param)
            Api.post('product/rincian_stok_produk', param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status === 200){
                    setProduk(response);
                } else{
                    Toast.show({
                    text1: 'Maaf 🙏🏻',
                    text2: metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
              });
                }
            })
        }


        const renderItem = ({item}) => {
            return(
                <ListRincianStokProduk
                statusStok={item.keterangan}
                jumlah={item.stok}
                totalStok={item.sisa_stok}
                tanggal={item.insert_at}>
                </ListRincianStokProduk>

            )
        }

        const getDataProduk = () =>{
            const param = {
                id:itemId,
                uid_merchant:uid
            }
            Api.post('product/detail_produk', param)
            .then( async (response) => {
                let res = response.data;
                let metadata = res.metadata;
        
                if(metadata.status === 200){
                    setDataProduk(res.response);
                } else {
                    Toast.show({
                        text1: 'Maaf 🙏🏻',
                        text2: metadata.message,
                        position: 'bottom',
                        type: 'error',
                        visibilityTime:2000,
                  });
                }
            }) 
            .catch(err => console.log('err: ', err))
            }

        const HapusProduk = () => {
            const param = {
                kode_product:kode_produk
            }
            Api.post('product/hapus_produk',param)
            .then(async(body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status === 200){
                    Toast.show({
                        text1: 'Success 🙌🏻',
                        text2: metadata.message,
                        position:'bottom',
                        type:'success',
                        visibilityTime:2000,
                      });
                      navigation.replace('Populer');
                } else {
                    Toast.show({
                        text1: 'Maaf 🙏🏻',
                        text2: metadata.message,
                        position: 'bottom',
                        type: 'error',
                        visibilityTime:2000,
                  });
                }
            })
        }

        const ConfirmHapus = () => {
            HapusProduk();
            setShowPopUpHapus(false);
        }

        
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header title='Detail Stok' onPress={() => navigation.goBack()}/>
            <View style={{flexDirection:'row'}}>
                <View style={{height:100, width:100, alignItems:'center', justifyContent:'center',
                    marginTop:16,
                    marginLeft:16,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    borderRadius:8,
                    elevation: 5,}}>
                <Image source={{uri:gambar}} style={{height:100, width:100, borderRadius:8, }} />
                </View>
                
                <View style={{alignItems:'flex-start', marginTop:12, flex:1}}>
                <Text style={{color:'black', marginLeft:12, fontSize:14, marginRight:12, fontWeight:'bold' }}>{nama}</Text>
                <Text style={{color:colors.btnActif, marginLeft:12, fontSize:14, marginTop:8, fontWeight:'bold'}}>{formatRupiah(harga, 'Rp. ')}</Text>
                <View style={{flexDirection:'row', marginTop:16, marginLeft:16, marginRight:16}}>
                <View style={{flex:1, flexDirection:'row'}}>
                <Text style={{color:colors.btnTextGray, fontSize:14, fontWeight:'normal'}}>Stok: </Text>
                <Text style={{color:'black', fontSize:14, fontWeight:'bold'}}>{getProduk.stok}</Text>
                </View>

                <View style={{flex:1, alignItems:'flex-end', flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={{color:colors.btnTextGray, fontSize:14, fontWeight:'normal'}}>Stok Minimum: </Text>
                <Text style={{color:'black', fontSize:14, fontWeight:'bold'}}>{getProduk.stok_minimal}</Text>
                </View>
                
                </View>
                </View>
                </View>
                
                <View style={{flexDirection:'row', paddingLeft:16, paddingRight:16, marginTop:24}}>

                    <TouchableOpacity style={{borderColor:colors.btnTextGray, borderWidth:1, borderRadius:100, flex:1, height:38, alignItems:'center', justifyContent:'center', marginRight:10}} onPress={SlidingUpEdit} >

                        <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Ubah</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{borderColor:colors.btnTextGray, borderWidth:1, borderRadius:100, flex:1, height:38, alignItems:'center', justifyContent:'center',}} onPress={() => setShowPopUpHapus(true)}>

                        <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Hapus</Text>

                    </TouchableOpacity>

                </View>

                <View style={{borderBottomColor:'#FAFAFA', borderBottomWidth:6, marginTop:24, marginBottom:10}}></View>

                <View style={{paddingLeft:16, paddingRight:16, flex:1, paddingBottom:15}}>
                <FlatList
                data={produk}
                renderItem={(item) => renderItem(item)}
                numColumns={1}
                keyExtractor={(item) => item.id}
                />
                </View>

                <CustomBottomSheet
                visible={showEditItem}
                onVisibilityChange={() => setShowEditItem()}
                height={380}
                >
                <View>
                    <View style={{alignItems:'center'}}>
                    <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                    </View>
                    <Text style={{marginLeft:16, marginTop:24, fontSize:14, fontWeight:'bold'}}>Ubah Detail Barang</Text>

                    <View style={{flexDirection:'row', marginTop:24}}>
                    <View style={{height:60, width:60, alignItems:'center', justifyContent:'center',
                        marginTop:16,
                        marginLeft:16,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        borderRadius:8,
                        elevation: 5,}}>
                    <Image source={{uri:gambar}} style={{height:60, width:60, borderRadius:8, }} />
                    </View>
                
                <View style={{alignItems:'flex-start', marginTop:12, flex:1}}>
                <Text style={{color:'#7A7A7A', marginLeft:12, fontSize:14, marginRight:12, fontWeight:'normal' }}>{nama}</Text>
                <Text style={{color:'#7A7A7A', marginLeft:12, fontSize:14, marginTop:8, fontWeight:'bold'}}>{formatRupiah(harga, 'Rp. ')}</Text>
                </View>
                </View>

                <View style={{alignItems:'center', marginTop:34, marginLeft:16, marginRight:16}}>
                
                <View style={{flexDirection:'row', alignItems:'center',}}>
                <Text style={{flex:1, fontWeight:'bold', fontSize:14}}>Jumlah Barang</Text>
                <TouchableOpacity style={{height:28, width:28, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, }} onPress={() => onMinusJumlah()}>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >-</Text>
                </TouchableOpacity>

                <TextInput 
                style={{alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, flex:0.4, backgroundColor:colors.bglayout, textAlign:'center', height:38, fontWeight:"bold"}}
                value={jumlah}
                onChangeText={(text) => setJumlah(text)}
                keyboardType={'number-pad'}
                multiline={true}
                ></TextInput>
                {/* <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>{jumlah}</Text> */}
                

                <TouchableOpacity style={{height:28, width:28, alignItems:'center', justifyContent:'center', borderColor:'#31B057', borderRadius:100, borderWidth:1, }} onPress={onPlusJumlah}>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >+</Text>
                </TouchableOpacity>

                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                <Text style={{flex:1, fontWeight:'bold', fontSize:14}}>Stok Minimum</Text>
                <TouchableOpacity style={{height:28, width:28, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1,  }} onPress={onMinus}>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >-</Text>
                </TouchableOpacity>

                <TextInput 
                style={{alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, flex:0.4, backgroundColor:colors.bglayout, textAlign:'center', height:38, fontWeight:"bold"}}
                value={Mstok}
                onChangeText={(text) => setStok(text)}
                keyboardType={'number-pad'}
                multiline={true}
                ></TextInput>

                <TouchableOpacity style={{height:28, width:28, alignItems:'center', justifyContent:'center', borderColor:'#31B057', borderRadius:100, borderWidth:1,  }} onPress={onPlus}>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >+</Text>
                </TouchableOpacity>
                </View>
                </View>

                {/* <View style={{marginTop:24, alignItems:'center', }}>
                <VirtualKeyboard 
                color='black' 
                pressMode='string' 
                onPress={(val) => setKeyPad(val)} 
                />
                </View> */}

                    
                <TouchableOpacity style={{height:48,marginTop:35, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, backgroundColor:colors.btnActif }} onPress={UpdateStok}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'white'}} >Simpan</Text>
                </TouchableOpacity>

                    
                </View>
        </CustomBottomSheet>

        <CustomBottomSheet
            visible={showPopUpHapus}
            onVisibilityChange={() => setShowPopUpHapus()}
            height={280}
            >
            <View>
                <View style={{alignItems:'center'}}>
                <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                </View>
                <Text style={{marginLeft:16, marginTop:24, fontSize:14, fontWeight:'bold'}}>Apakah Anda Yakin Ingin Menghapus?</Text>

                
            <TouchableOpacity style={{height:48,marginTop:35, alignItems:'center', justifyContent:'center', borderColor:colors.btnActif, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, backgroundColor:colors.btnActif }} onPress={ConfirmHapus} >
                <Text style={{fontSize:14, fontWeight:'bold', color:'white'}} >Hapus</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:48,marginTop:35, alignItems:'center', justifyContent:'center', borderColor:colors.btnTextGray, borderRadius:100, borderWidth:1, marginLeft:16, marginRight:16, backgroundColor:'white' }} onPress={() => setShowPopUpHapus(false)}>
                <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray}} >Batal</Text>
            </TouchableOpacity>

                
            </View>
            </CustomBottomSheet>

                <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
    )
}

export default DetailProdukNew
