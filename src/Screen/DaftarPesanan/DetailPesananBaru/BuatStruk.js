import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal, Image, Platform, TextInput } from 'react-native'
import Api from '../../../Api'
import PopUpTambahProduk from '../../../ComponentPopup/PopUpTambahProduk'
import { HapusIcon, IconRekomen } from '../../../imgSvg'
import LoadingMessage from '../../../Loading/LoadingMessage'
import LoadingSukses from '../../../Loading/LoadingSukses'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListBuatStruk from './ListBuatStruk'
import RNPickerSelect from 'react-native-picker-select'
import LoadingSuksesTransaksi from '../../../Loading/LoadingSuksesTransaksi'
import SwipeablePanel from 'react-native-sheets-bottom';
import CustomBottomSheet from 'react-native-custom-bottom-sheet';
import Toast, { BaseToast } from 'react-native-toast-message';


var token = '';
var Trecomend = 0;

const BuatStruk = ({route, navigation}) => {

    const {IdOrder} = route.params;
    const {Tips} = route.params;
    const {Biaya_apl} = route.params;
    const [produk, setProduk] = useState([]);
    const [produkRecomend, setRecomendProduk] = useState([]);
    const [tampil, setTampil] = useState(false);
    const [visible, setVisible] = useState(false);
    const [name, setname] = useState();
    const [viewRecomend, setView] = useState(false);
    const [IDHapus, setHapus] = useState();
    const [colorItem, setColor] = useState();
    const [colorItemHapus, setColorHapus] = useState();
    const [loading, setLoading] = useState(false);
    const [pesan, setPesan] = useState('');
    const [tambahProduk, setTambah] = useState(false);
    const [satuan, setSatuan] = useState([]);
    const [namaproduk, setNamaProduk] = useState();
    const [qty, setQty] = useState();
    const [harga, setHarga] = useState();
    const [varian, setVarian] = useState();
    const [idSatuan, setIdsatuan] = useState();
    const [showSukses, setShowSukses] = useState(false);
    const [hapusRecomend, setHapusRecomend] = useState(false);
    const [visibleRecomend, setVisibleRecomend] = useState(false);
    const [updateProduk, setUpdateProduk] = useState(false);
    const [updateProdukManual, setUpdateProdukManual] = useState(false);
    const [idUpdateProduk, setIdProduk] = useState();
    const [satuanM, setSatuanM] = useState([]);
    const [namaprodukM, setNamaProdukM] = useState('');
    const [qtyM, setQtyM] = useState(0);
    const [hargaM, setHargaM] = useState(0);
    const [varianM, setVarianM] = useState('');
    const [showPannel, setViewPannel] = useState(false);
    const [showBtn, setShowBtn] = useState(true);
    const [showPanelRecomend, setViewPanelRec] = useState(false);
    const {Kunai, Token} = route.params;
    const [TotRec, setTotRec] = useState(0);
    //console.log('rote: ', Kunai);

    const [subTotal, setSubTotal] = useState(0);

    const hitungSubtotal = () => {
    
        var currentSubtotal = 0;
        var totalRec = 0;
        produkRecomend.map((items) => {
            totalRec = items.total * 1;
        })
        produk.map((item) => {
            if(item.keterangan != 'dihapus'){
                currentSubtotal += item.total * 1;
            }
        })
        setSubTotal(currentSubtotal + totalRec);
        //console.log('sub:', currentSubtotal);
        }

    function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    
    const paramHapus = {
        id:IDHapus,
        token:token
    }
    const paramHapusRecomen = {
        id:hapusRecomend
    }
    //console.log('token: ', token);

    const paramTambahRec = {
        no_order:IdOrder,
        token:token,
        nama_product:namaprodukM,
        qty:qtyM,
        varian:varianM,
        satuan:idSatuan,
        harga:hargaM,
    }

    const paramUpdateProduk = {
        id:idUpdateProduk,
        token:token,
        qty:qty,
        harga:harga
    }

    const paramUpdateProdukManual = {
        id:idUpdateProduk,
        token:token,
        qty:qty,
        harga:harga
        
    }

    //console.log('parameter: ', paramTambahRec);

    useEffect(() => {

        if(Token != null){
            token = Token;
        }else{
            token = makeid(22);
        }
        getData();
        hitungSubtotal();
        console.log('no 1', token);
    },[]);

    useEffect(() =>{
        setTimeout(()=>{
            hitungSubtotal();
        })
    })

    // if(Kunai === 1){
    //     getData();
    //     setTampil(true);
    // }

    const kondisi = (flag) => {
        
        if(flag === '1'){
        setVisibleRecomend(!visibleRecomend);
        } else {
        setVisible(!visible);
        }

        console.log('st: ',flag);
        
    }
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
           //setToken(result);
        }
        return result;
      }

      const getData = () => {
        const param = {
            no_order:IdOrder,
            token:token
        }
          //console.log(param);
          Api.post('transaksi/daftar_struk_produk', param)
          .then(async (body) => {
              let res = body.data
              let metadata = res.metadata
              let response = res.response
              var dataR = response.produk_rekomendasi;
              var tot = 0;
              if(metadata.status === 200){
                 setProduk(response.produk_konfirmasi);
                 setRecomendProduk(response.produk_rekomendasi);
                 var i = 0;
                 dataR.map((item) => {
                    tot = item.total;
                    Trecomend += tot *1;
                })
                setTotRec(Trecomend);
                console.log('Total_Rec', Trecomend);
                 //setTampil(true);
              } else {
                Toast.show({
                    text1: 'Maaf 🙏🏻',
                    text2:metadata.message,
                    position: 'bottom',
                    type: 'error',
                    visibilityTime:2000,
                    bottomOffset: 150,
                    //props: {uuid:'qqqq'},
                  });
              }
               hitungSubtotal();
             
          })
      }

      const selectItem = (select) => {
        //setVisible(!visible);
        SlidingUpPannel();
        setname(produk[select].nama_product);
        setHapus(produk[select].id);
        setColorHapus(produk[select].keterangan === 'dihapus');
      }

      const selectItemReload = (select) => {
        getData()
      }

      const selectItemRecomend = (select) => {
        setVisibleRecomend(!visibleRecomend);
        setHapusRecomend(produkRecomend[select].id);
        setname(produkRecomend[select].nama_product);
      }

      const selecItemUpdate = (select) => {
        if(produk[select].flag === '1'){
            //alert('populer');
            setIdProduk(produk[select].id);
            setUpdateProduk(true);
            setNamaProduk(produk[select].nama_product);
            setHarga(produk[select].harga);
            setSatuan(produk[select].satuan);
            setQty(produk[select].qty);
        } else{
            setIdProduk(produk[select].id);
            setUpdateProdukManual(true);
            setNamaProduk(produk[select].nama_product);
            setHarga(produk[select].harga);
            setSatuan(produk[select].satuan);
            setQty(produk[select].qty);
        }
      }

      const ViewUpdate = (index) => {

          if(index === '1'){
            setUpdateProdukManual(!updateProdukManual);
          } else {
            setUpdateProduk(!updateProduk);
          }
      }

      const renderItem = ({item, index}) => {
        //setname(item.nama_product);

        if(index === colorItem){
            return (
                <ListBuatStruk 
                nama={item.nama_product} 
                styleBg={{backgroundColor:'#C4C4C4'}}
                satuan={'x'+item.qty} 
                harga={item.harga}
                styStatus={item.keterangan}
                ImgBtn={require('../../../imgSvg/icon_hapus.png')}
                onPress={() => selectItem(index)}
                //btnItem={() => selecItemUpdate(index)}
                >
                </ListBuatStruk>        
            );

        } else if (item.keterangan === 'dihapus'){
            return(
                <ListBuatStruk 
                nama={item.nama_product} 
                satuan={'x'+item.qty} 
                harga={item.harga}
                styStatus={item.keterangan}
                ImgBtn={require('../../../imgSvg/icon-reload.png')}
                //onPress={() => navigation.navigate("Buat Struk", {IdOrder:IdOrder})}
                onPress={() => selectItemReload(index)}
                //btnItem={() => selecItemUpdate(index)}
                >
                </ListBuatStruk>  
            )
            
        } else{
            return (
                <ListBuatStruk 
                nama={item.nama_product} 
                satuan={'x'+item.qty} 
                harga={item.harga}
                styStatus={item.keterangan}
                ImgBtn={require('../../../imgSvg/icon_hapus.png')}
                onPress={() => selectItem(index)}
                //btnItem={() => selecItemUpdate(index)}
                >
                </ListBuatStruk>        
            );

        }
        
        };

        const renderItemRecomend = ({item, index}) => {
        
            return (
                <ListBuatStruk 
                nama={item.nama_product} 
                satuan={'x'+item.qty} 
                harga={item.harga}
                styStatus={'Rekomendasi'}
                ImgBtn={require('../../../imgSvg/icon_hapus.png')}
                onPress={() => selectItemRecomend(index)}>
                </ListBuatStruk>        
            );
            };

        const kondisiView = (index) => {
            setLoading(false);
            setVisible(false);
            setView(!viewRecomend);
            setLoading(false);
            
        }

        const kondisiBerhasil = (flag) => {
            //setView(!viewRecomend);
            setLoading(!loading);

            if(flag === '1'){
                setShowSukses(!showSukses);
            }
        }

        const ViewTambah = () => {
            setView(false);
            setTambah(!tambahProduk);
            getSatuan();
        }

        const HapusProduk = () => {
             Api.post('transaksi/hapus_product_transaksi', paramHapus)
             .then(async (body) => {
                 let res = body.data;
                 let metadata = res.metadata;
                 let response = res.response;

                 if (metadata.status === 200){
                    setPesan(metadata.message);
                    setVisible(false);
                    //kondisiView();
                    //kondisiBerhasil();
                    SlidingUpPannelRecomend();
                    setViewPannel(false);
                    setShowBtn(false);
                 }else{
                     alert(metadata.message);
                 }
                 hitungSubtotal();
             })
        }

        const getSatuan = () => {
            Api.get('master/satuan')
            .then(async (body) => {
                let res = body.data;
                let metadata = res.metadata;
                let response = res.response;

                if(metadata.status === 200){

                    var dataArray = [];

                    response.map((item) =>{
                        dataArray.push({
                            value: item.id,
                            label: item.label
                        })
                    })
                    setSatuan(dataArray);
                }
            })
        }

        const getTambahData = () => {
            Api.post('transaksi/add_rekomendasi_product_transaksi', paramTambahRec)
            .then(async (body) => {
                let res = body.data;
                let metadata = res.metadata

                if(metadata.status === 200){
                    setLoading(true);
                    setPesan(metadata.message);
                    setShowSukses(true);
                    ViewTambah();
                    //setTampil(true);
                    getData();
                }else{
                    alert(metadata.message);
                }
            })
        }

        const getHapusBrgRecomend = () => {
            Api.post('transaksi/hapus_produk_rekomendasi', paramHapusRecomen)
            .then(async (body) => {
                let res = body.data;
                let metadata = res.metadata;

                if(metadata.status === 200){
                 setVisibleRecomend(false);
                 getData();
                 alert(metadata.message);   
                } else{

                }
            })
        }

        const upProduk = () => {
            Api.post('transaksi/update_product_transaksi', paramUpdateProduk)
            .then(async (body) => {
                let res = body.data;
                let metadata = res.metadata;

                if(metadata.status === 200){
                    alert(metadata.message);
                    setUpdateProduk(false);
                    setUpdateProdukManual(false);
                    getData();
                }else{
                    alert(metadata.message);
                }
            })
        }

        const upProdukManual = () => {
            Api.post('transaksi/update_product_transaksi', paramUpdateProdukManual)
            .then(async (body) => {
                let res = body.data;
                let metadata = res.metadata;

                if(metadata.status === 200){
                    alert(metadata.message);
                    setUpdateProduk(false);
                    setUpdateProdukManual(false);
                    getData();
                }else{
                    alert(metadata.message);
                }
            })
        }

        const SlidingUpPannel = () => {
            setViewPannel(true);
            setShowBtn(false);
          };
        
        const CancleSlidingUp = () => {
            setViewPannel(false);
            setShowBtn(true);
            setViewPanelRec(false);
        }

        const SlidingUpPannelRecomend = () => {
            setViewPanelRec(true);
            setShowBtn(false);
          };
        
        const CancleSlidingUpRecomend = () => {
            setViewPanelRec(false);
            setViewPannel(false);
            setShowBtn(true);
        }
    
        const keRecomend = () => {
            CancleSlidingUpRecomend();
            navigation.navigate('Rekomendasi Barang', {Token:token, IdOrder:IdOrder, Tips:Tips, Biaya_apl:Biaya_apl});
        }

        

    return (
        <View style={styles.container}>
            <Header title="Buat Struk" onPress={() => navigation.goBack()}/>
            <ScrollView>
            <View>
                <Text style={{fontSize:16, color:'black', marginLeft:16, marginTop:16, marginBottom:16, fontWeight:'bold'}}> Struk Konfirmasi</Text>
            </View>
            <View
                style={{
                    borderBottomColor: '#D9D9D9',
                    borderBottomWidth:1,
                    marginRight:16,
                    marginLeft:16,
                    borderStyle:'dotted'
                }}
                />
            <View style={styles.bodyList}>

                <ScrollView>
                <View>
                <FlatList
                data={produk}
                renderItem={(item, index) => renderItem(item, index)}
                keyExtractor={item => item.id}
                />
                </View>

                <View style={{marginBottom:10}}>
                <FlatList
                data={produkRecomend}
                renderItem={(item, index) => renderItemRecomend(item, index)}
                keyExtractor={item => item.id}/>
                </View>

                {/* <View style={{alignItems:'center'}} >
                {tampil ? (
                <View style={styles.CrView} >
                <View style={{marginTop:12, marginLeft:19, marginBottom:11}}>
                <Text style={{fontSize:12, fontWeight:'bold', color:'#EB2843'}}> Produk Rekomendasi Penjual </Text>
                </View>

                <View style={styles.headerTittle}>
                <Text style={styles.txt1}> Nama Produk </Text>
                <Text style={styles.txt2}> Jumlah </Text>
                <Text style={styles.txt3}> Harga </Text>
                <Text style={styles.txt4}> Action </Text> 
                </View>

                </View>
                ): null}
                </View> */}

                </ScrollView>
            </View>
            </ScrollView>

            {showBtn ? (
            <View style={styles.CrView2}>
            <View style={styles.txtHarga}>
            <Text style={{fontWeight:'bold', flex:1, fontSize:14}}> Total Harga</Text>
            <Text style={{fontWeight:'bold', flex:1, textAlign:'right', fontSize:16}} >{formatRupiah(subTotal, "Rp")}</Text>
            </View>

            <View style={{alignItems:'center', marginBottom:32, justifyContent:'center',}}>
            <TouchableOpacity style={styles.CrViewBtn} onPress={() => navigation.navigate('Preview Struk', {data:produk, dataRec:produkRecomend, IdOrder:IdOrder, Token:token, Total:subTotal, Tips:Tips, Biaya_apl:Biaya_apl, Trec:TotRec})}>
            <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}> Lanjutkan </Text>
            </TouchableOpacity>
            </View>
            </View>
            ): null}


            <CustomBottomSheet
                visible={showPannel}
                onVisibilityChange={() => setViewPannel()}
                height={420}>
            <View style={{alignItems:'center', }}>
                <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                <Image source={require('../../../imgSvg/remove.png')} style={{height:120, width:120, marginTop:20}} />
                <Text style={{ marginTop:24, fontSize:14, fontWeight:'normal', width:'100%', textAlign:'center'}}>Apakah Anda Yakin Untuk Menghapus</Text>
                <Text style={{fontWeight:'bold', textTransform:'uppercase', marginTop:2, textAlign:'center'}}>{name}?</Text>
                <TouchableOpacity style={{height:48, marginTop:24, width:'90%', alignItems:'center', justifyContent:'center', backgroundColor:colors.btnActif, borderRadius:100,}} onPress={HapusProduk}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'white'}} >Hapus</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:48, marginTop:24, width:'90%', alignItems:'center', justifyContent:'center', borderColor:'gray', borderWidth:1, borderRadius:100,}} onPress={CancleSlidingUp}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'gray'}} >Batal</Text>
                </TouchableOpacity>
            </View>
            </CustomBottomSheet>

            <CustomBottomSheet
                visible={showPanelRecomend}
                onVisibilityChange={() => setViewPanelRec()}
                height={420}>
            <View style={{alignItems:'center', }}>
                <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
                <Image source={require('../../../imgSvg/recomend.png')} style={{height:120, width:120, marginTop:20}} />
                <Text style={{ marginTop:24, fontSize:14, fontWeight:'bold', width:'60%', textAlign:'center'}}>Apakah Anda ingin merekomendasikan produk lainnya?</Text>
                <TouchableOpacity style={{height:48, marginTop:24, width:'90%', alignItems:'center', justifyContent:'center', backgroundColor:colors.btnActif, borderRadius:100,}} onPress={keRecomend}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'white'}} >Rekomendasikan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:48, marginTop:24, width:'90%', alignItems:'center', justifyContent:'center', borderColor:'gray', borderWidth:1, borderRadius:100,}} onPress={CancleSlidingUpRecomend}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'gray'}} >Tolak</Text>
                </TouchableOpacity>
            </View>
            </CustomBottomSheet>
            

            {/* <SwipeablePanel {...panelProps} isActive={showPannel}>
            <View style={{alignItems:'center', }}>
                <Image source={require('../../../imgSvg/remove.png')} style={{height:120, width:120, marginTop:20}} />
                <Text style={{ marginTop:24, fontSize:14, fontWeight:'normal', width:'100%', textAlign:'center'}}>Apakah Anda Yakin Untuk Menghapus</Text>
                <Text style={{fontWeight:'bold', textTransform:'uppercase', marginTop:2, textAlign:'center'}}>{name}?</Text>
                <TouchableOpacity style={{height:42, marginTop:24, width:'80%', alignItems:'center', justifyContent:'center', backgroundColor:colors.btnActif, borderRadius:100,}} onPress={HapusProduk}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'white'}} >Hapus</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:42, marginTop:24, width:'80%', alignItems:'center', justifyContent:'center', borderColor:'gray', borderWidth:1, borderRadius:100,}} onPress={CancleSlidingUp}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'gray'}} >Batal</Text>
                </TouchableOpacity>
            </View>
            </SwipeablePanel> */}

        
            {/* <CustomBottomSheet
                visible={visibleRecomend}
                onVisibilityChange={() => SlidingUpPannelRecomend()}
                height={600}>
                <View style={{alignItems:'center', }}>
                <Image source={require('../../../imgSvg/remove.png')} style={{height:120, width:120, marginTop:20}} />
                <Text style={{ marginTop:24, fontSize:14, fontWeight:'normal', width:'100%', textAlign:'center'}}>Apakah Anda Yakin Ingin Menghapus Produk </Text>
                <Text style={{fontWeight:'bold', textTransform:'uppercase', marginTop:2, textAlign:'center'}}>{name}?</Text>
                <TouchableOpacity style={{height:42, marginTop:24, width:'80%', alignItems:'center', justifyContent:'center', backgroundColor:colors.btnActif, borderRadius:100,}} onPress={CancleSlidingUpRecomend}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'white'}} >Hapus</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:42, marginTop:24, width:'80%', alignItems:'center', justifyContent:'center', borderColor:'gray', borderWidth:1, borderRadius:100,}} onPress={CancleSlidingUpRecomend}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'gray'}} >Batal</Text>
                </TouchableOpacity>
            </View>
            </CustomBottomSheet> */}
            
            <Modal animationType="slide" transparent={true}
            visible={viewRecomend}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}} >
            <View style={styles.bodyModal}>
            <ScrollView>
            <View style={{alignItems:"center", marginTop:27}}> 
            <IconRekomen/>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', flex:1, marginTop:10}} >
                <Text style={{fontSize:14, marginRight:15, marginLeft:15, textAlign:'center'}}> Apakah Anda Ingin Merekomendasikan Produk Lain? </Text>
            </View>
            </ScrollView>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:10, marginBottom:33}}>
            <TouchableOpacity style={{height:35, width:100, backgroundColor:'gray', borderRadius:6, justifyContent:'center', alignItems:'center', marginRight:10}} onPress={kondisiView} > 
            <Text style={{fontSize:12, color:'white', fontWeight:'bold'}}> Cancel </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={{height:35, width:100, backgroundColor:colors.btnActif, borderRadius:6, justifyContent:'center', alignItems:'center'}} onPress={ViewTambah}> 
            <Text style={{fontSize:12, color:'white', fontWeight:'bold'}}> Sarankan </Text> 
            </TouchableOpacity>
            </View>
            </View>
            </View>
            </Modal>

            <LoadingSukses visible={loading} pesan={pesan} onPress={kondisiView}/>
            <LoadingSuksesTransaksi visible={showSukses} pesan={pesan} onPress={() => kondisiBerhasil('1')}/>

            <Modal animationType='slide' transparent={true}
            visible={tambahProduk}>
            <View style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.9)'}}>
            <View style={{flex:1, marginTop:200, backgroundColor:'white', borderTopLeftRadius:15, borderTopRightRadius:15 }}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={{flex:1}} onPress={ViewTambah}>
            <Text style={{fontSize:15, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginLeft:15}}> Batalkan </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1, alignItems:'flex-end'}} onPress={getTambahData}>
            <Text style={{fontSize:15, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginRight:15}}> Simpan </Text>
            </TouchableOpacity>
            </View>

            <ScrollView>
            <View style={{alignItems:'center', justifyContent:'center', marginTop:50}}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:20, marginRight:20, color:'#EB2843'}}> Produk Yang Kamu Rekomendasikan </Text>
            </View>
            
            <View style={{marginTop:44}}>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Nama Produk</Text>
            <TextInput 
            onChangeText={(text) => setNamaProdukM(text)}
            value={namaprodukM}  
            style={{height:37,  borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Jumlah</Text>
            <TextInput 
            onChangeText={(text) => setQtyM(text)}
            value={qtyM}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Satuan</Text>
            <View style={{marginLeft:37, marginRight:37, marginTop:8, marginBottom:10, borderColor:'black', borderWidth:1, height:37, borderRadius:4, alignItems:'center', justifyContent:'center'}}>
            <RNPickerSelect
            onValueChange={(value) => setIdsatuan(value)}
            placeholder={{
                label:'Pilih Satuan',
                value:''
            }}
            style={{inputAndroid:{
                justifyContent: 'center',
                textAlign: 'center',
                paddingHorizontal: 10,
                paddingVertical: 8,
                placeholderColor: 'black',
                fontSize:12,
                borderWidth: 0.5,
                color: 'black',

              }, inputIOS:{
                justifyContent: 'center',
                textAlign:'left',
                fontSize:12,
                fontWeight:'bold',
                placeholderColor: 'black',
                height:37,
                width:299,
                paddingLeft:10,
                borderWidth: 1,
                borderRadius:4,
                color: 'black',
              }
            }}
            items={satuan} />
            </View>
            
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Harga</Text>
            <TextInput 
            onChangeText={(text) => setHargaM(text)}
            value={hargaM}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>

            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Varian</Text>
            <TextInput 
            onChangeText={(text) => setVarianM(text)}
            value={varianM}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:20, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}}>
            </TextInput>

            </View>
            </ScrollView>

                {/* <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
                <TouchableOpacity style={{height:32, width:120, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={btnSimpan}>
                    <Text style={{fontSize:12, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Simpan </Text>
                </TouchableOpacity>
                </View> */}

            </View>
            </View>
        </Modal>


        <Modal animationType='slide' transparent={true}
            visible={updateProduk}>
            <View style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.9)'}}>
            <View style={{flex:1, marginTop:200, backgroundColor:'white', borderTopLeftRadius:15, borderTopRightRadius:15 }}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={{flex:1}} onPress={ViewUpdate}>
            <Text style={{fontSize:15, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginLeft:15}}> Batalkan </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1, alignItems:'flex-end'}} onPress={upProduk}>
            <Text style={{fontSize:15, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginRight:15}}> Simpan </Text>
            </TouchableOpacity>
            </View>

            <ScrollView>
            <View style={{alignItems:'center', justifyContent:'center', marginTop:50}}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:20, marginRight:20, color:'#EB2843'}}> Update Produk </Text>
            </View>
            
            <View style={{marginTop:44}}>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Nama Produk</Text>
            <TextInput 
            onChangeText={(text) => setNamaProduk(text)}
            editable={false}
            value={namaproduk}  
            style={{height:37,  borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Jumlah</Text>
            <TextInput 
            onChangeText={(text) => setQty(text)}
            value={qty}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Satuan</Text>
            <TextInput 
            onChangeText={(text) => setSatuan(text)}
            value={satuan}
            editable={false}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>
            
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Harga</Text>
            <TextInput 
            onChangeText={(text) => setHarga(text)}
            value={harga}
            editable={false}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>

            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Varian</Text>
            <TextInput 
            onChangeText={(text) => setVarian(text)}
            value={varian}
            editable={false}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:20, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}}>
            </TextInput>

            </View>
            </ScrollView>

                {/* <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
                <TouchableOpacity style={{height:32, width:120, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={btnSimpan}>
                    <Text style={{fontSize:12, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Simpan </Text>
                </TouchableOpacity>
                </View> */}

            </View>
            </View>
        </Modal>

        <Modal animationType='slide' transparent={true}
            visible={updateProdukManual}>
            <View style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.9)'}}>
            <View style={{flex:1, marginTop:200, backgroundColor:'white', borderTopLeftRadius:15, borderTopRightRadius:15 }}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={{flex:1}} onPress={() => ViewUpdate('1')}>
            <Text style={{fontSize:15, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginLeft:15}}> Batalkan </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1, alignItems:'flex-end'}} onPress={upProdukManual}>
            <Text style={{fontSize:15, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginRight:15}}> Simpan </Text>
            </TouchableOpacity>
            </View>

            <ScrollView>
            <View style={{alignItems:'center', justifyContent:'center', marginTop:50}}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:20, marginRight:20, color:'#EB2843'}}> Update Produk </Text>
            </View>
            
            <View style={{marginTop:44}}>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Nama Produk</Text>
            <TextInput 
            onChangeText={(text) => setNamaProduk(text)}
            editable={false}
            value={namaproduk}  
            style={{height:37,  borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Jumlah</Text>
            <TextInput 
            onChangeText={(text) => setQty(text)}
            value={qty}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Satuan</Text>
            <TextInput 
            onChangeText={(text) => setSatuan(text)}
            value={satuan}
            editable={false}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>
            
            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Harga</Text>
            <TextInput 
            onChangeText={(text) => setHarga(text)}
            value={harga}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}} keyboardType={'number-pad'}>
            </TextInput>

            <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Varian</Text>
            <TextInput 
            onChangeText={(text) => setVarian(text)}
            value={varian}
            editable={false}
            style={{height:37, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:20, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10, fontWeight:'bold'}}>
            </TextInput>

            </View>
            </ScrollView>

                {/* <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
                <TouchableOpacity style={{height:32, width:120, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={btnSimpan}>
                    <Text style={{fontSize:12, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Simpan </Text>
                </TouchableOpacity>
                </View> */}

            </View>
            </View>
        </Modal>
        <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
    )
}

