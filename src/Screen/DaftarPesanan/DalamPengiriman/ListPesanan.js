import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ListPesanan = ({kode, tanggal, jam, onPress}) => {
    return (
        <View>
        <TouchableOpacity style={styles.CrView} onPress={onPress}>
        <View style={{alignItems:'flex-end', marginTop:6, marginRight:22}}>
        <Text style={{fontSize:9}}> 20 Des 2021, 18.00 </Text>
        </View>
        
        <View style={styles.page}>
        <View style={styles.page2}>
            <View style={styles.title1}>
            <Text style={{fontSize:12, fontWeight:'bold'}}>No. Pesanan</Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>Pengiriman</Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>Jam</Text>
            </View>
            <View style={styles.title2}>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {kode}</Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {tanggal} </Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {jam} </Text>
            </View>
        </View>
        {/* <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{rating}</Text> */}
        {/* <Image source={{uri: image}} style={styles.poster} /> */}
        </View>
        </TouchableOpacity>
        </View>
    )
}

export default ListPesanan
const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginBottom: 10,
      flex: 1,
    },
    page2:{
      flexDirection:'row'
    },
    title: {
      fontSize: 12,
      color: 'black',
      fontWeight:'bold'
    },
    title1:{
      height:48,
      width:80
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
        height:100,
        width:324,
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
