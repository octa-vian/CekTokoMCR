import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ListDetailPesanan2 = ({nama, satuan, harga, status}) => {

  status = 'Rekomendasi';
  function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
    return (
        <View>
        <View style={styles.page2}>
        <View style={styles.tab1}>
        <Text style={{fontSize:14, 
          color:'black',
          fontWeight:'normal',
          flex:1,
          textTransform:'capitalize'}}>{nama}</Text>

          
          <View style={styles.styleStatus(status)}>
          <Text style={{fontSize:12, color:'white', textAlign:'center', textTransform:'capitalize'}}>{status}</Text>
          </View>

        </View>
        <View style={styles.tab2}>
        <Text style={{fontSize:14, color:'black', fontWeight:'bold', flex:1}}>{formatRupiah(harga, 'Rp')}</Text>
        <Text style={{fontSize:14, flex:1, textAlign:'right', fontWeight:'bold'}}> {satuan} </Text>
        </View>

        <View 
        style={{borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        marginTop:16,
        marginRight:16,
        borderStyle:'dashed',
        marginLeft:16}}>
        </View>
        
        </View>
        </View>
    )
}

export default ListDetailPesanan2

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 21,
    paddingVertical: 13,
    marginBottom: 10,
    flex: 1,
  },
  page2:{
    justifyContent:'center',
    paddingTop:4,
    marginBottom:24
    
  },
  title: {
    fontSize: 12,
    color: 'black',
    fontWeight:'bold'
  },
  title1:{
    height:48,
    width:71
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
  tab1:{
      //flex:1,
      //paddingHorizontal:21,
      marginLeft:16,
      marginRight:16,
      marginBottom:8,
      flexDirection:'row'
      
  },
  tab2:{
      flex:1,
      //alignItems:'center'
      flexDirection:'row',
      marginLeft:16,
      marginRight:16

  },
  tab3:{
      width:'68%',
      alignItems:'flex-end',
      
  },
  styleStatus:(colorStatus) => ({
    backgroundColor:colorStatus == 'Rekomendasi' ? '#0C80EB':'white', 
    borderRadius:100, 
    width:'25%', 
    height:22,
    justifyContent:'center', 
    alignItems:'center',
    marginLeft:10
})
  });