export default BuatStruk

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'white'
    },
    header:{
        height:50,
    },
    headerTittle:{
        height:37,
        backgroundColor:'black',
        flexDirection:'row',
        alignItems:'center',
    },
    bodyList:{
        
    },
    bodyFooter:{
        height:108,
    },
    txt1:{
        flex:1.5,
        fontSize:12,
        color:'white',
        textAlign:'center',

    },
    txt2:{
        flex:0.8,
        fontSize:12,
        color:'white',
        //backgroundColor:'red',
        textAlign:'center',
    },
    txt3:{
        flex:1,
        fontSize:12,
        color:'white',
        textAlign:'center',
    },
    txt4:{
        flex:0.5,
        fontSize:12,
        color:'white',
        textAlign:'center',
        marginRight:18
    },
    txtHarga:{
        height:21,
        marginTop:11,
        marginLeft:16,
        marginRight:16,
        marginBottom:13,
        flexDirection:'row'
    },
    bodyList1:{
        height:125
    },
    CrView:{
        shadowColor: "#000",
        backgroundColor:'#ffffff',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },

        width:'96%',
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        marginRight:12,
        marginLeft:12,
        marginTop:24,
        borderRadius:10
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
        zIndex:0
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
    bodyModal:{
        height:308, 
        width:274, 
        backgroundColor:'white', 
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
            },
    textBold:{
        fontWeight:'bold',
        fontSize:12
    },
    
})
