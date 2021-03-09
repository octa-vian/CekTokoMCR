import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Api from '../../Api'
import { colors } from '../../Utils'

const ListProduk = ({gambar, nama, harga, onPress}) => {

    return (
        <View style={styles.CrView}>
            <TouchableOpacity onPress={onPress}>
                <Image source={{uri: gambar}} style={{height:129,borderTopRightRadius:6, borderTopLeftRadius:6}} height={129} marginBottom={7} />
                <Text style={{color:'black', marginTop:4, marginLeft:12, fontSize:12, marginRight:12}} numberOfLines={2}>{nama} </Text>
                <Text style={{color:colors.btnredcolor, marginLeft:12, fontSize:12, marginBottom:16, fontWeight:'bold'}}>{harga}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListProduk

const styles = StyleSheet.create({

    CrView:{
        shadowColor: "#000",
        backgroundColor:'#ffffff',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:183,
        width:145,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        marginTop:10,
        borderRadius:6
    },

})
