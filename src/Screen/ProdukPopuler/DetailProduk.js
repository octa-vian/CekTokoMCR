import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import Api from '../../Api'
import LoadingImageMessage from '../../Loading/LoadingImageMessage'
import LoadingMessage from '../../Loading/LoadingMessage'
import { colors } from '../../Utils'
import Header from '../Header'
import ListHorisontalProduk from './ListHorisontalProduk'
import { SliderBox } from "react-native-image-slider-box"

const DetailProduk = ({route, navigation }) => {

    const [loading, setLoading] = useState(false);
    const [dataGambar, setGambar] = useState([]);
    const [pesan, setPesan] = useState('');
    const [dataProduk, setProduk] = useState({
        nama_product:'',
        keterangan:'',
        harga:''
    })
    const {itemId} = route.params;

    const param = {
        id: itemId
    };
    
    console.log(param);

    useEffect(() => {
        setLoading(true);
        getData();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    })

    const getData = () =>{
    Api.post('product/detail_produk', param)
    .then( async (response) => {
        let res = response.data;
        let metadata = res.metadata;

        if(metadata.status === 200){
            setPesan(metadata.message);
            setProduk(res.response);
            setGambar(res.response.image);
            setLoading(false);
        } else {
            setPesan(metadata.message);
        }
    }) 
    .catch(err => console.log('err: ', err))
    }

    const renderItem = ({item}) => {
        
        return (
        <ListHorisontalProduk 
        key={item.id}
        gambar={item.image}>
        </ListHorisontalProduk> 
        );
      
 };

    return (
        <View style={styles.page}>
            <Header onPress={() => navigation.goBack()} title={'Detail Produk'} solor={styles.colorHeader}></Header>
            <ScrollView>
            <View style={styles.borderImage}>
            <SliderBox
                images={dataGambar}
                renderItem={renderItem}
                sliderBoxHeight={400}
                inactiveDotColor="#90A4AE"
                dotColor={colors.btnActif}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                />
                <View style={{backgroundColor:'#fff', alignItems:'flex-start'}}>
                <Text style={{marginLeft:38, marginTop:33, fontSize:16, fontWeight:'bold'}}> {dataProduk.nama_product} </Text>
                <Text style={{marginLeft:38, marginTop:2, marginBottom:13, fontSize:16, color:'#EB2843'}}> {dataProduk.harga} </Text>
            </View>
            </View>

            <View style={styles.descripsion} >
                <Text style={{marginTop:14, marginLeft:38, fontSize:16, fontWeight:'bold'}}> Deskripsi Produk </Text>
                <Text style={{marginTop:9, marginLeft:38, fontSize:12, paddingBottom:10, marginRight:38}}> {dataProduk.keterangan} </Text>
            </View>
            </ScrollView>
            <LoadingMessage visible={loading} pesan={pesan} />
        </View>
    )
}

export default DetailProduk

const styles = StyleSheet.create({

    page:{
        flex:1,
        backgroundColor:'white'
    }, colorHeader:{
        height:60,
        fontSize:14,
        alignItems:'center',
        paddingLeft:26,
        flexDirection:'row',
        width:375,
        backgroundColor: colors.bgPrimary,
    },
    borderImage:{
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    stylImage:{
        backgroundColor:'red',
        justifyContent:'center',
        height:250,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
            },
    descripsion:{
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        marginTop:4,
        
    },

})