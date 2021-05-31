import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../Utils'
import Header from '../Header'

const TransaksiBerhasil = ({navigation, route}) => {
    
    const {pembeli, tanggal, diterima, jenis_pembayaran, totalTagihan, status, kembalian, dataListProduk} = route.params;

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return (
        <View style={styles.page}>
            <Header title="Teransaksi Berhasil" onPress={() => navigation.goBack()}/>
            <ScrollView>
            <View style={{marginLeft:16, marginRight:16, marginTop:40, alignItems:'center', justifyContent:'center'}}>
                <Image source={require('../../imgSvg/icon-check-list-sukses-pesanan.png')} style={{height:180, width:180,}}/>
                <Text style={{marginTop:40, fontWeight:'bold', fontSize:16, color:'black'}}>Transaksi Berhasil</Text>
                <Text style={{marginTop:8, fontWeight:'bold', fontSize:14, color:colors.btnTextGray}}>{tanggal}</Text>
                <Text style={{fontSize:18, marginTop:16, fontWeight:'bold', color:'black'}}>{status}</Text>
            </View>
            <View style={{marginLeft:18, marginRight:18, marginTop:40}}>
                <View style={{flexDirection:'row', }}>
                    <Text style={{flex:1, textAlign:'left', fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Pembayaran</Text>
                    <Text style={{flex:1, textAlign:'right', fontWeight:'bold', color:'black', fontSize:14}}>{jenis_pembayaran}</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:16}}>
                    <Text style={{flex:1, textAlign:'left', fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Total Tagihan</Text>
                    <Text style={{flex:1, textAlign:'right', fontSize:14, fontWeight:'bold', color:'black'}}>{formatRupiah(totalTagihan, 'Rp. ')}</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:16}}>
                    <Text style={{flex:1, textAlign:'left', fontSize:14, fontWeight:'bold', color:colors.btnTextGray}}>Diterima</Text>
                    <Text style={{flex:1, textAlign:'right', fontSize:14, fontWeight:'bold', color:'black'}}>{formatRupiah(diterima, 'Rp. ')}</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:14}}>
                    <Text style={{flex:1, textAlign:'left', fontSize:16, fontWeight:'bold', color:colors.btnTextGray}}>Kembalian</Text>
                    <Text style={{flex:1, textAlign:'right', fontSize:14, fontWeight:'bold', color:'black'}}>{formatRupiah(kembalian, 'Rp. ')}</Text>
                </View>
            </View>
            
            </ScrollView>
            <View style={{justifyContent:'center', alignItems:'center', marginLeft:18, marginRight:18, paddingBottom:20}}>
                <View style={{flexDirection:'row', }}>
                    <TouchableOpacity style={{flex:1, borderColor:colors.btnActif, borderWidth:1, height:42, margin:8, borderRadius:22, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('Scann Bluetooth')}>
                    <Text style={{fontSize:14, fontWeight:"bold", color:colors.btnActif}}>Cetak Struk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, borderColor:colors.btnActif, borderWidth:1, height:42, margin:8, borderRadius:22, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:14, fontWeight:"bold", color:colors.btnActif}}>Kirim Struk</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{height:42, backgroundColor:colors.btnActif, borderRadius:100, width:'100%', margin:8, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('Daftar Produk Kasir')}>
                <Text style={{fontSize:14, fontWeight:"bold", color:'white'}}>Kembali</Text>
                </TouchableOpacity>
            </View>
        </View>
        // onPress={() => navigation.navigate('Scann Bluetooth', {nama_pembeli: pembeli, })}
    )
}

export default TransaksiBerhasil
const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white'
    }
})
