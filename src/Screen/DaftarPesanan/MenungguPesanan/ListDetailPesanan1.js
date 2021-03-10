import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../../Utils'

const ListDetailPesanan1 = ({nama, satuan, status, hargaSatuan}) => {

  function formatRupiah(num, pra) {
    return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
    return (
        <View>
        <View style={styles.page2}>
        <View style={styles.tab1}>
            <Text style={{fontSize:12, 
              color:'black',
              fontWeight:'normal',
              textTransform:'capitalize'}}>{nama}</Text>
              <Text style={{fontSize:10, color:colors.btnActif, fontStyle:'italic'}}>{formatRupiah(hargaSatuan, 'Rp')}</Text>
        </View>
        <View style={styles.tab2}>
            <Text style={{fontSize:12}}> {satuan} </Text>
        </View>
        <View style={styles.tab3}>
            <Text style={{fontSize:12, color:colors.btnredcolor}}>{status}</Text>
        </View>
        </View>
        </View>
    )
}

export default ListDetailPesanan1

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
      //width:307,
      paddingTop:4

      
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
        marginLeft:15
        
    },
    tab2:{
        flex:1,
        alignItems:'center'
    },
    tab3:{
        flex:1,
        alignItems:'flex-start',
        
    }
  });
