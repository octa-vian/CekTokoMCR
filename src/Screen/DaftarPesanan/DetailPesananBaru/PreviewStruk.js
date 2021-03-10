import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Api from '../../../Api'
import LoadingSukses from '../../../Loading/LoadingSukses'
import { colors } from '../../../Utils'
import Header from '../../Header'
import ListPreviewStruk from './ListPreviewStruk'
import ListPreviewStruk2 from './ListPreviewStruk2'

const PreviewStruk = ({route, navigation}) => {
    const {data} = route.params;
    const {dataRec} = route.params;
    const {IdOrder} = route.params;
    const {Token} = route.params;
    const {Total} = route.params;
    console.log('no 2: ', Token);
    const [loading, setLoading] = useState(false);
    const [pesan, setPesan] = useState();
    const [Komentar, setKomentar] = useState();
    console.log('no 3', route.params);


    const param = {
        no_order:IdOrder,
        token:Token,
        catatan:Komentar
    }



    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    const renderItem = ({item, index}) => {
        
        return (
            <ListPreviewStruk 
            nama={item.nama_product} 
            satuan={item.qty +" "+item.satuan}  
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
            satuan={item.qty +" "+item.satuan} 
            harga={item.harga}>
            </ListPreviewStruk2>       
        );
        };

        const konfrm = () => {
            setLoading(!loading);
        } 

    const getKirimData = () => {
        Api.post('transaksi/process_new_order', param)
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;
            console.log(res)

            if(metadata.status === 200){
                setLoading(true);
                setPesan(metadata.message);
                navigation.navigate('Menunggu Pesanan')

            }else{
                //alert(metadata.message);
            }
        })
    }

        

    return (
        <View style={{flex:1}}>
            <Header title="Preview Struk" onPress={() => navigation.goBack()} ></Header>
            <ScrollView>
            <View style={{alignItems:'center'}}>
            <View style={styles.CrView} >
            <View>
            <Text style={{fontSize:14, marginTop:14, marginLeft:24, fontWeight:'bold', color:'black'}}> 
            Struk yang akan dikonfirmasi Pembeli 
            </Text>
            <View style={{ marginLeft:13, marginRight:13, marginTop:20}}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>
            </View>
            <View style={{borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:8,
                    marginRight:22,
                    marginLeft:22}}>

            </View>
            
            <View style={styles.bodyFooter}>
                <View style={styles.txt1}>
                    <Text style={{fontSize:12, fontWeight:'bold'}}>
                        Total Harga
                    </Text>
                </View>
                <View style={styles.txt2}>
                <Text style={{fontSize:12, fontWeight:'bold'}}>
                        {formatRupiah(Total, 'Rp')}
                    </Text>
                </View>
            </View>
            </View>

            <View style={styles.CrView2} >
            <View>
            <Text style={{fontSize:14, marginTop:12, marginLeft:24, fontWeight:'bold', color:'white', fontWeight:'bold'}}> 
            Produk Rekomendasi Penjual 
            </Text>
            <View style={{ marginLeft:13, marginRight:13, marginTop:18, marginBottom:10}}>
            <FlatList
                data={dataRec}
                renderItem={renderItemRec}
                // keyExtractor={item => 'anime-' + item.id}
                />
            </View>
            </View>
            {/* <View style={{borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:8,
                    marginRight:22,
                    marginLeft:22}}>

            </View> */}

            </View>
            </View>

            <Text style={{marginTop:26, marginLeft:43, fontSize:12, fontWeight:'bold'}}> Catatan Penjual:</Text>

            <TextInput style={{marginTop:10, marginLeft:43, marginRight:43, fontSize:12, }} 
            placeholder={'*Tinggalkan Pesan'}
            onChangeText={(text) => setKomentar(text)}
            value={Komentar} >
            </TextInput>
            <View
                style={{
                    borderBottomColor: '#D9D9D9',
                    borderBottomWidth: 1,
                    marginTop:4,
                    marginRight:25,
                    marginLeft:25
                }}
                />

            </ScrollView>

            <View style={{alignItems:'center', marginBottom:32}}>
            <View style={styles.CrViewBtn}>
                <TouchableOpacity style={{height:38, width:324, alignItems:'center', justifyContent:'center'}} onPress={() => getKirimData()}>
                    <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}> Kirim Struk </Text>
                </TouchableOpacity>
            </View>
            </View>

            <LoadingSukses visible={loading} onPress={konfrm} pesan={pesan} />
           
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
        marginTop:20,
        marginBottom:21
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
        marginLeft:24,
        flex:1
        
    },
    txt2:{
        marginRight:24,
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
        width:380,
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
        width:350,
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
        borderRadius:8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

})
