import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../Utils'

const ListRincianStokProduk = ({statusStok, jumlah, totalStok, tanggal, stokMinimum}) => {
    return (
        <View style={styles.page}>
               <View style={styles.styleStatus(statusStok)}>
                   <Text style={{fontWeight:'normal', color:'white'}}>{statusStok}</Text>
               </View>
               <View style={{flexDirection:'row', marginLeft:16, marginRight:16, marginTop:20}}>
                   <View style={{flex:1, alignItems:'flex-start', }}>
                       <Text style={{fontWeight:'bold', color:colors.btnTextGray}}>Jumlah</Text>
                       <Text style={styles.styleJumlah(statusStok)}>{jumlah}</Text>
                   </View>

                   <View style={{flex:1, alignItems:'flex-end'}}>
                       <Text style={{fontWeight:'bold', color:colors.btnTextGray}}>Total Stok</Text>
                       <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>{totalStok}</Text>
                   </View>
               </View>
               <Text style={{marginTop:12, color:'#7A7A7A', marginLeft:16, marginBottom:16, fontWeight:'bold', fontSize:12}}>{tanggal}</Text>
        </View>
    )
}

export default ListRincianStokProduk

const styles = StyleSheet.create({
    page:{
        height:144,
        width:'100%',
        backgroundColor:colors.bglayout,
        marginBottom:12,
        borderRadius:14
    }, 
    styleStatus:(colorStatus) => ({
        backgroundColor:colorStatus == '- Pengurangan stok' ? '#ED0A2A':'#31B057', 
        borderRadius:100,
        height:24,
        marginLeft:16,
        width:'40%',
        marginTop:16,
        alignItems:'center',
        justifyContent:'center'
        
    }),
    styleJumlah:(colorStatus) => (
        {fontWeight:'bold', 
        color:colorStatus == '- Pengurangan stok' ? '#ED0A2A':'#31B057',
        fontSize:16
    })
})
