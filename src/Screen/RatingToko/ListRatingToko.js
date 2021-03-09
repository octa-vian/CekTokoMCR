import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
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
            <View style={{alignItems:'flex-end', marginTop:6, marginRight:14}}>
            <View style={{alignItems:'center', justifyContent:'center', marginTop:10, height:24, width:97, paddingRight:6, paddingLeft:6,  borderColor:'#8A979F', borderWidth:1, borderRadius:12, shadowOpacity: 0.25,
            shadowRadius: 3.20,}}>
            <Text style={{fontSize:8, alignItems:'center', justifyContent:'center', color:'#8A979F', fontWeight:'bold'}}>{tanggal}</Text>
            </View>
            </View>
            <View style={styles.page}>
            <View style={styles.page2}>

            <View style={styles.title1}>
            <Text style={{fontSize:12, fontWeight:'bold'}}>No. Pesanan</Text>
            <Text style={{fontSize:12, fontWeight:'bold'}}>Nama</Text>

            </View>
            <View style={styles.title2}>
            <Text style={{fontSize:12, fontWeight:'bold'}}>  : {kode}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', textTransform:'uppercase'}}>  : {nama} </Text>
            </View>
        </View>

        
          <Text style={{marginTop:12, marginBottom:7, color:'black', fontSize:12, fontWeight:'bold'}}> Rating Kelengkapan Produk </Text>
          <View style={{flexDirection:'row'}}>
          <Star score={Rkelengkapan} style={starStyle} />
          <Text style={{fontSize:16, fontWeight:"bold", alignItems:'center', marginLeft:8}}> {Rkelengkapan}/5</Text>
          </View>
          <Text style={{fontSize:12, color:'black',  fontWeight:'bold'}}>Komentar: </Text>
          <Text style={{color:'gray', fontSize:12, textTransform:'capitalize'}}>{Kkelengkapan}</Text>
        

        
          <Text style={{marginTop:12, marginBottom:7, color:'black', fontSize:12, fontWeight:'bold'}}> Rating Harga </Text>
          <View style={{flexDirection:'row'}}>
          <Star score={Rharga} style={starStyle} />
          <Text style={{fontSize:16, fontWeight:"bold", alignItems:'center', marginLeft:8}}> {Rharga}/5</Text>
          </View>
          <Text style={{fontSize:12, color:'black', fontWeight:'bold'}}>Komentar: </Text>
          <Text style={{color:'gray', fontSize:12, textTransform:'capitalize'}}>{Kharga}</Text>
        

        <View>
          <Text style={{marginTop:12, marginBottom:7, color:'black', fontSize:12, fontWeight:'bold'}}> Rating Pelayanan </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Star score={Rpelayanan} style={starStyle} />
          <Text style={{fontSize:16, fontWeight:"bold", alignItems:'center', marginLeft:5, marginBottom:8}}> {Rpelayanan}/5</Text>
          </View>
          
          <Text style={{fontSize:12, color:'black', fontWeight:'bold'}}>Komentar: </Text>
          <Text style={{color:'gray', fontSize:12, textTransform:'capitalize'}}>{Kpelayanan}</Text>
        </View>
        </View>
        </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default ListRatingToko

const styles = StyleSheet.create({
    CrView:{
        shadowColor: "#000",
        backgroundColor:'#ffffff',
        marginTop:17,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:324,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom:2,
        marginTop:10,
        borderRadius:10
    },
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
})