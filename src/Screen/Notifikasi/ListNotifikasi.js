import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ListNotifikasi = ({Judul, Isi, tgl}) => {
    return (
        <View>
        <TouchableOpacity style={styles.CrView}>
        <View style={{alignItems:'flex-end'}}>
        <View style={{alignItems:'center', justifyContent:'center', marginTop:10, height:24, paddingRight:6, paddingLeft:6, marginRight:12, borderColor:'#8A979F', borderWidth:1, borderRadius:12, shadowOpacity: 0.25,
        shadowRadius: 3.20,}}>
        <Text style={{fontSize:8, alignItems:'center', justifyContent:'center', color:'#8A979F', fontWeight:'bold'}}>{tgl}</Text>
        </View>
        </View>
        <View style={styles.page}>
        <View style={styles.page2}>
            <View style={{marginTop:10}}>
            <Text style={{fontSize:16, marginBottom:4, fontWeight:'bold', color:'#EB2843'}}>{Judul} </Text>
            <Text style={{fontSize:12, textTransform:'none'}} numberOfLines={3}>{Isi} </Text>
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

export default ListNotifikasi
const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginBottom: 10,
      flex: 1,
    },
    page2:{
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
        marginRight:15,
        marginLeft:15,
        marginBottom:2,
        marginTop:17,
        borderRadius:10
    },
  });
