import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import Api from '../../../Api'
import LoadingSukses from '../../../Loading/LoadingSukses'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListPreviewStruk from './ListPreviewStruk'
import ListPreviewStruk2 from './ListPreviewStruk2'
import SwipeablePanel from 'react-native-sheets-bottom';
import CustomBottomSheet from 'react-native-custom-bottom-sheet';

const PreviewStruk = ({route, navigation}) => {
    const {data} = route.params;
    const {dataRec} = route.params;
    const {IdOrder} = route.params;
    const {Token} = route.params;
    const {Total} = route.params;
    const {Tips} = route.params;
    const {Biaya_apl} = route.params;
    const {Trec} = route.params;
    var TotRec = parseInt(Trec);
    var tip = parseInt(Tips);
    var B_apl = parseInt(Biaya_apl);
    var Grand_Total = Total + tip + B_apl + TotRec;
    console.log('no 2: ', Token);
    const [loading, setLoading] = useState(false);
    const [pesan, setPesan] = useState();
    const [Komentar, setKomentar] = useState();
    const [showPannel, setViewPannel] = useState(false);
    const [showBtn, setShowBtn] = useState(true);
    console.log('no 3', route.params);


    const param = {
        no_order:IdOrder,
        token:Token,
        catatan:Komentar
    }



    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    const renderItem = ({item, index}) => {
        
        return (
            <ListPreviewStruk 
            nama={item.nama_product} 
            satuan={'x'+item.qty}  
            harga={item.total}
            hargaSatuan={item.harga}
            status={item.keterangan}>
            </ListPreviewStruk>        
        );
        };
    
    const renderItemRec = ({item, index}) => {
    
        return (
            <ListPreviewStruk2 
            nama={item.nama_product} 
            satuan={'x'+item.qty} 
            status={'Rekomendasi'}
            harga={item.harga}>
            </ListPreviewStruk2>       
        );
    };

        const konfrm = () => {
            getKirimData();
            SlidingUpPannel();
            setShowBtn(false);
        } 

    const getKirimData = () => {
        Api.post('transaksi/process_new_order', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;
            console.log(res)

            if(metadata.status === 200){
                //setLoading(true);
                setPesan(metadata.message);
                //SlidingUpPannel();
            }else{
                alert(metadata.message);
            }
        })
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
        openLarge: false,
        showCloseButton: false,
        onClose: () => CancleSlidingUp(),
        onPressCloseButton: () => CancleSlidingUp(),
        // ...or any prop you want
      });

    const setKirim = () => {
        setViewPannel(false);
        navigation.navigate('Menunggu Konfirmasi');
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header title="Preview Struk" onPress={() => navigation.goBack()} ></Header>
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
            <View style={{alignItems:'center', flex:1}}>
            <View style={{ marginLeft:16, marginRight:16, marginTop:20, flex:1, width:'100%'}}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>
            {/* <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:14, marginTop:14, marginLeft:24, fontWeight:'bold', color:'black'}}> 
            Struk yang akan dikonfirmasi Pembeli 
            </Text>
            
            </View>
            <View style={{borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:8,
                    marginRight:22,
                    marginLeft:22}}>

            </View>
            </View> */}

            <View style={{ marginLeft:16, marginRight:16, marginTop:18, width:'100%'}}>
            <FlatList
                data={dataRec}
                renderItem={renderItemRec}
                // keyExtractor={item => 'anime-' + item.id}
                />
            </View>

            <View style={{ marginLeft:16, marginRight:16, marginTop:10, width:'100%'}}>

                <View style={{marginLeft:16, marginRight:16}}>
                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'black'}}>Subtotal</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(Total, 'Rp.')}</Text>
                </View>
                </View>
                </View>

                <View style={{marginLeft:16, marginRight:16}}>
                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'black'}}>Total Barang Rekomendasi</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(TotRec, 'Rp.')}</Text>
                </View>
                </View>
                </View>

                <View style={{marginLeft:16, marginRight:16}}>
                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'black'}}>Tips</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(Tips, 'Rp.')}</Text>
                </View>
                </View>
                </View>

                <View style={{marginLeft:16, marginRight:16}}>
                <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Biaya Aplikasi</Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}>{formatRupiah(Biaya_apl, 'Rp.')}</Text>
                </View>
                </View>
                </View>
            </View>

            <View style={{borderBottomColor:'#00000029', borderBottomWidth:1, marginLeft:16, marginRight:16, marginTop:20, width:'100%'}}></View>

            <View style={styles.bodyFooter}>
                <View style={styles.txt1}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                        Total Harga
                    </Text>
                </View>
                <View style={styles.txt2}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>
                        {formatRupiah(Grand_Total, 'Rp')}
                    </Text>
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

            <Text style={{marginLeft:16, fontSize:16, fontWeight:'bold'}}> Catatan Penjual</Text>
            <View style={{height:49, borderRadius:16, backgroundColor:colors.bglayout, marginTop:16, marginBottom:24, marginLeft:16, marginRight:24, flexDirection:'row', alignItems:'center', paddingRight:10}}>
            <Image source={require('../../../imgSvg/icon-edit.png')} style={{height:20, width:20, marginLeft:33}}/>
            <View style={{width:'100%', flex:1, }}>
            <TextInput style={{marginLeft:24, marginRight:43, fontSize:14, }} 
            placeholder={'Tinggalkan Pesan'}
            onChangeText={(text) => setKomentar(text)}
            value={Komentar} >
            </TextInput>
            </View>
            
            </View>

            </ScrollView>
            {showBtn? (
            <View style={{alignItems:'center', marginBottom:32}}>
            <View style={styles.CrViewBtn}>
                <TouchableOpacity style={{height:38, width:324, alignItems:'center', justifyContent:'center'}} onPress={() => konfrm()}>
                    <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}> Konfirmasi Struk </Text>
                </TouchableOpacity>
            </View>
            </View>
            ):null}
            

            {/* <LoadingSukses visible={loading} onPress={konfrm} pesan={pesan} /> */}

            <CustomBottomSheet
                visible={showPannel}
                onVisibilityChange={() => setViewPannel()}
                height={400}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
            <View style={{borderBottomWidth:6, borderBottomColor:'gray', width:'25%', borderRadius:12}}></View>
            <Image source={require('../../../imgSvg/icon-check-list-sukses-pesanan.png')} style={{height:150, width:150, marginTop:32}} />
            <Text style={{ marginTop:24, fontSize:14, fontWeight:'bold', width:'100%', textAlign:'center'}}>{pesan}</Text>
            {/* <Text style={{fontWeight:'bold', textTransform:'capitalize', marginTop:2, textAlign:'center'}}>{pesan}</Text> */}

            <TouchableOpacity style={{height:48, marginTop:24, alignItems:'center', width:'90%', justifyContent:'center', backgroundColor:colors.btnActif, borderRadius:100,}} onPress={() => setKirim()}>
                <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>Ok</Text>
            </TouchableOpacity>

            </View>
            </CustomBottomSheet>
           
        </View>
    )
}

export default PreviewStruk

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
        marginTop:10,
        marginBottom:10
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
        backgroundColor:'#FFFFFF',
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
        marginBottom:2,
        marginRight:24,
        marginLeft:24,
        marginTop:24,
        borderRadius:10
    },
    CrView2:{
        shadowColor: "#000",
        backgroundColor:'#222831',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:'92%',
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
