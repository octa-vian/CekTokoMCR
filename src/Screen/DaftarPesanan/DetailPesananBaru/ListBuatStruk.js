import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { colors } from '../../../Utils';


const ListBuatStruk = ({nama, satuan, harga, onPress, styleBg, btnItem, styStatus, ImgBtn}) => {

    function formatRupiah(num, pra) {
        return pra + ' ' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    
    return (
        <View>
            <TouchableOpacity onPress={btnItem}>
            <View style={[styles.headerTittle, styleBg]}>
                <View>
                <TouchableOpacity style={styles.txt4} widht={25} height={25} onPress={onPress}>
                <Image source = {ImgBtn} style={{height:25,width:25,}}></Image>
                </TouchableOpacity>
                </View>

                <View style={{flex:1}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.txt1(styStatus)}>{nama}</Text>
                <View style={styles.stylKondisi(styStatus)}>
                <Text style={{color:'white'}}>{styStatus}</Text>
                </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.txt3(styStatus)}>{formatRupiah(harga, 'Rp.')}</Text>
                <Text style={styles.txt2(styStatus)}> {satuan}</Text>
                </View>
                </View>
       
            </View>
            </TouchableOpacity>
        </View>
    );
};

export default ListBuatStruk;

const styles = StyleSheet.create({

    headerTittle:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16,
        marginBottom:24,
        marginTop:16
        //marginBottom:4,
        //backgroundColor:'#FFF3F5',
    },
    txt1:(colorStyle) => ({
        flex:1,
        fontSize:14,
        color:colorStyle == 'dihapus' ? '#CCCCCC':'black',
        //fontWeight:'bold',
        textTransform:'capitalize',
        //paddingLeft:25

    }),
    txt2:(colorStyle) => ({
        flex:0.8,
        fontSize:14,
        color:colorStyle == 'dihapus' ? '#CCCCCC':'black',
        textAlign:'right',
        //backgroundColor:'blue',
        fontWeight:'bold',
        flex:1
    }),

    txt3:(colorStyle) => ({
        fontSize:14,
        color:colorStyle == 'dihapus' ? '#CCCCCC':'black',
        fontWeight:'bold',
        marginTop:8,
        flex:1
        //textAlign:'right'
    }),
    txt4:{
        textAlign:'center',
        justifyContent:'center',
        marginRight:18,
        
    },
    stylKondisi:(colorStatus) => ({
        borderRadius:12, 
        backgroundColor:colorStatus == 'Rekomendasi' ?  '#0C80EB':colorStatus == 'dihapus' ? colors.btnActif:'white',
        color:'white', 
        fontSize:12, 
        //width:'110%', 
        textAlign:'center',
        justifyContent:'center',
        height:20,
        paddingLeft:8,
        paddingRight:8,
        marginLeft:10
    })

});
