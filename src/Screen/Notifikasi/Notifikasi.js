import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native'
import Api from '../../Api'
import { Bintang, Hands } from '../../imgSvg'
import LoadingImage from '../../Loading/LoadingImage'
import LoadingMessage from '../../Loading/LoadingMessage'
import { colors } from '../../Utils'
import Header from '../Header'
import ListNotifikasi from './ListNotifikasi'

const Notifikasi = ({navigation}) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [pesan, setPesan] = useState('');

    useEffect(() =>{
        getData();
        setLoadingImg(true);
    },[])

    useEffect(() => {
        setTimeout(() => {
        setLoading(false);
        }, 2500);
    })

    const getData = () => {
        Api.post('info')
        .then(async (response) => {
            let res = response.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                //alert(metadata.message);
                setPesan(metadata.message);
                setData(res.response);
                setLoadingImg(false);
            } else {
                setPesan(metadata.message);
                setLoading(true);
                setLoadingImg(false);
            }
        })
        .catch(err => console.log('err: ', err))
    }

    const renderItem = ({item}) => {
        
            return (
            <ListNotifikasi 
            key={item.id}
            Judul={item.title} 
            Isi={item.text}
            tgl={item.tgl}>
            </ListNotifikasi> 
            );
          
     };

    return (
        <View style={styles.container}>
        <Header title="Notifikasi" onPress={() => navigation.goBack()} />
        <ImageBackground style={{alignItems:'center', flex:1}} source={require('../../Gambar/bgpattren.png')} >
        <View style={{alignItems:'center'}}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            />
        </View>
        </ImageBackground>
        <LoadingMessage visible={loading} pesan={pesan} />
        <LoadingImage visible={loadingImg} />
        </View>
    )
}

export default Notifikasi

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bglayout
    }
})
