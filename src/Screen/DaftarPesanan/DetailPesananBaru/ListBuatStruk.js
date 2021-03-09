import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'


const ListBuatStruk = ({nama, satuan, harga, onPress, styleBg, btnItem}) => {

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    
    return (
        <View>
            <TouchableOpacity onPress={btnItem}>
            <View style={[styles.headerTittle, styleBg]}>
                    <Text style={styles.txt1} numberOfLines={1}> {nama} </Text>
                    <Text style={styles.txt2}> {satuan} </Text>
                    <Text style={styles.txt3}>{formatRupiah(harga, 'Rp.')} </Text>
                    <TouchableOpacity style={styles.txt4} widht={30} height={30} onPress={onPress}>
                    <Image source = {require('../../../Gambar/hapus.png')} style={{height:27,width:28,}}></Image>
                    </TouchableOpacity>
            </View>
            </TouchableOpacity>
        </View>
    );
};

export default ListBuatStruk;

const styles = StyleSheet.create({

    headerTittle:{
        height:42,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        //marginBottom:4,
        borderColor:'#00000029',
        borderWidth:1
        //backgroundColor:'#FFF3F5',
    },
    txt1:{
        flex:1.5,
        fontSize:12,
        color:'black',
        fontWeight:'bold',
        textTransform:'uppercase'
        //paddingLeft:25

    },
    txt2:{
        flex:0.8,
        fontSize:12,
        color:'black',
        textAlign:'center',
        //backgroundColor:'blue',
        fontWeight:'bold',
    },
    txt3:{
        flex:1,
        fontSize:12,
        color:'black',
        fontWeight:'bold',
        textAlign:'right'
    },
    txt4:{
        flex:0.5,
        textAlign:'center',
        justifyContent:'center',
        marginRight:12,
        marginLeft:12
    },

});
