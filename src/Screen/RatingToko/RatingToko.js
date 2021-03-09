import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import Api from '../../Api'
import LoadingImage from '../../Loading/LoadingImage'
import LoadingImageMessage from '../../Loading/LoadingImageMessage'
import LoadingMessage from '../../Loading/LoadingMessage'
import Header from '../Header'
import ListRatingToko from './ListRatingToko'

const RatingToko = ({navigation}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pesan, setPesan] = useState('')
    const [loadImg, setLoadImg] = useState(false); 

    useEffect(() =>{
        getData();
        setLoadImg(true);
    },[])

    useEffect(() =>{
        setTimeout(() =>{
            setLoading(false);
        }, 2500)
    },[])

    const getData = () => {
        Api.get('rating')
        .then( async (response) =>{
            let res = response.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                setPesan(metadata.message);
                setData(res.response);
                setLoadImg(false);
            } else{
                setPesan(metadata.message);
                setLoading(true);
                setLoadImg(false);
            }
        })
        .catch(err => console.log('err: ', err))
    }

    const renderItem = ({item}) => {

            return (
            <ListRatingToko 
            key={item.id}
            kode={item.no_order} 
            nama={item.nama}
            Kkelengkapan={item.review_pelayanan}
            Kharga={item.review_harga}
            Kpelayanan={item.review_pelayanan}
            Rkelengkapan={item.rating_barang}
            Rharga={item.rating_harga}
            Rpelayanan={item.rating_pelayanan}
            tanggal={item.insert_at}>
            </ListRatingToko>
            );

    };

    return (
        <View style={{flex:1,}}>
            <Header title="Rating Toko" onPress={() => navigation.goBack()}/>

            <View style={{flex:1, alignItems:'center'}}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.kode}
            showsVerticalScrollIndicator={false}
            />
            <LoadingMessage visible={loading} pesan={pesan} />
            <LoadingImage visible={loadImg} />
            </View>
        </View>
    )
}

export default RatingToko
