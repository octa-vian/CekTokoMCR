import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Api from '../../Api'
import { colors } from '../../Utils'

import exampleImage from '../../imgSvg/Icon_place_Holder_Toko.jpeg'
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

const ListProduk = ({gambar, nama, harga, onPress, stok, btnHarga, btnStok}) => {

    if(gambar === ''){
        gambar = exampleImageUri;
    }

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

    return (
        
        <TouchableOpacity style={styles.CrView} onPress={onPress}>

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
                    elevation: 3,}}>
                <Image source={{uri:gambar}} style={{height:100, width:100, borderRadius:8, }} />
                </View>
                
                <View style={{alignItems:'flex-start', marginTop:12, flex:1}}>
                <Text style={{color:'black', marginLeft:12, fontSize:14, marginRight:12, fontWeight:'bold' }}>{nama} </Text>
                <Text style={{color:colors.btnActif, marginLeft:12, fontSize:14, marginTop:8, fontWeight:'bold'}}>{formatRupiah(harga, 'Rp. ')}</Text>
                <View style={{flexDirection:'row', marginTop:16}}>
                <Text style={{color:colors.btnTextGray, marginLeft:12, fontSize:14, fontWeight:'normal'}}>Stok:</Text>
                <Text style={{color:'black', marginLeft:12, fontSize:14, fontWeight:'bold'}}>{stok}</Text>
                </View>
                </View>
                </View>
                
                <View style={{flexDirection:'row', paddingLeft:16, paddingRight:16, marginTop:24}}>

                    <TouchableOpacity style={{borderColor:colors.btnTextGray, borderWidth:1, borderRadius:100, flex:1, height:38, alignItems:'center', justifyContent:'center', marginRight:10}} onPress={btnHarga}>

                        <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Ubah Harga</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{borderColor:colors.btnTextGray, borderWidth:1, borderRadius:100, flex:1, height:38, alignItems:'center', justifyContent:'center',}} onPress={btnStok}>

                        <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Ubah Stok</Text>

                    </TouchableOpacity>

                </View>
        </TouchableOpacity>
    )
}

export default ListProduk

const styles = StyleSheet.create({

    CrView:{
        backgroundColor:'#ffffff',
        marginTop:10,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        marginTop:10,
        borderRadius:6,
        
    },

})
