import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Modal, RefreshControl } from 'react-native'
import Api from '../../Api'
import ButtonFilter from '../../Button/ButtonFilterList/ButtonFilter'
import PopupFilter from '../../ComponentPopup/PopupFilter'
import { IconExit, IconFilter, IconSearch } from '../../IconSvg'
import LoadingImage from '../../Loading/LoadingImage'
import LoadingMessage from '../../Loading/LoadingMessage'
import { colors } from '../../Utils'
import Header from '../Header'
import ListProduk from './ListProduk'

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
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(20);
    const [refreshing, setRefresh] = useState(false);
    const [isLast, setLast] = useState(false);
    

    const param = {
        keyword:search,
        kategori:getId,
        sort:getUrut,
        start:offset,
        count:length
    };

    const data = [
        {id: '1', name:'Termurah', nilai:'termurah'},
        {id: '2', name:'Termahal', nilai:'termahal'},
        {id:'3', name:'A-Z', nilai:'a-z'},
        {id:'4', name:'Z-A', nilai:'z-a'}
    ];

    useEffect(() => {
        setLoading(true)
        //getData();
        getDataFilter();
      }, []); 

      useEffect(() => {
        //setLoading(true)
        getData();
        //getDataFilter();
      }, [offset]);

      useEffect(() => {
          setTimeout(() => {
            setLoadingMes(false);
          }, 2500)
      })

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
        } else{
            alert(metadata.message);
        }
    })
}

const postId = () => {
   // getData();
    toggleModal();
    setOffset(0);
}



const getData = () => {

     Api.post('product/list_product_merchant', param)
    .then( async (body) => {
        let res = body.data;
        let metadata = res.metadata;
        let response = res.response;
        if(metadata.status === 200){
            setProduk(response.response);
            setLoading(false);
            setPesan(metadata.message);
            await setProduk(offset == 0 ? response : [...produk, ...response]);
            await setOffset(response.length != 0 ? (offset + response.length) : offset);
            await setLast(response.length != length ? true : false);
        }else{
            setLoadingMes(true);
            setLoading(false);
            setPesan(metadata.message);
        }
    })
    .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoadingMes(true);
    })
    }

    const loadMore = async() => {
        if(isLast === false){
            await setOffset(offset + length);
            setLoading(true);
            await getData();
        }
      }

      const onRefresh = async () =>{
        await setOffset(0)
        await setProduk([])
        // await setRefresh(true)
        getData();
        await setLast(false)
        await loadMore()
      }

    const renderItem = ({item}) => {
            return (
              <ListProduk 
              key={item.id}
              gambar={item.image} 
              nama={item.nama_product} 
              harga={item.harga} 
              onPress={ () => navigation.navigate('Detail Produk', { itemId: item.id })}
              onEndReached={loadMore}
            >
              </ListProduk>
          )
    }

    return (
        <View style={styles.page}> 
            <Header title="Produk Populer" onPress={() => navigation.goBack()}/>
            <View>
                <View style={{flexDirection:'row', paddingBottom:12, alignItems:'center', justifyContent:'center', }}>
                    <View style={styles.CrView}>
                        <IconSearch height={20} width={20} marginTop={11} marginLeft={11} />
                        <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginLeft:12, height:42, }}>
                        <TextInput
                        autoCapitalize="none"
                        style={{fontSize:12, }}
                        fontSize={14}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        onSubmitEditing={() => getData()}
                        //onKeyPress={getData}
                        placeholder="Cari Produk Populer"/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.CrFilter} onPress={toggleModal}>
                        <IconFilter/>
                    </TouchableOpacity>
                </View>
                </View>

        
            <View style={{flex:1, alignItems:'center'}}>
            <FlatList
                data={produk}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item) => item.id}
                onEndReached={loadMore}
                showsVerticalScrollIndicator={false}/>
            </View>
           <LoadingImage visible={loading}/>
           <LoadingMessage visible={loadingMes} pesan={pesan} />
           

        <Modal
        animationType='slide' transparent={true}
        visible={getPopup}>
        <View style={styles.page2}>

            <View style={styles.filter}>
            <TouchableOpacity style={{alignItems:'flex-end', marginTop:15, marginRight:20,}} onPress={toggleModal} >
                <IconExit height={18} width={18} />
            </TouchableOpacity>

            <ScrollView>
                <View style={{flex:1,}} >
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
        </Modal>
        </View>
    )
}

export default ProdukPopuler

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:colors.bglayout,

    },
    CrView:{
        shadowColor: "#000",
        backgroundColor:'#ffffff',
        flexDirection:'row',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:42,
        width:265,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:18,
        marginLeft:18,
        marginBottom:2,
        marginTop:30,
        borderRadius:6,
        borderColor:colors.btnActif, borderWidth:1
    },
    CrFilter:{
        shadowColor: "#000",
        backgroundColor:colors.btnredcolor,
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
        borderRadius:6
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
