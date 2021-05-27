import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import Api from '../../Api'
import { Bintang, Hands } from '../../imgSvg'
import LoadingImage from '../../Loading/LoadingImage'
import LoadingMessage from '../../Loading/LoadingMessage'
import { colors } from '../../Utils'
import Header from '../Header'
import HeaderHome from '../HeaderHome'
import ListNotifikasi from './ListNotifikasi'
import Toast from 'react-native-toast-message';
import RepoUtil from '../../Helper/RepoUtil'

var statusBtn = '';
var offset = 0;
var onProsess = false;
const Notifikasi = ({navigation}) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [pesan, setPesan] = useState('');
    const [showBtn, setShowBtn] = useState(false);
    const [length, setLength] = useState(10);
    const [isLast, setLast] = useState(false);

    useEffect(() =>{
        onProsess=false;
        offset=0;
        getData();
        setLoadingImg(true);
    },[])

    useEffect(() => {
        setTimeout(() => {
        setLoadingImg(false);
        }, 2500);
    })

    const getData = () => {
        if(!onProsess){
            onProsess=true;
            const param = {
                start:offset,
                count:length
            }
            Api.post('info', param)
            .then(async (response) => {
                let res = response.data;
                let metadata = res.metadata;
                var response = res.response;
                onProsess=false;
                if(metadata.status === 200){
                    //alert(metadata.message);
                    setPesan(metadata.message);
                    setData(response);
                    setLoadingImg(false);
    
                    data.map((item) =>{
                        if(item.is_read === ''){
                            setShowBtn(true);
                        }
                    })
                    setData(offset == 0 ? response : [...data, ...response]);
                    offset = response.length != 0 ? (offset + response.length) : offset;
                    setLast(response.length != length ? true : false);
    
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
                } else if(metadata.status === 500){
                    setLoading(true);
                    setLoadingImg(false);
                }
                else {
                    setPesan(metadata.message);
                    setLoading(true);
                    setLoadingImg(false);
                    // Toast.show({
                    //     text1: 'Terjadi Kesalahan 🤷🏻‍♂️',
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
            onProsess = false;
            })
        }
    }

    const getPostStatus = () => {
        Api.get('info/change_info')
        .then(async(body) => {
            let res = body.data;
            let metadata = res.metadata;

            if(metadata.status === 200){
                onRefresh();
            } else {
                Toast.show({
                text1: 'Terjadi Kesalahan 🤷🏻‍♂️',
                text2: metadata.message,
                position: 'bottom',
                type: 'error',
                visibilityTime:2000,
                });
            }
        }) 
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    const loadMore = async() => {
        if(isLast === false){
            offset = offset + length
            setLoadingImg(true);
            getData();
        }
      }

      const onRefresh = async () =>{
        offset=0;
        setData([])
        setLast(false)
        // await setRefresh(true)
        getData();
        console.log(offset);
      }

    const ConfrmBtn = () => {
        statusBtn = '0';
        getPostStatus();
        setShowBtn(false);
    }

    const renderItem = ({item}) => {
        
            return (
            <ListNotifikasi 
            key={item.id}
            Judul={item.title} 
            Isi={item.text}
            tgl={item.tgl}
            status={item.is_read}
            onEndReached={loadMore}>
            </ListNotifikasi> 
            );
          
     };

    return (
        <View style={styles.container}>
        <HeaderHome title="Notifikasi" />
        <View style={{paddingBottom:10, flex:1, backgroundColor:'white', paddingLeft:16, paddingRight:16}}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            />
        </View>

        {showBtn ? (
        <View style={{alignItems:'center', position:'absolute', justifyContent:'center', bottom:0, right:0, left:0, marginBottom:40}}>
        <TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:34, width:'40%', backgroundColor:colors.btnActif, borderRadius:8}} onPress={ConfrmBtn}>
        <Text style={{color:'white', fontWeight:'bold'}}>Tandai Sudah dibaca</Text>
        </TouchableOpacity>
        </View>
        ):null}
        
        
        {/* <LoadingMessage visible={loading} pesan={pesan} /> */}
        <LoadingImage visible={loadingImg} />
        <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
    )
}

export default Notifikasi

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})
