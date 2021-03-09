import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../../Utils'

const ListHorisontalProduk = ({gambar}) => {
    return (
        <View style={{flex:1}}>
            <View style={styles.stylImage}>
                <Image style={{height:250, width:400}} source={{uri: gambar}} />
                </View>
        </View>
    )
}

export default ListHorisontalProduk

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
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
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
