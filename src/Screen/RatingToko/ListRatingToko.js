import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { PesananBaru, SvgBeranda } from '../../IconSvg'
import { colors } from '../../Utils';
import Star from 'react-native-star-view';

const ListRatingToko = ({kode, tanggal, nama, Rkelengkapan, Rharga, Rpelayanan, Kkelengkapan, Kharga, Kpelayanan}) => {

  const [nilai, setLast] = useState(0);

    const Stars = () =>{
      setLast=2.5
    }

    const starStyle = {
      width: 100,
      height: 20,
      marginBottom: 8,
    };

    return (
        <View>
            <View style={styles.CrView}>
            <TouchableOpacity>
            <View style={{alignItems:'center', marginTop:16, marginRight:14, flexDirection:'row',}}>
            <Text style={{fontSize:12, fontWeight:'bold', marginLeft:16, color:'gray'}}>{kode}</Text>
            <Text style={{fontSize:12, textAlign:'right', color:'gray', fontWeight:'bold', flex:1}}>{tanggal}</Text>
            </View>
            <View style={styles.page}>

            <View style={styles.title2}>
            <Text style={{fontSize:12, fontWeight:'bold', textTransform:'uppercase'}}>{nama}</Text>
            </View>

            <View style={{borderColor:'#EBEBEB', borderWidth:1, marginTop:16}} />

        
          
          <View style={{flexDirection:'row', alignItems:'center', marginTop:12,}}>
          <Text style={{color:'#7A7A7A', fontSize:14, fontWeight:'bold'}}>Kelengkapan Produk </Text>
          <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end', alignItems:'center'}}>
          <Image source={require('../../imgSvg/icon_heart.png')} style={{height:20, width:20, marginRight:6}}/>
          <Text style={{fontSize:16, fontWeight:"bold", textAlign:'right'}}>{Rkelengkapan}</Text>
          </View>
        
          </View>
          <Text style={{color:'gray', fontSize:14, textTransform:'capitalize'}}>" {Kkelengkapan} "</Text>


          <View style={{flexDirection:'row', alignItems:'center', marginTop:12,}}>
          <Text style={{color:'#7A7A7A', fontSize:14, fontWeight:'bold'}}>Harga</Text>
          <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end', alignItems:'center'}}>
          <Image source={require('../../imgSvg/icon_heart.png')} style={{height:20, width:20, marginRight:6}}/>
          <Text style={{fontSize:16, fontWeight:"bold", textAlign:'right'}}>{Rharga}</Text>
          </View>
        
          </View>
          <Text style={{color:'gray', fontSize:14, textTransform:'capitalize'}}>" {Kharga} "</Text>

        <View style={{flexDirection:'row', alignItems:'center', marginTop:12,}}>
          <Text style={{color:'#7A7A7A', fontSize:14, fontWeight:'bold'}}>Pelayanan</Text>
          <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end', alignItems:'center'}}>
          <Image source={require('../../imgSvg/icon_heart.png')} style={{height:20, width:20, marginRight:6}}/>
          <Text style={{fontSize:16, fontWeight:"bold", textAlign:'right'}}>{Rpelayanan}</Text>
          </View>
        
          </View>
          <Text style={{color:'gray', fontSize:14, textTransform:'capitalize'}}>" {Kpelayanan} "</Text>

        </View>
        </TouchableOpacity>
        </View>
            
        </View>
    )
}

export default ListRatingToko

const styles = StyleSheet.create({
    CrView:{
        backgroundColor:colors.bglayout,
        marginTop:17,
        justifyContent:'center',
        //elevation: 3,
        marginRight:5,
        marginLeft:5,
        marginBottom:10,
        marginTop:10,
        borderRadius:16,
    },
    page: {
        paddingHorizontal: 15,
        paddingVertical: 13,
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
        //height:48,
        width:'100%',
        justifyContent:'center'
      },
      rating: {
        fontSize: 17,
        color: 'black',
      },
      poster: {
        width: 30,
        height: 30,
      },
})