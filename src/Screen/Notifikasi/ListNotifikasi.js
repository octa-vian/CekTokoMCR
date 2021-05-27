import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../Utils'

const ListNotifikasi = ({Judul, Isi, tgl, status}) => {

  const [Nstatus, setNstatus] = useState(false);
    useEffect(() => {
      if(status == ''){
        setNstatus(true);
      } else {
        setNstatus(false);
      }
    },[]);

    return (
        <View style={{alignItems:'center', flex:1}}>
        <TouchableOpacity style={styles.CrView}>
        <View style={{flexDirection:'row', alignItems:'center', marginTop:16,}}>
        <Text style={{fontSize:12, alignItems:'center', justifyContent:'center', color:'#8A979F', fontWeight:'bold', marginLeft:16, flex:1}}>{tgl}</Text>
        {Nstatus ? (
        <View style={{flex:1, alignItems:'flex-end', marginRight:16,}}>
        <Text style={{fontSize:12, backgroundColor:'red', borderRadius:15, paddingLeft:8, paddingRight:8, textAlign:'center', color:'white'}}>Baru</Text>
        </View>
        ):null}
        </View>

        <View style={styles.page}>
        <View style={styles.page2}>
            <View style={{marginTop:10}}>
            <Text style={styles.colorJudul(status)}>{Judul}</Text>
            <Text style={styles.colorisi(status)} numberOfLines={2}>{Isi}</Text>
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
      marginRight:16, marginLeft:16,
      marginBottom: 10,
      //flex: 1,
    },
    page2:{
     // marginLeft:10
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
        backgroundColor:colors.bglayout,
        marginTop:17,
        height:139,
        width:'100%',
        justifyContent:'center',
        marginRight:15,
        marginLeft:15,
        marginBottom:2,
        marginTop:17,
        borderRadius:16,
    },
    colorJudul:(colorStatus) => ({
      fontSize:16, 
      marginBottom:4, 
      fontWeight:'bold', 
      color:colorStatus == '1' ? 'gray':'black'
    }),

    colorisi:(colorStatus) => ({
        fontSize:12, textTransform:'none',
        color:colorStatus == '1' ? 'gray':'black',
      })
  });
