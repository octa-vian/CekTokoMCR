import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../../Utils'

const ListPreviewStruk = ({nama, satuan, status, harga, hargaSatuan}) => {

  function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
    
        
        <View style={styles.page2}>
        <View style={styles.tab1}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{fontSize:14,
              color:'black',
              fontWeight:'normal',
              textTransform:'capitalize', flex:1}}>{nama}</Text>
          <View style={styles.tab3(status)}>
            <Text style={{fontSize:12, color:'white', textTransform:'capitalize'}}>{status}</Text>
          </View>
          </View>
          <View style={{flexDirection:'row', marginTop:8}}>
          <Text style={{fontSize:14, color:'black', fontWeight:'bold'}}>{formatRupiah(hargaSatuan, 'Rp')}</Text>
          <View style={styles.tab2}>
            <Text style={{fontSize:14, textAlign:'right', marginRight:16, fontWeight:'bold' }}> {satuan} </Text>
          </View>
          </View>
              
        </View>
        
        {/* <View style={styles.tab4}>
            <Text style={{fontSize:12, color:'black', textTransform:'capitalize'}}>{formatRupiah(harga, 'Rp')}</Text>
        </View> */}
        </View>
        
    )
}

export default ListPreviewStruk

const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 21,
      paddingVertical: 13,
      marginBottom: 10,
      flex: 1,
    },
    page2:{
      flexDirection:'row',
      justifyContent:'center',
      //width:'100%',
      paddingTop:4,
      marginBottom:24
      //height:22
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
      flex:1,
      marginLeft:16,
      
      //alignItems:'center'
  },
  tab2:{
      flex:1,
      alignItems:'flex-end'
  },
  tab3:(colorStatus) => ({
    alignItems:'center',
    backgroundColor:colorStatus == 'dihapus' ? colors.btnActif:'white',
    width:'20%',
    borderRadius:12,
    marginLeft:10,
    justifyContent:'center',
    marginRight:10,
    height:20
  }),
  tab4:{
    flex:1,
    alignItems:'flex-end',
    marginRight:14
  }
  });
