import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { colors } from '../../Utils'

const ListPesananBaru = ({kode, tanggal, jam, onPress, insertAt, metode, stylebg, total, jumlah, image, metodPembayaran}) => {

  function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
    return (
        <View style={{width:'100%'}}>
        <TouchableOpacity style={styles.CrView} onPress={onPress}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          
        <View style={{alignItems:'flex-start', marginLeft:16, }}>
        <View style={[styles.stylebgStatus, stylebg]}>
        <Image style={{height:15, width:15, marginRight:8}} source={image} /> 
        <Text style={{fontSize:12, alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold'}}>{metode}</Text>
        </View>
        </View>

        <View style={{alignItems:'flex-start', flex:1,}}>
        <View style={[styles.stylebgMetod, stylebg]}>
        <Text style={{fontSize:12, color:'white', fontWeight:'bold', textAlign:'center'}}>{metodPembayaran}</Text>
        </View>
        </View>
        </View>
        
        <View style={{marginLeft:16, marginRight:16, marginTop:10}}>
          <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnTextGray }}>Total Pesanan {jumlah} Produk</Text>
          <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:8 }}>{formatRupiah(total, 'Rp. ')}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:colors.btnTextGray, marginTop:16 }}>{insertAt}</Text>
        </View>
        </TouchableOpacity>
        </View>
    )
}

export default ListPesananBaru

const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginBottom: 10,
      flex: 1,
    },
    page2:{
      flexDirection:'row',
      marginLeft:10
    },
    title: {
      fontSize: 12,
      color: 'black',
      fontWeight:'bold'
    },
    title1:{
      height:48,
     
    },
    title2:{
      height:48,
      width:'70%',
    },
    rating: {
      fontSize: 17,
      color: 'black',
    },
    poster: {
      width: 30,
      height: 30,
    },
    CrView:{
        shadowColor: "#000",
        backgroundColor:colors.bglayout,
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:146,
        flex:1,
        //width:358,
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        marginRight:20,
        marginLeft:20,
        marginBottom:2,
        marginTop:17,
        borderRadius:16
    },
    stylebgStatus:{
      alignItems:'center', 
      justifyContent:'center', 
      marginTop:10, 
      marginBottom:6, 
      height:26, 
      marginRight:12, 
      borderRadius:15, 
      shadowOpacity: 0.25, 
      flexDirection:'row',
      shadowRadius: 3.20,  
      elevation:3
    },
    stylebgMetod:{
      alignItems:'center', 
      justifyContent:'center', 
      marginTop:10, 
      marginBottom:6, 
      height:26, 
      //width:85, 
      marginRight:12, 
      borderRadius:15, 
      shadowOpacity: 0.25, 
      flexDirection:'row',
      shadowRadius: 3.20,  
      elevation:3}
   });
