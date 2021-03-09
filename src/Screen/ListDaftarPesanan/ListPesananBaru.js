import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../Utils'

const ListPesananBaru = ({kode, tanggal, jam, onPress, insertAt, metode}) => {
    return (
        <View>
        <TouchableOpacity style={styles.CrView} onPress={onPress}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={{flex:1, marginLeft:21, marginTop:11}}>
        <Text style={{fontSize:12, fontWeight:'bold'}}>No. Pesanan</Text>
        <Text style={{fontSize:12, fontWeight:'bold', color:'#EB2843'}}>{kode} </Text>
        </View>
        <View style={{alignItems:'flex-end', flex:1}}>
        <View style={{alignItems:'center', justifyContent:'center', marginTop:10, marginBottom:6, height:24, width:97, marginRight:12, borderColor:'#8A979F', borderWidth:1, borderRadius:12, shadowOpacity: 0.25,
        shadowRadius: 3.20,}}>
        <Text style={{fontSize:8, alignItems:'center', justifyContent:'center', color:'#8A979F', fontWeight:'bold'}}> {insertAt} </Text>
        </View>
        </View>
        </View>

        <View style={{borderBottomColor: '#00000029',borderBottomWidth: 1, marginVertical:10, marginTop:5 }}></View>
        <View style={styles.page}>
        <View style={styles.page2}>
            <View style={styles.title1}>
            
            <Text style={{fontSize:12, fontWeight:'bold'}}>Pengiriman</Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>Metode Belanja</Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>Jam</Text>
            
            </View>
            <View style={styles.title2}>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {tanggal} </Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {metode} </Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {jam} </Text>
            
            </View>
        </View>
        
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
      width:220,
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
        backgroundColor:'#ffffff',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:139,
        //width:324,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom:2,
        marginTop:17,
        borderRadius:10
    },
  });
