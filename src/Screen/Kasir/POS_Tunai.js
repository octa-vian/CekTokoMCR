import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, FlatList, Dimensions, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import RepoUtil from '../../Helper/RepoUtil';
import { colors } from '../../Utils';
import Header from '../Header'

const { width, height } = Dimensions.get("window")
const rows = 3;
const cols = 2.3;
const marginHorizontal = 4;
const marginVertical = 4;
const widthGrid = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const heightGrid = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));
var nominalDibayar = '';


const POS_Tunai = ({navigation, route}) => {
const {tot} = route.params;
const [getNominal, setNominal] = useState(0);
const [showBtn, setShowBtn] = useState(false);
const [changeColor, setChangeColor] = useState();

function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

    const ChangeNom =  (nom) => {
        setNominal(nom);
        nominalDibayar = nom;
    }

    const dataNominal = [
        {
            id:1,
            namaHarga:'Rp. 20.000',
            harga:'20000'
        },
        {
            id:2,
            namaHarga:'Rp. 50.000',
            harga:'50000'
        },
        {
            id:3,
            namaHarga:'Rp. 100.000',
            harga:'100000'
        },
        
        
    ];

    const slectItem = (index) => {
        setChangeColor(index);
        nominalDibayar = dataNominal[index].harga;
        //alert(nominalDibayar);
    }

    const RenderItem = (item, index) => {

        if(index == changeColor) {
            return(
                <TouchableOpacity style={{height:65, width:widthGrid, borderColor:colors.btnActif, alignItems:'center', justifyContent:'center', borderWidth:2, margin:8, borderRadius:12, backgroundColor:'#FFF5F7'}} onPress={() => slectItem(index)}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:colors.btnActif}}>{item.namaHarga}</Text>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity style={{height:65, width:widthGrid, borderColor:colors.btnTextGray, alignItems:'center', justifyContent:'center', borderWidth:2, margin:8, borderRadius:12, backgroundColor:colors.bglayout}} onPress={() => slectItem(index)}>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'gray'}}>{item.namaHarga}</Text>
                </TouchableOpacity>
            )
        }
        
    }

    const ChangeHarga = () => {
        var nm = formatRupiah(getNominal, 'Rp. ');
        setNominal(nm);
    }

    const PostNominal = () => {
        RepoUtil.StoreAsString('@nom', nominalDibayar);
        navigation.navigate('Checkout Pesanan');
    }
    return (
        <View style={styles.page}>
            <Header title="Tunai" onPress={() => navigation.goBack()}/>

            <View style={{alignItems:'center', justifyContent:'center', marginTop:20, backgroundColor:'white' }}>
                <View style={{height:150, width:'85%', borderRadius:18, borderWidth:2, borderColor:colors.btnActif, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{position:'absolute', left:0, color:'white', top:0, marginLeft:10, marginTop:10, borderRadius:12, backgroundColor:colors.btnActif, height:22, width:'30%', textAlign:'center', fontWeight:'bold'}}>Harus Dibayar</Text>
                    <Text style={{fontSize:28, fontWeight:'bold', color:'black'}}>{formatRupiah(tot, 'Rp. ')}</Text>
                </View>
            </View>
            <View style={{marginLeft:16, marginRight:16}}>
                <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:24}}>Uang Yang Diterima</Text>
            <View style={{width:'100%', backgroundColor:colors.bglayout, borderRadius:100, flexDirection:'row', alignItems:'center', marginTop:16}}>
                <Image source={require('../../imgSvg/icon-coin.png')} style={{height:20, width:20, marginLeft:33}}/>
                <TextInput
                style={{flex:1, marginLeft:10, marginRight:15, fontSize:14, fontWeight:'bold', height:52}}
                value={getNominal}
                keyboardType='numeric'
                placeholder={'Rp. 0'}
                onChangeText={(txt) => ChangeNom(txt)}
                //onSubmitEditing={() => ChangeHarga()}
                multiline/>
                </View>
            </View>

            {showBtn ? (
                <TouchableOpacity style={{height:46, backgroundColor:colors.btnActif, borderRadius:100, marginLeft:16, marginRight:16, marginTop:24}}>
                </TouchableOpacity>
            ):null}

            <ScrollView style={{marginLeft:16, marginRight:16, flex:1,}}>
                <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:24}}>Nominal Lain</Text>
                <FlatList
                style={{marginTop:18, }}
                data={dataNominal}
                horizontal={false}
                columnWrapperStyle={{justifyContent:'space-between'}}
                renderItem={({item, index}) => RenderItem(item, index)}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                /> 
            </ScrollView>
            
            <TouchableOpacity style={{height:46, backgroundColor:colors.btnActif, borderRadius:100, marginLeft:16, marginRight:16, marginTop:24, marginBottom:12, alignItems:'center', justifyContent:'center'}} onPress={() => PostNominal()}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>Lanjutkan</Text>
            </TouchableOpacity>

        </View>
    )
}

export default POS_Tunai
const styles = StyleSheet.create({
    page: {
        flex:1,
        backgroundColor:'white',
    }
})
