import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors } from '../../../Utils'

import exampleImage from '../../../imgSvg/Icon_place_Holder_Toko.jpeg'
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

const ListViewProdukRec = ({nama, satuan, harga, image, onPress, terjual}) => {

    if (image === ''){
        image = exampleImageUri;
    }
    return (
        <TouchableOpacity style={{flexDirection:'row', flex:1, alignItems:'center', marginBottom:32, paddingTop:2, paddingBottom:2, backgroundColor:'white'}} onPress={onPress}>
            <View style={{height:74, width:74, alignItems:'center', justifyContent:'center', borderRadius:12, borderColor:colors.bglayout, borderWidth:1, backgroundColor:'white', margin:4,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                
                elevation: 3,}}>
            <Image source={{uri:image}} style={{height:74, width:74, borderRadius:12,
            }} />
            </View>
            <View style={{flex:1, marginLeft:16}}>
            <Text style={{color:'black', textAlign:'left', fontSize:14, width:'100%', fontWeight:'bold'}}>{nama}</Text>
            <Text style={{color:'black', textAlign:'left', marginTop:16, fontSize:14, fontWeight:'bold' }}>{harga}</Text>
            <Text style={{color:'#7A7A7A', textAlign:'left',fontSize:12, }}>Stok: {terjual}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListViewProdukRec
